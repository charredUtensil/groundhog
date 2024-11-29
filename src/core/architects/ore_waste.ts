import { inferContextDefaults } from "../common";
import { Architect, BaseMetadata } from "../models/architect";
import { ORE_REFINERY, POWER_STATION, SUPPORT_STATION, TELEPORT_PAD, TOOL_STORE } from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { getTotalOre } from "./utils/resources";
import { mkRough, Rough } from "./utils/rough";

const METADATA = {tag: "oreWaste"} as const satisfies BaseMetadata;

/**
 * Approximately how much ore is needed to build a functional base capable
 * of producing Building Studs.
 */
const ORE_OVERHEAD = (
  // Tool Store Lv2
  TOOL_STORE.ore + 5 +
  // 3x Power Path
  6 +
  // TP Lv2
  TELEPORT_PAD.ore + 5 +
  // Power Station Lv2
  POWER_STATION.ore + 5 +
  // Support Station Lv1
  SUPPORT_STATION.ore +
  // Ore Refinery Lv4 (2 ore/stud)
  ORE_REFINERY.ore + 5 * 3
);

function wasted(t: Tile) {
  if (t === Tile.DIRT) {
    return Tile.WASTE_DIRT;
  }
  if (t === Tile.LOOSE_ROCK) {
    return Tile.WASTE_LOOSE_ROCK;
  }
  if (t === Tile.HARD_ROCK) {
    return Tile.WASTE_HARD_ROCK;
  }
  if (t === Tile.SOLID_ROCK) {
    return Tile.WASTE_SOLID_ROCK;
  }
  return null;
}

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultSpawnArchitect,
  mod(cavern) {
    const context = inferContextDefaults({
      caveOreRichness: {
        base: 0.40,
        hops: 0.20,
        order: -0.20,
      },
      caveOreSeamBias: 0.5,
      ...cavern.initialContext,
    });
    return { ...cavern, context };
  },
  prime: () => METADATA,
  closer({cavern, tiles}) {
    tiles.forEach((t, x, y) => {
      const rt = wasted(t);
      // Don't overscript where there is likely to be a monster spawn trigger.
      if (rt && !cavern.pearlOuterDex.get(x, y)?.some((ly, pi) => cavern.plans[pi].kind === 'cave' && ly < 1)) {
        tiles.set(x, y, rt);
      }
    });
  },
  objectives({cavern}) {
    if (cavern.plans.some(p => p.metadata?.tag === 'buildAndPower')) {
      // If there are build and power objectives, those will definitely consume
      // ore. No reason to prolong this with an additional ore objective.
      return undefined;
    }
    const studs = (getTotalOre(cavern) - ORE_OVERHEAD) * 0.12 / 2;
    return {
      studs: Math.floor(studs / 5) * 5,
      sufficient: false,
    }
  }
};

const ORE_WASTE = [
  {
    name: "OreWaste",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    anchorBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.lakeSize >= 3 &&
      plan.pearlRadius > 0 &&
      cavern.plans.reduce((r, p) => p.hasErosion ? r + 1 : r, 0) < 3 &&
      0.03,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default ORE_WASTE;
