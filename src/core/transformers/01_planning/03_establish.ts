import { ARCHITECTS } from "../../architects";
import { Curve } from "../../common";
import { CollapseUnion } from "../../common/utils";
import { Architect } from "../../models/architect";
import { PartialPlannedCavern } from "./00_negotiate";
import { FloodedPlan } from "./02_flood";

type SortedPlan = {
  plan: FloodedPlan & { architect?: Architect<unknown> };
  hops: readonly number[];
  index: number;
};
export type ArchitectedPlan<T> = FloodedPlan & {
  readonly hops: readonly number[];
  /** The architect to use to build out the plan. */
  readonly architect: Architect<T>;
  readonly metadata: T;
  readonly crystalRichness: number;
  readonly oreRichness: number;
  readonly monsterSpawnRate: number;
  readonly monsterWaveSize: number;
};
export type EstablishedPlan = ArchitectedPlan<unknown> & {
  /** How blobby the pearl should be. */
  readonly baroqueness: number;
  /** How many crystals the Plan will add. */
  readonly crystals: number;
  /** How many ore the Plan will add. */
  readonly ore: number;
};

type CurveProps = { hops: number; order: number };

function curved(curve: Curve, props: CurveProps): number {
  return (
    curve.base +
    curve.hops * props.hops +
    curve.order * props.order
  );
}

function encourageDisable(
  architects: readonly Architect<unknown>[],
  cavern: PartialPlannedCavern<FloodedPlan>,
) {
  return architects
    .filter((a) => cavern.context.architects?.[a.name] !== "disable")
    .map((a) => {
      if (cavern.context.architects?.[a.name] === "encourage") {
        const r = { ...a };
        r.caveBid = (args) => !!a.caveBid?.(args) && 999999;
        r.hallBid = (args) => !!a.hallBid?.(args) && 999999;
        r.spawnBid = (args) => !!a.spawnBid?.(args) && 999999;
        return r;
      }
      return a;
    });
}

export default function establish(
  cavern: PartialPlannedCavern<FloodedPlan>,
): PartialPlannedCavern<EstablishedPlan> {
  const architects = encourageDisable(ARCHITECTS, cavern);

  // Choose a spawn and an architect for that spawn.
  const spawn = cavern.dice.pickSpawn.weightedChoice(
    architects
      .filter((architect) => architect.spawnBid)
      .flatMap((architect) =>
        cavern.plans
          .filter((p) => p.kind === "cave")
          .map((plan) => ({
            item: { ...plan, architect },
            bid: architect.spawnBid!({ cavern, plan }) || 0,
          })),
      ),
  );

  // Sort the plans in a breadth-first search order, starting from spawn and
  // annotating each with the index and the hops it takes to get here from spawn.
  function sortPlans(): SortedPlan[] {
    const isQueued: true[] = [];
    isQueued[spawn.id] = true;
    const queue: { plan: FloodedPlan; hops: readonly number[] }[] = [
      { plan: spawn, hops: [] },
    ];
    const result: SortedPlan[] = [];

    for (let index = 0; queue.length > 0; index++) {
      const { plan, hops } = queue.shift()!;

      const neighbors = plan.intersects
        .map((b, id) => (b ? id : -1))
        .filter(
          (id) =>
            id >= 0 && !isQueued[id] && cavern.plans[id].kind !== plan.kind,
        );
      neighbors.forEach((id) => (isQueued[id] = true));
      queue.push(
        ...neighbors.map((id) => ({
          plan: cavern.plans[id],
          hops: [...hops, plan.id],
        })),
      );
      result.push({ plan, hops, index });
    }
    return result;
  }
  const inOrder = sortPlans();

  const plans: CollapseUnion<FloodedPlan | EstablishedPlan>[] =
    cavern.plans.slice();
  let totalCrystals = 0;

  const maxIndex = inOrder.length - 1;
  const maxHops = inOrder[inOrder.length - 1].hops.length;
  function doArchitect({
    plan,
    hops,
    index,
  }: SortedPlan): ArchitectedPlan<any> {
    const props = { hops: hops.length / maxHops, order: index / maxIndex };
    const architect =
      plan.architect ||
      cavern.dice.pickArchitect(plan.id).weightedChoice(
        architects.map((architect) => {
          const bid =
            plan.kind === "cave" ? architect.caveBid : architect.hallBid;
          return {
            item: architect,
            bid: bid?.({ cavern, plan, plans, hops, totalCrystals }) || 0,
          };
        }),
      );
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
      hops,
      architect,
      metadata,
      crystalRichness,
      oreRichness,
      monsterSpawnRate,
      monsterWaveSize,
    };
  }
  function doEstablish<T>(plan: ArchitectedPlan<T>) {
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
  inOrder.forEach((plan) => doEstablish(doArchitect(plan)));

  return { ...cavern, plans: plans as EstablishedPlan[] };
}
