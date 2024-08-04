import { NSEW } from "../../common/geometry";
import { Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "./01_rough";

export default function sand(cavern: RoughPlasticCavern): RoughPlasticCavern {
  const tiles = cavern.tiles.copy();
  cavern.tiles.forEach((t, x, y) => {
    if (
      // Shave down any hard rock that doesn't border other hard rock
      t === Tile.HARD_ROCK &&
      !NSEW.some(([ox, oy]) => {
        const ot = tiles.get(x + ox, y + oy);
        return !ot || ot === Tile.HARD_ROCK || ot === Tile.SOLID_ROCK;
      })
    ) {
      tiles.set(x, y, Tile.LOOSE_ROCK);
    }
  });
  return {...cavern, tiles};
}