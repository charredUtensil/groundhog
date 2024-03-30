import { PartialPlannedCavern } from "./00_negotiate";
import { FluidType, Tile } from "../../models/tiles";
import { MeasuredPlan } from "./01_measure";
import { PseudorandomStream } from "../../common";

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
  const caves = rng.shuffle(cavern.plans.filter(plan => plan.kind === 'cave'))
  const waterLakeCount = 3
  const lavaLakeCount = 2

  const lakes: Lake[] = []
  for (let i = 0; i < waterLakeCount; i++) {
    lakes.push({fluid: Tile.WATER, origin: caves.pop()!, size: 3, skipChance: 0.2})
  }
  for (let i = 0; i < lavaLakeCount; i++) {
    lakes.push({fluid: Tile.LAVA, origin: caves.pop()!, size: 3, skipChance: 0.2})
  }
  return lakes
}

export default function flood(
  cavern: PartialPlannedCavern<MeasuredPlan>,
): PartialPlannedCavern<FloodedPlan> {
  const rng = cavern.dice.flood;
  const lakes = getLakes(cavern, rng)
  const fluids: (FluidType | undefined)[] = []
  for (const lake of lakes) {
    fluids[lake.origin.id] = lake.fluid
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
