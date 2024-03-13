type Bounds = {
  left: number
  top: number
  right: number
  bottom: number
}

export class Grid<T> {
  private data: Map<`${number},${number}`, T>

  constructor(data?: Map<`${number},${number}`, T>) {
    this.data = new Map(data)
  }

  copy(): Grid<T> {
    return new Grid(this.data)
  }

  get(x: number, y: number): T | undefined {
    return this.data.get(`${x},${y}`)
  }

  set(x: number, y: number, value: T) {
    this.data.set(`${x},${y}`, value)
  }

  get bounds(): Bounds {
    const r: Partial<Bounds> = {}
    this.forEach((_, x, y) => {
      if (!(x >= r.left!)) {
        r.left = x
      } else if (!(x + 1 <= r.right!)) {
        r.right = x + 1
      }
      if (!(y >= r.top!)) {
        r.top = y
      } else if (!(y + 1 <= r.bottom!)) {
        r.bottom = y + 1
      }
    })
    return r as Bounds
  }

  forEach(fn: (value: T, x: number, y: number) => void) {
    this.data.forEach((v, k) => {
      const [x, y] = k.split(',')
      fn(v, parseInt(x), parseInt(y))
    })
  }

  map<V>(fn: (value: T, x: number, y: number) => V) {
    const result: V[] = []
    this.forEach((...args) => result.push(fn(...args)))
    return result
  }
}

export type ReadOnlyGrid<T> = Omit<Grid<T>, 'set'>