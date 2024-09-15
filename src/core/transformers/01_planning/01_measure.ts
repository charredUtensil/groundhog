import { NegotiatedCavern, NegotiatedPlan } from "./00_negotiate";
import { WithPlanType } from "./utils";

export type MeasuredPlan = NegotiatedPlan & {
  /**
   * If intersects[id] is true, this plan intersects the plan with the given id.
   * Plans do not intersect themselves.
   */
  readonly intersects: readonly true[];
  /** How many layers of different tiles can be added to this Plan? */
  readonly pearlRadius: number;
  readonly perimeter: number;
};

export type MeasuredCavern = WithPlanType<NegotiatedCavern, MeasuredPlan>;

export default function measure(cavern: NegotiatedCavern): MeasuredCavern {
  const planIdsByBp: number[][] = [];
  cavern.plans.forEach((plan) => {
    plan.path.baseplates.forEach((bp) =>
      (planIdsByBp[bp.id] ||= []).push(plan.id),
    );
  });
  const plans = cavern.plans.map((plan) => {
    const intersects: true[] = [];
    plan.path.baseplates
      .flatMap((bp) => planIdsByBp[bp.id])
      .filter((plid) => plid !== plan.id)
      .forEach((plid) => (intersects[plid] = true));

    const pearlRadius = (plan.kind === "cave" ? Math.max : Math.min)(
      ...plan.path.baseplates.map((bp) => bp.pearlRadius),
    );

    /*
     * For caves, estimate the perimeter to be half the circumference of each
     * end plus twice the length of the path:
     * (2*pi*a.pr) / 2 + (2*pi*b.pr) / 2 + pd * 2
     * pi * (a.pr + b.pr) + 2 * pd
     *
     * For halls, it's just double the length of the hall that isn't part of
     * some cave.
     *
     * This doesn't need to be super accurate because:
     * 1. It's only used as a multiplier for values from context, not any
     *    actually important geometry.
     * 2. Later steps are going to make blobby shapes anyway.
     */
    const perimeter = Math.round(
      plan.kind === "cave"
        ? Math.PI *
            (Math.min(pearlRadius, plan.path.origin.pearlRadius) +
              Math.min(pearlRadius, plan.path.destination.pearlRadius)) +
            plan.path.snakeDistance * 2
        : 2 * plan.path.exclusiveSnakeDistance,
    );
    return { ...plan, intersects, pearlRadius, perimeter };
  });
  return { ...cavern, plans };
}
