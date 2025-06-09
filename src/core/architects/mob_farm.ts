import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { mkRough, Rough, weightedSprinkle } from "./utils/rough";
import { monsterSpawnScript } from "./utils/creature_spawners";
import { getBuildings } from "./utils/buildings";
import { DOCKS, SUPER_TELEPORT, TOOL_STORE } from "../models/building";
import { position, randomlyInTile } from "../models/position";
import { asXY, closestTo, NSEW, offsetBy } from "../common/geometry";
import {
  CARGO_CARRIER,
  CHROME_CRUSHER,
  GRANITE_GRINDER,
  HOVER_SCOUT,
  LMLC,
  LOADER_DOZER,
  RAPID_RIDER,
  TUNNEL_SCOUT,
  TUNNEL_TRANSPORT,
} from "../models/vehicle";
import { getPlaceRechargeSeams, sprinkleCrystals } from "./utils/resources";
import { inferContextDefaults } from "../common";
import { EventChainLine, mkVars } from "./utils/script";
import { MOB_FARM_NO_LONGER_BLOCKING } from "../lore/graphs/events";
import { gObjectives } from "./utils/objectives";
import { hintSelectLaserGroup } from "./utils/hints";

const BANLIST = [
  DOCKS,
  SUPER_TELEPORT,
  HOVER_SCOUT,
  RAPID_RIDER,
  TUNNEL_SCOUT,
  LOADER_DOZER,
  GRANITE_GRINDER,
  CARGO_CARRIER,
  LMLC,
  CHROME_CRUSHER,
  TUNNEL_TRANSPORT,
] as const;

export type MobFarmMetadata = {
  tag: "mobFarm";
  hoardSize: number;
};

const BASE: PartialArchitect<MobFarmMetadata> = {
  ...DefaultSpawnArchitect,
  prime: ({ cavern, plan }) => ({
    tag: "mobFarm",
    hoardSize: cavern.dice
      .prime(plan.id)
      .betaInt({ a: 4, b: 4, min: 170, max: 230 }),
  }),
  mod(cavern) {
    const context = inferContextDefaults({
      caveCrystalRichness: { base: -0.16, hops: 0.32, order: 0.32 },
      hallCrystalRichness: { base: 0, hops: 0, order: 0 },
      caveCrystalSeamBias: 0.7,
      globalHostilesCap: 10,
      ...cavern.initialContext,
    });
    return { ...cavern, context };
  },
  crystalsToPlace: ({ plan }) =>
    Math.max(plan.crystalRichness * plan.perimeter, 9),
  crystalsFromMetadata: (metadata) => 4 + LMLC.crystals + metadata.hoardSize,
  placeRechargeSeam: getPlaceRechargeSeams(3),
  placeBuildings(args) {
    const [toolStore] = getBuildings(
      {
        from: 4,
        queue: [{ bt: TOOL_STORE, required: true }],
      },
      args,
    );
    toolStore.foundation.forEach(([x, y]) =>
      args.tiles.set(x, y, Tile.FOUNDATION),
    );
    args.openCaveFlags.set(...toolStore.foundation[0], true);
    const seamPos = closestTo(
      toolStore.foundation[0],
      args.plan.innerPearl.flatMap((ly) =>
        ly.filter((pos) => {
          const t = args.tiles.get(...pos);
          return t === Tile.DIRT || t === Tile.LOOSE_ROCK;
        }),
      ),
    )!;
    args.tiles.set(...seamPos, Tile.CRYSTAL_SEAM);
    return {
      buildings: [toolStore],
      cameraPosition: position({
        ...asXY(args.plan.innerPearl[0][0]),
        aimedAt: [toolStore.x, toolStore.y],
        pitch: Math.PI / 3,
      }),
    };
  },
  placeCrystals(args) {
    sprinkleCrystals(args);
    const tiles = args.plan.innerPearl
      .flatMap((ly, i) => (i <= 2 ? ly : []))
      .filter((pos) => {
        const t = args.tiles.get(...pos);
        return t && !t.isWall && !t.isFluid;
      });
    const rng = args.cavern.dice.placeCrystals(args.plan.id);
    sprinkleCrystals(args, {
      getRandomTile: () => rng.betaChoice(tiles, { a: 1, b: 2.5 }),
      seamBias: 0,
      count: args.plan.metadata.hoardSize,
    });
  },
  placeSlugHoles() {},
  placeLandslides() {},
  placeEntities({ cavern, plan, minerFactory, vehicleFactory }) {
    const rng = cavern.dice.placeEntities(plan.id);
    const ts = cavern.buildings.find(
      (b) => cavern.pearlInnerDex.get(...b.foundation[0])?.[plan.id],
    )!;
    const tiles = NSEW.map((oPos) => offsetBy(ts.foundation[0], oPos)).filter(
      (pos) => {
        const t = cavern.tiles.get(...pos);
        return t && !t.isWall && !t.isFluid;
      },
    );
    const pos = randomlyInTile({ ...asXY(rng.uniformChoice(tiles)), rng });
    const driver = minerFactory.create({
      loadout: ["Drill", "JobDriver", "JobEngineer"],
      planId: plan.id,
      ...pos,
    });
    const lmlc = vehicleFactory.create({
      template: LMLC,
      upgrades: ["UpLaser"],
      planId: plan.id,
      driverId: driver.id,
      ...pos,
    });
    return {
      miners: [driver],
      vehicles: [lmlc],
    };
  },
  objectives({ cavern }) {
    const crystals = cavern.plans[cavern.anchor].crystals * 0.6;
    return {
      crystals: Math.floor(crystals / 5) * 5,
      sufficient: true,
    };
  },
  script({ cavern, plan, sb }) {
    const v = mkVars(`p${plan.id}MbFm`, ["msgNotBlocking"]);
    const rng = cavern.dice.script(plan.id);
    sb.onInit(
      ...BANLIST.map((t) => `disable:${t.id};` satisfies EventChainLine),
    );
    if (cavern.objectives.variables.length > 0) {
      sb.declareString(v.msgNotBlocking, {
        rng,
        pg: MOB_FARM_NO_LONGER_BLOCKING,
      });
      // There's a good chance any further objectives are softlocked by the
      // inability to cross lakes and rivers - so unlock them.
      sb.if(
        `crystals>=${cavern.objectives.crystals}`,
        `wait:5;`,
        ...BANLIST.map((t) => `enable:${t.id};` satisfies EventChainLine),
        `((${gObjectives.won}==0))msg:${v.msgNotBlocking};`,
      );
    }
    // Hint to tell players about control groups. This isn't super annoying
    // under normal circumstances, but here it's almost a necessity that the
    // player have their lasers bound to a single key.
    hintSelectLaserGroup(sb);
  },
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      initialCooldown: { min: 120, max: 240 },
      needCrystals: { base: 2 },
      tripOnArmed: "always",
    }),
};

const MOB_FARM = [
  {
    name: "MobFarm.Water",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2 },
      { of: Rough.WATER, width: 2, grow: 0.5 },
      { of: Rough.FLOOR, grow: 1 },
      {
        of: weightedSprinkle(
          { item: Rough.LOOSE_ROCK, bid: 5 },
          { item: Rough.FLOOR, bid: 1 },
        ),
      },
      {
        of: weightedSprinkle(
          { item: Rough.LOOSE_ROCK, bid: 10 },
          { item: Rough.LOOSE_OR_HARD_ROCK, bid: 1 },
        ),
      },
      { of: Rough.MIX_FRINGE },
    ),
    anchorBid: ({ cavern, plan }) =>
      cavern.context.biome === "ice" &&
      cavern.context.hasMonsters &&
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 6 &&
      plan.path.baseplates.length === 1 &&
      plan.intersects.some((_, i) => {
        const p = cavern.plans[i];
        return !p.fluid && p.lakeSize >= 6;
      }) &&
      plan.intersects.reduce(
        (r, _, i) => (cavern.plans[i].fluid ? r + 1 : r),
        0,
      ) <= 1 &&
      2,
  },
] as const satisfies readonly Architect<MobFarmMetadata>[];
export default MOB_FARM;
