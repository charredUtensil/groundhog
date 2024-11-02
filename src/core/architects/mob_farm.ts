import { Architect, BaseMetadata } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { mkRough, Rough, weightedSprinkle } from "./utils/rough";
import { monsterSpawnScript } from "./utils/creature_spawners";
import { getBuildings } from "./utils/buildings";
import { DOCKS, SUPER_TELEPORT, TOOL_STORE } from "../models/building";
import { position, randomlyInTile } from "../models/position";
import { asXY, closestTo, NSEW, offsetBy, Point } from "../common/geometry";
import { CARGO_CARRIER, CHROME_CRUSHER, GRANITE_GRINDER, HOVER_SCOUT, LMLC, LOADER_DOZER, RAPID_RIDER, TUNNEL_SCOUT, TUNNEL_TRANSPORT } from "../models/vehicle";
import { getPlaceRechargeSeams, sprinkleCrystals } from "./utils/resources";
import { inferContextDefaults } from "../common";
import { scriptFragment } from "./utils/script";

const BANLIST = [
  DOCKS,
  SUPER_TELEPORT,
  HOVER_SCOUT,
  RAPID_RIDER,
  TUNNEL_SCOUT,
  LOADER_DOZER,
  GRANITE_GRINDER,
  CARGO_CARRIER,
  CHROME_CRUSHER,
  TUNNEL_TRANSPORT,
] as const;

const METADATA = {
  tag: "mobFarm",
} as const satisfies BaseMetadata;

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultSpawnArchitect,
  prime: () => METADATA,
  mod(cavern) {
    const context = inferContextDefaults({
      caveCrystalRichness: { base: -0.16, hops: 0.32, order: 0.32 },
      hallCrystalRichness: { base: 0, hops: 0, order: 0 },
      ...cavern.initialContext
    })
    return {...cavern, context}
  },
  crystalsToPlace: () => 200,
  crystalsFromMetadata: () => 8,
  placeRechargeSeam: getPlaceRechargeSeams(3),
  placeBuildings(args) {
    const [toolStore] = getBuildings({
      from: 4,
      queue: [(pos) => TOOL_STORE.atTile({ ...pos })],
    }, args);
    toolStore.foundation.forEach(([x, y]) =>
      args.tiles.set(x, y, Tile.FOUNDATION),
    );
    args.openCaveFlags.set(...toolStore.foundation[0], true);
    const seamPos = closestTo(
      toolStore.foundation[0],
      args.plan.innerPearl.flatMap(ly => ly.filter(pos => {
        const t = args.tiles.get(...pos);
        return t === Tile.DIRT || t === Tile.LOOSE_ROCK;
      })))!
    args.tiles.set(...seamPos, Tile.CRYSTAL_SEAM);
    return {
      buildings: [toolStore],
      cameraPosition: position({
        ...asXY(args.plan.innerPearl[0][0]),
        aimedAt: [toolStore.x, toolStore.y],
        pitch: Math.PI / 8,
      })
    }
  },
  placeCrystals(args) {
    const tiles = args.plan.innerPearl.flatMap((ly, i) => i <= 2 ? ly : []).filter(pos => {
      const t = args.tiles.get(...pos);
      return t && !t.isWall && !t.isFluid;
    })
    const rng = args.cavern.dice.placeCrystals(args.plan.id);
    sprinkleCrystals(args, {
      getRandomTile: () => rng.betaChoice(tiles, {a: 1, b: 2.5}),
      seamBias: 0,
    });
  },
  placeSlugHoles() {},
  placeLandslides() {},
  placeEntities({cavern, plan, vehicleFactory}) {
    const rng = cavern.dice.placeEntities(plan.id);
    const ts = cavern.buildings.find(b => cavern.pearlInnerDex.get(...b.foundation[0])?.[plan.id])!;
    const tiles = NSEW.map(oPos => offsetBy(ts.foundation[0], oPos)).filter(pos => {
      const t = cavern.tiles.get(...pos);
      return t && !t.isWall && !t.isFluid;
    })
    const lmlc = vehicleFactory.create({
      template: LMLC,
      upgrades: ['UpLaser'],
      planId: plan.id,
      ...randomlyInTile({...asXY(rng.uniformChoice(tiles)), rng}),
    });
    return {
      vehicles: [lmlc]
    }
  },
  objectives({cavern}) {
    const crystals = cavern.plans[cavern.anchor].crystals * 0.75
    return {
      crystals: Math.floor(crystals / 5) * 5, sufficient: true
    };
  },
  scriptGlobals({cavern, sh}) {
    return scriptFragment(
      '# Globals: Mob Farm',
      sh.trigger(
        'if(time:0)',
        ...BANLIST.map(t => `disable:${t.id};` satisfies `${string};`)
      ),
    );
  },
  monsterSpawnScript: (args) => monsterSpawnScript(args, {
    initialCooldown: {min: 120, max: 240},
    needCrystals: { base: 2 },
    tripOnArmed: 'always',
  })
};

// TODO:
// Give crystals - either as a seam or just give them initially
// Lore to indicate the point of the level
// Disable flying vehicles (all vehicles but STT?)

const MOB_FARM = [
  {
    name: "MobFarm.Water",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.WATER, width: 2, grow: 0.5 },
      { of: Rough.FLOOR, grow: 1 },
      { of: weightedSprinkle(
        {item: Rough.LOOSE_ROCK, bid: 5},
          {item: Rough.FLOOR, bid: 1
  })},
      {
        of: weightedSprinkle(
          { item: Rough.LOOSE_ROCK, bid: 10 },
          { item: Rough.LOOSE_OR_HARD_ROCK, bid: 1 },
        ),
      },
      {of: Rough.MIX_FRINGE},
    ),
    anchorBid: ({ cavern, plan }) =>
      cavern.context.biome === 'ice' &&
      cavern.context.hasMonsters &&
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 6 &&
      plan.path.baseplates.length === 1 &&
      plan.intersects.reduce((r, _, i) => cavern.plans[i].fluid ? r + 1 : r, 0) <= 1 &&
      cavern.plans.reduce((r, p) => p.fluid ? r + 1 : r, 0) <= 5 &&
      1,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default MOB_FARM;
