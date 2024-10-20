import {
  SEISMIC_FORESHADOW,
  SEISMIC_FORESHADOW_AGAIN,
} from "../../lore/graphs/seismic";
import { LoreDie } from "../../lore/lore";
import { Architect, BaseMetadata } from "../../models/architect";
import { mkVars, scriptFragment } from "../utils/script";

export const METADATA = { tag: "fissure" } as const satisfies BaseMetadata;

export const gFissure = mkVars("gFissure", ["showMessage", "msg"]);

export const FISSURE_BASE: Pick<
  Architect<typeof METADATA>,
  "prime" | "scriptGlobals"
> = {
  prime: () => METADATA,
  scriptGlobals: ({ cavern, sh }) => {
    const rng = cavern.dice.lore(LoreDie.seismicForeshadow);
    const fissureCount = cavern.plans.reduce(
      (r, plan) => (plan.metadata?.tag === "fissure" ? r + 1 : r),
      0,
    );
    return scriptFragment(
      "# Globals: Fissure",
      sh.declareInt(gFissure.showMessage, 0),
      sh.declareString(`${gFissure.msg}1`, {
        rng,
        pg: SEISMIC_FORESHADOW,
      }),
      `if(${gFissure.showMessage}==1)[msg:${gFissure.msg}1]`,
      fissureCount > 1 &&
        scriptFragment(
          sh.declareString(`${gFissure.msg}2`, {
            rng,
            pg: SEISMIC_FORESHADOW_AGAIN,
          }),
          `if(${gFissure.showMessage}==2)[msg:${gFissure.msg}2]`,
        ),
      fissureCount > 2 &&
        scriptFragment(
          sh.declareString(`${gFissure.msg}3`, {
            rng,
            pg: SEISMIC_FORESHADOW_AGAIN,
          }),
          `when(${gFissure.showMessage}>=3)[msg:${gFissure.msg}3]`,
        ),
    );
  },
};
