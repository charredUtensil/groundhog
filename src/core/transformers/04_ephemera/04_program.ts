import { creatureSpawnGlobals } from "../../architects/utils/creature_spawners";
import { mkScriptBuilder } from "../../architects/utils/script";
import { Architect } from "../../models/architect";
import { PreprogrammedCavern } from "./03_preprogram";
import { objectiveGlobals } from "../../architects/utils/objectives";
import { tileScript } from "../../architects/utils/tile_scripts";

export type ProgrammedCavern = PreprogrammedCavern & {
  readonly script: string;
};

export default function program(cavern: PreprogrammedCavern): ProgrammedCavern {
  // All unique globals function objects
  const globalsFns = Array.from(
    cavern.plans.reduce(
      (r: NonNullable<Architect<any>["scriptGlobals"]>[], plan) => {
        const fn = plan.architect.scriptGlobals;
        if (fn && !r.some((f) => Object.is(fn, f))) {
          r.push(fn);
        }
        return r;
      },
      [],
    ),
  );
  const sb = mkScriptBuilder(cavern);
  objectiveGlobals({ cavern, sb });
  creatureSpawnGlobals({ cavern, sb });
  tileScript({ cavern, sb });
  globalsFns.forEach((fn) => fn({ cavern, sb }));
  cavern.plans.forEach((plan) => plan.architect.script?.({ cavern, plan, sb }));
  cavern.plans.forEach((plan) =>
    plan.architect.monsterSpawnScript?.({ cavern, plan, sb }),
  );
  cavern.plans.forEach((plan) =>
    plan.architect.slugSpawnScript?.({ cavern, plan, sb }),
  );

  const script = sb.build();
  return { ...cavern, script };
}
