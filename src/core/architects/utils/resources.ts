import { PseudorandomStream } from "../../common";
import { MutableGrid, Grid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Plan } from "../../models/plan";
import { Hardness, Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "../../transformers/02_masonry/01_rough";
import { NSEW, Point, offsetBy } from "../../common/geometry";
import { Vehicle } from "../../models/vehicle";
import { Building } from "../../models/building";

type SprinkleOpts = {
  /**
   * The total amount of the resource to place.
   * Defaults to the quantity decided for the Plan when it was Established.
   */
  count?: number;
  /**
   * A function that returns a point where the resource can be placed.
   * Defaults to defaultGetRandomTile.
   */
  getRandomTile?: () => Point;
  /**
   * The chance a seam will be placed instead of a single resource.
   * Seams will only be placed if:
   * - The tile chosen is an ordinary wall (D/LR/HR/SR).
   * - This would not cause more than `count` of the resource to exist.
   *
   * Ordinary walls are upgraded to seams if they contain 4 or more of the
   * relevant resource, regardless of seam bias. Setting this value to -1
   * disables this behavior.
   *
   * Defaults to the relevant value from `Context`.
   */
  seamBias?: number;
};

function seamable(tile: Tile) {
  switch (tile) {
    case Tile.SOLID_ROCK:
    case Tile.HARD_ROCK:
    case Tile.LOOSE_ROCK:
    case Tile.DIRT:
      return true;
    default:
      return false;
  }
}

/** Sprinkles resources throughout the tiles given by getRandomTile. */
function sprinkle(
  getRandomTile: () => Point,
  seamBias: number,
  rng: PseudorandomStream,
  tiles: MutableGrid<Tile>,
  resource: MutableGrid<number>,
  seam: Tile,
  count: number,
) {
  const SEAM_YIELD = 4;
  for (let remaining = count; remaining > 0; ) {
    const pos = getRandomTile();
    const t = tiles.get(...pos);
    if (
      remaining >= SEAM_YIELD &&
      (!t || (seamBias > 0 && seamable(t) && rng.chance(seamBias)))
    ) {
      tiles.set(...pos, seam);
      remaining -= SEAM_YIELD;
      continue;
    }
    if (!t) {
      tiles.set(...pos, Tile.LOOSE_ROCK);
    }
    const r = (resource.get(...pos) ?? 0) + 1;
    if (r >= SEAM_YIELD && seamBias >= 0 && seamable(t ?? Tile.LOOSE_ROCK)) {
      tiles.set(...pos, seam);
      resource.set(...pos, r - SEAM_YIELD);
    } else {
      resource.set(...pos, r);
    }
    remaining--;
  }
}

export function sprinkleCrystals(
  args: Parameters<Architect<any>["placeCrystals"]>[0],
  opts?: SprinkleOpts,
) {
  const rng = args.cavern.dice.placeCrystals(args.plan.id);
  return sprinkle(
    opts?.getRandomTile ?? defaultGetRandomTile(rng, args),
    opts?.seamBias ?? args.cavern.context[`${args.plan.kind}CrystalSeamBias`],
    rng,
    args.tiles,
    args.crystals,
    Tile.CRYSTAL_SEAM,
    opts?.count ??
      args.plan.crystals -
        args.plan.architect.crystalsFromMetadata(args.plan.metadata),
  );
}

export function sprinkleOre(
  args: Parameters<Architect<any>["placeOre"]>[0],
  opts?: SprinkleOpts,
) {
  const rng = args.cavern.dice.placeOre(args.plan.id);
  return sprinkle(
    opts?.getRandomTile ?? defaultGetRandomTile(rng, args),
    opts?.seamBias ?? args.cavern.context[`${args.plan.kind}OreSeamBias`],
    rng,
    args.tiles,
    args.ore,
    Tile.ORE_SEAM,
    opts?.count ?? args.plan.ore,
  );
}

export function bidsForOuterPearl(args: {
  cavern: RoughPlasticCavern;
  plan: Plan<any>;
  tiles: Grid<Tile>;
}): { item: Point; bid: number }[] {
  return args.plan.outerPearl.flatMap((layer) =>
    layer
      .map((item) => {
        const tile = args.tiles.get(...item) ?? Tile.SOLID_ROCK;
        if (tile.hardness >= Hardness.SOLID && tile !== Tile.RECHARGE_SEAM) {
          let rechargeSeamCount = 0;
          let solidRockCount = 0;
          for (const offset of NSEW) {
            const neighbor =
              args.tiles.get(...offsetBy(item, offset)) ?? Tile.SOLID_ROCK;
            if (neighbor === Tile.RECHARGE_SEAM) {
              rechargeSeamCount++;
            } else if (neighbor.hardness >= Hardness.SOLID) {
              solidRockCount++;
            }
          }
          const bid =
            rechargeSeamCount + solidRockCount >= 4 ? 0 : solidRockCount;
          return { item, bid };
        }
        if (
          tile.hardness === Hardness.DIRT ||
          tile.hardness === Hardness.LOOSE ||
          tile.hardness === Hardness.HARD
        ) {
          return { item, bid: 1 };
        }
        return { item, bid: 0 };
      })
      .filter(({ bid }) => bid > 0)
      .map(({ item, bid }) => {
        const innerPlansAtTile =
          args.cavern.pearlInnerDex.get(...item)?.reduce((n) => n + 1, 0) ?? 0;
        const outerPlansAtTile =
          args.cavern.pearlOuterDex.get(...item)?.reduce((n) => n + 1, 0) ?? 0;
        return { item, bid: bid / (innerPlansAtTile + outerPlansAtTile) };
      }),
  );
}

export function bidsForOrdinaryWalls(
  positions: readonly Point[],
  tiles: Grid<Tile>,
) {
  return positions.filter((pos) => {
    const t = tiles.get(...pos);
    return (
      t &&
      (t.hardness === Hardness.DIRT ||
        t.hardness === Hardness.LOOSE ||
        t.hardness === Hardness.HARD)
    );
  });
}

export function defaultGetRandomTile(
  rng: PseudorandomStream,
  args: {
    cavern: RoughPlasticCavern;
    plan: Plan<any>;
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
): Architect<any>["placeRechargeSeam"] {
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
          console.warn(
            "Failed to place recharge seam in plan %d",
            args.plan.id,
          );
        } else {
          const [x, y] = rng.weightedChoice(bids);
          args.tiles.set(x, y, Tile.RECHARGE_SEAM);
        }
      }
    }
  };
}

export function getTotalCrystals({
  tiles,
  crystals,
  buildings,
  vehicles,
}: {
  tiles?: Grid<Tile>;
  crystals?: Grid<number>;
  buildings?: readonly Building[];
  vehicles?: readonly Vehicle[];
}) {
  let r = 0;
  tiles?.forEach((t) => (r += t.crystalYield));
  crystals?.forEach((ct) => (r += ct));
  buildings?.forEach((b) => (r += b.template.crystals));
  vehicles?.forEach((v) => (r += v.template.crystals));
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
