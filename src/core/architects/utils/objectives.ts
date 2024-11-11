import { mkVars, ScriptBuilder } from "./script";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

export const gObjectives = mkVars("objectives", ["met", "won"]);

export function objectiveGlobals({
  cavern: { objectives },
  sh,
}: {
  cavern: PreprogrammedCavern;
  sh: ScriptBuilder;
}) {
  const resources = (["crystals", "ore", "studs"] as const).filter(
    (r) => objectives[r] > 0,
  );
  const goalCount = resources.length + objectives.variables.length;
  sh.declareInt(gObjectives.met, 0);
  sh.declareInt(gObjectives.won, 0);
  resources.forEach((resource) =>
    sh.if(`${resource}>=${objectives[resource]}`, `${gObjectives.met}+=1;`),
  );
  sh.if(`${gObjectives.met}>=${goalCount}`, `${gObjectives.won}=1;`);
}
