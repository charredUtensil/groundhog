import { CavernContext } from "../../common";
import { PseudorandomStream } from "../../common/prng";
import { PartialCavernContext } from "../../common/context";
import { filterTruthy, Mutable } from "../../common/utils";
import { OVERRIDE_SUFFIXES } from "../../lore/graphs/names";
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

function overrideSuffix(initialContext: PartialCavernContext) {
  const overrides: Mutable<Partial<CavernContext>> = { ...initialContext };
  delete overrides.seed;
  const s = Object.keys(overrides)
    .sort()
    .map((k) => `${k}:${JSON.stringify(overrides[k as keyof CavernContext])}`)
    .join(",");
  // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
  let v = 0;
  for (let i = 0; i < s.length; i++) {
    v = (v << 5) - v + s.charCodeAt(i);
    v |= 0;
  }
  const rng = new PseudorandomStream((v & 0x1ffffffff) >>> 1);
  return rng.uniformChoice(OVERRIDE_SUFFIXES);
}

export default function enscribe(cavern: AdjuredCavern): EnscribedCavern {
  const lore = new Lore(cavern);
  const { name, premise, orders, success, failure } = lore.briefings(
    cavern.dice,
  );
  const hasOverrides = Object.keys(cavern.initialContext).length > 1;
  const suffix = hasOverrides ? overrideSuffix(cavern.initialContext) : null;

  const fileName = (() => {
    const seed = cavern.context.seed.toString(16).padStart(8, "0");
    return filterTruthy([
      "gh",
      seed.substring(0, 3),
      seed.substring(3, 6),
      [
        seed.substring(6),
        { rock: "k", ice: "e", lava: "a" }[cavern.context.biome],
        hasOverrides ? "x" : "",
      ].join(""),
      name.replace(/[^A-Z0-9]+/g, "").toLowerCase(),
      suffix?.replace(/[^A-Z0-9]+/g, "").toLowerCase(),
    ]).join("-");
  })();
  const levelName = hasOverrides ? `${name} (${suffix})` : name;
  const briefing = {
    intro: `${premise}\n\n${orders}`,
    success: success,
    failure: failure,
  };
  return { ...cavern, fileName, lore, levelName, briefing };
}
