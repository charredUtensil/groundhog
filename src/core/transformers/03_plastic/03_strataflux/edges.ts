import { Mutable } from "../../../common";
import { Grid, MutableGrid } from "../../../common/grid";
import { Tile } from "../../../models/tiles";
import { StrataformedCavern } from "../02_strataform";
import { CORNER_OFFSETS } from "./base";

export type Edge = {
  // The maximum slope when going up toward the positive axis
  readonly forwardSlope: number,
  // The maximum slope when going up toward the negative axis
  readonly backwardSlope: number,
}

// Each tile has a maximum slope its edges are allowed to have.
// A variety of attributes are allowed to influence this slope, so combine them
// here into a single grid of max slopes.
function getTileSlopes(cavern: StrataformedCavern): Grid<number> {
  const result = new MutableGrid<number>();
  // The max slope allowed for tile types that are within the play area but
  // don't define a specific slope.
  const tileOobSlope = Math.max(
    cavern.context.caveMaxSlope,
    cavern.context.hallMaxSlope,
  );
  const maxSlopeForPlan = cavern.plans.map(plan => Math.min(
    plan.hasErosion ? 0 : Infinity,
    plan.architect.maxSlope ?? Infinity,
    plan.kind === "cave"
      ? cavern.context.caveMaxSlope
      : cavern.context.hallMaxSlope,
  ));
  for (let x = cavern.left; x < cavern.right; x++) {
    for (let y = cavern.top; y < cavern.bottom; y++) {
      // Determine the max slope for the specific tile placed here.
      const tile = cavern.tiles.get(x, y);
      const forTile = tile
        ? Math.min(tile.maxSlope ?? Infinity, tileOobSlope)
        : cavern.context.voidMaxSlope;
      // Determine the max slope for the plans at this tile.
      const forPlan =
        cavern.pearlInnerDex.get(x, y)?.reduce((r, _, i) =>
          Math.min(r, maxSlopeForPlan[i]), Infinity) ?? Infinity;
      result.set(x, y, Math.min(forTile, forPlan));
    }
  }
  return result;
}

// Turns the given point into a "bowl" where this point and all points around
// it up to the given size must slope downward toward this point.
function bowlify(
  x: number,
  y: number,
  size: number,
  edgesH: MutableGrid<Mutable<Edge>>,
  edgesV: MutableGrid<Mutable<Edge>>,
) {
  for (let i = 0; i <= size;  i++) {
    for (let j = -i; j <= i; j++) {
      edgesH.get(x + i, y + j)!.backwardSlope = 0;
      edgesH.get(x - i - 1, y + j)!.forwardSlope = 0;
      edgesV.get(x + j, y + i)!.backwardSlope = 0;
      edgesV.get(x + j, y - i - 1)!.forwardSlope = 0;
    }
  }
}

export default function getEdges(cavern: StrataformedCavern): {edgesH: Grid<Edge>, edgesV: Grid<Edge>} {
  const tileSlopes = getTileSlopes(cavern);

  const edgesH = new MutableGrid<Mutable<Edge>>();
  for (let x = cavern.left; x < cavern.right; x++) {
    for (let y = cavern.top + 1; y < cavern.bottom; y++) {
      const slope = Math.min(
        tileSlopes.get(x, y - 1)!,
        tileSlopes.get(x, y)!,
      );
      edgesH.set(x, y, {forwardSlope: slope, backwardSlope: slope});
    }
  }
  const edgesV = new MutableGrid<Mutable<Edge>>();
  for (let x = cavern.left + 1; x < cavern.right; x++) {
    for (let y = cavern.top; y < cavern.bottom; y++) {
      const slope = Math.min(
        tileSlopes.get(x - 1, y)!,
        tileSlopes.get(x, y)!,
      );
      edgesV.set(x, y, {forwardSlope: slope, backwardSlope: slope});
    }
  }

  const bowls = new MutableGrid<number>();
  cavern.tiles.forEach((tile, x, y) => {
    let size;
    if (tile === Tile.WATER) {
      size = 1;
    } else if (tile === Tile.LAVA) {
      size = 1;
    } else if (cavern.pearlInnerDex.get(x, y)?.some(p => cavern.plans[p].hasErosion)) {
      size = 0;
    } else {
      return;
    }
    CORNER_OFFSETS.forEach(([ox, oy]) => {
      bowls.set(x + ox, y + oy, Math.max(
        size,
        bowls.get(x + ox, y + oy) ?? 0),
      );
    });
  });
  bowls.forEach((size, x, y) => bowlify(x, y, size, edgesH, edgesV));

  return {edgesH, edgesV};
}