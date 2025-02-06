import { EventChainLine, mkVars, ScriptBuilder } from "./script";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

export const gObjectives = mkVars("objectives", ["res", "met", "won"]);

export function objectiveGlobals({
  cavern: { objectives },
  sb,
}: {
  cavern: PreprogrammedCavern;
  sb: ScriptBuilder;
}) {
  const resources = (["crystals", "ore", "studs"] as const).filter(
    (r) => objectives[r] > 0,
  );
  const goalCount = (resources.length ? 1 : 0) + objectives.variables.length;
  sb.declareInt(gObjectives.met, 0);
  sb.declareInt(gObjectives.won, 0);
  if (!resources.length) {
    // No resource goals. Skip.
  } else if (resources.length === 1) {
    // One resource goal. When met, mark objective as completed.
    sb.if(
      `${resources[0]}>=${objectives[resources[0]]}`,
      `${gObjectives.met}+=1;`,
    );
  } else {
    // Multiple resource goals. Must check all are satisfied simultaneously.
    sb.declareInt(gObjectives.res, 0);
    resources.forEach((resource) =>
      sb.when(
        `${resource}>=${objectives[resource]}`,
        ...resources.map(
          (r) =>
            r !== resource &&
            (`((${r}<${objectives[r]}))return;` as EventChainLine),
        ),
        `${gObjectives.res}=1;`,
      ),
    );
    sb.if(`${gObjectives.res}>0`, `${gObjectives.met}+=1;`);
  }
  sb.if(`${gObjectives.met}>=${goalCount}`, `${gObjectives.won}=1;`);
}
