import { NSEW } from "../../common/geometry";
import { Grid, MutableGrid } from "../../common/grid";
import { MagmatisedCavern } from "./02_magmatize";

const FENCES = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [0, 0],
] as const;

export type StrataformedCavern = MagmatisedCavern & {
  readonly height: Grid<number>;
};

/**
 * Choose a random target height for each plan.
 */
function getPlanHeight(cavern: MagmatisedCavern): readonly (number | null)[] {
  const heightTargetRange = {
    min: -cavern.context.heightTargetRange,
    max: cavern.context.heightTargetRange,
  };

  const queued: true[] = [];
  const result: number[] = [];
  const rng = cavern.dice.height;

  const queue = cavern.plans.filter((plan) => !plan.hops.length);
  queue.forEach((plan) => (queued[plan.id] = true));
  while (queue.length) {
    const plan = queue.shift()!;
    const h =
      result[plan.id] ??
      (plan.kind === "cave" ? rng.uniformInt(heightTargetRange) : null);
    result[plan.id] = h;
    plan.intersects.forEach((v, i) => {
      const p = cavern.plans[i];
      if (queued[i] || p.kind === plan.kind) {
        return;
      }
      if (plan.fluid || p.fluid) {
        result[i] = h;
      }
      queued[i] = true;
      queue.push(p);
    });
  }
  return result;
}

function getTileHeight(cavern: MagmatisedCavern): Grid<number> {
  const planHeight = getPlanHeight(cavern);
  const fluidOffset = cavern.context.heightTargetRange / -5;
  const result = new MutableGrid<number>();
  for (let x = cavern.left; x < cavern.right; x++) {
    for (let y = cavern.top; y < cavern.bottom; y++) {
      let sum = 0;
      let count = 0;
      const isFluid = !!(
        cavern.tiles.get(x, y)?.isFluid || cavern.erosion.get(x, y)
      );
      cavern.pearlInnerDex.get(x, y)?.forEach((_, i) => {
        const h = planHeight[i];
        if (h != null) {
          sum += h;
          count++;
        }
      });
      if (count) {
        result.set(x, y, Math.round(sum / count) + (isFluid ? fluidOffset : 0));
      }
    }
  }
  return result;
}

function getCornerHeight(cavern: MagmatisedCavern, tileHeight: Grid<number>) {
  const result = new MutableGrid<number>();
  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      let sum = 0;
      let count = 0;
      FENCES.forEach(([ox, oy]) => {
        const h = tileHeight.get(x + ox, y + oy);
        if (h !== undefined) {
          sum += h;
          count++;
        }
      });
      if (count) {
        result.set(x, y, sum / count);
      }
    }
  }
  return result;
}

function spread(cavern: MagmatisedCavern, height: Grid<number>) {
  const result = new MutableGrid<number>();
  for (let x = cavern.left + 1; x < cavern.right; x++) {
    for (let y = cavern.top + 1; y < cavern.bottom; y++) {
      const ht = height.get(x, y);
      if (ht) {
        result.set(x, y, ht);
      } else {
        let sum = 0;
        let count = 0;
        NSEW.forEach(([ox, oy]) => {
          const h = height.get(x + ox, y + oy);
          if (h !== undefined) {
            sum += h;
            count++;
          }
        });
        if (count) {
          result.set(x, y, sum / count);
        }
      }
    }
  }
  return result;
}

export default function strataform(
  cavern: MagmatisedCavern,
): StrataformedCavern {
  if (cavern.context.heightTargetRange <= 0) {
    return { ...cavern, height: new MutableGrid() };
  }
  let height = getTileHeight(cavern);
  height = getCornerHeight(cavern, height);
  for (let i = 0; i < cavern.context.stratascosity; i++) {
    height = spread(cavern, height);
  }

  return { ...cavern, height };
}
