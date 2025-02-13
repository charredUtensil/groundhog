import { PseudorandomStream } from "../../common";
import { MutableGrid, Grid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Plan } from "../../models/plan";
import { Hardness, Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "../../transformers/02_masonry/01_rough";
import { NSEW, Point, offsetBy } from "../../common/geometry";
import { Vehicle } from "../../models/vehicle";
import { Building } from "../../models/building";

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
  for (let remaining = count; remaining > 0; remaining--) {
    const [x, y] = getRandomTile();
    const t = tiles.get(x, y);
    if (
      remaining >= 4 &&
      (!t || (seamable(t) && seamBias > 0 && rng.chance(seamBias)))
    ) {
      tiles.set(x, y, seam);
      remaining -= 3;
      continue;
    }
    if (!t) {
      tiles.set(x, y, Tile.LOOSE_ROCK);
    }
    const r = resource.get(x, y) ?? 0;
    if (r >= 3 && seamable(t ?? Tile.LOOSE_ROCK)) {
      tiles.set(x, y, seam);
      resource.set(x, y, r - 3);
    } else {
      resource.set(x, y, r + 1);
    }
  }
}

export function sprinkleCrystals(
  args: Parameters<Architect<any>["placeCrystals"]>[0],
  opts?: {
    count?: number;
    getRandomTile?: () => Point;
    seamBias?: number;
  },
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
  opts?: {
    count?: number;
    getRandomTile?: () => Point;
    seamBias?: number;
  },
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
  return positions.filter(([x, y]) => {
    const t = tiles.get(x, y);
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
          console.log("FAILED to place recharge seam in plan: %o", args.plan);
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
