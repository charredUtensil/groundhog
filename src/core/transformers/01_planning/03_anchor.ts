import { ARCHITECTS } from "../../architects";
import { Architect } from "../../models/architect";
import { FloodedCavern, FloodedPlan } from "./02_flood";
import encourageDisable from "./utils";
import { WithPlanType } from "./utils";

export type OrderedPlan = FloodedPlan & {
  architect?: Architect<any>;
  hops: readonly number[];
};

export type AnchoredCavern = WithPlanType<
  FloodedCavern,
  FloodedPlan | OrderedPlan
> & { anchor: number };

export default function anchor(cavern: FloodedCavern): AnchoredCavern {
  const architects = encourageDisable(ARCHITECTS, cavern);

  // Choose a spawn and an architect for that spawn.
  const anchor = cavern.dice.pickSpawn.weightedChoice(
    architects
      .filter((architect) => architect.anchorBid)
      .flatMap((architect) =>
        cavern.plans
          .filter((p) => p.kind === "cave")
          .map((plan) => ({
            item: { ...plan, architect, hops: [] },
            bid: architect.anchorBid!({ cavern, plan }) || 0,
          })),
      ),
  );

  const plans: (FloodedPlan | OrderedPlan)[] = [...cavern.plans];
  plans[anchor.id] = anchor;

  return { ...cavern, anchor: anchor.id, plans };
}
