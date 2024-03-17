import { plotLine } from "../../common/geometry";
import { Baseplate } from "../../models/baseplate";
import { TriangulatedCavern } from "./02_triangulate";
import { Path } from "../../models/path";

/**
 * Add ambiguous baseplates to paths that intersect them.
 */
export default function bore(cavern: TriangulatedCavern): TriangulatedCavern {
  const bpAtTile: { [tile: string]: Baseplate } = {};

  for (const bp of cavern.baseplates) {
    for (let x = bp.left; x < bp.right; x++) {
      for (let y = bp.top; y < bp.bottom; y++) {
        bpAtTile[`${x},${y}`] = bp;
      }
    }
  }

  function* genPathPlates(path: Path): IterableIterator<Baseplate> {
    let last = path.origin;
    const seen = new Set([last]);

    yield last;

    while (true) {
      for (const [x, y] of plotLine(last.center, path.destination.center)) {
        const bp = bpAtTile[`${x},${y}`];
        if (bp === path.destination) {
          yield bp;
          return;
        }
        if (bp && !seen.has(bp)) {
          seen.add(bp);
          if (bp.kind !== "cave") {
            last = bp;
            yield last;
            break;
          }
        }
      }
    }
  }

  const paths = cavern.paths.map((path) => {
    return new Path(path.id, path.kind, Array.from(genPathPlates(path)));
  });
  return { ...cavern, paths };
}
