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
import { Rough, RoughOyster } from "./utils/oyster";
import { position } from "../models/position";
import { getPlaceRechargeSeams, sprinkleCrystals } from "./utils/resources";
import { placeLandslides } from "./utils/hazards";
import { escapeString, eventChain, mkVars, scriptFragment, transformPoint } from "./utils/script";
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

type Metadata = {
  crystalsInBuildings: number;
};

function getPrime(maxCrystals: number): Architect<Metadata>["prime"] {
  return ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const crystalsInBuildings = rng.betaInt({
      a: 1,
      b: 1.75,
      min: 3,
      max: maxCrystals,
    });
    return { crystalsInBuildings };
  };
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
        bq.push((pos) => {
          const b = bt.atTile(pos);
          (b as any).destroyed_now = true;
          return b;
        });
      }
      return false;
    });

    // Create and place the buildings.
    const buildings = getBuildings({ from, queue: bq }, args);

    // Place the buildings.
    buildings.forEach((b) => {
      if ("destroyed_now" in b) {
        b.foundation.forEach(([x, y]) => args.tiles.set(x, y, Tile.RUBBLE_4));
      } else {
        b.foundation.forEach(([x, y]) => args.tiles.set(x, y, Tile.FOUNDATION));
        args.buildings.push(b);
      }
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
      sprinkleCrystals(args, {count: crystalBudget, seamBias: 0});
    }
  };
}

export const gFoundHq = mkVars("gFoundHq", ["foundHq"]);

const WITH_FIND_OBJECTIVE: Pick<
  Architect<Metadata>,
  "objectives" | "scriptGlobals" | "script"
> = {
  objectives: () => ({
    variables: [
      {
        condition: `${gFoundHq.foundHq}>0`,
        description: "Find the lost Rock Raider HQ",
      },
    ],
    sufficient: false,
  }),
  scriptGlobals: () => `# Objective: Find HQ
int ${gFoundHq.foundHq}=0`,
  script: ({ cavern, plan }) => {
    const discoPoint = getDiscoveryPoint(cavern, plan);
    if (!discoPoint) {
      throw new Error("Cave has Find HQ objective but no undiscovered points.");
    }

    const camPoint = plan.path.baseplates.reduce((r, p) => {
      return r.pearlRadius > p.pearlRadius ? r : p;
    }).center;

    const v = mkVars(`p${plan.id}FoundHq`, ["messageDiscover", "onDiscover"]);
    const message = cavern.lore.generateFoundHq(cavern.dice).text;

    return scriptFragment(
      `# Objective: Find the lost Rock Raider HQ`,
      `string ${v.messageDiscover}="${escapeString(message)}"`,
      `if(change:${transformPoint(cavern, discoPoint)})[${v.onDiscover}]`,
      eventChain(
        v.onDiscover,
        `msg:${v.messageDiscover};`,
        `pan:${transformPoint(cavern, camPoint)};`,
        `wait:1;`,
        `${gFoundHq.foundHq}=1;`,
      ),
    );
  },
};

const BASE: Omit<PartialArchitect<Metadata>, "prime"> &
  Pick<Architect<Metadata>, "rough" | "roughExtent"> = {
  ...DefaultCaveArchitect,
  ...new RoughOyster(
    { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
    { of: Rough.FLOOR, width: 0, grow: 2 },
    { of: Rough.DIRT, width: 0, grow: 0.5 },
    { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 0.25 },
    { of: Rough.HARD_ROCK, grow: 0.25 },
  ),
  crystalsFromMetadata: (metadata) => metadata.crystalsInBuildings,
  placeRechargeSeam: getPlaceRechargeSeams(1),
  maxSlope: 15,
  isHq: true,
};

export const ESTABLISHED_HQ: readonly Architect<Metadata>[] = [
  {
    name: "Established HQ Spawn",
    ...BASE,
    prime: getPrime(10),
    placeBuildings: getPlaceBuildings({ asSpawn: true, discovered: true }),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 0.5,
    isRuin: false,
  },
  {
    name: "Ruined HQ Spawn",
    ...BASE,
    prime: getPrime(12),
    placeBuildings: getPlaceBuildings({
      asRuin: true,
      asSpawn: true,
      discovered: true,
      from: 3,
    }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 60 }, args),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 6 && 0.5,
    isRuin: true,
  },
  {
    name: "Find Established HQ",
    ...BASE,
    prime: getPrime(15),
    placeBuildings: getPlaceBuildings({}),
    caveBid: ({ plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 5 &&
      hops.length <= MAX_HOPS &&
      !hops.some(id => plans[id].fluid) &&
      !plans.some((p) => p.architect?.isHq) &&
      0.5,
    isRuin: false,
    ...WITH_FIND_OBJECTIVE,
  },
  {
    name: "Find Ruined HQ",
    ...BASE,
    prime: getPrime(15),
    placeBuildings: getPlaceBuildings({ asRuin: true, from: 3 }),
    placeLandslides: (args) => placeLandslides({ min: 15, max: 100 }, args),
    caveBid: ({ plan, hops, plans }) =>
      !plan.fluid &&
      plan.pearlRadius > 6 &&
      hops.length <= MAX_HOPS &&
      !plans.some((p) => p.architect?.isHq) &&
      (plans[hops[0]].architect!.isNomads ? 5 : 0.5),
    isRuin: true,
    ...WITH_FIND_OBJECTIVE,
  },
];
