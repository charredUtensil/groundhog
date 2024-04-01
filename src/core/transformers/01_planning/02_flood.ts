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
  readonly skipChance: number
  remaining: number
  stack: MeasuredPlan[]
}

function getLakes(cavern: PartialPlannedCavern<MeasuredPlan>, rng: PseudorandomStream): readonly Lake[] {
  const plans = rng.shuffle(cavern.plans.filter(plan => plan.kind === 'cave'))

  const h = (fluid: FluidType, planCount: number, lakeCount: number, skipChance: number) => {
    const stops = planCount > 1
      ? rng.shuffle(new Array(planCount - 1).fill(0).map((_, i) => i + 1)) 
        .filter((_, i) => i < lakeCount - 1)
        .sort()
      : []
    return pairMap([0, ...stops, planCount], (a, b) => (
      {fluid, remaining: b - a - 1, skipChance, stack: [plans.pop()!]}
    ))
  }
  
  return [
    ...h(Tile.WATER, cavern.context.waterPlans, cavern.context.waterLakes, 0.2),
    ...h(Tile.LAVA, cavern.context.lavaPlans, cavern.context.lavaLakes, 0.2),
  ]
}

export default function flood(
  cavern: PartialPlannedCavern<MeasuredPlan>,
): PartialPlannedCavern<FloodedPlan> {
  const rng = cavern.dice.flood;
  const lakes = getLakes(cavern, rng)
  const fluids: (FluidType | undefined)[] = []
  const claims: (Lake | 'none' | undefined)[] = []
  for (const lake of lakes) {
    claims[lake.stack[0].id] = lake
  }
  let working = true;
  while (working) {
    working = false;
    for (const lake of lakes) {
      if (lake.remaining <= 0 || lake.stack.length === 0) {
        continue
      }
      const plan = lake.stack.pop()!
      if (claims[plan.id] !== lake) {
        continue
      }
      working = true
      if (lake.stack.length > 0 && rng.chance(lake.skipChance)) {
        lake.stack.unshift(plan)
        continue
      }
      lake.remaining--
      fluids[plan.id] = lake.fluid
      plan.intersects
        .map((_, i) => cavern.plans[i])
        .filter(p => p.kind !== plan.kind)
        .forEach(p => {
          if (claims[p.id]) {
            if (claims[p.id] !== lake) {
              claims[p.id] = 'none'
            }
          } else {
            claims[p.id] = lake
            lake.stack.push(p)
          }
        })
    }
  }
  
  const plans = cavern.plans.map(plan => ({
    ...plan,
    fluid: fluids[plan.id] ?? null,
    hasErosion: false
  }))
  return { ...cavern, plans };
}
