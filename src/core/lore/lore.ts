import { HqMetadata } from "../architects/established_hq/base";
import { countLostMiners } from "../architects/lost_miners";
import { DiceBox } from "../common";
import { LoreDie } from "../common/prng";
import { filterTruthy } from "../common/utils";
import { GEOLOGICAL_CENTER, SUPPORT_STATION } from "../models/building";
import { getAnchor } from "../models/cavern";
import { Objectives } from "../models/objectives";
import { Plan } from "../models/plan";
import { FluidType, Tile } from "../models/tiles";
import { AdjuredCavern } from "../transformers/04_ephemera/01_adjure";
import { FAILURE, SUCCESS } from "./graphs/conclusions";
import { NAME } from "./graphs/names";
import ORDERS from "./graphs/orders";
import PREMISE from "./graphs/premise";
import { spellNumber } from "./utils/numbers";

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
  readonly hqIsFixedComplete: boolean;
  readonly nomadsOne: boolean;
  readonly nomadsMany: boolean;
  readonly findHq: boolean;
  readonly hqIsRuin: boolean;
  readonly treasureCaveOne: boolean;
  readonly treasureCaveMany: boolean;
  readonly rockBiome: boolean;
  readonly iceBiome: boolean;
  readonly lavaBiome: boolean;
  readonly hasGiantCave: boolean;
  readonly buildAndPowerGcOne: boolean;
  readonly buildAndPowerGcMultiple: boolean;
  readonly buildAndPowerSsOne: boolean;
  readonly buildAndPowerSsMultiple: boolean;
  readonly hasAirLimit: boolean;
  readonly anchorIsMobFarm: boolean;
  readonly anchorIsBlackout: boolean;
  readonly anchorIsGasLeak: boolean;
  readonly anchorIsOreWaste: boolean;
  readonly anchorIsPandora: boolean;
};

export type FoundLostMinersState = State & {
  readonly foundMinersOne: boolean;
  readonly foundMinersTogether: boolean;
};

export type Format = {
  readonly buildAndPowerGcCount: number;
  readonly buildAndPowerSsCount: number;
  readonly enemies: string;
  readonly lostMiners: number;
  readonly lostMinerCaves: number;
  readonly monsters: string;
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

function joinHuman(things: string[], conjunction: string = "and"): string {
  if (things.length === 0) {
    return "";
  }
  if (things.length === 1) {
    return things[0];
  }
  return `${things.slice(0, -1).join(", ")} ${conjunction} ${things[things.length - 1]}`;
}

export function spellResourceGoal(objectives: Objectives) {
  const a = [
    { count: objectives.crystals, name: "Energy Crystals" },
    { count: objectives.ore, name: "Ore" },
    { count: objectives.studs, name: "Building Studs" },
  ].filter(({ count }) => count > 0);
  return {
    resourceGoal: joinHuman(
      a.map(({ count, name }) => `${spellNumber(count)} ${name}`),
    ),
    resourceGoalNumbers: joinHuman(
      a.map(({ count, name }) => `${count} ${name}`),
    ),
    resourceGoalNamesOnly: joinHuman(a.map(({ name }) => name)),
  };
}

export class Lore {
  readonly state: State;
  readonly format: Format;
  constructor(cavern: AdjuredCavern) {
    const fluidType = floodedWith(cavern);

    const { lostMiners, lostMinerCaves } = countLostMiners(cavern);

    const anchor = getAnchor(cavern);
    const spawn = cavern.plans.find(p => !p.hops.length)!;

    const resourceObjective =
      cavern.objectives.crystals +
        cavern.objectives.ore +
        cavern.objectives.studs >
      0;

    const hq = cavern.plans.find(
      (p) => p.metadata?.tag === "hq",
    ) as Plan<HqMetadata> | undefined;
    const anchorIsHq = Object.is(anchor, hq);
    const spawnIsHq = Object.is(spawn, hq);
    const hqIsFixedComplete = hq?.metadata.special === "fixedComplete";
    const findHq = !!hq && !spawnIsHq;
    const hqIsRuin = !!hq?.metadata.ruin;

    const buildAndPowerGcCount = cavern.plans.reduce(
      (r, p) =>
        p.metadata?.tag === "buildAndPower" &&
        p.metadata.template === GEOLOGICAL_CENTER
          ? r + 1
          : r,
      0,
    );
    const buildAndPowerSsCount = cavern.plans.reduce(
      (r, p) =>
        p.metadata?.tag === "buildAndPower" &&
        p.metadata.template === SUPPORT_STATION
          ? r + 1
          : r,
      0,
    );

    const nomads = cavern.plans.reduce((r, p) =>
      spawn.metadata?.tag === "nomads"
        ? r + (spawn.metadata.minersCount as number)
        : r,
      0,
    );

    const treasures = cavern.plans.reduce(
      (r, plan) => (plan.metadata?.tag === "treasure" ? r + 1 : r),
      0,
    );

    const hasGiantCave = cavern.plans.some(
      (plan) =>
        plan.pearlRadius > 20 &&
        // The actual diameter of the cave is almost definitely at least 60% the
        // total size of the map. This can only happen with context overrides.
        plan.pearlRadius * 4 > cavern.context.targetSize,
    );

    const hasMonsters = cavern.context.hasMonsters;

    this.state = {
      floodedWithWater: fluidType === Tile.WATER,
      floodedWithLava: fluidType === Tile.LAVA,
      lostMinersOne: lostMiners === 1,
      lostMinersTogether: lostMiners > 1 && lostMinerCaves === 1,
      lostMinersApart: lostMinerCaves > 1,
      resourceObjective,
      hasMonsters,
      hasSlugs: cavern.context.hasSlugs,
      spawnHasErosion: spawn.hasErosion,
      spawnIsHq,
      findHq,
      hqIsFixedComplete,
      hqIsRuin,
      nomadsOne: nomads === 1,
      nomadsMany: nomads > 1,
      treasureCaveOne: treasures === 1,
      treasureCaveMany: treasures > 1,
      rockBiome: cavern.context.biome === "rock",
      iceBiome: cavern.context.biome === "ice",
      lavaBiome: cavern.context.biome === "lava",
      hasGiantCave,
      buildAndPowerGcOne: buildAndPowerGcCount === 1,
      buildAndPowerGcMultiple: buildAndPowerGcCount > 1,
      buildAndPowerSsOne: buildAndPowerSsCount === 1,
      buildAndPowerSsMultiple: buildAndPowerSsCount > 1,
      hasAirLimit: !!cavern.oxygen,
      anchorIsMobFarm: anchor.metadata?.tag === "mobFarm",
      anchorIsBlackout: anchor.metadata?.tag === "blackout",
      anchorIsGasLeak: anchorIsHq && hq!.metadata.special === "gasLeak",
      anchorIsOreWaste: anchor.metadata?.tag === "oreWaste",
      anchorIsPandora: anchor.metadata?.tag === "pandora",
    };

    const monsters = {
      rock: "Rock Monsters",
      ice: "Ice Monsters",
      lava: "Lava Monsters",
    }[cavern.context.biome];
    const enemies = filterTruthy([
      hasMonsters && monsters,
      cavern.context.hasSlugs && "Slimy Slugs",
    ]).join(" and ");

    this.format = {
      monsters,
      enemies,
      lostMiners,
      lostMinerCaves,
      buildAndPowerGcCount,
      buildAndPowerSsCount,
      ...spellResourceGoal(cavern.objectives),
    };
  }

  briefings(dice: DiceBox) {
    return {
      name: NAME.generate(dice.lore(LoreDie.name), this.state, this.format),
      premise: PREMISE.generate(
        dice.lore(LoreDie.premise),
        this.state,
        this.format,
      ),
      orders: ORDERS.generate(
        dice.lore(LoreDie.orders),
        this.state,
        this.format,
      ),
      success: SUCCESS.generate(
        dice.lore(LoreDie.success),
        { ...this.state, commend: true },
        this.format,
      ),
      failure: FAILURE.generate(
        dice.lore(LoreDie.failure),
        this.state,
        this.format,
      ),
    };
  }
}
