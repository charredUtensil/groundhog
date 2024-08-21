import { EnscribedCavern } from "./02_enscribe";

export type PreprogrammedCavern = EnscribedCavern & {
  ownsScriptOnDiscover: number[];
};

export default function preprogram(cavern: EnscribedCavern): PreprogrammedCavern {
  const claims: { planId: number, priority: number }[] = [];
  cavern.plans.forEach(plan => {
    plan.architect.claimEventOnDiscover({ cavern, plan }).forEach((priority, dzId) => {
      if (priority < (claims[dzId]?.priority ?? Infinity)) {
        claims[dzId] = { priority, planId: plan.id };
      }
    });
  });
  const ownsScriptOnDiscover: number[] = [];
  claims.forEach(({ planId }, dzId) => ownsScriptOnDiscover[dzId] = planId);
  return {...cavern, ownsScriptOnDiscover};
}