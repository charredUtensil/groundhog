import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { Rough, RoughOyster } from "./utils/oyster";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import { eventChain, mkVars, scriptFragment, transformPoint } from "./utils/script";
import { getMonsterSpawner } from "./utils/monster_spawner";
import { bidsForOrdinaryWalls, sprinkleCrystals } from "./utils/resources";
import { placeSleepingMonsters } from "./utils/creatures";

const BASE: PartialArchitect<unknown> & { isTreasure: true } = {
  ...DefaultCaveArchitect,
  isTreasure: true,
  objectives: ({ cavern }) => {
    const crystals = cavern.plans
      .filter((plan) => "isTreasure" in plan.architect)
      .reduce((r, plan) => Math.max(r, plan.crystals), 0);
    if (crystals < 15) {
      return undefined;
    }
    return { crystals: Math.floor(crystals / 5) * 5, sufficient: false };
  },
};

const g = mkVars("gHoard", ["wasTriggered", "message", "crystalsAvailable"]);

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
      placeSleepingMonsters(args, rng, count);
    }
  },
  monsterSpawnScript: getMonsterSpawner({
    retriggerMode: "hoard",
    spawnRateMultiplier: 3.5,
    waveSizeMultiplier: 1.5,
  }),
  scriptGlobals({ cavern }) {
    if (!cavern.objectives.crystals) {
      return undefined;
    }
    return `# Hoard Globals
bool ${g.wasTriggered}=false
string ${g.message}="${cavern.lore.generateFoundHoard(cavern.dice).text}"
int ${g.crystalsAvailable}=0
`;
  },
  script({ cavern, plan }) {
    if (!cavern.objectives.crystals) {
      return undefined;
    }
    // Generate a script that pans to this cave on discovery if collecting all
    // of the crystals would win the level.
    // TODO(charredutensil): Need to figure out clashes with lost miners
    const centerPoint = transformPoint(cavern, plan.innerPearl[0][0]);
    const v = mkVars(`p${plan.id}Hoard`, ["onDiscovered", "go", "noGo"]);

    return scriptFragment(
      `# Hoard ${plan.id}`,
      `if(change:${centerPoint})[${v.onDiscovered}]`,
      eventChain(
        v.onDiscovered,
        `((${g.wasTriggered}))return;`,
        `${g.wasTriggered}=true;`,
        `wait:1;`,
        `${g.crystalsAvailable}=crystals+Crystal_C;`,
        `((${g.crystalsAvailable}>=${cavern.objectives.crystals}))[${v.go}][${v.noGo}];`,
      ),
      eventChain(
        v.go,
        `msg:${g.message};`,
        `pan:${centerPoint};`,
      ),
      eventChain(
        v.noGo,
        `${g.wasTriggered}=false;`
      ),
    )
  },
};

const RICH: typeof BASE = {
  ...BASE,
  monsterSpawnScript: getMonsterSpawner({
    retriggerMode: "hoard",
    spawnRateMultiplier: 2,
    waveSizeMultiplier: 1.5,
  }),
};

const TREASURE: readonly (Architect<unknown> & { isTreasure: true })[] = [
  {
    name: "Open Hoard",
    ...HOARD,
    ...new RoughOyster(
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
    name: "Sealed Hoard",
    ...HOARD,
    ...new RoughOyster(
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
    name: "Open Rich Cave",
    ...RICH,
    ...new RoughOyster(
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
    name: "Rich Island",
    ...RICH,
    ...new RoughOyster(
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
        placeSleepingMonsters(args, rng, count, "inner");
      }
    },
  },
  {
    name: "Peninsula Hoard",
    ...HOARD,
    ...new RoughOyster(
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
    name: "Rich Lava Island",
    ...RICH,
    ...new RoughOyster(
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
    name: "Lava Peninsula Hoard",
    ...HOARD,
    ...new RoughOyster(
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
];
export default TREASURE;
