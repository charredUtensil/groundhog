import { NSEW } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Building, BuildingExtraArgs, CANTEEN, DOCKS, ORE_REFINERY, POWER_STATION, SUPER_TELEPORT } from "../../models/building";
import { Tile } from "../../models/tiles";

export type MakeBuildingInfo = {
  readonly bt: Building["template"],
  readonly args?: BuildingExtraArgs,
  readonly required?: boolean,
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

  const queues: MakeBuildingInfo[][] = [[],[],[],[]];
  queue.forEach(it => {
    queues[buildingPriority(it)].push(it);
  })

  // For each building priority class
  for (const q of queues) {
    if (q.length === 0) {
      continue;
    }
    // For each layer of the pearl
    done: for (let ly = from ?? 1; ly < (to ?? plan.innerPearl.length); ly++) {
      // For each point in the layer
      for (const [x, y] of rng.shuffle(plan.innerPearl[ly].slice())) {
        // For each building that can be built
        point: for (let i = 0; i < q.length; i++) {
          const { bt, args } = q[i];
          // For each possible orientation
          for (const facing of NSEW) {
            const [ox, oy] = facing;
            // Continue if this is a docks not on water
            if (
              bt === DOCKS &&
              tiles.get(x - ox, y - oy) !== Tile.WATER
            ) {
              continue;
            }
            // Continue if this is an unacceptable porch location
            if (cavern.pearlInnerDex.get(x + ox, y + oy)?.[plan.id] !== ly - 1) {
              continue;
            }
            // Make the building
            const b = bt.atTile({ x, y, facing, ...args });
            // Continue if the foundation overlaps any used or non floor tile
            if (
              b.foundation.some(
                ([x, y]) => placed.get(x, y) || tiles.get(x, y) !== Tile.FLOOR,
              )
            ) {
              continue;
            }
            // Keep this building
            result.push(b);
            b.foundation.forEach(([x, y]) => placed.set(x, y, true));
            q.splice(i, 1);
            if (q.length === 0) {
              break done;
            }
            break point;
          }
        }
      }
    }
    q.forEach(it => {
      if (it.required) {
        console.log('Failed to place required building: %o', it);
        throw new Error(`Failed to place ${it.bt.name}, which is required.`);
      } else {
        console.log('Failed to place optional building: %o', it);
      }
    });
  }
  return result;
}
