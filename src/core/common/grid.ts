export class Grid<T> {
  private data: Map<`${number},${number}`, T>

  constructor(copyOf?: Grid<T>) {
    this.data = new Map(copyOf?.data)
  }

  copy(): Grid<T> {
    return new Grid(this)
  }

  get(x: number, y: number): T | undefined {
    return this.data.get(`${x},${y}`)
  }

  set(x: number, y: number, value: T) {
    this.data.set(`${x},${y}`, value)
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