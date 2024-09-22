import { filterTruthy } from "../../common/utils";
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
  const archGlobals = filterTruthy(globalsFns.map((fn) => fn({ cavern })));
  const archScripts = filterTruthy(
    cavern.plans.map((plan) => plan.architect.script?.({ cavern, plan })),
  );
  const monsters = cavern.context.hasMonsters
    ? filterTruthy(
        cavern.plans.map((plan) =>
          plan.architect.monsterSpawnScript?.({ cavern, plan }),
        ),
      )
    : [];
  const slugs = cavern.context.hasSlugs
    ? filterTruthy(
        cavern.plans.map((plan) =>
          plan.architect.slugSpawnScript?.({ cavern, plan }),
        ),
      )
    : [];
  const na = ["# n/a", ""];
  const script = [
    "#> Architect Globals",
    ...(archGlobals.length ? archGlobals : na),
    "#> Architect Scripts",
    ...(archScripts.length ? archScripts : na),
    "#> Spawn Monsters",
    ...(monsters.length ? monsters : na),
    "#> Spawn Slugs",
    ...(slugs.length ? slugs : na),
  ].join("\n");

  return { ...cavern, script };
}
