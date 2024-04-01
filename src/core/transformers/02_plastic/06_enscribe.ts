import { Lore } from "../../lore/lore";
import { AdjuredCavern } from "./05_adjure";

export type EnscribedCavern = AdjuredCavern & {
  lore: Lore;
  levelName: string;
  briefing: {
    intro: string;
    success: string;
    failure: string;
  };
};

export default function enscribe(cavern: AdjuredCavern): EnscribedCavern {
  const levelName = `gh${cavern.context.seed.toString(16).padStart(8, "0")}`;

  const lore = new Lore(cavern);
  const { premise, orders, success, failure } = lore.generateBriefings(cavern.dice);
  const briefing = {
    intro: `${premise.text}\n\n${orders.text}`,
    success: success.text,
    failure: failure.text,
  };
  return { ...cavern, lore, levelName, briefing };
}
