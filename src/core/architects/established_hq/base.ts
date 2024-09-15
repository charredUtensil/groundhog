import Delaunator from "delaunator";
import { Point, plotLine } from "../../common/geometry";
import { Architect } from "../../models/architect";
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
} from "../../models/building";
import { position } from "../../models/position";
import { Tile } from "../../models/tiles";
import { MakeBuildingFn, getBuildings } from "../utils/buildings";
import { getPlaceRechargeSeams, sprinkleCrystals } from "../utils/resources";
import { PseudorandomStream } from "../../common";
import { PartialArchitect, DefaultCaveArchitect } from "../default";
import { slugSpawnScript } from "../utils/creature_spawners";
import { sprinkleSlugHoles } from "../utils/creatures";
import { mkRough, Rough } from "../utils/rough";

export type HqMetadata = {
  readonly tag: "hq";
  readonly ruin: boolean;
  readonly fixedComplete: boolean;
  readonly crystalsInBuildings: number;
};

const DESTROY_PATH_CHANCE = 0.62;

export function getPrime(
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
    return { crystalsInBuildings, ruin, fixedComplete: false, tag: "hq" };
  };
}

const T0_BUILDINGS = [TOOL_STORE] as const;
const T1_BUILDINGS = [TELEPORT_PAD, POWER_STATION, SUPPORT_STATION] as const;
const T2_BUILDINGS = [UPGRADE_STATION, GEOLOGICAL_CENTER, DOCKS] as const;
const T3_BUILDINGS = [
  CANTEEN,
  MINING_LASER,
  MINING_LASER,
  MINING_LASER,
] as const;

function getDefaultTemplates(
  rng: PseudorandomStream,
  asSpawn: boolean,
  asRuin: boolean,
) {
  return [
    ...T0_BUILDINGS,
    ...(asSpawn && !asRuin ? T1_BUILDINGS : rng.shuffle(T1_BUILDINGS)),
    ...rng.shuffle(T2_BUILDINGS),
    ...rng.shuffle(T3_BUILDINGS),
  ];
}

// Here be spaghetti
export function getPlaceBuildings({
  discovered = false,
  from = 2,
  templates,
  omit,
}: {
  discovered?: boolean;
  from?: number;
  templates?: (rng: PseudorandomStream) => readonly Building["template"][];
  omit?: (bt: Building["template"], i: number) => boolean;
}): Architect<HqMetadata>["placeBuildings"] {
  return (args) => {
    const asRuin = args.plan.metadata.ruin;
    const asSpawn = !args.plan.hops.length;

    // Determine the order templates will be applied.
    const rng = args.cavern.dice.placeBuildings(args.plan.id);
    const tq = templates
      ? templates(rng)
      : getDefaultTemplates(rng, asSpawn, asRuin);

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
        if (
          omit ? omit(bt, i) : !templates && asRuin && i === T0_BUILDINGS.length
        ) {
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
        bq.push((pos) => ({ ...bt.atTile(pos), placeRubbleInstead: true }));
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
      if ("placeRubbleInstead" in building) {
        fTile = Tile.RUBBLE_4;
      } else {
        fTile = Tile.FOUNDATION;
        if (dependencies.has(building.template)) {
          buildings[i] = { ...building, level: 2 };
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
    const cameraPosition = asSpawn
      ? (() => {
          const [xt, yt] = buildings.reduce(
            ([x, y], b) => [x + b.x, y + b.y],
            [0, 0],
          );
          return position({
            x: buildings[0].x,
            y: buildings[0].y,
            aimedAt: [xt / buildings.length, yt / buildings.length],
            pitch: Math.PI / 4,
          });
        })()
      : undefined;

    // Some crystals remain that were not used.
    if (crystalBudget > 0) {
      sprinkleCrystals(args, { count: crystalBudget, seamBias: 0 });
    }

    return {
      buildings: buildings.filter((b) => !("placeRubbleInstead" in b)),
      cameraPosition,
    };
  };
}

export const BASE: Omit<PartialArchitect<HqMetadata>, "prime"> &
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
  placeSlugHoles(args) {
    if (!args.cavern.context.hasSlugs) {
      return;
    }
    sprinkleSlugHoles(args, { count: 2 });
  },
  slugSpawnScript(args) {
    return slugSpawnScript(args, {
      needCrystals: { base: 5, increment: 10 },
      waveSize: 2,
    });
  },
  maxSlope: 15,
};
