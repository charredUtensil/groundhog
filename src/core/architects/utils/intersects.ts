import { FluidType } from "../../models/tiles";
import { FloodedPlan } from "../../transformers/01_planning/02_flood";

export function intersectsAny(
  plans: readonly FloodedPlan[],
  plan: FloodedPlan,
  fluid: FluidType,
) {
  return plans.some((p) => plan.intersects[p.id] && p.fluid === fluid);
}

export function intersectsOnly(
  plans: readonly FloodedPlan[],
  plan: FloodedPlan,
  fluid: FluidType,
) {
  return !plans.some((p) => plan.intersects[p.id] && p.fluid !== fluid);
}

export function isDeadEnd(plan: FloodedPlan) {
  return plan.intersects.reduce((r, n) => r + (n ? 1 : 0), 0) <= 1;
}
