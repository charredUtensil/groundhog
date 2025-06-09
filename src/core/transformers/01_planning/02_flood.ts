import { FluidType, Tile } from "../../models/tiles";
import { MeasuredCavern, MeasuredPlan } from "./01_measure";
import { PseudorandomStream } from "../../common";
import { pairMap } from "../../common/utils";
import { WithPlanType } from "./utils";

export type FloodedPlan = MeasuredPlan & {
  /** What kind of fluid is present in this plan. */
  readonly fluid: FluidType;
  /**
   * How many contiguous plans have the same fluid?
   * For plans without fluid, how many contiguous plans have no fluid?
   */
  readonly lakeSize: number;
  /** Should this plan contain erosion? */
  readonly hasErosion: boolean;
};

export type FloodedCavern = WithPlanType<MeasuredCavern, FloodedPlan>;

type Lake = {
  readonly fluid: FluidType;
  readonly skipChance: number;
  remaining: number;
  stack: MeasuredPlan[];
};

function getLakes(
  cavern: MeasuredCavern,
  rng: PseudorandomStream,
): readonly Lake[] {
  const plans = rng.shuffle(
    cavern.plans.filter((plan) => plan.kind === "cave"),
  );

  const h = (
    fluid: FluidType,
    planCount: number,
    lakeCount: number,
    skipChance: number,
  ) => {
    if (planCount < 1) {
      return [];
    }
    const stops = rng
      .shuffle(Array.from({ length: planCount - 1 }, (_, i) => i + 1))
      .filter((_, i) => i < lakeCount - 1)
      .sort();
    return pairMap([0, ...stops, planCount], (a, b) => ({
      fluid,
      remaining: b - a,
      skipChance,
      stack: [plans.pop()!],
    }));
  };

  return [
    ...h(Tile.WATER, cavern.context.waterPlans, cavern.context.waterLakes, 0.2),
    ...h(Tile.LAVA, cavern.context.lavaPlans, cavern.context.lavaLakes, 0.2),
  ];
}

// Measures the final size of all lakes.
function measureLakes(
  cavern: MeasuredCavern,
  fluids: (FluidType | undefined)[],
) {
  const results: number[] = [];
  for (let i = 0; i < cavern.plans.length; i++) {
    if (results[i]) {
      continue;
    }
    const queue = [i];
    const out = [];
    while (queue.length) {
      const j = queue.shift()!;
      if (results[j]) {
        continue;
      }
      results[j] = Infinity;
      out.push(j);
      queue.push(
        ...cavern.plans[j].intersects
          .map((_, k) => k)
          .filter((k) => fluids[k] === fluids[i]),
      );
    }
    out.forEach((j) => (results[j] = out.length));
  }
  return results;
}

export default function flood(cavern: MeasuredCavern): FloodedCavern {
  const rng = cavern.dice.flood;
  const lakes = getLakes(cavern, rng);
  const fluids: (FluidType | undefined)[] = [];
  const claims: (Lake | "none" | "erosion" | undefined)[] = [];
  for (const lake of lakes) {
    claims[lake.stack[0].id] = lake;
  }
  let working = true;
  while (working) {
    working = false;
    for (const lake of lakes) {
      if (lake.remaining <= 0 || lake.stack.length === 0) {
        continue;
      }
      const plan = lake.stack.pop()!;
      if (claims[plan.id] !== lake) {
        continue;
      }
      working = true;
      if (lake.stack.length > 0 && rng.chance(lake.skipChance)) {
        lake.stack.unshift(plan);
        continue;
      }
      lake.remaining--;
      fluids[plan.id] = lake.fluid;
      plan.intersects
        .map((_, i) => cavern.plans[i])
        .filter((p) => p.kind !== plan.kind)
        .forEach((p) => {
          if (claims[p.id]) {
            if (claims[p.id] !== lake) {
              claims[p.id] = "none";
            }
          } else {
            claims[p.id] = lake;
            lake.stack.push(p);
          }
        });
    }
  }
  const erosion: true[] = [];
  const erodeQueue: MeasuredPlan[] = [
    ...lakes.flatMap((lake) => (lake.fluid === Tile.LAVA ? lake.stack : [])),
    ...fluids.flatMap((f, i) => (f === Tile.LAVA ? [cavern.plans[i]] : [])),
  ];
  for (
    let remaining = cavern.context.erosionPlans;
    remaining >= 0 && erodeQueue.length > 0;
    remaining--
  ) {
    const [plan] = erodeQueue.splice(
      rng.uniformInt({ min: 0, max: erodeQueue.length }),
      1,
    );
    erosion[plan.id] = true;
    plan.intersects
      .map((_, i) => cavern.plans[i])
      .filter((p) => p.kind !== plan.kind)
      .forEach((p) => {
        if (!claims[p.id]) {
          claims[p.id] = "erosion";
          erodeQueue.push(p);
        }
      });
  }

  const lakeSizes = measureLakes(cavern, fluids);

  const plans = cavern.plans.map((plan) => ({
    ...plan,
    fluid: fluids[plan.id] ?? null,
    lakeSize: lakeSizes[plan.id],
    hasErosion: !!erosion[plan.id],
  }));
  return { ...cavern, plans };
}
