
/**
 * Since negative indices are not allowed in Typescript, double the coordinate
 * value and use the two's compliment for negative coordinates. This means the
 * coordinates will be translated as [0, -1, 1, -2, 2, -3, 3, ...].
 */
function c2i(c: number) {
  return c < 0 ? ~(c << 1) : c << 1
}

function gridEach<T>(
  grid: ReadonlyArray<ReadonlyArray<T>>,
  fn: (value: T, x: number, y: number) => void,
) {
  for (let y = -(grid.length >> 1); y <= grid.length >> 1; y++) {
    const yi = y < 0 ? ~(y << 1) : y << 1
    const row = grid[yi]
    if (row) {
      for(let x = -(row.length >> 1); x <= row.length >> 1; x++) {
        fn(row[x], x, y)
      }
    }
  }
}

function gridMap<U, V>(
  grid: ReadonlyArray<ReadonlyArray<U>>,
  fn: (value: U, x: number, y: number) => V,
): V[] {
  const result: V[] = []
  gridEach(grid, (...args) => result.push(fn(...args)))
  return result
}

export class Grid<T> {
  private data: T[][]

  constructor(copyOf?: Grid<T>) {
    this.data = copyOf?.data.map(row => row.slice()) ?? []
  }

  copy(): Grid<T> {
    return new Grid(this)
  }

  get(x: number, y: number): T | undefined {
    return this.data[c2i(y)]?.[c2i(x)]
  }

  set(x: number, y: number, value: T) {
    (this.data[c2i(y)] ||= [])[c2i(x)] = value
  }

  forEach(fn: (value: T, x: number, y: number) => void) {
    gridEach(this.data, fn)
  }

  map<V>(fn: (value: T, x: number, y: number) => V) {
    return gridMap(this.data, fn)
  }
}