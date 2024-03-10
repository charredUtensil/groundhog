import { CavernWithPartialPlans } from "../../models/cavern";
import { Measured, Flooded } from "../../models/plan";

export default function flood(
  cavern: CavernWithPartialPlans<Measured>,
): CavernWithPartialPlans<Flooded> {
  const rng = cavern.dice.flood;
  const plans = cavern.plans.map((plan) => {
    const fluid = null;
    const hasErosion = false;
    return { ...plan, fluid, hasErosion };
  });
  return { ...cavern, plans };
}
