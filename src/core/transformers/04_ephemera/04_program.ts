import { creatureSpawnGlobals } from "../../architects/utils/creature_spawners";
import { scriptFragment } from "../../architects/utils/script";
import { Architect } from "../../models/architect";
import { PreprogrammedCavern } from "./03_preprogram";

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
  const script = scriptFragment(
    "#> Globals",
    creatureSpawnGlobals({ cavern }) || na,
    scriptFragment(...globalsFns.map((fn) => fn({ cavern }))) || na,
    "#> Architect Scripts",
    scriptFragment(...cavern.plans.map((plan) => plan.architect.script?.({ cavern, plan }))) || na,
    "#> Spawn Monsters",
    cavern.context.hasMonsters ? scriptFragment(
      ...cavern.plans.map((plan) =>
          plan.architect.monsterSpawnScript?.({ cavern, plan }),
        ),
      ) : na,
    "#> Spawn Slugs",
    cavern.context.hasSlugs ? scriptFragment(
      ...cavern.plans.map((plan) =>
          plan.architect.slugSpawnScript?.({ cavern, plan }),
        ),
      ) : na,
  );

  return { ...cavern, script };
}
