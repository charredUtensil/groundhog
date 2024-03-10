export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export function pairEach<T>(it: readonly T[], fn: (a: T, b: T, i: number) => void) {
  for (let i = 0; i < it.length - 2; i++) {
    fn(it[i], it[i + 1], i)
  }
}

export function pairMap<U, V>(it: readonly U[], fn: (a: U, b: U, i: number) => V): V[] {
  const result: V[] = []
  pairEach(it, (...args) => result.push(fn(...args)))
  return result
}