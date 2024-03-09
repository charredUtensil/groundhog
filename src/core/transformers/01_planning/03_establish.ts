import { SimpleSpawn } from "../../architects/simple_spawn";
import { Curve } from "../../common";
import { Architect } from "../../models/architect";
import { CavernWithPartialPlans } from "../../models/cavern";
import { Architected, Established, Flooded } from "../../models/plan";

type Sorted = {
  plan: Flooded & { architect?: Architect };
  hops: number;
  index: number;
};
type CurveProps = { hops: number; order: number };

function curved(curve: Curve, props: CurveProps): number {
  return curve.base + curve.hops * props.hops + curve.order * props.order;
}

export default function establish(
  cavern: CavernWithPartialPlans<Flooded>,
): CavernWithPartialPlans<Established> {
  const rng = cavern.context.dice.conquest;

  function pickSpawn(): Sorted["plan"] {
    return {
      ...cavern.plans[25],
      architect: SimpleSpawn,
    };
  }
  const spawn = pickSpawn();

  function* sortPlans(): Generator<Sorted> {
    const isQueued: boolean[] = [];
    isQueued[spawn.id] = true;
    const queue: { plan: Flooded; hops: number }[] = [{ plan: spawn, hops: 0 }];

    for (let index = 0; queue.length > 0; index++) {
      const { plan, hops } = queue.shift()!;
      yield { plan, hops, index };
      queue.push(
        ...spawn.intersects
          .map((b, id) => (b ? id : -1))
          .filter((id) => id && !isQueued[id])
          .sort((a, b) => b - a)
          .map((id) => ({ plan: cavern.plans[id], hops: hops + 1 })),
      );
    }
  }
  const inOrder = [...sortPlans()];

  const plans: Established[] = [];
  let totalCrystals = 0;

  const { hops: maxHops, index: maxIndex } = inOrder[inOrder.length - 1];
  function doArchitect({ plan, hops, index }: Sorted): Architected {
    const props = { hops: hops / maxHops, order: index / maxIndex };
    const architect = plan.architect || SimpleSpawn;
    const crystalRichness = curved(
      plan.kind === "cave"
        ? cavern.context.caveCrystalRichness
        : cavern.context.hallCrystalRichness,
      props,
    );
    return { ...plan, architect, crystalRichness };
  }
  function doEstablish(plan: Architected) {
    const args = { ...cavern, plan, totalCrystals };
    const baroqueness = plan.architect.baroqueness(args);
    const crystals = plan.architect.crystals(args);
    totalCrystals += crystals;
    plans[plan.id] = { ...plan, baroqueness, crystals };
  }
  inOrder.forEach((path) => doEstablish(doArchitect(path)));

  return { ...cavern, plans };
}
