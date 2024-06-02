import { Grid, MutableGrid } from "../../common/grid";
import { DiscoveredCavern } from "./01_discover";

const FENCES = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [0, 0],
] as const;

export type StrataformedCavern = DiscoveredCavern & {
  readonly height: Grid<number>;
};

export default function strataform(
  cavern: DiscoveredCavern,
): StrataformedCavern {
  if (cavern.context.heightTargetRange <= 0) {
    return { ...cavern, height: new MutableGrid() };
  }

  const heightTargetRange = {
    min: -cavern.context.heightTargetRange,
    max: cavern.context.heightTargetRange,
  };
  const fluidOffset = cavern.context.heightTargetRange / -5;

  const queued: true[] = [];
  const planHeights: (number | null)[] = [];
  const rng = cavern.dice.height;

  const queue = cavern.plans.filter((plan) => plan.hops === 0);
  queue.forEach((plan) => (queued[plan.id] = true));
  while (queue.length) {
    const plan = queue.shift()!;
    const h =
      planHeights[plan.id] ??
      (plan.kind === "cave" ? rng.uniformInt(heightTargetRange) : null);
    planHeights[plan.id] = h;
    plan.intersects.forEach((v, i) => {
      const p = cavern.plans[i];
      if (queued[i] || p.kind === plan.kind) {
        return;
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
      let isFluid = false;
      FENCES.forEach(([ox, oy]) => {
        let hasErosion = false;
        cavern.pearlInnerDex.get(x + ox, y + oy)?.forEach((_, i) => {
          const h = planHeights[i];
          if (h != null) {
            sum += h;
            count++;
          }
          hasErosion ||= cavern.plans[i].hasErosion;
        });
        isFluid ||= cavern.tiles.get(x + ox, y + oy)?.isFluid || hasErosion;
      });
      if (count) {
        height.set(x, y, Math.round(sum / count) + (isFluid ? fluidOffset : 0));
      }
    }
  }

  return { ...cavern, height };
}
