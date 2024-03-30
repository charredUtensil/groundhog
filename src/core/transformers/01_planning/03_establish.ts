import { ARCHITECTS } from "../../architects";
import { Curve } from "../../common";
import { Architect } from "../../models/architect";
import { PartialPlannedCavern } from "./00_negotiate";
import { FloodedPlan } from "./02_flood";

type SortedPlan = {
  plan: FloodedPlan & { architect?: Architect<unknown> };
  hops: number;
  index: number;
};
export type ArchitectedPlan = FloodedPlan & {
  /** The architect to use to build out the plan. */
  readonly architect: Architect<unknown>;
  readonly crystalRichness: number;
  readonly oreRichness: number;
  readonly monsterSpawnRate: number;
  readonly monsterWaveSize: number;
};
export type EstablishedPlan = ArchitectedPlan & {
  /** How blobby the pearl should be. */
  readonly baroqueness: number;
  /** How many crystals the Plan will add. */
  readonly crystals: number;
  /** How many ore the Plan will add. */
  readonly ore: number;
};

type CurveProps = { hops: number; order: number };

function curved(curve: Curve, props: CurveProps): number {
  return curve.base + curve.hops * props.hops + curve.order * props.order;
}

export default function establish(
  cavern: PartialPlannedCavern<FloodedPlan>,
): PartialPlannedCavern<EstablishedPlan> {
  // Choose a spawn and an architect for that spawn.
  const spawn = cavern.dice.pickSpawn.weightedChoice(
    ARCHITECTS.filter((architect) => architect.spawnBid).flatMap((architect) =>
      cavern.plans
        .filter((p) => p.kind === "cave")
        .map((plan) => ({
          item: { ...plan, architect },
          bid: architect.spawnBid!({ cavern, plan }) || 0,
        })),
    ),
  );

  // Sort the plans in a breadth-first search order, starting from spawn and
  // annotating each with the index and the number of "hops" it is away from
  // the spawn.
  function sortPlans(): SortedPlan[] {
    const isQueued: boolean[] = [];
    isQueued[spawn.id] = true;
    const queue: { plan: FloodedPlan; hops: number }[] = [
      { plan: spawn, hops: 0 },
    ];
    const result: SortedPlan[] = [];

    for (let index = 0; queue.length > 0; index++) {
      const { plan, hops } = queue.shift()!;

      const neighbors = plan.intersects
        .map((b, id) => (b ? id : -1))
        .filter((id) => (
          id >= 0 &&
          !isQueued[id] &&
          cavern.plans[id].kind !== plan.kind
        ));
      neighbors.forEach((id) => (isQueued[id] = true));
      queue.push(
        ...neighbors.map((id) => ({ plan: cavern.plans[id], hops: hops + 1 })),
      );
      result.push({ plan, hops, index });
    }
    return result;
  }
  const inOrder = sortPlans();

  const plans: (FloodedPlan | EstablishedPlan)[] = cavern.plans.slice();
  let totalCrystals = 0;

  const { hops: maxHops, index: maxIndex } = inOrder[inOrder.length - 1];
  function doArchitect({ plan, hops, index }: SortedPlan): ArchitectedPlan {
    const props = { hops: hops / maxHops, order: index / maxIndex };
    const architect =
      plan.architect ||
      cavern.dice.pickArchitect(plan.id).weightedChoice(
        ARCHITECTS.map((architect) => {
          const bid =
            plan.kind === "cave" ? architect.caveBid : architect.hallBid;
          return {
            item: architect,
            bid: bid?.({ cavern, plan, plans, hops, totalCrystals }) || 0,
          };
        }),
      );
    const crystalRichness = curved(
      plan.kind === "cave"
        ? cavern.context.caveCrystalRichness
        : cavern.context.hallCrystalRichness,
      props,
    );
    const oreRichness = curved(
      plan.kind === "cave"
        ? cavern.context.caveOreRichness
        : cavern.context.hallOreRichness,
      props,
    );
    const monsterSpawnRate = curved(cavern.context.monsterSpawnRate, props);
    const monsterWaveSize = curved(cavern.context.monsterWaveSize, props);
    return {
      ...plan,
      architect,
      crystalRichness,
      oreRichness,
      monsterSpawnRate,
      monsterWaveSize,
    };
  }
  function doEstablish(plan: ArchitectedPlan) {
    const args = { cavern, plan, totalCrystals };
    const baroqueness = plan.architect.baroqueness(args);
    const crystals = Math.round(plan.architect.crystals(args));
    totalCrystals += crystals;
    const ore = Math.round(plan.architect.ore(args));
    const established: EstablishedPlan = {
      ...plan,
      baroqueness,
      crystals,
      ore,
    };
    plans[plan.id] = established;
  }
  inOrder.forEach((path) => doEstablish(doArchitect(path)));

  return { ...cavern, plans: plans as EstablishedPlan[] };
}
