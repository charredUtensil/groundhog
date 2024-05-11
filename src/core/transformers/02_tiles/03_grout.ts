import { NEIGHBORS8, NSEW } from "../../common/geometry";
import { Tile } from "../../models/tiles";
import { RoughPlasticCavern } from "./01_rough";

export default function grout(cavern: RoughPlasticCavern): RoughPlasticCavern {
  const tiles = cavern.tiles.copy();
  cavern.tiles.forEach((t, x, y) => {
    if (t.isWall) {
      return
    }
    if (!NEIGHBORS8.some(([ox, oy]) => tiles.get(x + ox, y + oy)?.isWall === false)) {
      tiles.set(x, y, Tile.DIRT);
      return
    }
    if (t.isFluid && !NSEW.some(([ox, oy]) => tiles.get(x + ox, y + oy)?.isFluid)) {
      tiles.set(x, y, Tile.FLOOR);
    }
  })
  return {...cavern, tiles}
}