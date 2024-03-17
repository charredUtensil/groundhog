type TfResult<T, U extends T> = {
  result: U;
  next: (() => TfResult<T, any>) | null;
};

class TfBuilder<T, U extends T, V extends T> {
  private fns: ((it: T) => T)[];
  constructor(fns: ((it: T) => T)[]) {
    this.fns = fns;
  }
  private mkNext<A extends T>(result: A, i: number) {
    const next =
      i < this.fns.length
        ? () => this.mkNext(this.fns[i](result), i + 1)
        : null;
    return { result, next };
  }
  first<A extends T>(result: A): TfResult<T, A> {
    const next = () => this.mkNext(result, 0);
    return { result, next };
  }
  then<W extends T>(
    that: TfBuilder<T, V, W> | ((it: V) => W),
  ): TfBuilder<T, U, W> {
    if (that instanceof TfBuilder) {
      return new TfBuilder([...this.fns, ...that.fns]);
    } else {
      return new TfBuilder([...this.fns, that] as any);
    }
  }
}

export function tf<T, U extends T, V extends T>(
  fn: (it: U) => V,
): TfBuilder<T, U, V> {
  return new TfBuilder([fn as unknown as (it: T) => T]);
}
