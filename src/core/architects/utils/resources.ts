import { PseudorandomStream } from "../../common";
import { MutableGrid, Grid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Plan } from "../../models/plan";
import { EstablishedPlan } from "../../transformers/01_planning/03_establish";
import { Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "../../transformers/02_plastic/01_rough";
import { NSEW, Point } from "../../common/geometry";

/** Sprinkles resources throughout the tiles given by getRandomTile. */
export function sprinkle(
  getRandomTile: () => Point,
  tiles: MutableGrid<Tile>,
  resource: MutableGrid<number>,
  seam: Tile,
  count: number,
) {
  for (let remaining = count; remaining > 0; remaining--) {
    const [x, y] = getRandomTile()
    const r = resource.get(x, y) ?? 0;
    const t = tiles.get(x, y) ?? Tile.SOLID_ROCK;
    if (t === Tile.SOLID_ROCK) {
      if (remaining >= 4) {
        tiles.set(x, y, seam)
        remaining -= 3
        continue
      } else {
        tiles.set(x, y, Tile.LOOSE_ROCK)
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

export function sprinkleCrystals(getRandomTile: () => Point, args: {
  crystals: MutableGrid<number>
  tiles: MutableGrid<Tile>
  plan: Plan,
}) {
  return sprinkle(
    getRandomTile,
    args.tiles,
    args.crystals,
    Tile.CRYSTAL_SEAM,
    args.plan.crystals,
  )
}

export function sprinkleOre(getRandomTile: () => Point, args: {
  ore: MutableGrid<number>
  tiles: MutableGrid<Tile>
  plan: Plan,
}) {
  return sprinkle(
    getRandomTile,
    args.tiles,
    args.ore,
    Tile.ORE_SEAM,
    args.plan.ore,
  )
}

export function bidsForOuterPearl(args: {
  cavern: RoughPlasticCavern,
  plan: Plan,
}): {item: Point, bid: number}[] {
  return args.plan.outerPearl.flatMap(
    layer => layer.map(
      ([x, y]) => {
      const tile = args.cavern.tiles.get(x, y) ?? Tile.SOLID_ROCK
      if (tile === Tile.SOLID_ROCK) {
        let rechargeSeamCount = 0
        let solidRockCount = 0
        for (const [ox, oy] of NSEW) {
          const neighbor = args.cavern.tiles.get(x + ox, y + oy) ?? Tile.SOLID_ROCK;
          if (neighbor === Tile.RECHARGE_SEAM) { rechargeSeamCount++ }
          else if (neighbor === Tile.SOLID_ROCK) { solidRockCount++ }
        }
        const bid = (rechargeSeamCount + solidRockCount >= 4) ? 0: solidRockCount
        return {item: [x, y], bid}
      }
      if (tile === Tile.DIRT || tile === Tile.LOOSE_ROCK || tile === Tile.HARD_ROCK) {
        return {item: [x, y], bid: 1}
      }
      return {item: [x, y], bid: 0}
    }).filter(({bid}) => bid > 0).map(({item: [x, y], bid}) => {
      const innerPlansAtTile = args.cavern.intersectsPearlInner.get(x, y)?.reduce(n => n + 1, 0) ?? 0;
      const outerPlansAtTile = args.cavern.intersectsPearlOuter.get(x, y)?.reduce(n => n + 1, 0) ?? 0;
      return {item: [x, y], bid: bid / (innerPlansAtTile + outerPlansAtTile)}
    })
  )
}

export function bidsForOrdinaryWalls(
  positions: readonly Point[],
  tiles: Grid<Tile>,
) {
  return positions.filter(([x, y]) => {
    const t = tiles.get(x, y)
    return t === Tile.DIRT || t === Tile.LOOSE_ROCK || t === Tile.HARD_ROCK
  })
}

export function defaultGetRandomTile(
  rng: PseudorandomStream,
  args: {
  cavern: RoughPlasticCavern,
  plan: Plan,
  tiles: MutableGrid<Tile>,
}) {
  const bids = bidsForOrdinaryWalls(args.plan.innerPearl.flatMap(layer => layer), args.tiles)
  if (bids.length > 0) {
    return () => rng.uniformChoice(bids)
  }
  const bids2 = bidsForOuterPearl(args)
  if (bids2) {
    return () => rng.weightedChoice(bids2)
  }
  throw new Error('No place to put resource!')
}

export const defaultPlaceCrystals: Architect['placeCrystals'] = (args) => {
  return sprinkleCrystals(
    defaultGetRandomTile(args.cavern.dice.placeCrystals(args.plan.id), args),
    args
  )
}

export const defaultPlaceOre: Architect['placeOre'] = (args) => {
  return sprinkleOre(
    defaultGetRandomTile(args.cavern.dice.placeOre(args.plan.id), args),
    args
  )
}