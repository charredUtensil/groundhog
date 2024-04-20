import Delaunator from "delaunator";
import { NORTH, Point, plotLine } from "../common/geometry";
import { Architect } from "../models/architect";
import {
  Building,
  GEOLOGICAL_CENTER,
  MINING_LASER,
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  TOOL_STORE,
  UPGRADE_STATION,
} from "../models/building";
import { FluidType, Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { MakeBuildingFn, getBuildings } from "./utils/buildings";
import { Rough, RoughOyster } from "./utils/oyster";
import { position } from "../models/position";
import { getPlaceRechargeSeams } from "./utils/resources";
import { placeLandslides } from "./utils/hazards";
import { Objectives } from "../models/objectives";
import { NegotiatedPlan } from "../transformers/01_planning/00_negotiate";
import { Pearl } from "../transformers/01_planning/04_pearl";
import { DiscoveredCavern } from "../transformers/02_plastic/04_discover";
import { FencedCavern } from "../transformers/02_plastic/07_fence";
import { mkVars, transformPoint } from "./utils/script";
import { getDiscoveryPoint } from "./utils/discovery";

const DESTROY_PATH_CHANCE = 0.62;
const DESTROY_BUILDING_CHANCE = 0.45

const T0_BUILDINGS = [TOOL_STORE] as const;
const T1_BUILDINGS = [TELEPORT_PAD, POWER_STATION, SUPPORT_STATION] as const;
const T2_BUILDINGS = [
  UPGRADE_STATION,
  GEOLOGICAL_CENTER,
  MINING_LASER,
] as const;
const T3_BUILDINGS = [MINING_LASER, MINING_LASER] as const;

type Metadata = {
  crystalsInBuildings: number
}

export type EstablishedHqArchitect = (Architect<Metadata> & {isHq: true, isRuin: boolean})

function getPrime(maxCrystals: number): Architect<Metadata>["prime"] {
  return ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const crystalsInBuildings = rng.betaInt({a: 1, b: 1.75, min: 3, max: maxCrystals});
    return { crystalsInBuildings };
  }
}

function getPlaceBuildings({
  asRuin = false,
  asSpawn = false,
  discovered = false,
  from = 2,
}): Architect<Metadata>["placeBuildings"] {
  return (args) => {
    // Determine the order templates will be applied.
    const rng = args.cavern.dice.placeBuildings(args.plan.id);
    const tq = [
      ...T0_BUILDINGS,
      ...rng.shuffle(T1_BUILDINGS),
      ...rng.shuffle(T2_BUILDINGS),
      ...rng.shuffle(T3_BUILDINGS),
    ];

    // Choose which buildings will be created based on total crystal budget.
    let crystalBudget = args.plan.metadata.crystalsInBuildings
    const bq: MakeBuildingFn[] = [];
    for (const bt of tq) {
      if (crystalBudget < bt.crystals) {
        break;
      }
      bq.push((pos) => bt.atTile(pos));
      crystalBudget -= bt.crystals;
    }

    // Create and place the buildings.
    const buildings = getBuildings({ from, queue: bq }, args);

    // Return buildings that weren't created to the budget.
    if (crystalBudget > 0) {
      for (const fn of bq) {
        const b = fn({x: 0, y: 0, facing: NORTH})
        crystalBudget += b.template.crystals
      }
    }

    // Place the buildings.
    buildings.forEach((b) => {
      // Special case: Do not include the Tool Store unless this is spawn.
      if (!asSpawn && b.template === TOOL_STORE) {
        if (asRuin) {
          b.foundation.forEach(([x, y]) => args.tiles.set(x, y, Tile.LANDSLIDE_RUBBLE_4))
        }
        return
      }
      // Randomly destroy some buildings if this is ruin.
      if (asRuin && b.template !== TOOL_STORE && rng.chance(DESTROY_BUILDING_CHANCE)) {
        b.foundation.forEach(([x, y]) => args.tiles.set(x, y, Tile.LANDSLIDE_RUBBLE_4))
        args.crystals.set(
          ...b.foundation[0],
          (args.crystals.get(...b.foundation[0]) ?? 0) + b.template.crystals,
        )
        return
      }
      // Place the building itself and its foundation tiles.
      b.foundation.forEach(([x, y]) => args.tiles.set(x, y, Tile.FOUNDATION));
      args.buildings.push(b);
    });

    // Place power path trails between the buildings.
    const getPorch: (b: Building) => Point = (b) =>
      b.foundation[b.foundation.length - 1];
    const addPath = (source: Building, dest: Building) => {
      for (const point of plotLine(getPorch(source), getPorch(dest))) {
        if (args.tiles.get(...point) === Tile.FLOOR) {
          args.tiles.set(
            ...point,
            asRuin && rng.chance(DESTROY_PATH_CHANCE)
              ? Tile.LANDSLIDE_RUBBLE_4
              : Tile.POWER_PATH
          );
        }
      }
    }
    if (buildings.length > 2) {
      const points = buildings.flatMap(getPorch);
      const delaunay = new Delaunator(points);
      for (let i = 0; i < delaunay.triangles.length; i++) {
        if (i > delaunay.halfedges[i]) {
          const source = buildings[delaunay.triangles[i]];
          const dest = buildings[delaunay.triangles[i + (i % 3 === 2 ? -2 : 1)]];
          addPath(source, dest)
        }
      }
    } else if (buildings.length > 1) {
      addPath(buildings[0], buildings[1])
    }

    // Place more rubble if this is ruin.
    if (asRuin) {
      args.plan.innerPearl.forEach(layer => layer.forEach(point => {
        if (args.tiles.get(...point) === Tile.FLOOR) {
          args.tiles.set(...point, rng.betaChoice([
            Tile.FLOOR,
            Tile.LANDSLIDE_RUBBLE_1,
            Tile.LANDSLIDE_RUBBLE_2,
            Tile.LANDSLIDE_RUBBLE_3,
            Tile.LANDSLIDE_RUBBLE_4,
          ], {a: 1, b: 4}))
        }
      }))
    }

    // Place open cave flag if this is discovered.
    if (discovered) {
      args.openCaveFlags.set(...buildings[0].foundation[0], true)
    }

    // Set initial camera if this is spawn.
    if (asSpawn) {
      const [xt, yt] = buildings.reduce(
        ([x, y], b) => [x + b.x, y + b.y],
        [0, 0],
      );
      args.setCameraPosition(
        position({
          x: buildings[0].x,
          y: buildings[0].y,
          aimedAt: [xt / buildings.length, yt / buildings.length],
          pitch: Math.PI / 4,
        }),
      );
    }

    // Some crystals remain that were not used.
    if (crystalBudget > 0) {
      // TODO: ?????
    }
  };
}

const g = mkVars('gFoundHq', [
  'foundHq',
])

const WITH_FIND_OBJECTIVE: Pick<Architect<Metadata>, 'objectives' | 'scriptGlobals' | 'script'> = {
  objectives: () => ({
    variables: [{ condition: `${g.foundHq}>0`, description: 'Find the lost Rock Raider HQ' }],
    sufficient: false,
  }),
  scriptGlobals: () => `# Objective: Find HQ
int ${g.foundHq}=0`,
  script: ({cavern, plan}) => {
    const discoPoint = getDiscoveryPoint(cavern, plan)
    if (!discoPoint) {
      throw new Error('Cave has Find HQ objective but no undiscovered points.');
    }

    const camPoint = plan.path.baseplates.reduce((r, p) => {
      return (r.pearlRadius > p.pearlRadius) ? r : p
    }).center;

    const v = mkVars(`p${plan.id}FoundHq`, [
      "messageDiscover",
      "onDiscover",
    ]);
    
    return `# Objective: Find the lost Rock Raider HQ
string ${v.messageDiscover}="${cavern.lore.generateFoundHq(cavern.dice)}"
if(change:${transformPoint(cavern, discoPoint)})[${v.onDiscover}]
${v.onDiscover}::;
msg:${v.messageDiscover};
pan:${transformPoint(cavern, camPoint)};
wait:1;
${g.foundHq}=1;
`
  }
}

const BASE: Omit<PartialArchitect<Metadata>, "prime"> &
  Pick<Architect<Metadata>, "rough" | "roughExtent"> &
  {isHq: true} = {
  ...DefaultCaveArchitect,
  ...new RoughOyster(
    { of: Rough.ALWAYS_FLOOR, grow: 2 },
    { of: Rough.FLOOR, grow: 2 },
    { of: Rough.DIRT, width: 0, grow: 0.5 },
    { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 0.25 },
    { of: Rough.HARD_ROCK, grow: 0.25 },
  ),
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter + plan.metadata.crystalsInBuildings,
  placeRechargeSeam: getPlaceRechargeSeams(1),
  isHq: true,
};

export const ESTABLISHED_HQ: readonly EstablishedHqArchitect[] = [
  {
    name: "Established HQ Spawn",
    ...BASE,
    prime: getPrime(10),
    placeBuildings: getPlaceBuildings({asSpawn: true, discovered: true}),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.5,
    isRuin: false,
  },
  {
    name: "Ruined HQ Spawn",
    ...BASE,
    prime: getPrime(12),
    placeBuildings: getPlaceBuildings({asRuin: true, asSpawn: true, discovered: true, from: 3}),
    placeLandslides: (args) => placeLandslides({min: 15, max: 60}, args),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.5,
    isRuin: true,
  },
  {
    name: "Find Established HQ",
    ...BASE,
    prime: getPrime(15),
    placeBuildings: getPlaceBuildings({}),
    caveBid: ({ plan, hops, plans }) => (
      !plan.fluid &&
      plan.pearlRadius > 5 &&
      hops <= 4 &&
      !plans.some(p => 'architect' in p && 'isHq' in p.architect) &&
      0.5
    ),
    isRuin: false,
    ...WITH_FIND_OBJECTIVE,
  },
  {
    name: "Find Ruined HQ",
    ...BASE,
    prime: getPrime(15),
    placeBuildings: getPlaceBuildings({asRuin: true, from: 3}),
    placeLandslides: (args) => placeLandslides({min: 15, max: 100}, args),
    caveBid: ({ plan, hops, plans }) => (
      !plan.fluid &&
      plan.pearlRadius > 6 &&
      hops <= 4 &&
      !plans.some(p => 'architect' in p && 'isHq' in p.architect) &&
      0.5
    ),
    isRuin: true,
    ...WITH_FIND_OBJECTIVE,
  },
];