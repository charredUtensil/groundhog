import { Architect } from "../../models/architect";
import { PartialPlannedCavern } from "./00_negotiate";
import { PearledPlan } from "./04_pearl";

export type PrimedPlan = PearledPlan & {metadata: unknown}

export default function prime(cavern: PartialPlannedCavern<PearledPlan>): PartialPlannedCavern<PrimedPlan> {
  function fn<T>(plan: PearledPlan & {architect: Architect<T>}): PrimedPlan {
    return {...plan, metadata: plan.architect.prime({cavern, plan})}
  }
  const plans: PrimedPlan[] = cavern.plans.map(fn)
  return {...cavern, plans}
}