import { RoughTile, Tile } from "./tiles"

type RoughTileInfo = {
  tile: RoughTile
}

export type RoughDiorama = {
  tiles: Map<`${number},${number}`, RoughTileInfo>
}

type FineTileInfo = {
  tile: Tile
  crystals: number
}

export type FineDiorama = RoughDiorama & {
  tiles: Map<`${number},${number}`, FineTileInfo>
}