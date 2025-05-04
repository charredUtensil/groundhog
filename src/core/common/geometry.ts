export type Point = readonly [number, number];
export type Cardinal4 = typeof NORTH | typeof EAST | typeof SOUTH | typeof WEST;
export type Cardinal8 =
  | Cardinal4
  | typeof NORTH_EAST
  | typeof SOUTH_EAST
  | typeof SOUTH_WEST
  | typeof NORTH_WEST;

export const ORIGIN = [0, 0] as const;
export const NORTH = [0, -1] as const;
export const NORTH_EAST = [1, -1] as const;
export const EAST = [1, 0] as const;
export const SOUTH_EAST = [1, 1] as const;
export const SOUTH = [0, 1] as const;
export const SOUTH_WEST = [-1, 1] as const;
export const WEST = [-1, 0] as const;
export const NORTH_WEST = [-1, -1] as const;

export const NSEW = [NORTH, SOUTH, EAST, WEST] as const satisfies Cardinal4[];
export const NEIGHBORS8 = [
  NORTH,
  NORTH_EAST,
  EAST,
  SOUTH_EAST,
  SOUTH,
  SOUTH_WEST,
  WEST,
  NORTH_WEST,
] as const satisfies Cardinal8[];

/**
 * Returns true if the two points given share a side.
 */
export function isAdjacent4(a: Point, b: Point) {
  return (
    (a[0] === b[0] && Math.abs(a[1] - b[1]) <= 1) ||
    (a[1] === b[1] && Math.abs(a[0] - b[0]) <= 1)
  );
}

/**
 * Returns true if the two points given share a side or corner.
 */
export function isAdjacent8(a: Point, b: Point) {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1;
}

/**
 * Converts a point to an {x, y} object as used with Position.
 */
export function asXY([x, y]: Point) {
  return { x, y };
}

/**
 * Given a point and a set of points, returns the closest point in the set.
 */
export function closestTo(
  [x, y]: Point,
  points: readonly Point[],
): Point | null {
  if (!points.length) {
    return null;
  }
  let [rx, ry] = points[0];
  let minD = Infinity;
  for (const [x1, y1] of points) {
    // Don't bother computing square root
    const d = (x - x1) * (x - x1) + (y - y1) * (y - y1);
    if (d < minD) {
      [rx, ry, minD] = [x1, y1, d];
    }
  }
  return [rx, ry];
}

/** Adds two points together. */
export function offsetBy([x, y]: Point, [ox, oy]: Point): Point {
  return [x + ox, y + oy];
}

/** Plots a contiguous line between the two given points. */
export function* plotLine(a: Point, b: Point): IterableIterator<Point> {
  let x = Math.floor(a[0]);
  let y = Math.floor(a[1]);
  const destX = Math.floor(b[0]);
  const destY = Math.floor(b[1]);

  const dx = Math.abs(destX - x);
  const sx = destX > x ? 1 : -1;
  const dy = -Math.abs(destY - y);
  const sy = destY > y ? 1 : -1;

  let error = dx + dy;

  while (true) {
    yield [x, y];

    if (x === destX && y === destY) {
      break;
    }

    const e2 = 2 * error;
    const moveX = e2 >= dy;
    const moveY = e2 <= dx;

    if (moveX) {
      if (x === destX) {
        break;
      }
      error += dy;
      x += sx;
    }

    if (moveY) {
      if (moveX) {
        yield [x, y];
      }
      if (y === destY) {
        break;
      }
      error += dx;
      y += sy;
    }
  }
}

export function radsToDegrees(rads: number) {
  return (((rads * 180) / Math.PI + 180) % 360) - 180;
}

export function rotateAround([x, y]: Point): Point {
  return [-x, -y];
}

export function rotateLeft([x, y]: Point): Point {
  return [y, -x];
}

export function rotateRight([x, y]: Point): Point {
  return [-y, x];
}
