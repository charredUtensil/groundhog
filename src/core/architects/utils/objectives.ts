import { mkVars, scriptFragment, ScriptHelper } from "./script";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

export const gObjectives = mkVars("objectives", ["met", "won"]);

export function objectiveGlobals({ cavern: { objectives }, sh }: { cavern: PreprogrammedCavern; sh: ScriptHelper}) {
  const resources = (["crystals", "ore", "studs"] as const).filter(r => objectives[r] > 0);
  const goalCount = resources.length + objectives.variables.length;
  return scriptFragment(
    "# Globals: Objectives",
    `int ${gObjectives.met}=0`,
    `int ${gObjectives.won}=0`,
    ...resources.map(resource => `if(${resource}>=${objectives[resource]})[${gObjectives.met}+=1]`
    ),
    `if(${gObjectives.met}>=${goalCount})[${gObjectives.won}=1]`,
  );
}
