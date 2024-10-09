import { SEISMIC_FORESHADOW, SEISMIC_FORESHADOW_AGAIN } from "../../lore/graphs/seismic";
import { LoreDie } from "../../lore/lore";
import { Architect, BaseMetadata } from "../../models/architect";
import { declareStringFromLore, eventChain, mkVars, scriptFragment } from "../utils/script";

export const METADATA = { tag: "fissure" } as const satisfies BaseMetadata;

export const gFissure = mkVars('gFissure', ['messageCount', 'doMessage', 'msg'])

export const FISSURE_BASE: Pick<Architect<typeof METADATA>, 'prime' | 'scriptGlobals'> = {
  prime: () => METADATA,
  scriptGlobals: (({cavern}) => {
    const rng = cavern.dice.lore(LoreDie.seismicForeshadow);
    const fissureCount = cavern.plans.reduce(
      (r, plan) => plan.metadata?.tag === 'fissure' ? r + 1 : r, 0);
    return scriptFragment(
      `# Globals: Fissure x${fissureCount}`,
      declareStringFromLore(
        cavern,
        rng,
        `${gFissure.msg}0`,
        SEISMIC_FORESHADOW,
        {},
        {},
      ),
      fissureCount > 1 ? scriptFragment(
        `int ${gFissure.messageCount}=0`,
        declareStringFromLore(
          cavern,
          rng,
          `${gFissure.msg}1`,
          SEISMIC_FORESHADOW_AGAIN,
          {},
          {},
        ),
        fissureCount > 2 && 
        declareStringFromLore(
          cavern,
          rng,
          `${gFissure.msg}2`,
          SEISMIC_FORESHADOW_AGAIN,
          {},
          {},
        ),
        eventChain(
          gFissure.doMessage,
          `((${gFissure.messageCount}=0))msg:${gFissure.msg}0;`,
          `((${gFissure.messageCount}=1))msg:${gFissure.msg}1;`,
          fissureCount > 2 && `((${gFissure.messageCount}>=2))msg:${gFissure.msg}2;`,
          `${gFissure.messageCount}+=1;`,
        ),
      ) : eventChain(
        gFissure.doMessage,
        `msg:${gFissure.msg}0;`,
      )
    );
  })
}