import Delaunator from "delaunator";
import { Point, plotLine } from "../common/geometry";
import { Architect } from "../models/architect";
import {
  Building,
  CANTEEN,
  DOCKS,
  GEOLOGICAL_CENTER,
  MINING_LASER,
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  TOOL_STORE,
  UPGRADE_STATION,
} from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { MakeBuildingFn, getBuildings } from "./utils/buildings";
import { mkRough, Rough } from "./utils/rough";
import { position } from "../models/position";
import { getPlaceRechargeSeams, sprinkleCrystals } from "./utils/resources";
import { placeLandslides } from "./utils/hazards";
import {
  escapeString,
  eventChain,
  mkVars,
  scriptFragment,
  transformPoint,
} from "./utils/script";
import { getDiscoveryPoint } from "./utils/discovery";

const DESTROY_PATH_CHANCE = 0.62;

const T0_BUILDINGS = [TOOL_STORE] as const;
const T1_BUILDINGS = [TELEPORT_PAD, POWER_STATION, SUPPORT_STATION] as const;
const T2_BUILDINGS = [UPGRADE_STATION, GEOLOGICAL_CENTER, DOCKS] as const;
const T3_BUILDINGS = [
  CANTEEN,
  MINING_LASER,
  MINING_LASER,
  MINING_LASER,
] as const;

const OMIT_T1 = T0_BUILDINGS.length;
const MAX_HOPS = 3;

export type HqMetadata = {
  readonly tag: "hq";
  readonly ruin: boolean;
  readonly crystalsInBuildings: number;
};

function getPrime(
  maxCrystals: number,
  ruin: boolean,
): Architect<HqMetadata>["prime"] {
  return ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const crystalsInBuildings = rng.betaInt({
      a: 1,
      b: 1.75,
      min: 3,
      max: maxCrystals,
    });
    return { crystalsInBuildings, ruin, tag: "hq" };
  };
}

function getPlaceBuildings({
  discovered = false,
  from = 2,
}): Architect<HqMetadata>["placeBuildings"] {
  return (args) => {
    const asRuin = args.plan.metadata.ruin;
    const asSpawn = !args.plan.hops.length;

    // Determine the order templates will be applied.
    const rng = args.cavern.dice.placeBuildings(args.plan.id);
    const tq = [
      ...T0_BUILDINGS,
      ...(asSpawn && !asRuin ? T1_BUILDINGS : rng.shuffle(T1_BUILDINGS)),
      ...rng.shuffle(T2_BUILDINGS),
      ...rng.shuffle(T3_BUILDINGS),
    ];

    // Choose which buildings will be created based on total crystal budget.
    let crystalBudget = args.plan.metadata.crystalsInBuildings;
    const bq: MakeBuildingFn[] = [];
    tq.some((bt, i) => {
      const include = (() => {
        if (bt === TOOL_STORE) {
          return true;
        }
        if (crystalBudget < bt.crystals) {
          return false;
        }
        if (
          bt === DOCKS &&
          !args.plan.intersects.some(
            (_, i) => args.cavern.plans[i].fluid === Tile.WATER,
          )
        ) {
          return false;
        }
        if (asRuin && i === OMIT_T1) {
          return false;
        }
        return true;
      })();
      if (include) {
        bq.push((pos) => bt.atTile(pos));
        crystalBudget -= bt.crystals;
        if (crystalBudget <= 0) {
          return true;
        }
      } else if (asRuin) {
        bq.push((pos) => ({ ...bt.atTile(pos), isRuinAtSpawn: true }));
      }
      return false;
    });

    // Fit the buildings.
    const buildings = getBuildings({ from, queue: bq }, args);

    const dependencies = new Set(
      buildings.flatMap((b) => b.template.dependencies),
    );

    // Place the buildings.
    for (let i = 0; i < buildings.length; i++) {
      const building = buildings[i];
      let fTile: Tile;
      if ("isRuinAtSpawn" in building) {
        fTile = Tile.RUBBLE_4;
      } else {
        fTile = Tile.FOUNDATION;
        if (dependencies.has(building.template)) {
          args.buildings.push({ ...building, level: 2 });
        } else {
          args.buildings.push(building);
        }
      }
      building.foundation.forEach(([x, y]) => args.tiles.set(x, y, fTile));
    }

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
              : Tile.POWER_PATH,
          );
        }
      }
    };
    if (buildings.length > 2) {
      const points = buildings.flatMap(getPorch);
      const delaunay = new Delaunator(points);
      for (let i = 0; i < delaunay.triangles.length; i++) {
        if (i > delaunay.halfedges[i]) {
          const source = buildings[delaunay.triangles[i]];
          const dest =
            buildings[delaunay.triangles[i + (i % 3 === 2 ? -2 : 1)]];
          addPath(source, dest);
        }
      }
    } else if (buildings.length > 1) {
      addPath(buildings[0], buildings[1]);
    }

    // Place more rubble if this is ruin.
    if (asRuin) {
      args.plan.innerPearl.forEach((layer) =>
        layer.forEach((point) => {
          if (args.tiles.get(...point) === Tile.FLOOR) {
            args.tiles.set(
              ...point,
              rng.betaChoice(
                [
                  Tile.FLOOR,
                  Tile.LANDSLIDE_RUBBLE_1,
                  Tile.LANDSLIDE_RUBBLE_2,
                  Tile.LANDSLIDE_RUBBLE_3,
                  Tile.LANDSLIDE_RUBBLE_4,
                ],
                { a: 1, b: 4 },
              ),
            );
          }
        }),
      );
    }

    // Place open cave flag if this is discovered.
    if (discovered) {
      args.openCaveFlags.set(...buildings[0].foundation[0], true);
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
      sprinkleCrystals(args, { count: crystalBudget, seamBias: 0 });
    }
  };
}

export const gLostHq = mkVars("gLostHq", ["foundHq"]);

const WITH_FIND_OBJECTIVE: Pick<
  Architect<HqMetadata>,
  "objectives" | "scriptGlobals" | "script"
> = {
  objectives: () => ({
    variables: [
      {
        condition: `${gLostHq.foundHq}>0`,
        description: "Find the lost Rock Raider HQ",
      },
    ],
    sufficient: false,
  }),
  scriptGlobals: () =>
    scriptFragment("# Globals: Lost HQ", `int ${gLostHq.foundHq}=0`),
  script({ cavern, plan }) {
    const discoPoint = getDiscoveryPoint(cavern, plan);
    if (!discoPoint) {
      throw new Error("Cave has Find HQ objective but no undiscovered points.");
    }

    const camPoint = plan.path.baseplates.reduce((r, p) => {
      return r.pearlRadius > p.pearlRadius ? r : p;
    }).center;

    const v = mkVars(`p${plan.id}LostHq`, ["messageDiscover", "onDiscover"]);
    const message = cavern.lore.foundHq(cavern.dice).text;

    return scriptFragment(
      `# P${plan.id}: Lost HQ`,
      `string ${v.messageDiscover}="${escapeString(message)}"`,
      `if(change:${transformPoint(cavern, discoPoint)})[${v.onDiscover}]`,
      eventChain(
        v.onDiscover,
        `msg:${v.messageDiscover};`,
        `pan:${transformPoint(cavern, camPoint)};`,
        `wait:1;`,
        `${gLostHq.foundHq}=1;`,
      ),
    );
  },
};

const BASE: Omit<PartialArchitect<HqMetadata>, "prime"> &
  Pick<Architect<HqMetadata>, "rough" | "roughExtent"> = {
  ...DefaultCaveArchitect,
  ...mkRough(
    { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
    { of: Rough.FLOOR, width: 0, grow: 2 },
    { of: Rough.DIRT, width: 0, grow: 0.5 },
    { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 0.25 },
    { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.25 },
  ),
  crystalsFromMetadata: (metadata) => metadata.crystalsInBuildings,
  placeRechargeSeam: getPlaceRechargeSeams(1),
  maxSlope: 15,
};

export const ESTABLISHED_HQ = [
  {
    name: "Established HQ Spawn",
    ...BASE,
    prime: getPrime(10, false),
    placeBuildings: getPlaceBuildings({ discovered: true }),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.5,
  },
  {
    name: "Ruined HQ Spawn",
    ...BASE,
    prime: getPrime(12, true),
    placeBuildings: getPlaceBuildings({
      discovered: true,
      from: 3,
    }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 60 }, args),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.5,
  },
  {
    name: "Find Established HQ",
    ...BASE,
    prime: getPrime(15, false),
    placeBuildings: getPlaceBuildings({}),
    caveBid: ({ plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 5 &&
      hops.length <= MAX_HOPS &&
      !hops.some((id) => plans[id].fluid) &&
      !plans.some((p) => p.metadata?.tag === "hq") &&
      0.5,
    ...WITH_FIND_OBJECTIVE,
  },
  {
    name: "Find Ruined HQ",
    ...BASE,
    prime: getPrime(15, true),
    placeBuildings: getPlaceBuildings({ from: 3 }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 100 }, args),
    caveBid: ({ plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 6 &&
      hops.length <= MAX_HOPS &&
      !plans.some((p) => p.metadata?.tag === "hq") &&
      (plans[hops[0]].metadata?.tag === "nomads" ? 5 : 0.5),
    ...WITH_FIND_OBJECTIVE,
  },
] as const satisfies readonly Architect<HqMetadata>[];

export default ESTABLISHED_HQ;
