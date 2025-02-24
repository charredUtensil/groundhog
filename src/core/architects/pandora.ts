import { getSyntheticTrailingComments, transform } from "typescript";
import { CavernContext } from "../common";
import { Architect, BaseMetadata } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { monsterForBiome, SLIMY_SLUG } from "../models/creature";
import { position } from "../models/position";
import { Tile } from "../models/tiles";
import { PartiallyEstablishedPlan } from "../transformers/01_planning/03_anchor";
import { orderPlans } from "../transformers/01_planning/05_establish";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import SIMPLE_SPAWN from "./simple_spawn";
import { gCreatures, monsterSpawnScript } from "./utils/creature_spawners";
import { placeSleepingMonsters } from "./utils/creatures";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import { sprinkleCrystals } from "./utils/resources";
import { mkRough, Rough, roughReplace } from "./utils/rough";
import { chainFragment, mkVars, transformPoint } from "./utils/script";
import { LoreDie } from "../common/prng";
import { DID_SPAWN_HOARD, DID_SPAWN_ROGUE, DID_SPAWN_SEAM, WARN_APPROACHING_HOARD } from "../lore/graphs/pandora";

const METADATA = {
  tag: 'pandora',
} as const satisfies BaseMetadata;

const g = mkVars(`gPandora`, [
  'approachingHoard',
  'didSpawnSeam',
  'msgApproachingHoard',
  'msgDidSpawnSeam',
  'msgDidSpawnHoard',
  'msgDidSpawnRogue',
  'onDisturbed',
  'roll', 
  'spawnHoard',
  'willSpawnHoard',
  'willSpawnRogue',
]);

const HOARD_BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultCaveArchitect,
  crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter * 20,
  mod(cavern) {
    const context: CavernContext = {
      ...cavern.context,
      hasMonsters: false,
      caveCrystalSeamBias: Math.max(0.6, cavern.initialContext.caveCrystalSeamBias ?? 0)
    };
    const plans = [...cavern.plans];
    const inOrder = orderPlans(plans)
    const bids = 
    SIMPLE_SPAWN.flatMap((architect) => {
      return inOrder
        .filter((p) => p.kind === "cave" && p.hops.length > 0)
        .map((plan) => ({
          dist: plan.hops.length,
          item: { ...plan, architect, hops: [] },
          bid: (architect.anchorBid({ cavern, plan }) || 0),
        }));
    });
    const maxDist = bids.reduce((r, bid) => bid.bid > 0 ? Math.max(bid.dist, r) : r, 0);
    debugger;
    const spawn = cavern.dice.mod(0).weightedChoice(bids.filter(({dist}) => dist === maxDist));
    plans[spawn.id] = spawn;
    const anchor = {...cavern.plans[cavern.anchor]} as PartiallyEstablishedPlan;
    delete anchor.hops;
    plans[anchor.id] = anchor;
    return {...cavern, context, plans};
  },
  prime: () => METADATA,
  placeBuildings({ cavern, plan, openCaveFlags }) {
    plan.innerPearl.some((ly) =>
      ly.some((pos) => {
        if (cavern.tiles.get(...pos)?.isWall === false) {
          openCaveFlags.set(...pos, true);
          return true;
        }
        return false;
      }),
    );
    return {};
  },
  placeCrystals(args) {
    const points = args.plan.innerPearl.flat().filter(pos => {
      const t = args.tiles.get(...pos);
      return t && !t.isWall && !t.isFluid;
    });
    const rng = args.cavern.dice.placeCrystals(args.plan.id);
    sprinkleCrystals(args, {
      getRandomTile: () => rng.betaChoice(points, {a: 0.8, b: 1.5}),
      seamBias: 0,
    });
  },
  placeOre: () => {},
  placeSlugHoles: () => {},
  placeLandslides: () => {},
  placeEntities({cavern, plan}) {
    const [cx, cy] = plan.innerPearl[0][0];
    const ts = cavern.buildings.find(b => b.template === TOOL_STORE && cavern.discoveryZones.get(Math.floor(b.x), Math.floor(b.y))?.openOnSpawn)!;
    return {
      cameraPosition: position({
        x: cx,
        y: cy,
        aimedAt: [ts.x, ts.y],
        pitch: Math.PI / 3,
      }),
    };
  },
  scriptGlobals({cavern, sb}) {
    // On start: Pan from hoard to Tool Store.
    const ts = cavern.buildings.find(b => b.template === TOOL_STORE && cavern.discoveryZones.get(Math.floor(b.x), Math.floor(b.y))?.openOnSpawn)!;
    sb.if(
      `time:5`,
      `pan:${transformPoint(cavern, [ts.x, ts.y])};`,
    );

    const monsterId = monsterForBiome(cavern.context.biome).id;

    // When a crystal seam is drilled, spawn more monsters.
    sb.declareInt(g.didSpawnSeam, 0);
    cavern.tiles.forEach((t, ...pos) => {
      if (t.id === Tile.CRYSTAL_SEAM.id) {
        const tp = transformPoint(cavern, pos);
        sb.when(
          `drill:${tp}`,
          `wait:random(1)(4);`,
          cavern.context.globalHostilesCap > 0 && chainFragment(
            `((${gCreatures.active}>=${cavern.context.globalHostilesCap}))return;`,
            `${gCreatures.active}+=1;`,
          ),
          `emerge:${tp},A,${monsterId},5;`,
          `${g.didSpawnSeam}+=1;`
        )
      }
    });
    sb.if(
      `${g.didSpawnSeam}==1`,
      `msg:${sb.declareString(g.msgDidSpawnSeam, {pg: DID_SPAWN_SEAM, die: LoreDie.pandora})})};`
    );

    // onDisturbed
    // When monsters wake or die, spawn more monsters.
    sb.when(
      `${monsterId}.wake`,
      `${g.onDisturbed};`,
    );
    sb.when(
      `${monsterId}.dead`,
      // Ignore any monster that was not killed.
      `((lastcreature.hp>0))return;`,
      `${g.onDisturbed};`,
    );
    sb.declareFloat(g.roll, 0.0);
    sb.event(
      g.onDisturbed,
      // Do not spawn at or above the monster cap.
      `((${gCreatures.active}>=${cavern.context.globalHostilesCap}))return;`,
      `${g.roll}=random(0)(100);`,
      // 25% chance to do nothing
      `((${g.roll}>75))return;`,
      // 10% chance to spawn an entire hoard
      // Otherwise spawn one rogue monster
      `((${g.roll}>10))[${g.willSpawnRogue}+=1][${g.willSpawnHoard}+=1];`
    );

    // spawnRogue
    // Spawn 1 monster somewhere in the level at random
    const hw = Math.floor((cavern.right - cavern.left) / 2);
    const hh = Math.floor((cavern.bottom - cavern.top) / 2);
    sb.when(
      `${g.willSpawnRogue}>=1`,
      `wait:random(1)(5);`,
      cavern.context.globalHostilesCap > 0 &&
        `${gCreatures.active}+=1;`,
      `emerge:${hh},${hw},A,${monsterId},${Math.max(hw, hh)};`,
    );
    sb.if(
      `${g.willSpawnRogue}==1`,
      `msg:${sb.declareString(g.msgDidSpawnRogue, {pg: DID_SPAWN_ROGUE, die: LoreDie.pandora})};`,
    );

    // spawnHoard
    // Spawns monsters in the hoard chamber (handled by monster spawner)
    sb.when(
      `${g.willSpawnHoard}>=1`,
      `${g.spawnHoard};`
    );
    sb.if(
      `${g.willSpawnHoard}==1`,
      `msg:${sb.declareString(g.msgDidSpawnHoard, {pg: DID_SPAWN_HOARD, die: LoreDie.pandora})})};`,
    );
  },
  objectives: ({cavern}) => ({
    crystals: Math.floor((cavern.plans[cavern.anchor].crystals * 0.33) / 5) * 5,
    sufficient: false,
  }),
  script({cavern, plan, sb}) {
    const rng = cavern.dice.script(plan.id);

    // Monsters were disabled, so monsterSpawnScript will not run.
    monsterSpawnScript({cavern, plan, sb}, {
      spawnEvent: g.spawnHoard,
      spawnRate: 40,
      tripPoints: plan.innerPearl[plan.innerPearl.length - 3],
    });

    sb.declareInt(g.approachingHoard, 0);
    plan.outerPearl[2].map(pos => sb.if(`enter:${transformPoint(cavern, pos)}`, `${g.approachingHoard}=1;`));
    sb.if(
      `${g.approachingHoard}=1`, 
      `msg:${sb.declareString(g.msgApproachingHoard, {pg: WARN_APPROACHING_HOARD, rng})};`,
    );
  },
  slugSpawnScript: () => {},
}

function withPocket(pocketLayer: number, {
  roughExtent,
  rough,
}: Pick<Architect<any>, "roughExtent" | "rough">): Pick<
  Architect<any>,
  "roughExtent" | "rough"
> {
  const roughWithPocket: Architect<any>["rough"] = (args) => {
    rough(args);

    const pocketHall = args.plan.intersects.reduce((r, _, i) => r >= 0 ? r : i, -1);
    args.cavern.plans[pocketHall].innerPearl[0].forEach(pos => {
      const ly = args.cavern.pearlInnerDex.get(...pos)![args.plan.id] ?? Infinity;
      if (ly <= pocketLayer && args.tiles.get(...pos)?.isWall !== false) {
        args.tiles.set(...pos, Tile.FLOOR);
      }
    });
  };
  return { roughExtent, rough: roughWithPocket };
}

const miniHoardBase = (pocketLayer: number): PartialArchitect<undefined> => ({
  ...DefaultCaveArchitect,
  crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter * 2,
  placeEntities(args) {
    const rng = args.cavern.dice.placeEntities(args.plan.id);
    const creatures = placeSleepingMonsters(args, {rng, count: 3, to: pocketLayer - 1, force: true});
    return {creatures};
  },
  placeCrystals(args) {
    const rng = args.cavern.dice.placeCrystals(args.plan.id);
    const tiles = args.plan.innerPearl[pocketLayer].filter(pos => args.tiles.get(...pos)?.isWall)
    sprinkleCrystals(args, {
      getRandomTile: () => rng.uniformChoice(tiles),
      seamBias: 1
    });
  },
});

const PANDORA = [
  {
    name: "Pandora.Hoard",
    ...HOARD_BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1},
      { of: Rough.ALWAYS_HARD_ROCK },
      { of: Rough.AT_LEAST_HARD_ROCK },
    ),
    anchorBid: ({ cavern, plan }) =>
      cavern.context.hasMonsters &&
      !plan.fluid &&
      intersectsOnly(cavern.plans, plan, null) &&
      plan.pearlRadius > 5 &&
      cavern.context.anchorWhimsy * 0.03,
  },
  {
    name: "Pandora.Minihoard",
    ...miniHoardBase(2),
    ...withPocket(4, mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.ALWAYS_HARD_ROCK },
      { of: Rough.ALWAYS_SOLID_ROCK },
      { of: Rough.FLOOR, grow: 1 },
      { of: Rough.MIX_DIRT_LOOSE_ROCK, width: 0, grow: 0.5 },
      { of: Rough.MIX_FRINGE },
    )),
    caveBid: ({ cavern, plan, plans }) =>
      plans[cavern.anchor].metadata?.tag === 'pandora' &&
      !plan.fluid &&
      intersectsOnly(cavern.plans, plan, null) &&
      plan.pearlRadius > 4 &&
      cavern.context.anchorWhimsy * 4,
  },
  {
    name: "Pandora.Minihoard.DeadEnd",
    ...miniHoardBase(2),
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.MIX_AT_MOST_DIRT_LOOSE_ROCK, width: 0, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
      { of: Rough.MIX_FRINGE },
    ),
    caveBid: ({ cavern, plan, plans }) =>
      plans[cavern.anchor].metadata?.tag === 'pandora' &&
      !plan.fluid &&
      isDeadEnd(plan) &&
      plan.pearlRadius > 2 &&
      cavern.context.anchorWhimsy * 4,
  },
  {
    name: "Pandora.Minihoard.Island",
    ...miniHoardBase(2),
    ...withPocket(4, mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.ALWAYS_HARD_ROCK },
      { of: Rough.ALWAYS_SOLID_ROCK },
      { of: Rough.WATER, grow: 1 },
      { of: Rough.MIX_FRINGE },
    )),
    caveBid: ({ cavern, plan, plans }) =>
      plans[cavern.anchor].metadata?.tag === 'pandora' &&
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 5 &&
      cavern.context.anchorWhimsy * 4,
  },
] as const satisfies readonly Architect<any>[];
export default PANDORA;