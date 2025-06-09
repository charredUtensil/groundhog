import { PseudorandomStream } from "../../../common";
import { Grid, MutableGrid } from "../../../common/grid";
import { StrataformedCavern } from "../03_strataform";
import getNodes, { HeightNode } from "./nodes";
import { Heap } from "heap-js";

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

function getRandomHeight(
  node: HeightNode,
  rng: PseudorandomStream,
  strataplanity: number,
): number {
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
    a: 1 + strataplanity * targetInRange,
    b: 1 + strataplanity * (1 - targetInRange),
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

  // The algorithm will always take the node with the smallest possible range
  // of values to collapse first.
  const collapseHeap = new Heap<HeightNode>((a, b) => a.range - b.range);
  nodes.forEach((c) => {
    if (c.collapseQueued) {
      collapseHeap.push(c);
    }
  });

  const strataplanity = cavern.context.strataplanity;

  // Collapsing a node means picking a specific height in range for that node.
  function collapse(node: HeightNode) {
    const h = getRandomHeight(node, rng, strataplanity);
    for (let i = 0; i < node.corners.length; i++) {
      height.set(...node.corners[i], h);
    }
    node.min = h;
    node.max = h;
    node.range = 0;
  }

  // As of the writing of this comment, this algorithm is the slowest part of
  // cavern generation. Gemini thinks it's O(N^2 log N) where N is the size of
  // one side of the cavern.
  while (true) {
    // Take a node off the collapse heap.
    const initialNode = collapseHeap.pop();
    if (!initialNode) {
      break;
    }
    // Collapse it.
    collapse(initialNode);
    // Then, put it on the spread queue.
    const spreadQueue = [initialNode];
    for (let i = 0; i < spreadQueue.length; i++) {
      // Take a node off the spread queue.
      const node = spreadQueue[i];
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
            collapseHeap.push(neighbor.node);
          }
        }
      }
      // Yes, delete the entry and do not shift everything down.
      // eslint-disable-next-line @typescript-eslint/no-array-delete
      delete spreadQueue[i];
    }
  }

  return { ...cavern, height };
}
