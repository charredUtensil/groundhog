import { ARCHITECTS } from "../../architects";
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
  // Choose a spawn and an architect for that spawn.
  const spawn = cavern.dice.pickSpawn.weightedChoice(
    ARCHITECTS.filter((architect) => architect.spawnBid).flatMap((architect) =>
      cavern.plans
        .filter((p) => p.kind === "cave")
        .map((plan) => ({
          item: { ...plan, architect },
          bid: architect.spawnBid?.({ cavern, plan }) ?? 0,
        })),
    ),
  );

  // Sort the plans in a breadth-first search order, starting from spawn and
  // annotating each with the index and the number of "hops" it is away from
  // the spawn.
  function sortPlans(): Sorted[] {
    const isQueued: boolean[] = [];
    isQueued[spawn.id] = true;
    const queue: { plan: Flooded; hops: number }[] = [{ plan: spawn, hops: 0 }];
    const result: Sorted[] = [];

    for (let index = 0; queue.length > 0; index++) {
      const { plan, hops } = queue.shift()!;

      const neighbors = plan.intersects
        .map((b, id) => (b ? id : -1))
        .filter((id) => id >= 0 && !isQueued[id]);
      neighbors.forEach((id) => (isQueued[id] = true));
      queue.push(
        ...neighbors.map((id) => ({ plan: cavern.plans[id], hops: hops + 1 })),
      );
      result.push({ plan, hops, index });
    }
    return result;
  }
  const inOrder = sortPlans();

  const plans: (Flooded | Established)[] = cavern.plans.slice();
  let totalCrystals = 0;

  const { hops: maxHops, index: maxIndex } = inOrder[inOrder.length - 1];
  const architects = ARCHITECTS.filter((architect) => architect.bid);

  function doArchitect({ plan, hops, index }: Sorted): Architected {
    const props = { hops: hops / maxHops, order: index / maxIndex };
    const architect =
      plan.architect ||
      cavern.dice.pickArchitect(plan.id).weightedChoice(
        architects.map((architect) => ({
          item: architect,
          bid: (plan.kind === "cave" ? architect.caveBid : architect.hallBid)({
            cavern,
            plan,
            plans,
            hops,
          }),
        })),
      );
    const crystalRichness = curved(
      plan.kind === "cave"
        ? cavern.context.caveCrystalRichness
        : cavern.context.hallCrystalRichness,
      props,
    );
    return { ...plan, architect, crystalRichness };
  }
  function doEstablish(plan: Architected) {
    const args = { cavern, plan, totalCrystals };
    const baroqueness = plan.architect.baroqueness(args);
    const crystals = Math.round(plan.architect.crystals(args));
    totalCrystals += crystals;
    plans[plan.id] = { ...plan, baroqueness, crystals };
  }
  inOrder.forEach((path) => doEstablish(doArchitect(path)));

  return { ...cavern, plans: plans as Established[] };
}
