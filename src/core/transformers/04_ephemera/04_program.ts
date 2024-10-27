import { creatureSpawnGlobals } from "../../architects/utils/creature_spawners";
import {
  scriptFragment,
  ScriptHelperImpl,
} from "../../architects/utils/script";
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
  const na = "# n/a\n";
  const sh = new ScriptHelperImpl(cavern);
  const script = scriptFragment(
    "#> Globals",
    objectiveGlobals({ cavern, sh }),
    creatureSpawnGlobals({ cavern, sh }),
    scriptFragment(...globalsFns.map((fn) => fn({ cavern, sh }))),
    "#> Architect Scripts",
    scriptFragment(
      ...cavern.plans.map((plan) =>
        plan.architect.script?.({ cavern, plan, sh }),
      ),
    ) || na,
    "#> Spawn Monsters",
    cavern.context.hasMonsters
      ? scriptFragment(
          ...cavern.plans.map((plan) =>
            plan.architect.monsterSpawnScript?.({ cavern, plan, sh }),
          ),
        )
      : na,
    "#> Spawn Slugs",
    cavern.context.hasSlugs
      ? scriptFragment(
          ...cavern.plans.map((plan) =>
            plan.architect.slugSpawnScript?.({ cavern, plan, sh }),
          ),
        )
      : na,
  );

  return { ...cavern, script };
}
