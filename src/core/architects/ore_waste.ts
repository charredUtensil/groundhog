import { inferContextDefaults } from "../common";
import { Architect, BaseMetadata } from "../models/architect";
import {
  ORE_REFINERY,
  POWER_STATION,
  SUPPORT_STATION,
  TELEPORT_PAD,
  TOOL_STORE,
} from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultSpawnArchitect, PartialArchitect } from "./default";
import { hintEjectRefineOre } from "./utils/hints";
import { getTotalOre } from "./utils/resources";
import { mkRough, Rough } from "./utils/rough";

const METADATA = { tag: "oreWaste" } as const satisfies BaseMetadata;

/**
 * Approximately how much ore is needed to build a functional base capable
 * of producing Building Studs.
 */
const ORE_OVERHEAD =
  // Tool Store Lv2
  TOOL_STORE.ore +
  5 +
  // 3x Power Path
  6 +
  // TP Lv2
  TELEPORT_PAD.ore +
  5 +
  // Power Station Lv2
  POWER_STATION.ore +
  5 +
  // Support Station Lv1
  SUPPORT_STATION.ore +
  // Ore Refinery Lv1
  ORE_REFINERY.ore;

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
        base: 0.4,
        hops: 0.2,
        order: -0.2,
      },
      caveOreSeamBias: 0.6,
      ...cavern.initialContext,
    });
    return { ...cavern, context };
  },
  prime: () => METADATA,
  closer({ cavern, tiles }) {
    tiles.forEach((t, x, y) => {
      const rt = wasted(t);
      // Don't overscript where there is likely to be a monster spawn trigger.
      if (
        rt &&
        !cavern.pearlOuterDex
          .get(x, y)
          ?.some((ly, pi) => cavern.plans[pi].kind === "cave" && ly < 1)
      ) {
        tiles.set(x, y, rt);
      }
    });
  },
  objectives({ cavern }) {
    if (cavern.plans.some((p) => p.metadata?.tag === "buildAndPower")) {
      // If there are build and power objectives, those will definitely consume
      // ore. No reason to prolong this with an additional ore objective.
      return undefined;
    }
    // Assume 5 ore per stud - better ratios are available by upgrading the
    // refinery, but this is really just a bonus. After some testing, I noticed
    // some major issues that make ore collection excruciatingly boring:

    // 1. Assuming the player won't build a remote base (at a cost of 1 stud)
    //    and use this to "teleport" the ore back to their main base, even with
    //    an upgraded refinery each stud takes up at least two cargo spaces.
    //    This means double the trips. Even with an armada of Tunnel
    //    Transports, the game seems to take forever between the point when
    //    enough ore is available on the ground and when it's all collected and
    //    converted to studs. By this point there's really no interaction left.
    // 2. Early game takes a very long time. The player will spend much of it
    //    without a power station - which means no Electric Fences. No Support
    //    Station means no air but also no vehicles. Rubble is everywhere but
    //    there's no reward for clearing it. While this is not _entirely_ true
    //    since the rubble around the edges of caves actually does have normal
    //    amounts of ore, the player is unlikely to notice this and assume no
    //    rubble contains ore.
    // 3. Vehicle AI is bad and annoying. I frequently observed STTs picking up
    //    a single Energy Crystal, driving back to base, picking up one stud,
    //    and then driving back out to some other random cave to collect a
    //    single ore before driving back to drop all three off at the Tool
    //    Store. All the while, piles of ore sitting _near_ the base would be
    //    ignored.
    // 4. Continuing to mine after enough resources are exposed actively makes
    //    things worse - If the player doesn't turn off crystal collection,
    //    vehicles will be distracted.
    const studs =
      ((getTotalOre(cavern) - ORE_OVERHEAD) * cavern.context.crystalGoalRatio) /
      5;
    if (studs <= 0) {
      return undefined;
    }
    return {
      studs: Math.floor(studs / 5) * 5,
      sufficient: false,
    };
  },
  script({ sb }) {
    hintEjectRefineOre(sb);
  },
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
      cavern.plans.reduce((r, p) => (p.hasErosion ? r + 1 : r), 0) < 3 &&
      cavern.context.anchorWhimsy * 0.03,
  },
] as const satisfies readonly Architect<typeof METADATA>[];
export default ORE_WASTE;
