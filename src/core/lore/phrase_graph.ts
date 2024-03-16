import { pairEach } from "../common/utils"

type State = {
  start: boolean,
  end: boolean,
}

export type Phrase<T extends State> = {
  readonly id: number,
  readonly text: readonly string[],
  readonly after: Phrase<T>[],
  readonly before: Phrase<T>[],
  readonly requires: keyof T | null,
  taggedStates?: any, //Optional[Dict[FrozenSet[str], int]] = None
  isReachable?: Boolean,
}


type PgNodeArgs<T extends State> = (PgNode<T> | string)[]

class PgBuilder<T extends State> {
  readonly phrases: Phrase<T>[] = []

  phrase(text: readonly string[], requires?: keyof T): Phrase<T> {
    const phrase = {
      id: this.phrases.length,
      text: text,
      requires: requires ?? null,
      after: [],
      before: [],
    }
    this.phrases.push(phrase)
    return phrase
  }
}

function join<T extends State>(a: Phrase<T>, b: Phrase<T>) {
  a.after.push(b)
  b.before.push(a)
}

function merge<T extends State>(a: readonly Phrase<T>[], b: readonly Phrase<T>[]): Phrase<T>[] {
  let i = 0;
  let j = 0;
  let r = [];
  while (true) {
    if (i >= a.length) {
      if (j >= b.length) {
        return r
      }
      r.push(b[j++])
    } else if (j >= b.length || a[i].id < b[j].id) {
      r.push(a[i++])
    } else if (a[i].id > b[j].id) {
      r.push(b[j++])
    } else {
      r.push(a[i++])
      j++
    }
  }
}

class PgNode<T extends State> {
  private readonly v: PgBuilder<T>
  private readonly heads: readonly Phrase<T>[]
  private readonly tails: readonly Phrase<T>[]
  private readonly skip: boolean

  constructor(v: PgBuilder<T>, heads: readonly Phrase<T>[], tails: readonly Phrase<T>[], skip: boolean) {
    this.v = v
    this.heads = heads
    this.tails = tails
    this.skip = skip
  }

  static coerce<T extends State>(pgBuilder: PgBuilder<T>, args: PgNodeArgs<T>): PgNode<T> {
    const text: string[] = []
    const nodes: PgNode<T>[] = []
    for (const arg of args) {
      (arg instanceof PgNode ? nodes : text).push(arg as any)
    }
    if (nodes.length === 0) {
      const p = [pgBuilder.phrase(text)]
      return new PgNode(pgBuilder, p, p, false)
    }
    const heads = nodes.flatMap(n => n.heads).sort((a, b)=> a.id - b.id)
    const tails = nodes.flatMap(n => n.tails).sort((a, b)=> a.id - b.id)
    const skip = nodes.some(n => n.skip)
    if (text.length > 0) {
      const phrase = pgBuilder.phrase(text)
      heads.push(phrase)
      tails.push(phrase)
    }
    return new PgNode(pgBuilder, heads, tails, skip)
  }

  then(...args: PgNodeArgs<T>): PgNode<T> {
    const that = PgNode.coerce(this.v, args)
    for (const t of this.tails) {
      for (const h of that.heads) {
        join(t, h)
      }
    }
    return new PgNode(
      this.v,
      this.skip ? merge(this.heads, that.heads) : this.heads,
      that.skip ? merge(this.tails, that.tails) : that.tails,
      this.skip && that.skip
    )
  }
}

export type PhraseGraph<T extends State> = {
  phrases: readonly Phrase<T>[]
}

export default function phraseGraph<T extends State>(fn: (args: {
  pg: (...args: PgNodeArgs<T>) => PgNode<T>,
  state: (...args: (keyof T)[]) => PgNode<T>,
  start: PgNode<T>,
  end: PgNode<T>,
  cut: PgNode<T>,
  skip: PgNode<T>,
}) => void): PhraseGraph<T> {
  const pgBuilder = new PgBuilder<T>()
  const pg = (...args: PgNodeArgs<T>): PgNode<T> => PgNode.coerce(pgBuilder, args)
  const state = (...args: (keyof T)[]): PgNode<T> => {
    const phrases = args.map(arg => pgBuilder.phrase([], arg))
    return new PgNode(pgBuilder, phrases, phrases, false)
  }
  const start = new PgNode(pgBuilder, [], [pgBuilder.phrase([], 'start')], false)
  const end = new PgNode(pgBuilder, [pgBuilder.phrase([], 'end')], [], false)
  const cut = new PgNode(pgBuilder, [], [], false)
  const skip = new PgNode(pgBuilder, [], [], true)
  fn({pg, state, start, end, cut, skip})
  return {
    phrases: pgBuilder.phrases
  }
}