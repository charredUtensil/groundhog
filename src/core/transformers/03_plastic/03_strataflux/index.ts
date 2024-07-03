import { PseudorandomStream } from "../../../common";
import { Grid, MutableGrid } from "../../../common/grid";
import { StrataformedCavern } from "../02_strataform";
import getNodes, { HeightNode } from "./nodes";

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

const collapseQueueSort = ({ range: a }: HeightNode, { range: b }: HeightNode) => b - a;

function getRandomHeight(node: HeightNode, rng: PseudorandomStream): number {
  if (node.min === node.max) {
    return node.min;
  }
  const targetInRange = (() => {
    if (node.target === undefined) {
      return 0.5;
    }
    if (node.target <= node.min) {
      return 0;
    }
    if (node.target >= node.max) {
      return 1;
    }
    return (node.target - node.min) / (node.max - node.min);
  })();
  return rng.betaInt({
    a: 1 + 3 * targetInRange,
    b: 1 + 3 * (1 - targetInRange),
    min: node.min,
    max: node.max + 1,
  });
}

export default function strataflux(
  cavern: StrataformedCavern,
): StrataformedCavern {
  // If height is disabled, just return a superflat map.
  if (cavern.context.heightTargetRange <= 0) {
    return { ...cavern, height: superflat(cavern) };
  }

  const nodes = getNodes(cavern);
  const height = new MutableGrid<number>();
  const rng = cavern.dice.height;

  // The collapse queue is a priority queue. The algorithm will always take the
  // node with the smallest possible range of values.
  const collapseQueue: HeightNode[] = nodes
    .map(c => c).filter(c => c.collapseQueued);
  
  // Collapsing a node means picking a specific height in range for that node.
  const collapse = () => {
    const node = collapseQueue.pop()!;
    const h = getRandomHeight(node, rng);
    for (let i = 0; i < node.corners.length; i++) {
      height.set(...node.corners[i], h);
    }
    node.min = h;
    node.max = h;
    node.range = 0;
    return node;
  };

  // I think this algorithm is like O(n^4) where N is the size of the cavern,
  // so try to save some performance where possible.

  while (collapseQueue.length) {
    // Take a node off the collapse queue and collapse it.
    // Then, put it on the spread queue.
    const spreadQueue = [collapse()];
    while (spreadQueue.length) {
      // Take a node off the spread queue.
      const node = spreadQueue.shift()!;
      // Spread to each of this node's neighbors.
      for (let i = 0; i < node.neighbors.length; i++) {
        const neighbor = node.neighbors[i];
        // If the neighbor is already collapsed, nothing to do.
        if (!neighbor.node.range) {
          continue;
        }
        // Pull the neighbor's minimum up and maximum down to fit within the
        // allowed ascent/descent slope for this edge.
        neighbor.node.min = Math.max(
          neighbor.node.min,
          node.min - neighbor.descent,
        );
        neighbor.node.max = Math.min(
          neighbor.node.max,
          node.max + neighbor.ascent,
        );
        const range = neighbor.node.max - neighbor.node.min;
        // If the neighbor's range has shrunk,
        if (range < neighbor.node.range) {
          neighbor.node.range = range;
          // put it on the spread queue
          spreadQueue.push(neighbor.node);
          // and put it on the collapse queue if it wasn't already.
          if (!neighbor.node.collapseQueued) {
            neighbor.node.collapseQueued = true;
            collapseQueue.push(neighbor.node);
          }
        }
      }
    }
    collapseQueue.sort(collapseQueueSort);
  }

  debugger

  return { ...cavern, height };
}
