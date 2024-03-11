import { Grid } from "../common/grid";
import { RoughTile, Tile } from "./tiles";

export type BaseDiorama = {
  copy<T = AnyMutableDiorama>(): T
  intersectsPearlInner(x: number, y: number): readonly boolean[]
  intersectsPearlOuter(x: number, y: number): readonly boolean[]
}
type BaseDioramaPutArgs = {
  x: number,
  y: number,
  intersectsPearlInner?: readonly boolean[],
  intersectsPearlOuter?: readonly boolean[],
}
export type MutableBaseDiorama = BaseDiorama & {
  put(args: BaseDioramaPutArgs): void
}

export type RoughDiorama = BaseDiorama & {
  copy(): MutableRoughDiorama
  tile(x: number, y: number): RoughTile
}
type RoughDioramaPutArgs = { 
  x: number,
  y: number,
  tile?: RoughTile,
}
export type MutableRoughDiorama = RoughDiorama & {
  put(args: RoughDioramaPutArgs): void
}

export type Diorama = RoughDiorama & {
  copy(): MutableDiorama
  tile(x: number, y: number): Tile
  crystals(x: number, y: number): number
}
type DioramaPutArgs = RoughDioramaPutArgs & {
  tile?: Tile,
  crystals?: number,
}
export type MutableDiorama = Diorama & {
  put(args: DioramaPutArgs): void
}

type AnyMutableDiorama = MutableBaseDiorama | MutableRoughDiorama | MutableDiorama
type AllMutableDiorama = MutableBaseDiorama & MutableRoughDiorama & MutableDiorama

class DioramaImpl implements AllMutableDiorama {
  _intersectsPearlInner: Grid<readonly boolean[]>
  _intersectsPearlOuter: Grid<readonly boolean[]>
  _tiles: Grid<Tile>
  _crystals: Grid<number>

  constructor(copyOf?: DioramaImpl) {
    this._intersectsPearlInner = new Grid(copyOf?._intersectsPearlInner)
    this._intersectsPearlOuter = new Grid(copyOf?._intersectsPearlOuter)
    this._tiles = new Grid(copyOf?._tiles)
    this._crystals = new Grid(copyOf?._crystals)
  }

  copy<T = AnyMutableDiorama>(): T {
    return (new DioramaImpl(this) as T)
  }

  intersectsPearlInner(x: number, y: number): readonly boolean[] {
    return this._intersectsPearlInner.get(x, y) || []
  }

  intersectsPearlOuter(x: number, y: number): readonly boolean[] {
    return this._intersectsPearlOuter.get(x, y) || []
  }

  tile(x: number, y: number): Tile {
    return this._tiles.get(x, y) ?? Tile.SOLID_ROCK
  }

  crystals(x: number, y: number): number {
    return this._crystals.get(x, y) ?? 0
  }

  put({
    x, 
    y,
    intersectsPearlInner,
    intersectsPearlOuter,
    tile, 
    crystals,
  }: {
  x: number, 
  y: number,
  intersectsPearlInner?: readonly boolean[],
  intersectsPearlOuter?: readonly boolean[],
  tile?: Tile, 
  crystals?: number,}) {
    if (tile !== undefined) {this._tiles.set(x, y, tile)}
    if (crystals !== undefined) {this._crystals.set(x, y, crystals)}
  }
}

export function emptyDiorama<T = AnyMutableDiorama>(): T {
  return new DioramaImpl() as T
}