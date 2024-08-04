import { filterTruthy } from "../../common/utils";
import { Architect } from "../../models/architect";
import { EnscribedCavern } from "./02_enscribe";

export type ProgrammedCavern = EnscribedCavern & {
  readonly script: string;
};

export default function program(cavern: EnscribedCavern): ProgrammedCavern {
  // All unique globals function objects
  const globalsFns = Array.from(
    cavern.plans.reduce((r: Architect<unknown>["scriptGlobals"][], plan) => {
      const fn = plan.architect.scriptGlobals;
      if (!r.some((f) => Object.is(fn, f))) {
        r.push(fn);
      }
      return r;
    }, []),
  );
  const archGlobals = filterTruthy(globalsFns.map((fn) => fn({ cavern })));
  const archScripts = filterTruthy(cavern.plans.map((plan) => plan.architect.script({ cavern, plan })));
  const monsters = cavern.context.hasMonsters
    ? filterTruthy(cavern.plans.map((plan) =>
        plan.architect.monsterSpawnScript({ cavern, plan }),
      ))
    : [];
  const slugs = cavern.context.hasSlugs
    ? filterTruthy(cavern.plans.map((plan) =>
        plan.architect.slugSpawnScript({ cavern, plan }),
      ))
    : [];
  const na = ["# n/a", ""]
  const script = [
    "# I. Architect Globals",
    ...(archGlobals.length ? archGlobals : na),
    "# II. Architect Scripts",
    ...(archScripts.length ? archScripts : na),
    "# III. Spawn Monsters",
    ...(monsters.length ? monsters : na),
    "# IV. Spawn Slugs",
    ...(slugs.length ? slugs : na),
  ].join("\n");

  return { ...cavern, script };
}
