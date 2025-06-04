import { CavernContext } from "../common";
import { Architect, BaseMetadata } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { monsterForBiome } from "../models/creature";
import { position } from "../models/position";
import { Hardness, Tile } from "../models/tiles";
import { PartiallyEstablishedPlan } from "../transformers/01_planning/03_anchor";
import { orderPlans } from "../transformers/01_planning/05_establish";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import SIMPLE_SPAWN from "./simple_spawn";
import { gCreatures, monsterSpawnScript } from "./utils/creature_spawners";
import { placeSleepingMonsters } from "./utils/creatures";
import { intersectsOnly, isDeadEnd } from "./utils/intersects";
import { sprinkleCrystals } from "./utils/resources";
import { mkRough, Rough } from "./utils/rough";
import {
  chainFragment,
  EventChainLine,
  mkVars,
  transformPoint,
} from "./utils/script";
import { LoreDie } from "../common/prng";
import {
  DID_SPAWN_HOARD,
  DID_SPAWN_ROGUE,
  DID_SPAWN_SEAM,
  WARN_APPROACHING_HOARD,
} from "../lore/graphs/pandora";
import { getAnchor } from "../models/cavern";
import { Plan } from "../models/plan";
import { Point } from "../common/geometry";
import { StrataformedCavern } from "../transformers/03_plastic/03_strataform";
import { PreprogrammedCavern } from "../transformers/04_ephemera/03_preprogram";

const METADATA = {
  tag: "pandora",
} as const satisfies BaseMetadata;

const INSET = 3;

const g = mkVars(`gPandora`, [
  "didSpawnSeam",
  "msgApproachingHoard",
  "msgDidSpawnSeam",
  "msgDidSpawnHoard",
  "msgDidSpawnRogue",
  "onDisturbed",
  "roll",
  "willSpawnHoard",
  "willSpawnRogue",
]);

const sVars = (plan: Plan<any>) =>
  mkVars(`p${plan.id}Pa`, [
    "approachingHoard",
    "doCollapse",
    "lyDidCollapse",
    "lyWillCollapse",
    "maybeCollapse",
    "spawnHoard",
  ]);

function openingPanTo(cavern: StrataformedCavern | PreprogrammedCavern): Point {
  const ts = cavern.buildings.find(
    (b) =>
      b.template === TOOL_STORE &&
      cavern.discoveryZones.get(Math.floor(b.x), Math.floor(b.y))?.openOnSpawn,
  );
  if (ts) {
    return [ts.x, ts.y];
  }
  const m =
    "miners" in cavern &&
    cavern.miners.find((m) => {
      return cavern.discoveryZones.get(Math.floor(m.x), Math.floor(m.y))
        ?.openOnSpawn;
    });
  if (m) {
    return [m.x, m.y];
  }
  const s = cavern.plans.find((p) => p.hops.length === 0);
  if (s) {
    return s.path.baseplates[0].center;
  }
  throw new Error("Failed to find anything to pan to. Is there even a spawn?");
}

const HOARD_BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultCaveArchitect,
  crystalsToPlace: ({ plan }) => plan.crystalRichness * plan.perimeter * 20,
  mod(cavern) {
    const context: CavernContext = {
      ...cavern.context,
      caveCrystalSeamBias: Math.max(
        0.6,
        cavern.initialContext.caveCrystalSeamBias ?? 0,
      ),
    };
    const plans = [...cavern.plans];
    const inOrder = orderPlans(plans);
    const bids = SIMPLE_SPAWN.flatMap((architect) => {
      return inOrder
        .filter((p) => p.kind === "cave" && p.hops.length > 0)
        .map((plan) => ({
          dist: plan.hops.length,
          item: { ...plan, architect, hops: [] },
          bid: architect.anchorBid({ cavern, plan }) || 0,
        }));
    });
    const maxDist = bids.reduce(
      (r, bid) => (bid.bid > 0 ? Math.max(bid.dist, r) : r),
      0,
    );
    const spawn = cavern.dice
      .mod(0)
      .weightedChoice(bids.filter(({ dist }) => dist === maxDist));
    plans[spawn.id] = spawn;
    const anchor = {
      ...getAnchor(cavern),
      metadata: METADATA,
    } as PartiallyEstablishedPlan;
    delete anchor.hops;
    plans[anchor.id] = anchor;
    return { ...cavern, context, plans };
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
    const rng = args.cavern.dice.placeCrystals(args.plan.id);

    // Find all points to place crystals
    const extent = args.plan.innerPearl.length - INSET;
    const points = args.plan.innerPearl
      .flatMap((ly, i) => (i < extent ? ly : []))
      .filter((pos) => {
        const t = args.tiles.get(...pos);
        return t && t.hardness < Hardness.HARD;
      });
    const wallPoints: Point[] = [];
    const floorPoints: Point[] = [];
    points.forEach((pos) =>
      (args.cavern.tiles.get(...pos)?.isWall ? wallPoints : floorPoints).push(
        pos,
      ),
    );

    // Explicitly put some crystals in seams, biased toward the outside.
    const seamCrystals = Math.round(
      Math.min(wallPoints.length * 0.15 * 4, args.plan.crystals / 2),
    );
    sprinkleCrystals(args, {
      count: seamCrystals,
      getRandomTile: () => rng.betaChoice(wallPoints, { a: 4, b: 0.8 }),
      seamBias: 1,
    });

    // Explicitly put some crystals on the floor.
    const floorCrystals = Math.round(
      Math.min(
        floorPoints.length * 1.3,
        (args.plan.crystals - seamCrystals) / 2,
      ),
    );
    sprinkleCrystals(args, {
      count: floorCrystals,
      getRandomTile: () => rng.uniformChoice(floorPoints),
    });

    // Place remaining crystals in walls biased toward the core. Do not upgrade
    // these to seams or the entire chunk will be seams (from which monsters
    // cannot emerge).
    sprinkleCrystals(args, {
      count: args.plan.crystals - seamCrystals - floorCrystals,
      getRandomTile: () => rng.betaChoice(wallPoints, { a: 0.8, b: 1.5 }),
      seamBias: -1,
    });
  },
  placeOre: () => {},
  placeSlugHoles: () => {},
  placeLandslides: () => {},
  placeEntities({ cavern, plan }) {
    const [cx, cy] = plan.innerPearl[0][0];
    const aimedAt = openingPanTo(cavern);
    return {
      cameraPosition: position({
        x: cx,
        y: cy,
        aimedAt,
        pitch: Math.PI / 3,
      }),
    };
  },
  objectives: ({ cavern }) => ({
    crystals: Math.floor((cavern.plans[cavern.anchor].crystals * 0.33) / 5) * 5,
    sufficient: false,
  }),
  scriptGlobals({ cavern, sb }) {
    // On start: Pan from hoard to Tool Store.
    sb.if(`time:5`, `pan:${transformPoint(cavern, openingPanTo(cavern))};`);

    const monsterId = monsterForBiome(cavern.context.biome).id;

    // When a crystal seam is drilled, spawn more monsters.
    sb.declareInt(g.didSpawnSeam, 0);
    cavern.tiles.forEach((t, ...pos) => {
      if (t.id !== Tile.CRYSTAL_SEAM.id) {
        return;
      }
      if (cavern.pearlInnerDex.get(...pos)?.[cavern.anchor]) {
        // Ignore the seams in the hoard.
        return;
      }
      const tp = transformPoint(cavern, pos);
      sb.if(
        `drill:${tp}`,
        `wait:random(1)(4);`,
        cavern.context.globalHostilesCap > 0 &&
          `((${gCreatures.active}>=${cavern.context.globalHostilesCap}))return;`,
        `emerge:${tp},A,${monsterId},5;`,
        `${g.didSpawnSeam}+=1;`,
      );
    });
    sb.if(
      `${g.didSpawnSeam}>=1`,
      `msg:${sb.declareString(g.msgDidSpawnSeam, { pg: DID_SPAWN_SEAM, die: LoreDie.pandora })};`,
    );

    // onDisturbed
    // When monsters wake or die, spawn more monsters.
    sb.when(`${monsterId}.wake`, `${g.onDisturbed};`);
    sb.when(
      `${monsterId}.dead`,
      // Ignore any monster that was not attacked.
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
      `((${g.roll}>10))[${g.willSpawnRogue}+=1][${g.willSpawnHoard}+=1];`,
    );

    // spawnRogue
    // Spawn 1 monster somewhere in the level at random
    sb.declareInt(g.willSpawnRogue, 0);
    const hw = Math.floor((cavern.right - cavern.left) / 2);
    const hh = Math.floor((cavern.bottom - cavern.top) / 2);
    sb.when(
      `${g.willSpawnRogue}>=1`,
      `wait:random(1)(5);`,
      cavern.context.globalHostilesCap > 0 && `${gCreatures.active}+=1;`,
      `emerge:${hh},${hw},A,${monsterId},${Math.max(hw, hh)};`,
    );
    sb.if(
      `${g.willSpawnRogue}>=1`,
      "wait:5;",
      `msg:${sb.declareString(g.msgDidSpawnRogue, { pg: DID_SPAWN_ROGUE, die: LoreDie.pandora })};`,
    );

    // spawnHoard
    // Spawns monsters in the hoard chamber (handled by monster spawner)
    sb.declareInt(g.willSpawnHoard, 0);
  },
  script({ cavern, plan, sb }) {
    const rng = cavern.dice.script(plan.id);
    const v = sVars(plan);

    sb.declareInt(v.approachingHoard, 0);
    plan.outerPearl[2]
      .filter((pos) => cavern.tiles.get(...pos))
      .map((pos) =>
        sb.if(
          `enter:${transformPoint(cavern, pos)}`,
          `${v.approachingHoard}=1;`,
        ),
      );
    sb.if(
      `${v.approachingHoard}>0`,
      `msg:${sb.declareString(g.msgApproachingHoard, { pg: WARN_APPROACHING_HOARD, rng })};`,
    );

    sb.when(`${g.willSpawnHoard}>=1`, `${v.spawnHoard};`);
    sb.if(
      `${g.willSpawnHoard}>=1`,
      "wait:2;",
      `msg:${sb.declareString(g.msgDidSpawnHoard, { pg: DID_SPAWN_HOARD, die: LoreDie.pandora })};`,
      `pan:${transformPoint(cavern, plan.path.baseplates[0].center)};`,
    );

    const layers = plan.innerPearl.map((ly, i) => {
      let wallCrystals = 0;
      let floorCrystals = 0;
      const walls: Point[] = [];
      const floors: Point[] = [];
      if (i < plan.innerPearl.length - INSET) {
        ly.forEach((pos) => {
          if (cavern.tiles.get(...pos)?.isWall) {
            walls.push(pos);
            wallCrystals += cavern.crystals.get(...pos) ?? 0;
          } else {
            floors.push(pos);
            floorCrystals += cavern.crystals.get(...pos) ?? 0;
          }
        });
      }
      return {
        wallCrystals,
        floorCrystals,
        walls,
        floors,
      };
    });

    const crystalMin = Math.min(
      20,
      layers.reduce((r, { floorCrystals }) => r + floorCrystals, 0),
    );
    sb.when(
      `${monsterForBiome(cavern.context.biome).id}.new`,
      `${v.maybeCollapse};`,
    );
    let outerLayer = -1;
    const foundCollapsibleLayer = layers.some(({ walls, wallCrystals }, i) => {
      if (wallCrystals > 0 && walls.length > 0) {
        sb.event(
          `${v.doCollapse}${i}`,
          "wait:2;",
          "shake:2;",
          ...walls.flatMap((pos, j) =>
            chainFragment(
              `drill:${transformPoint(cavern, pos)};`,
              j % 5 === 4 && i < walls.length - 1 && "wait:0.4;",
            ),
          ),
          "wait:1;",
          `${v.lyDidCollapse}=${i};`,
        );
        return false;
      }
      outerLayer = i;
      sb.declareInt(v.lyWillCollapse, i);
      sb.declareInt(v.lyDidCollapse, i);
      return true;
    });
    if (!foundCollapsibleLayer) {
      throw new Error("Failed to reach outer layer.");
    }
    sb.event(
      v.maybeCollapse,
      `((Crystal_C>${crystalMin}))return;`,
      `((${v.lyWillCollapse}>=${v.lyDidCollapse}))[${v.lyWillCollapse}-=1][return];`,
      ...layers.map((_, i) =>
        i < outerLayer
          ? (`((${v.lyWillCollapse}==${i}))${v.doCollapse}${i};` satisfies EventChainLine)
          : null,
      ),
    );
  },
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      tripEvent: sVars(args.plan).spawnHoard,
      spawnRate: 40,
      tripPoints: args.plan.innerPearl[args.plan.innerPearl.length - 3],
      force: true,
    }),
  slugSpawnScript: () => {},
};

function withPocket(
  pocketLayer: number,
  { roughExtent, rough }: Pick<Architect<any>, "roughExtent" | "rough">,
): Pick<Architect<any>, "roughExtent" | "rough"> {
  const roughWithPocket: Architect<any>["rough"] = (args) => {
    rough(args);

    const pocketHall = args.plan.intersects.reduce(
      (r, _, i) => (r >= 0 ? r : i),
      -1,
    );
    args.cavern.plans[pocketHall].innerPearl[0].forEach((pos) => {
      const ly =
        args.cavern.pearlInnerDex.get(...pos)![args.plan.id] ?? Infinity;
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
    const creatures = placeSleepingMonsters(args, {
      rng,
      count: 3,
      to: pocketLayer - 1,
      force: true,
    });
    return { creatures };
  },
  placeCrystals(args) {
    const rng = args.cavern.dice.placeCrystals(args.plan.id);
    const ts = args.plan.innerPearl[pocketLayer].filter(
      (pos) => args.tiles.get(...pos)?.isWall,
    );
    const tiles =
      ts.length > 0
        ? ts
        : args.plan.innerPearl.flatMap((ly) =>
            ly.filter((pos) => args.tiles.get(...pos)?.isWall),
          );
    sprinkleCrystals(args, {
      getRandomTile: () => rng.uniformChoice(tiles),
      seamBias: 1,
    });
  },
});

const PANDORA = [
  {
    name: "Pandora.Hoard",
    ...HOARD_BASE,
    ...mkRough(
      { of: Rough.ALWAYS_DIRT, grow: 1 },
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.ALWAYS_HARD_ROCK },
      { of: Rough.AT_LEAST_HARD_ROCK },
    ),
    anchorBid: ({ cavern, plan }) =>
      cavern.context.hasMonsters &&
      !plan.fluid &&
      intersectsOnly(cavern.plans, plan, null) &&
      plan.pearlRadius > 5 &&
      cavern.context.anchorWhimsy * 0.1,
  },
  {
    name: "Pandora.Minihoard",
    ...miniHoardBase(2),
    ...withPocket(
      4,
      mkRough(
        { of: Rough.ALWAYS_FLOOR, width: 2 },
        { of: Rough.ALWAYS_HARD_ROCK },
        { of: Rough.ALWAYS_SOLID_ROCK },
        { of: Rough.FLOOR, grow: 1 },
        { of: Rough.MIX_DIRT_LOOSE_ROCK, width: 0, grow: 0.5 },
        { of: Rough.MIX_FRINGE },
      ),
    ),
    caveBid: ({ cavern, plan, plans }) =>
      plans[cavern.anchor].metadata?.tag === "pandora" &&
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
      plans[cavern.anchor].metadata?.tag === "pandora" &&
      !plan.fluid &&
      isDeadEnd(plan) &&
      plan.pearlRadius > 2 &&
      cavern.context.anchorWhimsy * 4,
  },
  {
    name: "Pandora.Minihoard.Island",
    ...miniHoardBase(2),
    ...withPocket(
      4,
      mkRough(
        { of: Rough.ALWAYS_FLOOR, width: 2 },
        { of: Rough.ALWAYS_HARD_ROCK },
        { of: Rough.ALWAYS_SOLID_ROCK },
        { of: Rough.WATER, grow: 1 },
        { of: Rough.MIX_FRINGE },
      ),
    ),
    caveBid: ({ cavern, plan, plans }) =>
      plans[cavern.anchor].metadata?.tag === "pandora" &&
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 5 &&
      cavern.context.anchorWhimsy * 4,
  },
] as const satisfies readonly Architect<any>[];
export default PANDORA;
