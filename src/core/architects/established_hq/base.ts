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
import { MakeBuildingInfo, getBuildings } from "../utils/buildings";
import { getPlaceRechargeSeams, sprinkleCrystals } from "../utils/resources";
import { PseudorandomStream } from "../../common";
import { PartialArchitect, DefaultCaveArchitect } from "../default";
import {
  monsterSpawnScript,
  slugSpawnScript,
} from "../utils/creature_spawners";
import { sprinkleSlugHoles } from "../utils/creatures";
import { mkRough, Rough } from "../utils/rough";

export type HqMetadata = {
  readonly tag: "hq";
  readonly ruin: boolean;
  readonly crystalsInBuildings: number;
  readonly special: null | "fixedComplete" | "gasLeak";
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
    return { crystalsInBuildings, ruin, special: null, tag: "hq" };
  };
}

const T0_BUILDINGS = [{ bt: TOOL_STORE }] as const;
const T1_BUILDINGS = [
  { bt: TELEPORT_PAD },
  { bt: POWER_STATION },
  { bt: SUPPORT_STATION },
] as const;
const T2_BUILDINGS = [
  { bt: UPGRADE_STATION },
  { bt: GEOLOGICAL_CENTER },
  { bt: DOCKS },
] as const;
const T3_BUILDINGS = [
  { bt: CANTEEN },
  { bt: MINING_LASER },
  { bt: MINING_LASER },
  { bt: MINING_LASER },
] as const;

function getDefaultTemplates(
  rng: PseudorandomStream,
  asSpawn: boolean,
  asRuin: boolean,
): MakeBuildingInfo[] {
  function t1() {
    if (asSpawn && !asRuin) {
      return T1_BUILDINGS;
    }
    const r: MakeBuildingInfo[] = rng.shuffle(T1_BUILDINGS);
    if (asRuin) {
      r[0] = { ...r[0], args: { ...r[0].args, placeRubbleInstead: true } };
    }
    return r;
  }
  return [
    ...T0_BUILDINGS,
    ...t1(),
    ...rng.shuffle(T2_BUILDINGS),
    ...rng.shuffle(T3_BUILDINGS),
  ];
}

// Here be spaghetti
export function getPlaceBuildings({
  discovered = false,
  from = 2,
  templates,
}: {
  crashOnFail?: boolean;
  discovered?: boolean;
  from?: number;
  templates?: (rng: PseudorandomStream) => readonly MakeBuildingInfo[];
}): Architect<HqMetadata>["placeBuildings"] {
  return (args) => {
    const asRuin = args.plan.metadata.ruin;
    const asSpawn = !args.plan.hops.length;

    // Determine the order templates will be applied.
    const rng = args.cavern.dice.placeBuildings(args.plan.id);
    const potentialTemplates = templates
      ? templates(rng)
      : getDefaultTemplates(rng, asSpawn, asRuin);

    // Choose which buildings will be created based on total crystal budget.
    let crystalBudget = args.plan.metadata.crystalsInBuildings;
    const buildingsQueue: MakeBuildingInfo[] = [];
    for (const it of potentialTemplates) {
      if (it.args?.placeRubbleInstead) {
        buildingsQueue.push(it);
        continue;
      }
      if (it.bt.crystals > 0 && crystalBudget <= 0) {
        break;
      }
      const include = (() => {
        if (it.bt === TOOL_STORE) {
          return true;
        }
        if (crystalBudget < it.bt.crystals) {
          return false;
        }
        if (
          it.bt === DOCKS &&
          !args.plan.intersects.some(
            (_, i) => args.cavern.plans[i].fluid === Tile.WATER,
          )
        ) {
          return false;
        }
        return true;
      })();
      if (include) {
        buildingsQueue.push(it);
        crystalBudget -= it.bt.crystals;
      } else if (asRuin) {
        buildingsQueue.push({
          ...it,
          args: { ...it.args, placeRubbleInstead: true },
        });
      }
    }

    // Fit the buildings and place their foundations.
    const buildings = getBuildings({ from, queue: buildingsQueue }, args);
    buildings.forEach((b) =>
      b.foundation.forEach((pos) =>
        args.tiles.set(
          ...pos,
          b.placeRubbleInstead ? Tile.RUBBLE_1 : Tile.FOUNDATION,
        ),
      ),
    );

    // Level up all buildings that are a dependency of another building.
    const dependencies = new Set(
      buildings.flatMap((b) => b.template.dependencies),
    );
    for (let i = 0; i < buildings.length; i++) {
      const b = buildings[i];
      if (dependencies.has(b.template)) {
        buildings[i] = { ...b, level: 2 };
      }
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
              ? Tile.WASTE_RUBBLE_4
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
                  Tile.WASTE_RUBBLE_1,
                  Tile.WASTE_RUBBLE_2,
                  Tile.WASTE_RUBBLE_3,
                  Tile.WASTE_RUBBLE_4,
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
      args.openCaveFlags.set(
        ...buildings.find((b) => !b.placeRubbleInstead)!.foundation[0],
        true,
      );
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
      buildings: buildings.filter((b) => !b.placeRubbleInstead),
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
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      initialCooldown: { min: 120, max: 240 },
      needCrystals: { base: 4 },
      needStableAir: true,
    }),
  slugSpawnScript(args) {
    return slugSpawnScript(args, {
      needCrystals: { base: 5, increment: 10 },
      waveSize: 2,
    });
  },
  maxSlope: 15,
};
