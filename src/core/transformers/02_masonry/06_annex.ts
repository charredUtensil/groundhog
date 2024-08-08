import { NSEW, Point } from "../../common/geometry";
import { Tile } from "../../models/tiles";
import { FinePlasticCavern } from "./05_fine";

function isInPlay(voidNeighbors: Point[]) {
  if (voidNeighbors.length === 2) {
    const [a, b] = voidNeighbors;
    return a[0] === b[0] || a[1] === b[1];
  }
  return voidNeighbors.length < 2;
}

export default function annex(cavern: FinePlasticCavern): FinePlasticCavern {
  const tiles = cavern.tiles.copy();
  const queue = cavern.tiles.flatMap((_, x, y) =>
    NSEW.map(([ox, oy]) => [x + ox, y + oy] as Point),
  );
  while (queue.length) {
    const [x, y] = queue.shift()!;
    if (tiles.get(x, y)) {
      continue;
    }
    const voidNeighbors = NSEW.map(
      ([ox, oy]) => [x + ox, y + oy] as Point,
    ).filter((pos) => !tiles.get(...pos));
    if (isInPlay(voidNeighbors)) {
      // This tile is potentially destroyable.
      tiles.set(x, y, Tile.SOLID_ROCK);
      queue.push(...voidNeighbors);
    }
  }
  return { ...cavern, tiles };
}
