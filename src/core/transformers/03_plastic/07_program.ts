import { Architect } from "../../models/architect";
import { StrataformedCavern } from "./05_strataform";

export type ProgrammedCavern = StrataformedCavern & {
  readonly script: string;
};

export default function program(cavern: StrataformedCavern): ProgrammedCavern {
  const script: string[] = [];
  const push = (lines?: string) => {
    if (lines !== undefined) {
      script.push(lines);
    }
  };

  cavern.plans
    .reduce((r, plan) => r.add(plan.architect), new Set<Architect<unknown>>())
    .forEach((architect) => push(architect.scriptGlobals({ cavern })));
  cavern.plans.forEach((plan) => push(plan.architect.script({ cavern, plan })));
  cavern.plans.forEach((plan) =>
    push(plan.architect.monsterSpawnScript({ cavern, plan })),
  );

  return { ...cavern, script: script.join("\n") };
}
