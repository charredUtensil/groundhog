import { EstablishedHqArchitect } from "../architects/established_hq";
import { countLostMiners } from "../architects/lost_miners";
import { DiceBox, PseudorandomStream } from "../common";
import { FluidType, Tile } from "../models/tiles";
import { AdjuredCavern } from "../transformers/04_ephemera/00_adjure";
import { GenerateResult } from "./builder";
import { FAILURE, SUCCESS } from "./graphs/conclusions";
import {
  FOUND_ALL_LOST_MINERS,
  FOUND_HOARD,
  FOUND_HQ,
  FOUND_LOST_MINERS,
} from "./graphs/events";
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
  readonly spawnIsNomadOne: boolean;
  readonly spawnIsNomadsTogether: boolean;
  readonly findHq: boolean;
  readonly hqIsRuin: boolean;
  readonly treasureCaveOne: boolean;
  readonly treasureCaveMany: boolean;
};

export type FoundLostMinersState = State & {
  readonly foundMinersOne: boolean;
  readonly foundMinersTogether: boolean;
};

type ReplaceStrings = {
  readonly lostMinersCount: string;
  readonly lostMinerCavesCount: string;
  readonly enemies: string;
  readonly resourceGoal: string;
  readonly resourceGoalNamesOnly: string;
};

enum Die {
  premise = 0,
  orders,
  success,
  failure,
  foundHoard,
  foundHq,
  foundAllLostMiners,
}

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
  readonly premise?: GenerateResult<State>;
  readonly orders?: GenerateResult<State>;
  readonly success?: GenerateResult<State & { readonly commend: boolean }>;
  readonly failure?: GenerateResult<State>;
  readonly foundHoard?: GenerateResult<State>;
  readonly foundHq?: GenerateResult<State>;
  readonly foundLostMiners?: GenerateResult<FoundLostMinersState>;
  readonly foundAllLostMiners?: GenerateResult<State>;
};

export class Lore {
  readonly state: State;
  readonly vars: ReplaceStrings;
  private _results: Results = {};
  constructor(cavern: AdjuredCavern) {
    const fluidType = floodedWith(cavern);

    const { lostMiners, lostMinerCaves } = countLostMiners(cavern);

    const spawn = cavern.plans.find((p) => p.hops === 0)!;

    const hq = cavern.plans.find((p) => (p.architect as any).isHq);
    const spawnIsHq = spawn === hq;
    const findHq = !!hq && !spawnIsHq;
    const hqIsRuin = !!hq && (hq.architect as EstablishedHqArchitect).isRuin;

    const nomads = (spawn.architect as any).isNomads
      ? (spawn.metadata as any).minersCount as number : 0;

    const treasures = cavern.plans.reduce((r, plan) =>
      (plan.architect as any).isTreasure ? r + 1 : r, 0);

    this.state = {
      floodedWithWater: fluidType === Tile.WATER,
      floodedWithLava: fluidType === Tile.LAVA,
      lostMinersOne: lostMiners === 1,
      lostMinersTogether: lostMiners > 1 && lostMinerCaves === 1,
      lostMinersApart: lostMinerCaves > 1,
      resourceObjective: (
        cavern.objectives.crystals > 0 ||
        cavern.objectives.ore > 0 ||
        cavern.objectives.studs > 0
      ),
      hasMonsters: cavern.context.hasMonsters,
      spawnHasErosion: spawn.hasErosion,
      spawnIsHq,
      findHq,
      hqIsRuin,
      spawnIsNomadOne: nomads === 1,
      spawnIsNomadsTogether: nomads > 1,
      treasureCaveOne: treasures === 1,
      treasureCaveMany: treasures > 1,
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
      premise: PREMISE.generate(dice.lore(Die.premise), this.state, this.vars),
      orders: ORDERS.generate(dice.lore(Die.orders), this.state, this.vars),
      success: SUCCESS.generate(
        dice.lore(Die.success),
        { ...this.state, commend: true },
        this.vars,
      ),
      failure: FAILURE.generate(dice.lore(Die.failure), this.state, this.vars),
    };
    this._results = { ...this._results, ...r };
    return r;
  }

  generateFoundHoard(dice: DiceBox) {
    const foundHoard = FOUND_HOARD.generate(
      dice.lore(Die.foundHoard),
      this.state,
      this.vars,
    );
    this._results = { ...this._results, foundHoard };
    return foundHoard;
  }

  generateFoundHq(dice: DiceBox) {
    const foundHq = FOUND_HQ.generate(
      dice.lore(Die.foundHq),
      this.state,
      this.vars,
    );
    this._results = { ...this._results, foundHq };
    return foundHq;
  }

  generateFoundLostMiners(rng: PseudorandomStream, foundMinersCount: number) {
    const foundLostMiners = FOUND_LOST_MINERS.generate(
      rng,
      {
        ...this.state,
        foundMinersOne: foundMinersCount <= 1,
        foundMinersTogether: foundMinersCount > 1,
      },
      {
        ...this.vars,
        foundMinersCount: foundMinersCount.toFixed(),
      },
    );
    this._results = { ...this._results, foundLostMiners };
    return foundLostMiners;
  }

  generateFoundAllLostMiners(dice: DiceBox) {
    const foundAllLostMiners = FOUND_ALL_LOST_MINERS.generate(
      dice.lore(Die.foundAllLostMiners),
      this.state,
      this.vars,
    );
    this._results = { ...this._results, foundAllLostMiners };
    return foundAllLostMiners;
  }

  get results() {
    return this._results;
  }
}
