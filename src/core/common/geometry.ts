export function adjacent4(
  a: [number, number],
  b: [number, number],
) {
  return (a[0] == b[0] && Math.abs(a[1] - b[1]) <= 1) || 
    (a[1] == b[1] && Math.abs(a[0] - b[0]) <= 1)
}
export function adjacent8(
  a: [number, number],
  b: [number, number],
) {
  return Math.abs(a[0] - b[0]) <= 1 && Math.abs(a[1] - b[1]) <= 1
}

export function* plotLine(
  a: [number, number],
  b: [number, number],
): IterableIterator<[number, number]> {
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
