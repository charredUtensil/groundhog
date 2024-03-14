import { PseudorandomStream } from "../../common";
import { Grid, ReadOnlyGrid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { CavernWithPlansAndRoughDiorama } from "../../models/cavern";
import { BaseDiorama, Diorama } from "../../models/diorama";
import { Established, Plan } from "../../models/plan";
import { Tile } from "../../models/tiles";

const NSEW = [[0, -1], [0, 1], [-1, 0], [1, 0]]

/** Sprinkles resources throughout the tiles given by getRandomTile. */
export function sprinkle(
  getRandomTile: () => readonly [number, number],
  tiles: Grid<Tile>,
  resource: Grid<number>,
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

export function bidsForOuterPearl(
  plan: Plan,
  diorama: Diorama,
): {item: readonly [number, number], bid: number}[] {
  return plan.outerPearl.flatMap(
    layer => layer.map(
      ([x, y]) => {
      const tile = diorama.tiles.get(x, y) ?? Tile.SOLID_ROCK
      if (tile === Tile.SOLID_ROCK) {
        let rechargeSeamCount = 0
        let solidRockCount = 0
        for (const [ox, oy] of NSEW) {
          const neighbor = diorama.tiles.get(x + ox, y + oy) ?? Tile.SOLID_ROCK;
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
      const innerPlansAtTile = diorama.intersectsPearlInner.get(x, y)?.reduce(n => n + 1, 0) ?? 0;
      const outerPlansAtTile = diorama.intersectsPearlOuter.get(x, y)?.reduce(n => n + 1, 0) ?? 0;
      return {item: [x, y], bid: bid / (innerPlansAtTile + outerPlansAtTile)}
    })
  )
}

export function bidsForOrdinaryWalls(
  positions: ReadonlyArray<readonly [number, number]>,
  tiles: ReadOnlyGrid<Tile>,
) {
  return positions.filter(([x, y]) => {
    const t = tiles.get(x, y)
    return t === Tile.DIRT || t === Tile.LOOSE_ROCK || t === Tile.HARD_ROCK
  })
}

export function defaultGetRandomTile(
  rng: PseudorandomStream,
  plan: Plan,
  diorama: Diorama,
) {
  const bids = bidsForOrdinaryWalls(plan.innerPearl.flatMap(layer => layer), diorama.tiles)
  if (bids.length > 0) {
    return () => rng.uniformChoice(bids)
  }
  const bids2 = bidsForOuterPearl(plan, diorama)
  if (bids2) {
    return () => rng.weightedChoice(bids2)
  }
  throw new Error('No place to put resource!')
}

export const defaultPlaceCrystals: Architect['placeCrystals'] = ({cavern, plan, diorama}) => {
  const getRandomTile = defaultGetRandomTile(
    cavern.dice.placeCrystals(plan.id),
    plan,
    diorama,
  )
  return sprinkle(
    getRandomTile,
    diorama.tiles,
    diorama.crystals,
    Tile.CRYSTAL_SEAM,
    plan.crystals,
  )
}

export const defaultPlaceOre: Architect['placeOre'] = ({cavern, plan, diorama}) => {
  const getRandomTile = defaultGetRandomTile(
    cavern.dice.placeOre(plan.id),
    plan,
    diorama,
  )
  return sprinkle(
    getRandomTile,
    diorama.tiles,
    diorama.ore,
    Tile.ORE_SEAM,
    plan.ore,
  )
}