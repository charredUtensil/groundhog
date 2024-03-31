import { PartialPlannedCavern } from "./00_negotiate";
import { FluidType, Tile } from "../../models/tiles";
import { MeasuredPlan } from "./01_measure";
import { PseudorandomStream } from "../../common";
import { pairMap } from "../../common/utils";

export type FloodedPlan = MeasuredPlan & {
  /** What kind of fluid is present in this plan. */
  readonly fluid: FluidType;
  /** Should this plan contain erosion? */
  readonly hasErosion: boolean;
};

type Lake = {
  readonly fluid: FluidType
  readonly origin: MeasuredPlan
  readonly size: number
  readonly skipChance: number
}

function getLakes(cavern: PartialPlannedCavern<MeasuredPlan>, rng: PseudorandomStream): readonly Lake[] {
  const plans = rng.shuffle(cavern.plans.filter(plan => plan.kind === 'cave'))

  const h = (fluid: FluidType, planCount: number, lakeCount: number) => {
    const stops = rng.shuffle([0].fill(0, 0, planCount - 1).map((_, i) => i + 1))
      .filter((_, i) => i < lakeCount - 1)
      .sort()
    return pairMap([0, ...stops, planCount], (a, b) => (
      {fluid, origin: plans.pop()!, size: b - a, skipChance: 0.2}
    ))
  }
  
  return [
    ...h(Tile.WATER, cavern.context.waterPlans, cavern.context.waterLakes),
    ...h(Tile.LAVA, cavern.context.lavaPlans, cavern.context.lavaLakes),
  ]
}

export default function flood(
  cavern: PartialPlannedCavern<MeasuredPlan>,
): PartialPlannedCavern<FloodedPlan> {
  const rng = cavern.dice.flood;
  const lakes = getLakes(cavern, rng)
  const fluids: (FluidType | undefined)[] = []
  const bufferZone: (Lake | 'none' | undefined)[] = []
  for (const lake of lakes) {
    bufferZone[lake.origin.id] = lake
    lake.origin.intersects.forEach((v, i) => {
      if (v) {
        bufferZone[i] = (bufferZone[i] === undefined ? lake : 'none')
      }
    })
  }
  for (const lake of lakes) {
    const stack: MeasuredPlan[] = [lake.origin]
    for (let i = 0; i < lake.size;) {
      const plan = stack.pop()
      if (!plan) {
        break
      }
      if (rng.chance(lake.skipChance)) {
        stack.unshift(plan)
        continue
      }
      fluids[plan.id] = lake.fluid
      i++
      stack.push(...plan.intersects
        .map((_, i) => cavern.plans[i])
        .filter(p => (
          fluids[p.id] === undefined &&
          p.kind !== plan.kind &&
          (bufferZone[p.id] === undefined || bufferZone[p.id] === lake) &&
          !stack.some(sp => sp.id === p.id)
        ))
      )
    }
    for (const plan of stack) {
      fluids[plan.id] = null
    }
  }
  
  const plans = cavern.plans.map(plan => ({
    ...plan,
    fluid: fluids[plan.id] ?? null,
    hasErosion: false
  }))
  return { ...cavern, plans };
}
