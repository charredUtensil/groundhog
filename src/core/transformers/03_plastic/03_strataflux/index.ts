import { PseudorandomStream } from "../../../common";
import { Grid, MutableGrid } from "../../../common/grid";
import { StrataformedCavern } from "../02_strataform";
import getCorners, { Corner } from "./corners";

// The "strataflux" algorithm is particularly complex mostly because it
// involves many data structures and concepts that are not really used
// elsewhere. The bulk of the code is simply generating the data structures
// needed to perform the algorithm, which work as follows:
// 
// This algorithm deals with Tiles, Corners, and Edges - Tiles meaning the same
// thing as in the rest of this project and the others defined thusly:
// 
//      EdgeH [x, y] =====v
//     Corner [x, y] => +--------+ <= Corner [x + 1, y]
//                      |        |
//      EdgeV [x, y] => |  Tile  | <= EdgeV [x + 1, y]
//                      | [x, y] |
//                      |        |
// Corner [x, y + 1] => +--------+ <= Corner [x + 1, y + 1]
//                             ^===== EdgeH [x, y + 1]

export const HEIGHT_MIN = -600;
export const HEIGHT_MAX = 600;

// Superflat: Just return a cavern where all the heights are 0
function superflat(cavern: StrataformedCavern): Grid<number> {
  const result = new MutableGrid<number>();
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      result.set(x, y, 0);
    }
  }
  return result;
}

const collapseQueueSort = ({ range: a }: Corner, { range: b }: Corner) => b - a;

function getRandomHeight(corner: Corner, rng: PseudorandomStream): number {
  if (corner.min === corner.max) {
    return corner.min;
  }
  const targetInRange = (() => {
    if (corner.target === undefined) {
      return 0.5;
    }
    if (corner.target <= corner.min) {
      return 0;
    }
    if (corner.target >= corner.max) {
      return 1;
    }
    return (corner.target - corner.min) / (corner.max - corner.min);
  })();
  return rng.betaInt({
    a: 1 + 3 * targetInRange,
    b: 1 + 3 * (1 - targetInRange),
    min: corner.min,
    max: corner.max + 1,
  });
}

export default function strataflux(
  cavern: StrataformedCavern,
): StrataformedCavern {
  // If height is disabled, just return a superflat map.
  if (cavern.context.heightTargetRange <= 0) {
    return { ...cavern, height: superflat(cavern) };
  }

  const corners = getCorners(cavern);
  const height = new MutableGrid<number>();
  const rng = cavern.dice.height;

  // The collapse queue is a priority queue. The algorithm will always take the
  // corner with the smallest possible range of values.
  const collapseQueue: Corner[] = corners
    .map(c => c).filter(c => c.collapseQueued);
  
  // Collapsing a corner means picking a specific height in range for that corner.
  const collapse = () => {
    const corner = collapseQueue.pop()!;
    const h = getRandomHeight(corner, rng);
    height.set(corner.x, corner.y, h);
    corner.min = h;
    corner.max = h;
    corner.range = 0;
    return corner;
  };

  // I think this algorithm is like O(n^4) where N is the size of the cavern,
  // so try to save some performance where possible.

  while (collapseQueue.length) {
    // Take a corner off the collapse queue and collapse it.
    // Then, put it on the spread queue.
    const spreadQueue = [collapse()];
    while (spreadQueue.length) {
      // Take a corner off the spread queue.
      const corner = spreadQueue.shift()!;
      // Spread to each of this corner's neighbors.
      for (let i = 0; i < corner.neighbors.length; i++) {
        const neighbor = corner.neighbors[i];
        // If the neighbor is already collapsed, nothing to do.
        if (!neighbor.corner.range) {
          continue;
        }
        // Pull the neighbor's minimum up and maximum down to fit within the
        // allowed ascent/descent slope for this edge.
        neighbor.corner.min = Math.max(
          neighbor.corner.min,
          corner.min - neighbor.descent,
        );
        neighbor.corner.max = Math.min(
          neighbor.corner.max,
          corner.max + neighbor.ascent,
        );
        const range = neighbor.corner.max - neighbor.corner.min;
        // If the neighbor's range has shrunk,
        if (range < neighbor.corner.range) {
          neighbor.corner.range = range;
          // put it on the spread queue
          spreadQueue.push(neighbor.corner);
          // and put it on the collapse queue if it wasn't already.
          if (!neighbor.corner.collapseQueued) {
            neighbor.corner.collapseQueued = true;
            collapseQueue.push(neighbor.corner);
          }
        }
      }
    }
    collapseQueue.sort(collapseQueueSort);
  }

  debugger

  return { ...cavern, height };
}
