import { PseudorandomStream } from "../../common";
import { MutableGrid, Grid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Plan } from "../../models/plan";
import { Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "../../transformers/02_plastic/01_rough";
import { NSEW, Point, offsetBy } from "../../common/geometry";

/** Sprinkles resources throughout the tiles given by getRandomTile. */
export function sprinkle(
  getRandomTile: () => Point,
  tiles: MutableGrid<Tile>,
  resource: MutableGrid<number>,
  seam: Tile,
  count: number,
) {
  for (let remaining = count; remaining > 0; remaining--) {
    const [x, y] = getRandomTile();
    const r = resource.get(x, y) ?? 0;
    const t = tiles.get(x, y) ?? Tile.SOLID_ROCK;
    if (t === Tile.SOLID_ROCK) {
      if (remaining >= 4) {
        tiles.set(x, y, seam);
        remaining -= 3;
        continue;
      } else {
        tiles.set(x, y, Tile.LOOSE_ROCK);
      }
    }
    if (r >= 3 && t !== seam && t.isWall) {
      tiles.set(x, y, seam);
      resource.set(x, y, r - 3);
    } else {
      resource.set(x, y, r + 1);
    }
  }
}

export function sprinkleCrystals(
  getRandomTile: () => Point,
  args: {
    crystals: MutableGrid<number>;
    tiles: MutableGrid<Tile>;
    plan: Plan;
  },
) {
  return sprinkle(
    getRandomTile,
    args.tiles,
    args.crystals,
    Tile.CRYSTAL_SEAM,
    args.plan.crystals,
  );
}

export function sprinkleOre(
  getRandomTile: () => Point,
  args: {
    ore: MutableGrid<number>;
    tiles: MutableGrid<Tile>;
    plan: Plan;
  },
) {
  return sprinkle(
    getRandomTile,
    args.tiles,
    args.ore,
    Tile.ORE_SEAM,
    args.plan.ore,
  );
}

export function bidsForOuterPearl(args: {
  cavern: RoughPlasticCavern;
  plan: Plan;
}): { item: Point; bid: number }[] {
  return args.plan.outerPearl.flatMap((layer) =>
    layer
      .map((item) => {
        const tile = args.cavern.tiles.get(...item) ?? Tile.SOLID_ROCK;
        if (tile === Tile.SOLID_ROCK) {
          let rechargeSeamCount = 0;
          let solidRockCount = 0;
          for (const offset of NSEW) {
            const neighbor =
              args.cavern.tiles.get(...offsetBy(item, offset)) ??
              Tile.SOLID_ROCK;
            if (neighbor === Tile.RECHARGE_SEAM) {
              rechargeSeamCount++;
            } else if (neighbor === Tile.SOLID_ROCK) {
              solidRockCount++;
            }
          }
          const bid =
            rechargeSeamCount + solidRockCount >= 4 ? 0 : solidRockCount;
          return { item, bid };
        }
        if (
          tile === Tile.DIRT ||
          tile === Tile.LOOSE_ROCK ||
          tile === Tile.HARD_ROCK
        ) {
          return { item, bid: 1 };
        }
        return { item, bid: 0 };
      })
      .filter(({ bid }) => bid > 0)
      .map(({ item, bid }) => {
        const innerPlansAtTile =
          args.cavern.intersectsPearlInner
            .get(...item)
            ?.reduce((n) => n + 1, 0) ?? 0;
        const outerPlansAtTile =
          args.cavern.intersectsPearlOuter
            .get(...item)
            ?.reduce((n) => n + 1, 0) ?? 0;
        return { item, bid: bid / (innerPlansAtTile + outerPlansAtTile) };
      }),
  );
}

export function bidsForOrdinaryWalls(
  positions: readonly Point[],
  tiles: Grid<Tile>,
) {
  return positions.filter(([x, y]) => {
    const t = tiles.get(x, y);
    return t === Tile.DIRT || t === Tile.LOOSE_ROCK || t === Tile.HARD_ROCK;
  });
}

export function defaultGetRandomTile(
  rng: PseudorandomStream,
  args: {
    cavern: RoughPlasticCavern;
    plan: Plan;
    tiles: MutableGrid<Tile>;
  },
) {
  const bids = bidsForOrdinaryWalls(
    args.plan.innerPearl.flatMap((layer) => layer),
    args.tiles,
  );
  if (bids.length > 0) {
    return () => rng.uniformChoice(bids);
  }
  const bids2 = bidsForOuterPearl(args);
  if (bids2) {
    return () => rng.weightedChoice(bids2);
  }
  throw new Error("No place to put resource!");
}

export function getPlaceRechargeSeams(
  count?: number,
): Architect<unknown>["placeRechargeSeam"] {
  return (args) => {
    const rng = args.cavern.dice.placeRechargeSeam(args.plan.id);
    const c =
      count ??
      (rng.chance(
        args.plan.kind === "cave"
          ? args.cavern.context.caveHasRechargeSeamChance
          : args.cavern.context.hallHasRechargeSeamChance,
      )
        ? 1
        : 0);
    if (c > 0) {
      for (let i = 0; i < c; i++) {
        const bids = bidsForOuterPearl(args).filter(({ bid }) => bid >= 1);
        if (bids.length === 0) {
          console.log("FAILED to place recharge seam in plan: %o", args.plan);
        } else {
          const [x, y] = rng.weightedChoice(bids);
          args.tiles.set(x, y, Tile.RECHARGE_SEAM);
        }
      }
    }
  };
}

export const defaultPlaceCrystals: Architect<unknown>["placeCrystals"] = (
  args,
) => {
  return sprinkleCrystals(
    defaultGetRandomTile(args.cavern.dice.placeCrystals(args.plan.id), args),
    args,
  );
};

export const defaultPlaceOre: Architect<unknown>["placeOre"] = (args) => {
  return sprinkleOre(
    defaultGetRandomTile(args.cavern.dice.placeOre(args.plan.id), args),
    args,
  );
};

export function getTotalCrystals({
  tiles,
  crystals,
}: {
  tiles?: Grid<Tile> | undefined;
  crystals?: Grid<number> | undefined;
}) {
  let r = 0;
  tiles?.forEach((t) => (r += t.crystalYield));
  crystals?.forEach((ct) => (r += ct));
  return r;
}

export function getTotalOre({
  tiles,
  ore,
}: {
  tiles?: Grid<Tile> | undefined;
  ore?: Grid<number> | undefined;
}) {
  let r = 0;
  tiles?.forEach((t) => (r += t.oreYield));
  ore?.forEach((ct) => (r += ct));
  return r;
}
