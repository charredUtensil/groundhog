import { Mutable } from "../../../common";
import { NSEW } from "../../../common/geometry";
import { Grid, MutableGrid } from "../../../common/grid";
import { filterTruthy } from "../../../common/utils";
import { StrataformedCavern } from "../02_strataform";
import { HEIGHT_MAX, HEIGHT_MIN } from "./base";
import getEdges from "./edges";

// IDEA: Don't use corners; use HeightNodes which do not have the x and y coord
// Start by finding lakes and assign everywhere in the lake the same HeightNode
// object. This will have some performance benefit, but also it means neighbors
// can be added between non-adjacent corners. As long as the relationship is
// defined symmetrically, there should be no issue with these as the algorithm
// doesn't require the space be Euclidean.

export type Corner = {
  readonly target: number | undefined;
  readonly x: number;
  readonly y: number;
  readonly neighbors: readonly {
    readonly corner: Corner;
    // The maximum upward slope moving from here to the neighbor.
    readonly ascent: number;
    // The maximum downward slope moving from here to the neighbor.
    readonly descent: number;
  }[];
  collapseQueued: boolean;
  min: number;
  max: number;
  range: number;
};

export default function getCorners(cavern: StrataformedCavern): Grid<Corner> {
  const corners = new MutableGrid<Corner>();
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      const target = cavern.height.get(x, y);
      // Corners on the border are adjusted to a height of 0 when loaded in Manic
      // Miners. This means they should be compressed here, but this also gives
      // strataflux a starting point for which corners have known heights.
      const isBorder = (
        x === cavern.left ||
        x === cavern.right ||
        y === cavern.top ||
        y === cavern.bottom
      );
      corners.set(x, y, {
        target,
        x,
        y,
        neighbors: [],
        collapseQueued: isBorder,
        min: isBorder ? 0 : HEIGHT_MIN,
        max: isBorder ? 0 : HEIGHT_MAX,
        range: isBorder ? 0 : HEIGHT_MAX - HEIGHT_MIN,
      })
    }
  }
  // With the corner objects created, add all neighbors.
  const {edgesH, edgesV} = getEdges(cavern);
  corners.forEach((corner, x, y) => {
    (corner.neighbors as Mutable<Corner['neighbors']>).push(
      ...filterTruthy(NSEW.map(([ox, oy]) => {
        const c = corners.get(x + ox, y + oy);
        if (!c) {
          return undefined;
        }
        // Find the edge. Since these are indexed by the minimum, the edges in
        // the positive direction are found at [x, y].
        const e = (oy === 0 ? edgesH : edgesV).get(
          x + Math.min(ox, 0), 
          y + Math.min(oy, 0),
        );
        if (!e) {
          return undefined;
        }
        // Determine ascent and descent from the edge slopes.
        return (ox + oy < 0)
          ? {corner: c, ascent: e.backwardSlope, descent: e.forwardSlope}
          : {corner: c, ascent: e.forwardSlope, descent: e.backwardSlope};
      }))
    );
  });
  return corners;
}