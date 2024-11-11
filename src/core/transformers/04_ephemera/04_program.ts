import { creatureSpawnGlobals } from "../../architects/utils/creature_spawners";
import { mkScriptBuilder } from "../../architects/utils/script";
import { Architect } from "../../models/architect";
import { PreprogrammedCavern } from "./03_preprogram";
import { objectiveGlobals } from "../../architects/utils/objectives";

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
  const sh = mkScriptBuilder(cavern);
  objectiveGlobals({ cavern, sh });
  creatureSpawnGlobals({ cavern, sh });
  globalsFns.forEach((fn) => fn({ cavern, sh }));
  cavern.plans.forEach((plan) => plan.architect.script?.({ cavern, plan, sh }));
  if (cavern.context.hasMonsters) {
    cavern.plans.forEach((plan) =>
      plan.architect.monsterSpawnScript?.({ cavern, plan, sh }),
    );
  }
  if (cavern.context.hasSlugs) {
    cavern.plans.forEach((plan) =>
      plan.architect.slugSpawnScript?.({ cavern, plan, sh }),
    );
  }

  const script = sh.build();
  return { ...cavern, script };
}
