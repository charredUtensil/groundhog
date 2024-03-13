type TfResult<T, U extends T> = {
  result: U;
  next: () => TfResult<T, any>;
};

class TfBuilder<T, U extends T, V extends T> {
  private fns: ((it: T) => T)[];
  constructor(fns: ((it: T) => T)[]) {
    this.fns = fns;
  }
  private mkCall<A extends T>(result: A, i: number) {
    const next = () => this.mkCall(this.fns[i](result), i + 1);
    return { result, next };
  }
  first<A extends T>(result: A): TfResult<T, A> {
    const next = () => this.mkCall(result, 0);
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
