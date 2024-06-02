import {
  EAST,
  NORTH,
  NORTH_EAST,
  NORTH_WEST,
  NSEW,
  SOUTH,
  SOUTH_EAST,
  SOUTH_WEST,
  WEST,
} from "../../common/geometry";
import { Grid } from "../../common/grid";
import { Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "./01_rough";

const HOLE_MAP = [
  [...NORTH, 2],
  [...NORTH_EAST, 1],
  [...EAST, 2],
  [...SOUTH_EAST, 1],
  [...SOUTH, 2],
  [...SOUTH_WEST, 1],
  [...WEST, 2],
  [...NORTH_WEST, 1],
] as const;

function isHole(tiles: Grid<Tile>, x: number, y: number) {
  let r = 0;
  for (let i = 0; i < HOLE_MAP.length; i++) {
    const [ox, oy, v] = HOLE_MAP[i];
    if (tiles.get(x + ox, y + oy)?.isWall === false) {
      r += v;
    }
    if (r >= 2) {
      return false;
    }
  }
  return true;
}

export default function grout(cavern: RoughPlasticCavern): RoughPlasticCavern {
  const tiles = cavern.tiles.copy();
  cavern.tiles.forEach((t, x, y) => {
    if (t.isWall) {
      return;
    }
    if (isHole(tiles, x, y)) {
      tiles.set(x, y, Tile.DIRT);
      return;
    }
    if (
      t.isFluid &&
      !NSEW.some(([ox, oy]) => tiles.get(x + ox, y + oy)?.isFluid)
    ) {
      tiles.set(x, y, Tile.FLOOR);
    }
  });
  return { ...cavern, tiles };
}
