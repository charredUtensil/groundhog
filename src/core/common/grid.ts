type Bounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

const BIT_SHIFT = 16;
const OFFSET = 0x4000;
const MASK = 0x7fff;
const MAX = 0x7fff;

export function toKey(x: number, y: number): number {
  const shx = x + OFFSET;
  const shy = y + OFFSET;
  if (shx < 0 || shx > MAX || shy < 0 || shy > MAX) {
    throw new Error(`[${x}, ${y}] is out of range (${-OFFSET}..${OFFSET - 1})`);
  }
  return (shy << BIT_SHIFT) | shx;
}

function parseKey(key: number): [number, number] {
  const shy = key >> BIT_SHIFT;
  const shx = key & MASK;
  return [shx - OFFSET, shy - OFFSET];
}

/**
 * A two dimensional sparse grid of data.
 */
export class MutableGrid<T> {
  private data: Map<number, T>;

  constructor(data?: Map<number, T>) {
    this.data = new Map(data);
  }

  copy(): MutableGrid<T> {
    return new MutableGrid(this.data);
  }

  get(x: number, y: number): T | undefined {
    return this.data.get(toKey(x, y));
  }

  set(x: number, y: number, value: T) {
    this.data.set(toKey(x, y), value);
  }

  delete(x: number, y: number): boolean {
    return this.data.delete(toKey(x, y));
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
      fn(v, ...parseKey(k));
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

/** A read-only two dimensional sparse grid of data. */
export type Grid<T> = Omit<MutableGrid<T>, "set" | "delete">;

export const _forTests = { toKey, parseKey };
