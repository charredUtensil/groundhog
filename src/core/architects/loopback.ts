import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultHallArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { NSEW, Point } from "../common/geometry";

// Loopback halls use solid rock to ensure they can only be accessed after
// excavating both ends. Note: This algorithm is a bit weak in that it can err
// in both directions - Sometimes, it generates a hall that isn't completely
// sealed off (particularly where multiple halls intersect one of the ends)
// and, while this hasn't come up in testing yet, it's possible for this to
// generate a pair of dead ends that don't open properly.

const BASE: typeof DefaultHallArchitect = {
  ...DefaultHallArchitect,
};

function withBarrier({
  roughExtent,
  rough,
}: Pick<Architect<any>, "roughExtent" | "rough">): Pick<
  Architect<any>,
  "roughExtent" | "rough"
> {
  const roughWithBarrier: Architect<any>["rough"] = (args) => {
    rough(args);

    // Is this hall allowed to place solid rock here?
    function overlaps(pos: Point) {
      const idx = args.cavern.pearlInnerDex.get(...pos);
      // The position must ONLY overlap this hall. Otherwise, this might block
      // another hall, which could make the level unplayable.
      return idx && !idx.some((_, i) => i !== args.plan.id);
    }

    const tipPlans = args.plan.intersects
      .map((_, id) => args.cavern.plans[id])
      .filter((p) => p.kind === "cave")
      .sort((a, b) => a.hops.length - b.hops.length);

    const op = Math.min(...tipPlans.map((tp) => tp.outerPearl.length)) - 1;
    for (let i = 0; i < op; i++) {
      for (const tipPlan of tipPlans) {
        // Add a "crust" of solid rock on the first layer of the outer pearl.
        const crust = tipPlan.outerPearl[i].filter(overlaps);
        if (crust.length < args.plan.pearlRadius) {
          continue;
        }
        crust.forEach((pos) => args.tiles.set(...pos, Tile.SOLID_ROCK));
        // For the second layer, add solid rock wherever it borders at least two
        // solid rock.
        tipPlan.outerPearl[i + 1]
          .filter(overlaps)
          .filter(
            ([x, y]) =>
              NSEW.reduce(
                (r, [ox, oy]) =>
                  (args.tiles.get(x + ox, y + oy) ?? Tile.SOLID_ROCK) ===
                  Tile.SOLID_ROCK
                    ? r + 1
                    : r,
                0,
              ) > 1,
          )
          .forEach((pos) => args.tiles.set(...pos, Tile.SOLID_ROCK));
        return;
      }
    }
  };
  return { roughExtent, rough: roughWithBarrier };
}

const LOOPBACK = [
  {
    name: "Loopback",
    ...BASE,
    ...withBarrier(
      mkRough(
        { of: Rough.FLOOR, grow: 2 },
        { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
        { of: Rough.AT_MOST_HARD_ROCK },
        { of: Rough.VOID, grow: 1 },
      ),
    ),
    hallBid: ({ plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 1 &&
      plan.path.kind === "auxiliary" &&
      plan.path.exclusiveSnakeDistance > 5 &&
      2,
  },
] as const satisfies readonly Architect<undefined>[];

export default LOOPBACK;
