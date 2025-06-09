import { ARCHITECTS, AnyMetadata } from "../../architects";
import encourageDisable from "./utils";
import { Curve } from "../../common";
import { CollapseUnion } from "../../common/utils";
import { Architect, BaseMetadata } from "../../models/architect";
import { AnchoredCavern, PartiallyEstablishedPlan } from "./03_anchor";
import { ModdedCavern } from "./04_mod";
import { WithPlanType } from "./utils";

export type OrderedPlan = Omit<PartiallyEstablishedPlan, "hops"> & {
  hops: readonly number[];
};

export type ArchitectedPlan<T extends BaseMetadata> = OrderedPlan & {
  /** The architect to use to build out the plan. */
  readonly architect: Architect<T>;
  readonly metadata: T;
  readonly crystalRichness: number;
  readonly oreRichness: number;
  readonly monsterSpawnRate: number;
  readonly monsterWaveSize: number;
};
export type EstablishedPlan<T extends BaseMetadata> = ArchitectedPlan<T> & {
  /** How blobby the pearl should be. */
  readonly baroqueness: number;
  /** How many crystals the Plan will add. */
  readonly crystals: number;
  /** How many ore the Plan will add. */
  readonly ore: number;
};

export type OrderedOrEstablishedPlan = CollapseUnion<
  OrderedPlan | EstablishedPlan<AnyMetadata>
>;

export type EstablishedCavern = WithPlanType<
  ModdedCavern,
  EstablishedPlan<AnyMetadata>
>;

// Sort the plans in a breadth-first search order and log the hops they take.
export function orderPlans(
  plans: readonly PartiallyEstablishedPlan[],
): OrderedPlan[] {
  const queue = plans.filter((plan) => "hops" in plan) as OrderedPlan[];
  const isQueued: true[] = [];
  queue.forEach((plan) => (isQueued[plan.id] = true));

  for (let i = 0; i < plans.length; i++) {
    const plan = queue[i];
    if (!plan) {
      throw new Error("Failed to order all plans. (Is the graph disjoint?)");
    }

    const neighbors = plan.intersects
      .map((b, id) => (b ? id : -1))
      .filter((id) => id >= 0 && !isQueued[id] && plans[id].kind !== plan.kind);
    neighbors.forEach((id) => (isQueued[id] = true));
    queue.push(
      ...neighbors.map((id) => ({
        ...plans[id],
        hops: [...plan.hops, plan.id],
      })),
    );
  }
  return queue;
}

type CurveProps = { hops: number; order: number };

function curved(curve: Curve, props: CurveProps): number {
  return curve.base + curve.hops * props.hops + curve.order * props.order;
}

export default function establish(cavern: AnchoredCavern): EstablishedCavern {
  const architects = encourageDisable(ARCHITECTS, cavern);
  const inOrder = orderPlans(cavern.plans);
  const plans: OrderedOrEstablishedPlan[] = [];
  inOrder.forEach((plan) => (plans[plan.id] = plan));

  let totalCrystals = 0;
  const maxIndex = inOrder.length - 1;
  const maxHops = inOrder[inOrder.length - 1].hops.length;

  function doArchitect<T extends AnyMetadata>(
    plan: OrderedPlan,
    index: number,
  ): ArchitectedPlan<T> {
    const props = { hops: plan.hops.length / maxHops, order: index / maxIndex };
    const architect = (plan.architect ||
      cavern.dice.pickArchitect(plan.id).weightedChoice(
        architects.map((architect) => {
          const bid =
            plan.kind === "cave" ? architect.caveBid : architect.hallBid;
          return {
            item: architect,
            bid:
              bid?.({ cavern, plan, plans, hops: plan.hops, totalCrystals }) ||
              0,
          };
        }),
      )) as Architect<T>;
    const metadata = architect.prime({ cavern, plan });
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
      metadata,
      crystalRichness,
      oreRichness,
      monsterSpawnRate,
      monsterWaveSize,
    };
  }
  function doEstablish<T extends AnyMetadata>(plan: ArchitectedPlan<T>) {
    const args = { cavern, plan, totalCrystals };
    const baroqueness = plan.architect.baroqueness(args);
    const crystals = Math.round(
      plan.architect.crystalsToPlace(args) +
        plan.architect.crystalsFromMetadata(plan.metadata),
    );
    totalCrystals += crystals;
    const ore = Math.round(plan.architect.ore(args));
    const established: EstablishedPlan<T> = {
      ...plan,
      baroqueness,
      crystals,
      ore,
    };
    plans[plan.id] = established;
  }
  inOrder.forEach((plan, i) => doEstablish(doArchitect(plan, i)));

  return { ...cavern, plans: plans as EstablishedPlan<AnyMetadata>[] };
}
