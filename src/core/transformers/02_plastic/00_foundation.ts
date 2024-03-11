import { Grid } from "../../common/grid";
import { CavernWithPlans, CavernWithPlansAndBaseDiorama } from "../../models/cavern";
import { MutableBaseDiorama, emptyDiorama } from "../../models/diorama";

export default function foundation(cavern: CavernWithPlans) : CavernWithPlansAndBaseDiorama {
  const inner = new Grid<boolean[]>()
  const outer = new Grid<boolean[]>()
  cavern.plans.map(plan => {
    plan.innerPearl.forEach(layer => layer.forEach(([x, y]) => {
      const v = inner.get(x, y) || []
      v[plan.id] = true
      inner.set(x, y, v)
    }))
    plan.outerPearl.forEach(layer => layer.forEach(([x, y]) => {
      const v = outer.get(x, y) || []
      v[plan.id] = true
      outer.set(x, y, v)
    }))
  })
  const diorama: MutableBaseDiorama = emptyDiorama()
  inner.forEach((v, x, y) => diorama.put({x, y, intersectsPearlInner: v}))
  outer.forEach((v, x, y) => diorama.put({x, y, intersectsPearlOuter: v}))
  return {...cavern, diorama}
}