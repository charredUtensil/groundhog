import { Grid, MutableGrid } from "../../common/grid";
import { FencedCavern } from "./04_fence";

const HEIGHT_MIN = 20;
const HEIGHT_MAX = 80;

const OFFSETS = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [0, 0],
] as const;

export type StrataformedCavern = FencedCavern & {
  readonly height: Grid<number>;
}

export default function strataform(cavern: FencedCavern): StrataformedCavern {
  const queued: true[] = [];
  const planHeights: (number | null)[] = [];
  const rng = cavern.dice.height;

  const queue = cavern.plans.filter(plan => plan.hops === 0);
  queue.forEach(plan => queued[plan.id] = true);
  while (queue.length) {
    const plan = queue.shift()!;
    const h = planHeights[plan.id] ?? (
      plan.kind === 'cave'
      ? rng.uniformInt({min: HEIGHT_MIN, max: HEIGHT_MAX})
      : null
    );
    planHeights[plan.id] = h;
    plan.intersects.forEach((v, i) => {
      const p = cavern.plans[i];
      if (queued[i] || p.kind === plan.kind) {
        return
      }
      if (plan.fluid || p.fluid) {
        planHeights[i] = h;
      }
      queued[i] = true;
      queue.push(p);
    });
  }

  const height = new MutableGrid<number>();

  for (let x = cavern.left; x <= cavern.right; x++) {
    for (let y = cavern.top; y <= cavern.bottom; y++) {
      let sum = 0;
      let count = 0;
      OFFSETS.forEach(([ox, oy]) => {
        cavern.intersectsPearlInner.get(x + ox, y + oy)?.forEach((_, i) => {
          const h = planHeights[i];
          if (h != null) {
            sum += h;
            count++;
          }
        });
      });
      if (count) {
        height.set(x, y, Math.round(sum / count));
      }
    }
  }

  return {...cavern, height}
}