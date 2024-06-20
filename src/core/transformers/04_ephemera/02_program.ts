import { eventChain, mkVars, scriptFragment } from "../../architects/utils/script";
import { filterTruthy } from "../../common/utils";
import { Architect } from "../../models/architect";
import { EnscribedCavern } from "./01_enscribe";

export type ProgrammedCavern = EnscribedCavern & {
  readonly script: string;
};

const gSlugs = mkVars('gSlugs', ['initSlugs'])

function slugScript(cavern: EnscribedCavern) {
  if (!cavern.context.hasSlugs) {
    return undefined;
  }
  return scriptFragment(
    '# Spawn Slugs',
    `if(time:120)[${gSlugs.initSlugs}]`,
    eventChain(gSlugs.initSlugs,
      'startrandomspawn:SlimySlug;'
    ),
  );
}

export default function program(cavern: EnscribedCavern): ProgrammedCavern {
  // All unique globals function objects
  const globalsFns = Array.from(cavern.plans
    .reduce((r: Architect<unknown>['scriptGlobals'][], plan) => {
      const fn = plan.architect.scriptGlobals;
      if (!r.some(f => Object.is(fn, f))) {
        r.push(fn);
      }
      return r;
    }, []));
  const script = filterTruthy([
    ...globalsFns.map((fn) => fn({ cavern })),
    slugScript(cavern),
    ...cavern.plans.map((plan) => plan.architect.script({ cavern, plan })),
    ...(
      cavern.context.hasMonsters
      ? cavern.plans.map((plan) => plan.architect.monsterSpawnScript({ cavern, plan }))
      : []
    ),
  ]).join("\n");

  return { ...cavern, script };
}
