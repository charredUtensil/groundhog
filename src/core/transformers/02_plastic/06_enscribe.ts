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
  const lore = new Lore(cavern)
  const levelName = `gh${cavern.context.seed.toString(16)}`;
  const briefing = {
    intro: "play this level",
    success: "winner is you",
    failure: "good day sir",
  };
  return { ...cavern, lore, levelName, briefing };
}
