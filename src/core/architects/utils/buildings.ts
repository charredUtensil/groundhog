import { Cardinal4, NSEW } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import { FineArgs } from "../../models/architect";
import { Building, BuildingExtraArgs, TOOL_STORE } from "../../models/building";
import { Tile } from "../../models/tiles";

export function getBuildings(
  {from, to, queue}: {
    from?: number, 
    to?: number, 
    queue: ((a: {x: number, y: number, facing: Cardinal4}) => Building)[]
  },
  {cavern, plan, tiles}: FineArgs
) {
  const placed = new MutableGrid<true>()
  const porches = new MutableGrid<number>()
  const rng = cavern.dice.placeBuildings(plan.id)
  const result: Building[] = []
  // For each layer of the pearl
  done: for (let ly = from ?? 1; ly < (to ?? plan.innerPearl.length); ly++) {
    plan.innerPearl[ly - 1].forEach(([x, y]) => porches.set(x, y, ly));
    // For each point in the layer
    for (const [x, y] of rng.shuffle(plan.innerPearl[ly].slice())) {
      // For each building that can be built
      point: for (let i = 0; i < queue.length; i++) {
        const fn = queue[i]
        // For each possible orientation
        for (const facing of NSEW) {
          const [ox, oy] = facing
          // If this is an acceptable porch location
          if (porches.get(x + ox, y + oy) !== ly) {
            continue
          }
          // Make the building
          const b = fn({x, y, facing})
          // And if the foundation does not overlap any used or non floor tile
          if (!b.foundation.some(([x, y]) => (
            placed.get(x, y) || tiles.get(x, y) !== Tile.FLOOR
          ))) {
            // Keep this building
            result.push(b)
            b.foundation.forEach(([x, y]) => placed.set(x, y, true))
            queue.splice(i, 1)
            if (queue.length === 0) {
              break point
            }
            break done
          }
        }
      }
    }
  }
  return result
}