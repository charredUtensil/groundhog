import { EnscribedCavern } from "./06_enscribe";

export type ProgrammedCavern = EnscribedCavern & {
  script: string;
};

export default function program(cavern: EnscribedCavern): ProgrammedCavern {
  return { ...cavern, script: "" };
}
