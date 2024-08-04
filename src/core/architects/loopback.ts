import { Architect } from "../models/architect";
import { Tile } from "../models/tiles";
import { DefaultHallArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { NSEW, Point } from "../common/geometry";

// Loopback halls use solid rock to ensure they can only be accessed after
// excavating both ends.

const BASE: typeof DefaultHallArchitect = {
  ...DefaultHallArchitect,
};

function withBarrier({
  roughExtent,
  rough,
}: Pick<Architect<unknown>, "roughExtent" | "rough">): Pick<
  Architect<unknown>,
  "roughExtent" | "rough"
> {
  const roughWithBarrier: Architect<unknown>["rough"] = (args) => {
    rough(args);

    // Determine the end closest to spawn
    const planCloseEnd = args.plan.intersects
      .map((_, id) => args.cavern.plans[id])
      .filter((p) => p.kind === "cave")
      .reduce((r, p) => (p.hops < r.hops ? p : r));

    const overlaps = (pos: Point) =>
      args.cavern.pearlInnerDex.get(...pos)?.[args.plan.id] !== undefined ||
      args.cavern.pearlOuterDex.get(...pos)?.[args.plan.id] !== undefined;

    // Add a "crust" of solid rock on the outer pearl
    planCloseEnd.outerPearl[0]
      .filter(overlaps)
      .forEach((pos) => args.tiles.set(...pos, Tile.SOLID_ROCK));
    planCloseEnd.outerPearl[1]
      .filter(overlaps)
      .filter(
        ([x, y]) =>
          NSEW.reduce(
            (r, [ox, oy]) =>
              overlaps([x + ox, y + oy]) &&
              args.cavern.pearlOuterDex.get(x + ox, y + oy)?.[
                planCloseEnd.id
              ] === 0
                ? r + 1
                : r,
            0,
          ) > 1,
      )
      .forEach((pos) => args.tiles.set(...pos, Tile.SOLID_ROCK));
  };
  return { roughExtent, rough: roughWithBarrier };
}

const LOOPBACK: readonly Architect<unknown>[] = [
  {
    name: "Loopback Hall",
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
      plan.path.kind === 'auxiliary' &&
      plan.path.exclusiveSnakeDistance > 5 &&
      2,
  },
];

export default LOOPBACK;
