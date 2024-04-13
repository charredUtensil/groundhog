import { EstablishedHqArchitect } from "../architects/established_hq";
import { DiceBox } from "../common";
import { FluidType, Tile } from "../models/tiles";
import { AdjuredCavern } from "../transformers/02_plastic/05_adjure";
import { GenerateResult } from "./builder";
import { FAILURE, SUCCESS } from "./graphs/conclusions";
import ORDERS from "./graphs/orders";
import PREMISE from "./graphs/premise";

export type State = {
  readonly floodedWithWater: boolean;
  readonly floodedWithLava: boolean;
  readonly lostMinersOne: boolean;
  readonly lostMinersTogether: boolean;
  readonly lostMinersApart: boolean;
  readonly resourceObjective: boolean;
  readonly hasMonsters: boolean;
  readonly spawnHasErosion: boolean;
  readonly spawnIsHq: boolean;
  readonly findHq: boolean;
  readonly hqIsRuin: boolean;
  readonly treasureCaveOne: boolean;
  readonly treasureCaveMany: boolean;
};

type ReplaceStrings = {
  readonly lostMinersCount: string;
  readonly lostMinerCavesCount: string;
  readonly enemies: string;
  readonly resourceGoal: string;
  readonly resourceGoalNamesOnly: string;
};

function floodedWith(cavern: AdjuredCavern): FluidType {
  let lava = 0;
  let water = 0;
  for (const plan of cavern.plans) {
    if (plan.fluid === Tile.LAVA) {
      lava++;
    } else if (plan.fluid === Tile.WATER) {
      water++;
    }
  }
  if (lava / cavern.plans.length > 0.4) {
    return Tile.LAVA;
  }
  if (water / cavern.plans.length > 0.4) {
    return Tile.WATER;
  }
  return null;
}

function lostCounts(cavern: AdjuredCavern) {
  let lostMiners: number = 0;
  let lostMinerCaves: number = 0;
  cavern.plans.forEach((plan) => {
    const metadata = plan.metadata as { lostMinersCount?: number } | undefined;
    if (metadata?.lostMinersCount) {
      lostMinerCaves++;
      lostMiners += metadata.lostMinersCount;
    }
  });
  return { lostMiners, lostMinerCaves };
}

function joinHuman(things: string[], conjunction: string = "and"): string {
  if (things.length === 0) {
    return "";
  }
  if (things.length === 1) {
    return things[0];
  }
  return `${things.slice(0, -1).join(", ")} ${conjunction} ${things[things.length - 1]}`;
}

const ONES = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
const TENS = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

function spellNumber(n: number): string {
  if (n > 999) {
    return n.toString();
  }
  const result: string[] = [];
  while (n > 0) {
    if (n >= 100) {
      result.push(`${spellNumber(Math.floor(n / 100))} hundred`);
      n %= 100;
    } else if (n >= 20) {
      result.push(TENS[Math.floor(n / 10) - 2]);
      n %= 10;
    } else {
      result.push(ONES[n - 1]);
      n = 0;
    }
  }
  return result.join(" ");
}

function spellResourceGoal(cavern: AdjuredCavern) {
  const a = [
    { count: cavern.objectives.crystals, name: "Energy Crystals" },
    { count: cavern.objectives.ore, name: "Ore" },
    { count: cavern.objectives.studs, name: "Building Studs" },
  ].filter(({ count }) => count > 0);
  return {
    resourceGoal: joinHuman(
      a.map(({ count, name }) => `${spellNumber(count)} ${name}`),
    ),
    resourceGoalNamesOnly: joinHuman(a.map(({ name }) => name)),
  };
}

type Results = {
  readonly premise: GenerateResult<State>;
  readonly orders: GenerateResult<State>;
  readonly success: GenerateResult<State & { readonly commend: boolean }>;
  readonly failure: GenerateResult<State>;
};

export class Lore {
  readonly state: State;
  readonly vars: ReplaceStrings;
  private _results: Results | null = null;
  constructor(cavern: AdjuredCavern) {
    const fluidType = floodedWith(cavern);
    const { lostMiners, lostMinerCaves } = lostCounts(cavern);
    const spawn = cavern.plans.find(p => p.hops === 0)!;
    const hq = cavern.plans.find(p => (p.architect as any).isHq)
    const spawnIsHq = spawn === hq
    const findHq = !!hq && !spawnIsHq
    const hqIsRuin = !!hq && (hq.architect as EstablishedHqArchitect).isRuin
    this.state = {
      floodedWithWater: fluidType === Tile.WATER,
      floodedWithLava: fluidType === Tile.LAVA,
      lostMinersOne: lostMiners === 1,
      lostMinersTogether: lostMiners > 1 && lostMinerCaves === 1,
      lostMinersApart: lostMinerCaves > 1,
      resourceObjective: !!(
        cavern.objectives.crystals ||
        cavern.objectives.ore ||
        cavern.objectives.studs
      ),
      hasMonsters: cavern.context.hasMonsters,
      spawnHasErosion: spawn.hasErosion,
      spawnIsHq,
      findHq,
      hqIsRuin,
      treasureCaveOne: false,
      treasureCaveMany: false,
    };
    this.vars = {
      lostMinersCount: spellNumber(lostMiners),
      lostMinerCavesCount: spellNumber(lostMinerCaves),
      enemies: {
        rock: "Rock Monsters",
        ice: "Ice Monsters",
        lava: "Lava Monsters",
      }[cavern.context.biome],
      ...spellResourceGoal(cavern),
    };
  }

  generateBriefings(dice: DiceBox) {
    const r = {
      premise: PREMISE.generate(dice.lore(1), this.state, this.vars),
      orders: ORDERS.generate(dice.lore(2), this.state, this.vars),
      success: SUCCESS.generate(
        dice.lore(3),
        { ...this.state, commend: true },
        this.vars,
      ),
      failure: FAILURE.generate(dice.lore(4), this.state, this.vars),
    };
    this._results = r;
    return r;
  }

  get results() {
    return this._results;
  }
}
