import { CavernWithPartialPlans } from "../../models/cavern";
import { Measured, Negotiated } from "../../models/plan";

export default function measure(
  cavern: CavernWithPartialPlans<Negotiated>,
): CavernWithPartialPlans<Measured> {
  const planIdsByBp: number[][] = [];
  cavern.plans.forEach((plan) => {
    plan.path.baseplates.forEach((bp) =>
      (planIdsByBp[bp.id] ||= []).push(plan.id),
    );
  });
  const plans = cavern.plans.map((plan) => {
    const intersects: boolean[] = [];
    plan.path.baseplates
      .flatMap((bp) => planIdsByBp[bp.id])
      .filter((plid) => plid !== plan.id)
      .forEach((plid) => (intersects[plid] = true));

    const pearlRadius = (plan.kind === "cave" ? Math.max : Math.min)(
      ...plan.path.baseplates.map((bp) => bp.pearlRadius),
    );

    /*
     * Estimate the perimeter to be half the circumference of each end plus
     * twice the length of the path:
     * (2*pi*a.pr) / 2 + (2*pi*b.pr) / 2 + pd * 2
     * pi * (a.pr + b.pr) + 2 * pd
     * 
     * This doesn't need to be super accurate because:
     * 1. It's only used as a multiplier for values from context, not any
     *    actually important geometry.
     * 2. Later steps are going to make blobby shapes anyway.
     */
    const perimeter = Math.round(
      Math.PI * (
      Math.min(pearlRadius, plan.path.origin.pearlRadius)
      + Math.min(pearlRadius, plan.path.destination.pearlRadius))
      + plan.path.snakeDistance * 2)
    return { ...plan, intersects, pearlRadius, perimeter };
  });
  return { ...cavern, plans };
}
