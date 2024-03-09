import { CavernWithPartialPlans } from "../../models/cavern"
import { Measured, Negotiated } from "../../models/plan"

export default function measure(
  cavern: CavernWithPartialPlans<Negotiated>
): CavernWithPartialPlans<Measured> {
  const planIdsByBp: number[][] = []
  cavern.plans.forEach(plan => {
    plan.path.baseplates.forEach(bp => (planIdsByBp[bp.id] ||= []).push(plan.id))
  })
  const plans = cavern.plans.map(plan => {
    const baroqueness = plan.kind === 'cave' ? cavern.context.caveBaroqueness : cavern.context.hallBaroqueness
    const pearlRadius = (plan.kind === 'cave' ? Math.max : Math.min)(
      ...plan.path.baseplates.map(bp => bp.pearlRadius)
    )
    const intersects: boolean[] = []
    plan.path.baseplates
      .flatMap(bp => planIdsByBp[bp.id])
      .filter(plid => plid !== plan.id)
      .forEach(plid => intersects[plid] = true) 
    return {...plan, baroqueness, intersects, pearlRadius}
  })
  return {...cavern, plans}
}