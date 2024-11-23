import { mkVars, ScriptBuilder } from "./script";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

export const gObjectives = mkVars("objectives", ["met", "won"]);

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
  const goalCount = resources.length + objectives.variables.length;
  sb.declareInt(gObjectives.met, 0);
  sb.declareInt(gObjectives.won, 0);
  resources.forEach((resource) =>
    sb.if(`${resource}>=${objectives[resource]}`, `${gObjectives.met}+=1;`),
  );
  sb.if(`${gObjectives.met}>=${goalCount}`, `${gObjectives.won}=1;`);
}
