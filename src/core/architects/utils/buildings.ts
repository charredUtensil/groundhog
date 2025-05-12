import { NSEW } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Building, BuildingExtraArgs, DOCKS } from "../../models/building";
import { Tile } from "../../models/tiles";

export type MakeBuildingInfo = {
  readonly bt: Building["template"],
  readonly args?: BuildingExtraArgs,
  readonly required?: boolean,
};

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
 * The given queue will be modified - so anything left in it on return
 * means those buildings could not be placed.
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
    queue: MakeBuildingInfo[];
  },
  { cavern, plan, tiles }: Parameters<Architect<any>["placeBuildings"]>[0],
) {
  const placed = new MutableGrid<true>();
  const rng = cavern.dice.placeBuildings(plan.id);
  const result: Building[] = [];
  // For each layer of the pearl
  done: for (let ly = from ?? 1; ly < (to ?? plan.innerPearl.length); ly++) {
    const porch = new MutableGrid<true>();
    plan.innerPearl[ly - 1].forEach(([x, y]) => porch.set(x, y, true));
    // For each point in the layer
    for (const [x, y] of rng.shuffle(plan.innerPearl[ly].slice())) {
      // For each building that can be built
      point: for (let i = 0; i < queue.length; i++) {
        const { bt, args } = queue[i];
        // For each possible orientation
        for (const facing of NSEW) {
          const [ox, oy] = facing;
          // Continue if this is an unacceptable porch location
          if (!porch.get(x + ox, y + oy)) {
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
          // Continue if this is a docks not on water
          if (
            b.template === DOCKS &&
            tiles.get(x - ox, y - oy) !== Tile.WATER
          ) {
            continue;
          }
          // Keep this building
          result.push(b);
          b.foundation.forEach(([x, y]) => placed.set(x, y, true));
          queue.splice(i, 1);
          if (queue.length === 0) {
            break done;
          }
          break point;
        }
      }
    }
  }
  queue.forEach(it => {
    if (it.required) {
      console.log('Failed to place required building: %o', it);
      throw new Error(`Failed to place ${it.bt.name}, which is required.`);
    }
  })
  return result;
}
