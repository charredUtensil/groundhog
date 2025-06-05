import { Cardinal4, NSEW, Point } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import { Architect } from "../../models/architect";
import {
  Building,
  BuildingExtraArgs,
  CANTEEN,
  DOCKS,
  ORE_REFINERY,
  POWER_STATION,
  SUPER_TELEPORT,
} from "../../models/building";
import { Tile } from "../../models/tiles";

export type MakeBuildingInfo = {
  readonly bt: Building["template"];
  readonly args?: BuildingExtraArgs;
  readonly required?: boolean;
};

function buildingPriority(it: MakeBuildingInfo) {
  if (it.args?.placeRubbleInstead) {
    return 3;
  }
  switch (it.bt) {
    case DOCKS:
      return 0;
    case POWER_STATION:
    case SUPER_TELEPORT:
      return 1;
    case ORE_REFINERY:
    case CANTEEN:
      return 2;
    default:
      return 3;
  }
}

/**
 * Returns an array of Building objects positioned within the given Plan
 * according to the given rules.
 *
 * Buildings are placed between the given from and to layers of the Plan's
 * innerPearl. The queue is an array of functions that return a building at
 * that point and facing direction. This function will check whether that
 * building fits in that space and does not overlap any other buildings.
 * If it does, that building will be added to the return value.
 *
 * This function will not add buildings to the cavern or place any foundation
 * tiles, so it is the caller's responsibility to do that.
 */
export function getBuildings(
  {
    from,
    to,
    queue,
  }: {
    from?: number;
    to?: number;
    queue: readonly MakeBuildingInfo[];
  },
  { cavern, plan, tiles }: Parameters<Architect<any>["placeBuildings"]>[0],
) {
  const placed = new MutableGrid<true>();
  const rng = cavern.dice.placeBuildings(plan.id);
  const result: Building[] = [];

  const points: {
    x: number;
    y: number;
    facing: Cardinal4;
  }[] = [];
  for (let ly = from ?? 1; ly < (to ?? plan.innerPearl.length); ly++) {
    for (const [x, y] of rng.shuffle(plan.innerPearl[ly])) {
      for (const facing of NSEW) {
        const [ox, oy] = facing;
        if (cavern.pearlInnerDex.get(x + ox, y + oy)?.[plan.id] === ly - 1) {
          points.push({ x, y, facing });
        }
      }
    }
  }

  const queues: MakeBuildingInfo[][] = [[], [], [], []];
  queue.forEach((it) => {
    queues[buildingPriority(it)].push(it);
  });

  const taken = (pos: Point) =>
    placed.get(...pos) || tiles.get(...pos) !== Tile.FLOOR;

  // For each building priority class
  for (const q of queues) {
    // For each potential placement point
    for (const { x, y, facing } of points) {
      if (q.length === 0) {
        break;
      }

      if (taken([x, y])) {
        continue;
      }

      const [ox, oy] = facing;

      // For each building that can be built
      for (let i = 0; i < q.length; i++) {
        const { bt, args } = q[i];

        // Continue if this is a docks not on water
        if (bt === DOCKS && tiles.get(x - ox, y - oy) !== Tile.WATER) {
          continue;
        }

        // Make the building
        const b = bt.atTile({ x, y, facing, ...args });

        // Continue if the foundation overlaps any used or non floor tile
        if (b.foundation.some(taken)) {
          continue;
        }

        // Keep this building
        result.push(b);
        b.foundation.forEach(([x, y]) => placed.set(x, y, true));
        q.splice(i, 1);
        break;
      }
    }
    q.forEach((it) => {
      if (it.required) {
        console.error("Failed to place required building: %o", it);
        throw new Error(`Failed to place ${it.bt.name}, which is required.`);
      } else {
        console.warn("Failed to place optional building: %o", it);
      }
    });
  }
  return result;
}
