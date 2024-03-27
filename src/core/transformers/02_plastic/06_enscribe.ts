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
  const levelName = `gh${cavern.context.seed.toString(16).padStart(8, '0')}`;

  const lore = new Lore(cavern)
  const {premise, orders} = lore.generateBriefings(cavern.dice)
  const briefing = {
    intro: `${premise.text}\n${orders.text}`,
    success: "winner is you",
    failure: "good day sir",
  };
  return { ...cavern, lore, levelName, briefing };
}
