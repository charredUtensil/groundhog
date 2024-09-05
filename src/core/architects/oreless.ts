import { Architect } from "../models/architect";
import { PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { SIMPLE_SPAWN_BASE } from "./simple_spawn";
import { inferContextDefaults } from "../common";

const BASE: PartialArchitect<undefined> = {
  ...SIMPLE_SPAWN_BASE,
  mod(cavern) {
    const context = inferContextDefaults({
      caveOreRichness: { base: 1.19, hops: 0.16, order: 0.08 },
      hallOreRichness: { base: 0.12, hops: 0, order: 0 },
      ...cavern.initialContext,
    });
    return {...cavern, context};
  },
  scriptGlobals({cavern}) {
    cavern.tiles.map((t, x, y) => t.isWall && t.oreYield > 0 && ``)
  },
};

const SIMPLE_SPAWN = [
  {
    name: "Oreless",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    anchorBid: ({ plan }) =>
      !plan.fluid &&
      plan.lakeSize >= 3 &&
      plan.pearlRadius > 0 &&
      1,
  },
] as const satisfies readonly Architect<undefined>[];
export default SIMPLE_SPAWN;
