import { countLostMiners } from "../architects/lost_miners";
import { DiceBox, PseudorandomStream } from "../common";
import { filterTruthy } from "../common/utils";
import { FluidType, Tile } from "../models/tiles";
import { AdjuredCavern } from "../transformers/04_ephemera/01_adjure";
import { FAILURE, SUCCESS } from "./graphs/conclusions";
import {
  FOUND_ALL_LOST_MINERS,
  FOUND_HOARD,
  FOUND_HQ,
  FOUND_LOST_MINERS,
  FOUND_SLUG_NEST,
  NOMADS_SETTLED,
} from "./graphs/events";
import ORDERS from "./graphs/orders";
import PREMISE from "./graphs/premise";
import { SEISMIC_FORESHADOW } from "./graphs/seismic";

export type State = {
  readonly floodedWithWater: boolean;
  readonly floodedWithLava: boolean;
  readonly lostMinersOne: boolean;
  readonly lostMinersTogether: boolean;
  readonly lostMinersApart: boolean;
  readonly resourceObjective: boolean;
  readonly hasMonsters: boolean;
  readonly hasSlugs: boolean;
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
  nomadsSettled,
  foundSlugNest,
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
  if (n > 999 || n < 0) {
    return n.toString();
  }
  if (n === 0) {
    return "zero";
  }
  const result: string[] = [];
  if (n >= 100) {
    result.push(`${spellNumber(Math.floor(n / 100))} hundred`);
    n %= 100;
  }
  if (n >= 20) {
    result.push(TENS[Math.floor(n / 10) - 2]);
    n %= 10;
  }
  if (n > 0) {
    result.push(ONES[n - 1]);
    n = 0;
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

export class Lore {
  readonly state: State;
  readonly vars: ReplaceStrings;
  constructor(cavern: AdjuredCavern) {
    const fluidType = floodedWith(cavern);

    const { lostMiners, lostMinerCaves } = countLostMiners(cavern);

    const spawn = cavern.plans.find((p) => !p.hops.length)!;

    const hq = cavern.plans.find((p) => p.architect.isHq);
    const spawnIsHq = spawn === hq;
    const findHq = !!hq && !spawnIsHq;
    const hqIsRuin = !!hq && hq.architect.isRuin;

    const nomads = spawn.architect.isNomads
      ? ((spawn.metadata as any).minersCount as number)
      : 0;

    const treasures = cavern.plans.reduce(
      (r, plan) => (plan.architect.isTreasure ? r + 1 : r),
      0,
    );

    this.state = {
      floodedWithWater: fluidType === Tile.WATER,
      floodedWithLava: fluidType === Tile.LAVA,
      lostMinersOne: lostMiners === 1,
      lostMinersTogether: lostMiners > 1 && lostMinerCaves === 1,
      lostMinersApart: lostMinerCaves > 1,
      resourceObjective:
        cavern.objectives.crystals > 0 ||
        cavern.objectives.ore > 0 ||
        cavern.objectives.studs > 0,
      hasMonsters: cavern.context.hasMonsters,
      hasSlugs: cavern.context.hasSlugs,
      spawnHasErosion: spawn.hasErosion,
      spawnIsHq,
      findHq,
      hqIsRuin,
      spawnIsNomadOne: nomads === 1,
      spawnIsNomadsTogether: nomads > 1,
      treasureCaveOne: treasures === 1,
      treasureCaveMany: treasures > 1,
    };

    const enemies = filterTruthy([
      cavern.context.hasMonsters &&
        {
          rock: "Rock Monsters",
          ice: "Ice Monsters",
          lava: "Lava Monsters",
        }[cavern.context.biome],
      cavern.context.hasSlugs && "Slimy Slugs",
    ]).join(" and ");

    this.vars = {
      enemies,
      lostMinersCount: spellNumber(lostMiners),
      lostMinerCavesCount: spellNumber(lostMinerCaves),
      ...spellResourceGoal(cavern),
    };
  }

  briefings(dice: DiceBox) {
    return {
      premise: PREMISE.generate(dice.lore(Die.premise), this.state, this.vars),
      orders: ORDERS.generate(dice.lore(Die.orders), this.state, this.vars),
      success: SUCCESS.generate(
        dice.lore(Die.success),
        { ...this.state, commend: true },
        this.vars,
      ),
      failure: FAILURE.generate(dice.lore(Die.failure), this.state, this.vars),
    };
  }

  foundHoard(dice: DiceBox) {
    return FOUND_HOARD.generate(
      dice.lore(Die.foundHoard),
      this.state,
      this.vars,
    );
  }

  foundHq(dice: DiceBox) {
    return FOUND_HQ.generate(
      dice.lore(Die.foundHq),
      this.state,
      this.vars,
    );
  }

  foundLostMiners(rng: PseudorandomStream, foundMinersCount: number) {
    return FOUND_LOST_MINERS.generate(
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
  }

  foundAllLostMiners(dice: DiceBox) {
    return FOUND_ALL_LOST_MINERS.generate(
      dice.lore(Die.foundAllLostMiners),
      this.state,
      this.vars,
    );
  }

  nomadsSettled(dice: DiceBox) {
    return NOMADS_SETTLED.generate(
      dice.lore(Die.nomadsSettled),
      this.state,
      this.vars,
    );
  }

  generateFoundSlugNest(dice: DiceBox) {
    return FOUND_SLUG_NEST.generate(
      dice.lore(Die.foundSlugNest),
      this.state,
      this.vars,
    );
  }

  generateSeismicForeshadow(rng: PseudorandomStream) {
    return SEISMIC_FORESHADOW.generate(
      rng,
      this.state,
      this.vars,
    )
  }
}
