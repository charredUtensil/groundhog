import {
  Cardinal4,
  EAST,
  NORTH,
  NORTH_WEST,
  ORIGIN,
  Point,
  SOUTH,
  WEST,
  rotateAround,
  rotateLeft,
  rotateRight,
} from "../common/geometry";
import { Grid } from "../common/grid";
import { EntityPosition, atCenterOfTile, serializePosition } from "./position";

type Footprint = readonly [readonly [0, 0], ...Point[]];

// There are five unique footprints for buildings available.
// Assuming the building itself has its entity origin at [0, 0], and is facing
// NORTH, these tiles become the foundation tiles for buildings with that
// footprint.
const F_MINING_LASER: Footprint = [ORIGIN];
const F_DEFAULT: Footprint = [ORIGIN, NORTH];
const F_CANTEEN_REFINERY: Footprint = [ORIGIN, SOUTH, NORTH];
const F_POWER_STATION: Footprint = [ORIGIN, EAST, NORTH];
const F_SUPER_TELEPORT: Footprint = [ORIGIN, NORTH_WEST, WEST, NORTH];

export const ELECTRIC_FENCE_ID = "BuildingElectricFence_C";

/** Rotates the given footprint to match the given cardinal offset facing. */
function rotateFootprint(footprint: Footprint, [ox, oy]: Cardinal4) {
  if (oy === -1) {
    return footprint;
  }
  if (ox === 1) {
    return footprint.map(rotateRight);
  }
  if (oy === 1) {
    return footprint.map(rotateAround);
  }
  // Assume ox === -1
  return footprint.map(rotateLeft);
}

type Level = 0 | 1 | 2 | 3 | 4 | 5;
export type BuildingExtraArgs = {
  level?: Level;
  isEssential?: boolean;
  teleportAtStart?: boolean;
  placeRubbleInstead?: boolean;
};

class BuildingTemplate {
  readonly id: string;
  readonly name: string;
  readonly inspectAbbrev: string;
  readonly maxLevel: Level;
  readonly ore: number;
  readonly crystals: number;
  readonly footprint: Footprint;
  readonly dependencies: readonly BuildingTemplate[];
  constructor(
    id: string,
    name: string,
    inspectAbbrev: string,
    maxLevel: Level,
    ore: number,
    crystals: number,
    footprint: Footprint,
    dependencies: readonly BuildingTemplate[],
  ) {
    this.id = id;
    this.name = name;
    this.inspectAbbrev = inspectAbbrev;
    this.maxLevel = maxLevel;
    this.ore = ore;
    this.crystals = crystals;
    this.footprint = footprint;
    this.dependencies = dependencies;
  }
  atTile: (
    args: {
      x: number;
      y: number;
      facing: Cardinal4;
    } & BuildingExtraArgs,
  ) => Building = (args) => ({
    ...atCenterOfTile(args),
    template: this,
    foundation: rotateFootprint(this.footprint, args.facing).map(([x, y]) => [
      x + args.x,
      y + args.y,
    ]),
    level: args.level ?? 1,
    isEssential: args.isEssential ?? false,
    teleportAtStart: args.teleportAtStart ?? false,
    placeRubbleInstead: args.placeRubbleInstead ?? false,
  });
}

export const TOOL_STORE = new BuildingTemplate(
  "BuildingToolStore_C",
  "Tool Store",
  "Ts",
  3,
  0,
  0,
  F_DEFAULT,
  [],
);
export const TELEPORT_PAD = new BuildingTemplate(
  "BuildingTeleportPad_C",
  "Teleport Pad",
  "Tp",
  2,
  8,
  0,
  F_DEFAULT,
  [TOOL_STORE],
);
// The Docks faces the LAND tile with the water BEHIND it.
// Note the water tile is not counted as part of the foundation
export const DOCKS = new BuildingTemplate(
  "BuildingDocks_C",
  "Docks",
  "Dk",
  1,
  8,
  0,
  F_DEFAULT,
  [TOOL_STORE],
);
// The Canteen is functionally symmetrical, but if you care, the end with
// the yellow/black chevron piece is the FRONT.
export const CANTEEN = new BuildingTemplate(
  "BuildingCanteen_C",
  "Canteen",
  "Cn",
  1,
  10,
  1,
  F_CANTEEN_REFINERY,
  [TOOL_STORE],
);
// Power Station origin is the RIGHT side of the building where miners put
// the crystals in.
export const POWER_STATION = new BuildingTemplate(
  "BuildingPowerStation_C",
  "Power Station",
  "Ps",
  2,
  12,
  2,
  F_POWER_STATION,
  [TOOL_STORE, TELEPORT_PAD],
);
export const SUPPORT_STATION = new BuildingTemplate(
  "BuildingSupportStation_C",
  "Support Station",
  "Ss",
  2,
  15,
  3,
  F_DEFAULT,
  [TOOL_STORE, TELEPORT_PAD, POWER_STATION],
);
export const UPGRADE_STATION = new BuildingTemplate(
  "BuildingUpgradeStation_C",
  "Upgrade Station",
  "Us",
  3,
  20,
  3,
  F_DEFAULT,
  [TOOL_STORE, TELEPORT_PAD, POWER_STATION],
);
// Geological Center origin is the BACK of the building.
export const GEOLOGICAL_CENTER = new BuildingTemplate(
  "BuildingGeologicalCenter_C",
  "Geological Center",
  "Gc",
  5,
  20,
  2,
  F_DEFAULT,
  [TOOL_STORE, TELEPORT_PAD, POWER_STATION],
);
// Ore Refinery origin is the FRONT of the building were miners put ore in.
export const ORE_REFINERY = new BuildingTemplate(
  "BuildingOreRefinery_C",
  "Ore Refinery",
  "Or",
  4,
  20,
  3,
  F_CANTEEN_REFINERY,
  [TOOL_STORE, TELEPORT_PAD, POWER_STATION],
);
export const MINING_LASER = new BuildingTemplate(
  "BuildingMiningLaser_C",
  "Mining Laser",
  "Ml",
  1,
  10,
  1,
  F_MINING_LASER,
  [TOOL_STORE, TELEPORT_PAD, POWER_STATION, SUPPORT_STATION],
);
// Super teleport origin is the LEFT side of the building when facing it.
export const SUPER_TELEPORT = new BuildingTemplate(
  "BuildingSuperTeleport_C",
  "Super Teleport",
  "St",
  2,
  20,
  4,
  F_SUPER_TELEPORT,
  [TOOL_STORE, TELEPORT_PAD, POWER_STATION, SUPPORT_STATION],
);

export const ALL_BUILDINGS = [
  TOOL_STORE,
  TELEPORT_PAD,
  CANTEEN,
  POWER_STATION,
  SUPPORT_STATION,
  UPGRADE_STATION,
  GEOLOGICAL_CENTER,
  ORE_REFINERY,
  MINING_LASER,
  SUPER_TELEPORT,
] as const;

export class BuildingDoesNotFitException extends Error {}

export type Building = EntityPosition & {
  readonly template: BuildingTemplate;
  readonly foundation: readonly Point[];
  readonly level: Level;
  readonly isEssential: boolean;
  readonly teleportAtStart: boolean;
  readonly placeRubbleInstead: boolean;
};

const BUILDING_ENTITY_OFFSET = {
  yaw: Math.PI / 2,
} as const satisfies Partial<EntityPosition>;

export function serializeBuilding(
  building: Building,
  tileOffset: Point,
  heightMap: Grid<number>,
) {
  if (building.placeRubbleInstead) {
    throw new Error(
      'Building was marked "placeRubbleInstead" but made it into the level anyway.',
    );
  }
  return [
    building.template.id,
    serializePosition({
      position: building,
      tileOffset,
      heightMap,
      entityOffset: BUILDING_ENTITY_OFFSET,
      floorMethod: "building",
    }),
    building.level > 1 && `Level=${building.level.toFixed()}`,
    building.isEssential && "Essential=True",
    building.teleportAtStart && "Teleport=True",
  ]
    .filter((n) => n)
    .join(",");
}
