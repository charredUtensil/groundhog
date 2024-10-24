import { EnscribedCavern } from "./02_enscribe";

export type PreprogrammedCavern = EnscribedCavern & {
  ownsScriptOnDiscover: number[];
  anchorHoldCreatures: boolean;
};

export default function preprogram(
  cavern: EnscribedCavern,
): PreprogrammedCavern {
  const claims: { planId: number; priority: number }[] = [];
  cavern.plans.forEach((plan) => {
    plan.architect
      .claimEventOnDiscover({ cavern, plan })
      .forEach(({ pos, dz, priority }) => {
        dz = dz ?? (pos && cavern.discoveryZones.get(...pos));
        if (
          dz &&
          !dz.openOnSpawn &&
          priority < (claims[dz.id]?.priority ?? Infinity)
        ) {
          claims[dz.id] = { priority, planId: plan.id };
        }
      });
  });
  const ownsScriptOnDiscover: number[] = [];
  claims.forEach(({ planId }, dzId) => (ownsScriptOnDiscover[dzId] = planId));

  const anchor = cavern.plans[cavern.anchor];
  const anchorHoldCreatures = !!anchor.architect.holdCreatures?.({cavern, plan: anchor});

  return { ...cavern, ownsScriptOnDiscover, anchorHoldCreatures };
}
