import { CavernContext } from "../../common";
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

const OVERRIDE_SUFFIXES = [
  "Ablated",
  "Boosted",
  "Chief's Version",
  "Chrome Edition",
  "Diamond Edition",
  "Director's Cut",
  "Emerald Edition",
  "Enhanced",
  "Extended",
  "Gold Edition",
  "HD",
  "HD 1.5 Remix",
  "Millenium Edition",
  "Planet U Remix",
  "Platinum Edition",
  "Rebirthed",
  "Reborn",
  "Recoded",
  "Rectified",
  "Recycled",
  "Redux",
  "Reimagined",
  "Reloaded",
  "Remixed",
  "Ressurection",
  "Retooled",
  "Revenant",
  "Revolutions",
  "Ruby Edition",
  "Sapphire Edition",
  "Silver Edition",
  "Special Edition",
  "Ungrounded",
  "Unleashed",
  "Unlocked",
  "Unplugged",
  "Uranium Edition",
];

function overrideSuffix(context: CavernContext) {
  const s = [...context.overrides]
    .sort()
    .map((k) => `${k}:${JSON.stringify(context[k])}`)
    .join(",");
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let v = 0;
  for (let i = 0; i < s.length; i++) {
    v = (v << 5) - v + s.charCodeAt(i);
    v |= 0;
  }
  v = Math.abs(v) % OVERRIDE_SUFFIXES.length;
  return OVERRIDE_SUFFIXES[v];
}

export default function enscribe(cavern: AdjuredCavern): EnscribedCavern {
  const hasOverrides = cavern.context.overrides.length;

  const fileName = (() => {
    const seed = cavern.context.seed.toString(16).padStart(8, "0");
    return [
      "gh",
      seed.substring(0, 3),
      seed.substring(3, 6),
      [
        seed.substring(6),
        { rock: "k", ice: "e", lava: "a" }[cavern.context.biome],
        hasOverrides ? "x" : "",
      ].join(""),
    ].join("-");
  })();

  const lore = new Lore(cavern);
  const { name, premise, orders, success, failure } = lore.briefings(
    cavern.dice,
  );
  const levelName = hasOverrides
    ? `${name.text} (${overrideSuffix(cavern.context)})`
    : name.text;
  const briefing = {
    intro: `${premise.text}\n\n${orders.text}`,
    success: success.text,
    failure: failure.text,
  };
  return { ...cavern, fileName, lore, levelName, briefing };
}
