import { Lore } from "../../lore/lore";
import { AdjuredCavern } from "./01_adjure";

export type EnscribedCavern = AdjuredCavern & {
  fileName: string;
  lore: Lore;
  levelName: string;
  briefing: {
    intro: string;
    success: string;
    failure: string;
  };
};

export default function enscribe(cavern: AdjuredCavern): EnscribedCavern {
  const fileName = (() => {
    const seed = cavern.context.seed.toString(16).padStart(8, "0");
    return [
      "gh",
      seed.substring(0, 3),
      seed.substring(3, 6),
      [
        seed.substring(6),
        { rock: "k", ice: "e", lava: "a" }[cavern.context.biome],
        cavern.context.overrides.length ? "x" : "",
      ].join(""),
    ].join("-");
  })();

  const lore = new Lore(cavern);
  const { name, premise, orders, success, failure } = lore.briefings(
    cavern.dice,
  );
  const levelName = name.text;
  const briefing = {
    intro: `${premise.text}\n\n${orders.text}`,
    success: success.text,
    failure: failure.text,
  };
  return { ...cavern, fileName, lore, levelName, briefing };
}
