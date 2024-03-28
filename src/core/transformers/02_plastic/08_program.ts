import { Architect } from "../../models/architect";
import { FencedCavern } from "./07_fence";

export type ProgrammedCavern = FencedCavern & {
  readonly script: string;
};

export default function program(cavern: FencedCavern): ProgrammedCavern {
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
