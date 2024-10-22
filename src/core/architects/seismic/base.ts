import {
  SEISMIC_FORESHADOW,
  SEISMIC_FORESHADOW_AGAIN,
} from "../../lore/graphs/seismic";
import { LoreDie } from "../../lore/lore";
import { Architect, BaseMetadata } from "../../models/architect";
import { mkVars, scriptFragment } from "../utils/script";

export const METADATA = { tag: "seismic" } as const satisfies BaseMetadata;

export const gSeismic = mkVars("gSeismic", ["showMessage", "msg"]);

export const SEISMIC_BASE: Pick<
  Architect<typeof METADATA>,
  "prime" | "scriptGlobals"
> = {
  prime: () => METADATA,
  scriptGlobals: ({ cavern, sh }) => {
    const rng = cavern.dice.lore(LoreDie.seismicForeshadow);
    const seismicCount = cavern.plans.reduce(
      (r, plan) => (plan.metadata?.tag === "seismic" ? r + 1 : r),
      0,
    );
    return scriptFragment(
      "# Globals: Seismic",
      sh.declareInt(gSeismic.showMessage, 0),
      sh.declareString(`${gSeismic.msg}1`, {
        rng,
        pg: SEISMIC_FORESHADOW,
      }),
      `if(${gSeismic.showMessage}==1)[msg:${gSeismic.msg}1]`,
      seismicCount > 1 &&
        scriptFragment(
          sh.declareString(`${gSeismic.msg}2`, {
            rng,
            pg: SEISMIC_FORESHADOW_AGAIN,
          }),
          `if(${gSeismic.showMessage}==2)[msg:${gSeismic.msg}2]`,
        ),
      seismicCount > 2 &&
        scriptFragment(
          sh.declareString(`${gSeismic.msg}3`, {
            rng,
            pg: SEISMIC_FORESHADOW_AGAIN,
          }),
          `when(${gSeismic.showMessage}>=3)[msg:${gSeismic.msg}3]`,
        ),
    );
  },
};
