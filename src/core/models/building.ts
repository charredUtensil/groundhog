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
};

class BuildingTemplate {
  readonly id: string;
  readonly inspectAbbrev: string;
  readonly maxLevel: number;
  readonly crystals: number;
  readonly footprint: Footprint;
constructor(
    id: string,
    inspectAbbrev: string,
    maxLevel: Level,
    crystals: number,
    footprint: Footprint,
  ) {
    this.id = id;
    this.inspectAbbrev = inspectAbbrev;
    this.maxLevel = maxLevel;
    this.crystals = crystals;
    this.footprint = footprint;
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
  });
}

export const TOOL_STORE = new BuildingTemplate(
  "BuildingToolStore_C",
  "Ts",
  3,
  0,
  F_DEFAULT,
);
export const TELEPORT_PAD = new BuildingTemplate(
  "BuildingTeleportPad_C",
  "Tp",
  2,
  0,
  F_DEFAULT,
);
// The Docks faces the LAND tile with the water BEHIND it.
// Note the water tile is not counted as part of the foundation
export const DOCKS = new BuildingTemplate(
  "BuildingDocks_C",
  "Dk",
  1,
  1,
  F_DEFAULT,
);
// The Canteen is functionally symmetrical, but if you care, the end with
// the yellow/black chevron piece is the FRONT.
export const CANTEEN = new BuildingTemplate(
  "BuildingCanteen_C",
  "Cn",
  1,
  1,
  F_CANTEEN_REFINERY,
);
// Power Station origin is the RIGHT side of the building where miners put
// the crystals in.
export const POWER_STATION = new BuildingTemplate(
  "BuildingPowerStation_C",
  "Ps",
  2,
  2,
  F_POWER_STATION,
);
export const SUPPORT_STATION = new BuildingTemplate(
  "BuildingSupportStation_C",
  "Ss",
  2,
  3,
  F_DEFAULT,
);
export const UPGRADE_STATION = new BuildingTemplate(
  "BuildingUpgradeStation_C",
  "Us",
  3,
  3,
  F_DEFAULT,
);
// Geological Center origin is the BACK of the building.
export const GEOLOGICAL_CENTER = new BuildingTemplate(
  "BuildingGeologicalCenter_C",
  "Gc",
  5,
  2,
  F_DEFAULT,
);
// Ore Refinery origin is the FRONT of the building were miners put ore in.
export const ORE_REFINERY = new BuildingTemplate(
  "BuildingOreRefinery_C",
  "Or",
  4,
  3,
  F_CANTEEN_REFINERY,
);
export const MINING_LASER = new BuildingTemplate(
  "BuildingMiningLaser_C",
  "Ml",
  1,
  1,
  F_MINING_LASER,
);
// Super teleport origin is the LEFT side of the building when facing it.
export const SUPER_TELEPORT = new BuildingTemplate(
  "BuildingSuperTeleport_C",
  "St",
  2,
  4,
  F_SUPER_TELEPORT,
);

export class BuildingDoesNotFitException extends Error {}

export type Building = EntityPosition & {
  readonly template: BuildingTemplate;
  readonly foundation: readonly Point[];
  readonly level: Level;
  readonly isEssential: boolean;
  readonly teleportAtStart: boolean;
};

export function serializeBuilding(
  building: Building,
  offset: Point,
  heightMap: Grid<number>,
) {
  const pos = serializePosition(
    building,
    offset,
    heightMap,
    Math.PI / 2,
    "building",
  );
  let r = `${building.template.id},${pos}`;
  if (building.level > 1) {
    r += `,Level=${building.level.toFixed()}`;
  }
  if (building.isEssential) {
    r += ",Essential=True";
  }
  if (building.teleportAtStart) {
    r += ",Teleport=True";
  }
  return r;
}
