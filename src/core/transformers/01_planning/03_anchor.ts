import { ARCHITECTS } from "../../architects";
import { Architect } from "../../models/architect";
import { FloodedCavern, FloodedPlan } from "./02_flood";
import encourageDisable from "./utils";
import { WithPlanType } from "./utils";

export type PartiallyEstablishedPlan = FloodedPlan & {
  architect?: Architect<any>;
  hops?: readonly never[];
};

export type AnchoredCavern = WithPlanType<
  FloodedCavern,
  PartiallyEstablishedPlan
> & { anchor: number };

export default function anchor(cavern: FloodedCavern): AnchoredCavern {
  const architects = encourageDisable(ARCHITECTS, cavern);

  // const gravities: number[] = cavern.plans
  //   .map((plan) => {
  //     if (plan.kind === "cave") {
  //       return Math.min(...plan.path.baseplates.map(bp => Math.hypot(...bp.center))) / cavern.context.anchorGravity;
  //     }
  //     return 1;
  //   });

  // Choose a spawn and an architect for that spawn.
  const anchor = cavern.dice.pickSpawn.weightedChoice(
    architects.flatMap((architect) => {
      if (!architect.anchorBid) {
        return [];
      }
      return cavern.plans
        .filter((p) => p.kind === "cave")
        .map((plan) => ({
          item: { ...plan, architect, hops: [] },
          bid: architect.anchorBid!({ cavern, plan }) || 0, // * gravities[plan.id],
        }));
    }),
  );

  const plans: PartiallyEstablishedPlan[] = [...cavern.plans];
  plans[anchor.id] = anchor;

  return { ...cavern, anchor: anchor.id, plans };
}
