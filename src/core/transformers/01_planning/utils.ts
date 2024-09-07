import { AnyMetadata } from "../../architects";
import { Architect } from "../../models/architect";
import { BaseCavern } from "../../models/cavern";
import { Plan } from "../../models/plan";

export type WithPlanType<
  CavernT extends BaseCavern,
  PlanT extends Partial<Plan<AnyMetadata>>,
> = Omit<CavernT, "plans"> & {
  readonly plans: readonly PlanT[];
};

export default function encourageDisable<T extends Architect<any>>(
  architects: readonly T[],
  cavern: BaseCavern,
): T[] {
  return architects
    .filter((a) => cavern.context.architects?.[a.name] !== "disable")
    .map((a) => {
      if (cavern.context.architects?.[a.name] === "encourage") {
        const r = { ...a };
        r.caveBid = (args) => !!a.caveBid?.(args) && 999999;
        r.hallBid = (args) => !!a.hallBid?.(args) && 999999;
        r.anchorBid = (args) => !!a.anchorBid?.(args) && 999999;
        return r;
      }
      return a;
    });
}
