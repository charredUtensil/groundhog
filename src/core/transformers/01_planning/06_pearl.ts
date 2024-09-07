import { AnyMetadata } from "../../architects";
import { PseudorandomStream } from "../../common";
import { NSEW, Point, plotLine } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import { pairEach } from "../../common/utils";
import { BaseMetadata } from "../../models/architect";
import { EstablishedCavern, EstablishedPlan } from "./05_establish";
import { WithPlanType } from "./utils";

type Layer = readonly Point[];
export type Pearl = readonly Layer[];

export type PearledPlan<T extends BaseMetadata> = EstablishedPlan<T> & {
  /**
   * A pearl is an array of layers (from innermost to out).
   * Each layer contains an array of [x, y] coordinates in that layer.
   * innerPearl[layer][sequence] = [x, y]
   */
  readonly innerPearl: Pearl;
  readonly outerPearl: Pearl;
};

export type PearledCavern = WithPlanType<
  EstablishedCavern,
  PearledPlan<AnyMetadata>
>;

export class LayerGrid extends MutableGrid<number> {
  atLayer(layer: number): Point[] {
    const result: Point[] = [];
    this.forEach((ly, x, y) => {
      if (ly === layer) {
        result.push([x, y]);
      }
    });
    return result;
  }

  set(x: number, y: number, layer: number) {
    const has = this.get(x, y);
    if (has === undefined || layer < has) {
      super.set(x, y, layer);
    }
  }
}

export function hallNucleus(grid: LayerGrid, plan: EstablishedPlan<any>) {
  pairEach(plan.path.baseplates, (a, b) => {
    for (const [x, y] of plotLine(a.center, b.center)) {
      grid.set(x, y, 0);
    }
  });
}

export function caveNucleus(grid: LayerGrid, plan: EstablishedPlan<any>) {
  // The cave nucleus is less straightforward.

  plan.path.baseplates.forEach((bp) => {
    const layer = plan.pearlRadius - bp.pearlRadius;
    // The offset is half the size of the pearl in that direction.
    // This creates a dot or rectangle depending on how oblong the baseplate is.
    const ox = Math.min(bp.pearlRadius, (bp.width - 1) >> 1);
    const oy = Math.min(bp.pearlRadius, (bp.height - 1) >> 1);
    for (let x = bp.left + ox; x < bp.right - ox; x++) {
      for (let y = bp.top + oy; y < bp.bottom - oy; y++) {
        grid.set(x, y, layer);
      }
    }
  });

  pairEach(plan.path.baseplates, (a, b) => {
    const layer = plan.pearlRadius - Math.min(a.pearlRadius, b.pearlRadius);
    for (const [x, y] of plotLine(a.center, b.center)) {
      grid.set(x, y, layer);
    }
  });
}

export function trail(
  grid: LayerGrid,
  rng: PseudorandomStream,
  baroqueness: number,
  layer: number,
  cp: { x: number; y: number; vx: number; vy: number } | undefined,
): Point[] {
  const result: Point[] = [];
  while (cp) {
    const { x, y, vx, vy } = cp;

    // Push the point to both the grid and result
    grid.set(x, y, layer);
    result.push([x, y]);

    // As it turns right, (vx, vy) cycles between:
    // (1, 0) -> (0, 1) -> (-1, 0) -> (0, -1) -> ...
    // Try each of these possible movements
    // prettier-ignore
    const nextPoints = [
      {ox:   0, oy:   0, vx: -vy, vy:  vx}, // Right turn
      {ox: -vy, oy:  vx, vx:  vx, vy:  vy}, // Straight, but drift right
      {ox:   0, oy:   0, vx:  vx, vy:  vy}, // Straight
      {ox:  vy, oy: -vx, vx:  vx, vy:  vy}, // Straight, but drift left
      {ox:   0, oy:   0, vx:  vy, vy: -vx}, // Left turn
    ].map((np) => ({...np, x: x + np.ox + np.vx, y: y + np.oy + np.vy}))

    const halt = nextPoints.some(({ x, y }) => {
      // First, determine if the trail has looped back around on itself.
      // This can mean that it either went all the way around to its start
      // or that it has escaped and is forming a loop on this loose tendril.
      if ((grid.get(x, y) ?? -1) < layer) {
        // This point is unoccupied or on an earlier layer. Ignore it.
        return false;
      }
      for (let i = result.length - 2; i > Math.max(result.length - 4, 0); i--) {
        const [rx, ry] = result[i];
        if (rx === x && ry === y) {
          // This point was visited recently. Ignore it.
          return false;
        }
      }
      // This point was on this layer but not visited recently. Halt.
      return true;
    });
    if (halt) {
      break;
    }

    cp = nextPoints.find(({ x, y }) => {
      // Next, try to find an acceptable next point to visit.
      // The point must not be already visited.
      if ((grid.get(x, y) ?? -1) >= 0) {
        return false;
      }
      // The RNG may veto.
      if (baroqueness > 0 && rng.chance(baroqueness)) {
        return false;
      }
      // Otherwise, This is the next point to visit.
      return true;
    });
  }
  return result;
}

function addLayer(
  grid: LayerGrid,
  rng: PseudorandomStream,
  baroqueness: number,
  layer: number,
): Point[] {
  return grid.atLayer(layer - 1).flatMap(([x, y]) =>
    NSEW.flatMap(([ox, oy]) => {
      if ((grid.get(x + ox, y + oy) ?? -1) >= 0) {
        return [];
      } else {
        return trail(grid, rng, baroqueness, layer, {
          x: x + ox,
          y: y + oy,
          vx: -oy,
          vy: ox,
        });
      }
    }),
  );
}

export default function pearl(cavern: EstablishedCavern): PearledCavern {
  const plans = cavern.plans.map((plan) => {
    const rng = cavern.dice.pearl(plan.id);
    const grid: LayerGrid = new LayerGrid();
    (plan.kind === "cave" ? caveNucleus : hallNucleus)(grid, plan);
    const innerPearl: Point[][] = [grid.map((_, x, y) => [x, y])];
    const outerPearl: Point[][] = [];
    const pearlRadius = plan.architect.roughExtent(plan);
    for (let i = 1; i < pearlRadius + 4; i++) {
      (i <= pearlRadius ? innerPearl : outerPearl).push(
        addLayer(grid, rng, i < pearlRadius ? plan.baroqueness : 0, i),
      );
    }
    return { ...plan, innerPearl, outerPearl };
  });
  return { ...cavern, plans };
}
