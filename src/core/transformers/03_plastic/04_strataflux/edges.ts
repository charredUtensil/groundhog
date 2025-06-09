import { Grid, MutableGrid } from "../../../common/grid";
import { StrataformedCavern } from "../03_strataform";
import { toKey as toGridKey } from "../../../common/grid";

type Edge = {
  readonly to: readonly [number, number];
  readonly ascent: number;
  readonly descent: number;
};

type EdgeData = {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  forward: number;
  backward: number;
};

const toKey = (x1: number, y1: number, x2: number, y2: number) =>
  (BigInt(toGridKey(x2, y2)) << 32n) | BigInt(toGridKey(x1, y1));

class EdgeMap {
  private readonly data = new Map<bigint, EdgeData>();

  get(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): { ascent: number; descent: number } | undefined {
    if (x1 < x2 || (x1 === x2 && y1 <= y2)) {
      const r = this.data.get(toKey(x1, y1, x2, y2));
      return r && { ascent: r.forward, descent: r.backward };
    }
    const r = this.data.get(toKey(x2, y2, x1, y1));
    return r && { ascent: r.backward, descent: r.forward };
  }
  set(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    ascent: number,
    descent: number,
  ) {
    if (x1 === x2 && y1 === y2) {
      return;
    }
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      const r = this.data.get(toKey(x1, y1, x2, y2));
      if (r) {
        r.forward = Math.min(r.forward, ascent);
        r.backward = Math.min(r.backward, descent);
      } else {
        this.data.set(toKey(x1, y1, x2, y2), {
          x1,
          y1,
          x2,
          y2,
          forward: ascent,
          backward: descent,
        });
      }
    } else {
      const r = this.data.get(toKey(x2, y2, x1, y1));
      if (r) {
        r.forward = Math.min(r.forward, descent);
        r.backward = Math.min(r.backward, ascent);
      } else {
        this.data.set(toKey(x2, y2, x1, y1), {
          x1: x2,
          y1: y2,
          x2: x1,
          y2: y1,
          forward: descent,
          backward: ascent,
        });
      }
    }
  }
  edges(): Grid<readonly Edge[]> {
    const result = new MutableGrid<Edge[]>();
    function get(x: number, y: number) {
      let r = result.get(x, y);
      if (!r) {
        r = [];
        result.set(x, y, r);
      }
      return r;
    }
    this.data.forEach(({ x1, y1, x2, y2, forward, backward }) => {
      get(x1, y1).push({ to: [x2, y2], ascent: forward, descent: backward });
      get(x2, y2).push({ to: [x1, y1], ascent: backward, descent: forward });
    });
    return result;
  }
}

// Each tile has a maximum slope its edges are allowed to have.
// A variety of attributes are allowed to influence this slope, so combine them
// here into a single grid of max slopes.
function getTileSlopes(cavern: StrataformedCavern): Grid<number> {
  const result = new MutableGrid<number>();
  // The max slope allowed for tile types that are within the play area but
  // don't define a specific slope.
  const planlessSlope = Math.max(
    cavern.context.caveMaxSlope,
    cavern.context.hallMaxSlope,
  );
  const maxSlopeForPlan = cavern.plans.map((plan) =>
    Math.min(
      plan.architect.maxSlope ?? Infinity,
      plan.kind === "cave"
        ? cavern.context.caveMaxSlope
        : cavern.context.hallMaxSlope,
    ),
  );
  for (let x = cavern.left; x < cavern.right; x++) {
    for (let y = cavern.top; y < cavern.bottom; y++) {
      let slope = Infinity;
      const tile = cavern.tiles.get(x, y);
      if (tile) {
        // Determine the max slope for the specific tile placed here.
        slope = Math.min(slope, tile.maxSlope ?? Infinity);
      } else {
        // Determine the max slope for this tile in the void.
        if (
          x < cavern.left ||
          x >= cavern.right ||
          y < cavern.top ||
          y >= cavern.bottom
        ) {
          slope = Math.min(slope, cavern.context.borderMaxSlope);
        } else {
          slope = Math.min(slope, cavern.context.voidMaxSlope);
        }
      }
      // Determine the max slope for the plans at this tile.
      slope = Math.min(
        slope,
        cavern.pearlInnerDex
          .get(x, y)
          ?.reduce(
            (r: number | undefined, _, i) =>
              Math.min(r ?? Infinity, maxSlopeForPlan[i]),
            undefined,
          ) ?? planlessSlope,
      );
      result.set(x, y, slope);
    }
  }
  return result;
}

export default function getEdgeMap(cavern: StrataformedCavern): EdgeMap {
  const edges = new EdgeMap();

  getTileSlopes(cavern).forEach((slope, x1, y1) => {
    const x2 = x1 + 1;
    const y2 = y1 + 1;
    edges.set(x1, y1, x2, y1, slope, slope);
    edges.set(x1, y1, x1, y2, slope, slope);
    edges.set(x2, y1, x2, y2, slope, slope);
    edges.set(x1, y2, x2, y2, slope, slope);
  });

  return edges;
}
