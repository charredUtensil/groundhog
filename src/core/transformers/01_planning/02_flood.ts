import { PartialPlannedCavern } from "./00_negotiate";
import { FluidType } from "../../models/tiles";
import { MeasuredPlan } from "./01_measure";

export type FloodedPlan = MeasuredPlan & {
  /** What kind of fluid is present in this plan. */
  readonly fluid: FluidType;
  /** Should this plan contain erosion? */
  readonly hasErosion: boolean;
};

export default function flood(
  cavern: PartialPlannedCavern<MeasuredPlan>,
): PartialPlannedCavern<FloodedPlan> {
  const rng = cavern.dice.flood;
  const plans = cavern.plans.map((plan) => {
    const fluid = null;
    const hasErosion = false;
    return { ...plan, fluid, hasErosion };
  });
  return { ...cavern, plans };
}

