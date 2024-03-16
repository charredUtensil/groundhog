export type Point = readonly [number, number]
export type Cardinal4 = [0, -1] | [1, 0] | [0, 1] | [-1, 0]
export type Cardinal8 = Cardinal4 | [1, -1] | [1, 1] | [-1, 1] | [-1, -1]

export const ORIGIN: Point = [0, 0]
export const NORTH:      Point = [0, -1]
export const NORTH_EAST: Point = [1, -1]
export const EAST:       Point = [1, 0]
export const SOUTH_EAST: Point = [1, 1]
export const SOUTH:      Point = [0, 1]
export const SOUTH_WEST: Point = [-1, 1]
export const WEST:       Point = [-1, 0]
export const NORTH_WEST: Point = [-1, -1]

export const NSEW: readonly Point[] = [NORTH, SOUTH, EAST, WEST]

export function isAdjacent4(a: Point, b: Point) {
  return (
    (a[0] == b[0] && Math.abs(a[1] - b[1]) <= 1) ||
    (a[1] == b[1] && Math.abs(a[0] - b[0]) <= 1)
  );
}
export function isAdjacent8(a: Point, b: Point) {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1;
}

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

export function rotateRight([x, y]: Point): Point {
  return [-y, x]
}
export function rotateLeft([x, y]: Point): Point {
  return [y, -x]
}
export function rotateAround([x, y]: Point): Point {
  return [-x, -y]
}