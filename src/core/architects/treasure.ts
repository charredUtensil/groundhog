import { Architect, BaseMetadata } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import {
  declareStringFromLore,
  DzPriorities,
  eventChain,
  mkVars,
  scriptFragment,
  transformPoint,
} from "./utils/script";
import { monsterSpawnScript } from "./utils/creature_spawners";
import { bidsForOrdinaryWalls, sprinkleCrystals } from "./utils/resources";
import { placeSleepingMonsters } from "./utils/creatures";
import { gLostMiners } from "./lost_miners";
import { LoreDie } from "../lore/lore";
import { FOUND_HOARD } from "../lore/graphs/events";
import { gObjectives } from "./utils/objectives";

const METADATA = {
  tag: "treasure",
} as const satisfies BaseMetadata;

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultCaveArchitect,
  prime: () => METADATA,
  objectives: ({ cavern }) => {
    const crystals = cavern.plans
      .filter((plan) => plan.metadata?.tag === "treasure")
      .reduce((r, plan) => Math.max(r, plan.crystals), 0);
    if (crystals < 15) {
      return undefined;
    }
    return { crystals: Math.floor(crystals / 5) * 5, sufficient: false };
  },
};

const g = mkVars("gHoard", ["lock", "message", "crystalsAvailable"]);

const HOARD: typeof BASE = {
  ...BASE,
  crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter * 3,
  placeCrystals(args) {
    const wallBids = bidsForOrdinaryWalls(
      args.plan.innerPearl.flatMap((layer) => layer),
      args.tiles,
    );
    const centerPoints =
      args.plan.innerPearl[0].length > 1
        ? args.plan.innerPearl[0]
        : [...args.plan.innerPearl[0], ...args.plan.innerPearl[1]];
    const bids = [
      ...wallBids.map((item) => ({ bid: 1 / wallBids.length, item })),
      ...centerPoints.map((item) => ({ bid: 3 / centerPoints.length, item })),
    ];
    const rng = args.cavern.dice.placeCrystals(args.plan.id);
    sprinkleCrystals(args, {
      getRandomTile: () => rng.weightedChoice(bids),
      seamBias: 0,
    });
  },
  placeSlugHoles() {},
  placeEntities(args) {
    if (args.plan.pearlRadius > 3) {
      const rng = args.cavern.dice.placeEntities(args.plan.id);
      const count = Math.ceil(args.plan.monsterWaveSize / 2);
      return { creatures: placeSleepingMonsters(args, rng, count) };
    }
    return {};
  },
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      meanWaveSize: args.plan.monsterWaveSize * 1.5,
      retriggerMode: "hoard",
      rng: args.cavern.dice.monsterSpawnScript(args.plan.id),
      spawnRate: args.plan.monsterSpawnRate * 3.5,
    }),
  scriptGlobals({ cavern }) {
    if (!cavern.objectives.crystals) {
      return undefined;
    }
    return scriptFragment(
      "# Globals: Hoard",
      `int ${g.lock}=0`,
      declareStringFromLore(
        cavern,
        LoreDie.foundHoard,
        g.message,
        FOUND_HOARD,
        {},
        {},
      ),
      `int ${g.crystalsAvailable}=0`,
    );
  },
  claimEventOnDiscover({ plan }) {
    const pos = plan.innerPearl[0][0];
    return [{ pos, priority: DzPriorities.HINT }];
  },
  script({ cavern, plan }) {
    if (!cavern.objectives.crystals) {
      return undefined;
    }

    const discoPoint = plan.innerPearl[0][0];
    if (
      cavern.ownsScriptOnDiscover[
        cavern.discoveryZones.get(...discoPoint)?.id ?? -1
      ] !== plan.id
    ) {
      return undefined;
    }

    const hasLostMiners = cavern.plans.some(
      (p) => p.metadata?.tag === "lostMiners",
    );

    // Generate a script that pans to this cave on discovery if collecting all
    // of the crystals would win the level.

    const v = mkVars(`p${plan.id}Hoard`, ["onDiscovered", "go"]);

    return scriptFragment(
      `# P${plan.id}: Hoard`,
      `if(change:${transformPoint(cavern, discoPoint)})[${v.onDiscovered}]`,
      eventChain(
        v.onDiscovered,
        `((${g.lock}))[return][${g.lock}=true];`,
        `wait:1;`,
        `${g.lock}=false;`,
        // If there's a lost miners objective that isn't fulfilled, don't
        // act like the level is done.
        hasLostMiners && `((${gLostMiners.done}<1))return;`,
        // Count all the crystals in storage and on the floor.
        `${g.crystalsAvailable}=crystals+Crystal_C;`,
        // If this is enough to win the level, alert the player.
        `((${g.crystalsAvailable}>=${cavern.objectives.crystals}))${v.go};`,
      ),
      eventChain(
        v.go,
        `((${gObjectives.won}>0))return;`,
        `msg:${g.message};`,
        `pan:${transformPoint(cavern, discoPoint)};`,
      ),
    );
  },
};

const RICH: typeof BASE = {
  ...BASE,
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      meanWaveSize: args.plan.monsterWaveSize * 1.5,
      spawnRate: args.plan.monsterSpawnRate * 2,
    }),
};

const TREASURE = [
  {
    name: "Treasure.Hoard.Open",
    ...HOARD,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 3 },
      { of: Rough.LOOSE_ROCK, shrink: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plans, plan }) =>
      !plan.fluid &&
      plan.path.baseplates.length === 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5,
  },
  {
    name: "Treasure.Hoard.Sealed",
    ...HOARD,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 1, grow: 3 },
      { of: Rough.ALWAYS_LOOSE_ROCK },
      { of: Rough.ALWAYS_HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plan }) =>
      !plan.fluid &&
      plan.path.baseplates.length === 1 &&
      isDeadEnd(plan) &&
      0.5,
  },
  {
    name: "Treasure.Rich.Open",
    ...RICH,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5 },
      { of: Rough.LOOSE_ROCK, grow: 2 },
      { of: Rough.FLOOR, width: 2, shrink: 1, grow: 3 },
      { of: Rough.LOOSE_ROCK, shrink: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plan }) =>
      !plan.fluid && plan.path.baseplates.length >= 1 && isDeadEnd(plan) && 1,
  },
  {
    name: "Treasure.Rich.Water.Island",
    ...RICH,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5 },
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 2 },
      { of: Rough.WATER, width: 2, grow: 3 },
      { of: Rough.LOOSE_ROCK, shrink: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      0.5,
    placeEntities(args) {
      const rng = args.cavern.dice.placeEntities(args.plan.id);
      if (args.cavern.context.biome === "ice" && rng.chance(0.5)) {
        const count = Math.ceil(args.plan.monsterWaveSize / 2);
        return { creatures: placeSleepingMonsters(args, rng, count, "inner") };
      }
      return {};
    },
  },
  {
    name: "Treasure.Hoard.Water.Peninsula",
    ...HOARD,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1 },
      { of: Rough.BRIDGE_ON_WATER, width: 2, grow: 3 },
      { of: Rough.LOOSE_ROCK, shrink: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plans, plan }) =>
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5,
  },
  {
    name: "Treasure.Rich.Lava.Island",
    ...RICH,
    ...mkRough(
      { of: Rough.ALWAYS_SOLID_ROCK, width: 0, grow: 1 },
      { of: Rough.ALWAYS_HARD_ROCK, width: 0, grow: 0.5 },
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 2 },
      { of: Rough.LAVA, width: 2, grow: 3 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      0.5,
  },
  {
    name: "Treasure.Hoard.Lava.Peninsula",
    ...HOARD,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1 },
      { of: Rough.BRIDGE_ON_LAVA, width: 2, grow: 3 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ plans, plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 3 &&
      plan.path.baseplates.length >= 1 &&
      isDeadEnd(plan) &&
      intersectsOnly(plans, plan, null) &&
      0.5,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default TREASURE;
