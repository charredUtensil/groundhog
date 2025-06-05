import { Mutable } from "../../../common";
import { NSEW, Point } from "../../../common/geometry";
import { Grid, MutableGrid } from "../../../common/grid";
import { Tile } from "../../../models/tiles";
import { StrataformedCavern } from "../03_strataform";
import { CORNER_OFFSETS, HEIGHT_MAX, HEIGHT_MIN } from "./base";
import getEdgeMap from "./edges";

export type HeightNode = {
  readonly target: number | undefined;
  readonly neighbors: readonly {
    readonly node: HeightNode;
    // The maximum upward slope moving from here to the neighbor.
    readonly ascent: number;
    // The maximum downward slope moving from here to the neighbor.
    readonly descent: number;
  }[];
  readonly corners: Point[];
  collapseQueued: boolean;
  min: number;
  max: number;
  range: number;
};

function getBowls(cavern: StrataformedCavern) {
  const result = new MutableGrid<number>();
  cavern.tiles.forEach((tile, x, y) => {
    let size;
    if (tile === Tile.WATER || tile === Tile.LAVA) {
      size = 2;
    } else if (cavern.erosion.get(x, y)) {
      size = 0;
    } else {
      return;
    }
    CORNER_OFFSETS.forEach(([ox, oy]) => {
      result.set(
        x + ox,
        y + oy,
        Math.max(size, result.get(x + ox, y + oy) ?? 0),
      );
    });
  });
  return result;
}

function mkNode(cavern: StrataformedCavern, x: number, y: number): HeightNode {
  const target = cavern.height.get(x, y);
  // Corners on the border are adjusted to a height of 0 when loaded in Manic
  // Miners. This means they should be compressed here, but this also gives
  // strataflux a starting point for which corners have known heights.
  const isBorder =
    x === cavern.left ||
    x === cavern.right ||
    y === cavern.top ||
    y === cavern.bottom;
  return {
    target,
    neighbors: [],
    corners: [[x, y]],
    collapseQueued: isBorder,
    min: isBorder ? 0 : HEIGHT_MIN,
    max: isBorder ? 0 : HEIGHT_MAX,
    range: isBorder ? 0 : HEIGHT_MAX - HEIGHT_MIN,
  };
}

function getNodesForBowls(cavern: StrataformedCavern, bowls: Grid<number>) {
  const result = new MutableGrid<HeightNode>();
  // oh hey look it's the same algorithm from discovery zones
  const queue: { x: number; y: number; node: HeightNode | null }[] = bowls.map(
    (_, x, y) => ({ x, y, node: null }),
  );
  while (queue.length > 0) {
    // eslint-disable-next-line prefer-const
    let { x, y, node } = queue.shift()!;
    if (!result.get(x, y)) {
      if (!node) {
        node = mkNode(cavern, x, y);
      }
      result.set(x, y, node);
      const neighbors = NSEW.map(([ox, oy]) => ({
        x: x + ox,
        y: y + oy,
        node,
      })).filter(({ x: x2, y: y2 }) => bowls.get(x2, y2));
      queue.unshift(...neighbors);
    }
  }
  return result;
}

export default function getNodes(cavern: StrataformedCavern): Grid<HeightNode> {
  // First handle "bowls" - these are the places that need to be at a lower
  // elevation than their surroundings. Adjacent bowls must be at the same
  // height, so just use the same node for the whole contiguous bowl.
  const bowls = getBowls(cavern);
  const nodes = getNodesForBowls(cavern, bowls);

  // Now create the rest of the node objects.
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      const node = nodes.get(x, y);
      if (node) {
        node.corners.push([x, y]);
      } else {
        nodes.set(x, y, mkNode(cavern, x, y));
      }
    }
  }

  // Get the edge map with tile slopes precomputed.
  const edges = getEdgeMap(cavern);

  // Add edges for bowls.
  bowls.forEach((size, x, y) => {
    const s = size + 1;
    for (let ox = -s; ox <= s; ox++) {
      for (let oy = -s; oy <= s; oy++) {
        edges.set(x, y, x + ox, y + oy, Infinity, 0);
      }
    }
  });

  // Convert edges to neighbors, linking them together.
  edges.edges().forEach((e, x1, y1) => {
    const node = nodes.get(x1, y1);
    if (node) {
      const neighbors = e
        .map(({ to, ascent, descent }) => ({
          node: nodes.get(...to),
          ascent,
          descent,
        }))
        .filter(({ node: n }) => n && n !== node) as HeightNode["neighbors"];
      (node.neighbors as Mutable<HeightNode["neighbors"]>).push(...neighbors);
    }
  });

  return nodes;
}
