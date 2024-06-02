type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export class MutableGrid<T> {
  private data: Map<`${number},${number}`, T>;

  constructor(data?: Map<`${number},${number}`, T>) {
    this.data = new Map(data);
  }

  copy(): MutableGrid<T> {
    return new MutableGrid(this.data);
  }

  get(x: number, y: number): T | undefined {
    return this.data.get(`${x},${y}`);
  }

  set(x: number, y: number, value: T) {
    this.data.set(`${x},${y}`, value);
  }

  get size(): number {
    return this.data.size;
  }

  get bounds(): Bounds {
    const r: Partial<Bounds> = {};
    this.forEach((_, x, y) => {
      if (!(x >= r.left!)) {
        r.left = x;
      } else if (!(x + 1 <= r.right!)) {
        r.right = x + 1;
      }
      if (!(y >= r.top!)) {
        r.top = y;
      } else if (!(y + 1 <= r.bottom!)) {
        r.bottom = y + 1;
      }
    });
    return r as Bounds;
  }

  forEach(fn: (value: T, x: number, y: number) => void) {
    this.data.forEach((v, k) => {
      const [x, y] = k.split(",");
      fn(v, parseInt(x), parseInt(y));
    });
  }

  map<V>(fn: (value: T, x: number, y: number) => V) {
    const result: V[] = [];
    this.forEach((...args) => result.push(fn(...args)));
    return result;
  }

  flatMap<V>(fn: (value: T, x: number, y: number) => V[]) {
    const result: V[] = [];
    this.forEach((...args) => result.push(...fn(...args)));
    return result;
  }

  reduce<V>(
    fn: (previousValue: V, currentValue: T, x: number, y: number) => V,
    initialValue: V,
  ) {
    let result: V = initialValue;
    this.forEach((...args) => (result = fn(result, ...args)));
    return result;
  }
}

export type Grid<T> = Omit<MutableGrid<T>, "set">;
