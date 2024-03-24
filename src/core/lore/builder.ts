import { Mutable, PseudorandomStream } from "../common";

type State = {[key: string]: boolean}

export type Phrase<T extends State> = {
  readonly id: number;
  readonly text: readonly string[];
  readonly after: Phrase<T>[];
  readonly before: Phrase<T>[];
  readonly requires: (string & keyof T) | 'start' | 'end' | null;
  readonly reachableStates: {[key: string]: boolean};
  readonly lane: number
};

type PgNodeArgs<T extends State> = (PgNode<T> | string)[];

class PgBuilder<T extends State> {
  readonly phrases: Phrase<T>[] = [];
  readonly states = new Set<(string & keyof T)>()

  phrase(
    text: readonly string[], 
    requires?: (string & keyof T) | 'start' | 'end'
  ): Phrase<T> {
    const phrase = {
      id: this.phrases.length,
      text: text,
      requires: requires ?? null,
      after: [],
      before: [],
      reachableStates: {},
      lane: -1,
    };
    this.phrases.push(phrase);
    if (requires  && requires !== 'start' && requires !== 'end') {
      this.states.add(requires)
    }
    return phrase;
  }
}

function join<T extends State>(a: Phrase<T>, b: Phrase<T>) {
  a.after.push(b);
  b.before.push(a);
}

function merge<T extends State>(
  a: readonly Phrase<T>[],
  b: readonly Phrase<T>[],
): Phrase<T>[] {
  let i = 0;
  let j = 0;
  let r = [];
  while (true) {
    if (i >= a.length) {
      if (j >= b.length) {
        return r;
      }
      r.push(b[j++]);
    } else if (j >= b.length || a[i].id < b[j].id) {
      r.push(a[i++]);
    } else if (a[i].id > b[j].id) {
      r.push(b[j++]);
    } else {
      r.push(a[i++]);
      j++;
    }
  }
}

class PgNode<T extends State> {
  private readonly v: PgBuilder<T>;
  private readonly heads: readonly Phrase<T>[];
  private readonly tails: readonly Phrase<T>[];
  private readonly skip: boolean;

  constructor(
    v: PgBuilder<T>,
    heads: readonly Phrase<T>[],
    tails: readonly Phrase<T>[],
    skip: boolean,
  ) {
    this.v = v;
    this.heads = heads;
    this.tails = tails;
    this.skip = skip;
  }

  static coerce<T extends State>(
    pgBuilder: PgBuilder<T>,
    args: PgNodeArgs<T>,
  ): PgNode<T> {
    const text: string[] = [];
    const nodes: PgNode<T>[] = [];
    for (const arg of args) {
      (arg instanceof PgNode ? nodes : text).push(arg as any);
    }
    if (nodes.length === 0) {
      const p = [pgBuilder.phrase(text)];
      return new PgNode(pgBuilder, p, p, false);
    }
    const heads = nodes.flatMap((n) => n.heads).sort((a, b) => a.id - b.id);
    const tails = nodes.flatMap((n) => n.tails).sort((a, b) => a.id - b.id);
    const skip = nodes.some((n) => n.skip);
    if (text.length > 0) {
      const phrase = pgBuilder.phrase(text);
      heads.push(phrase);
      tails.push(phrase);
    }
    return new PgNode(pgBuilder, heads, tails, skip);
  }

  then(...args: PgNodeArgs<T>): PgNode<T> {
    const that = PgNode.coerce(this.v, args);
    for (const t of this.tails) {
      for (const h of that.heads) {
        join(t, h);
      }
    }
    return new PgNode(
      this.v,
      this.skip ? merge(this.heads, that.heads) : this.heads,
      that.skip ? merge(this.tails, that.tails) : that.tails,
      this.skip && that.skip,
    );
  }
}


/** Assuming the input is a DAG, returns new phrases in a topological order. */
function sort<T extends State>(phrases: readonly Phrase<T>[]): readonly Phrase<T>[] {
  const newIndex: (number | undefined)[] = [];
  const stack = phrases.filter((phrase) => phrase.before.length === 0);
  const inOrder: Mutable<Phrase<T>>[] = [];

  while (stack.length > 0) {
    const phrase = stack.shift()!;
    if (newIndex[phrase.id] !== undefined) {
      continue;
    }
    const before = phrase.before.filter((b) => !(newIndex[b.id] !== undefined));
    if (before.length > 0) {
      stack.unshift(...before, phrase);
    } else {
      newIndex[phrase.id] = inOrder.length;
      inOrder.push({...phrase, id: inOrder.length});
      stack.unshift(...phrase.after);
    }
  }

  // inOrder now contains new Phrases with new ids that are copies of the existing
  // phrases, but their after and before values are still pointing to the old ones.

  inOrder.forEach(phrase => {
    phrase.after = phrase.after
      .map((a) => inOrder[newIndex[a.id]!])
      .sort((a, b) => a.id - b.id)
    phrase.before = phrase.before
      .map((b) => inOrder[newIndex[b.id]!])
      .sort((a, b) => a.id - b.id)
  })

  return inOrder
}

/** Assign phrases to lanes. This serves no purpose other than display. */
function align<T extends State>(phrases: readonly Phrase<T>[]) {
  const stack: Mutable<Phrase<T>>[] = phrases.filter(node => node.before.length === 0)
  const occupiedLanes: (true | undefined)[][] = [];
  for (let i = 0; i < phrases.length; i++) {
    occupiedLanes[i] = []
  }

  function findLane(phrase: Phrase<T>): number {
    lane: for(let lane = 0;; lane++) {
      if (phrase.before.length > 0) {
        for(let i = phrase.before[0].id + 1; i <= phrase.id; i++) {
          if (occupiedLanes[i][lane]) {
            continue lane
          }
        }
      }
      return lane
    }
  }
  
  while (stack.length > 0) {
    const phrase = stack.shift()!
    if (phrase.lane >= 0) {
      continue
    }
    const lane = findLane(phrase)
    if (phrase.before.length > 0) {
      for(let i = phrase.before[0].id + 1; i < phrase.id; i++) {
        occupiedLanes[i][lane] = true
      }
      stack.unshift(...phrase.before)
    }
    occupiedLanes[phrase.id][lane] = true
    phrase.lane = lane
    stack.unshift(...phrase.after)
  }
}


function traverse<T extends State>(phrases: readonly Phrase<T>[]) {
  for (let i = phrases.length - 1; i >= 0; i--) {
    const phrase = phrases[i] as Mutable<Phrase<T>>
    const reachableAfter: {[key: string]: true} = {}
    for (const a of phrase.after) {
      Object.assign(reachableAfter, a.reachableStates!)
    }
    if (phrase.requires) {
      const reachable: {[key: string]: true} = {}
      reachable[phrase.requires] = true
      for (const prevStates in reachableAfter) {
        const states = prevStates.split(',')
        if (!states.some(s => s === phrase.requires)) {
          states.push(phrase.requires)
          states.sort()
          reachable[states.join(',')] = true
        }
      }
      phrase.reachableStates = reachable
    } else {
      phrase.reachableStates = reachableAfter
    }
  }
}

export type GenerateResult<T extends State> = {
  readonly chosen: readonly {
    readonly phrase: Phrase<T>,
    readonly textIndex: number,
  }[]
  readonly text: string
}

const CAPITALIZE_AFTER = {
  '.': true,
  '!': true,
  '?': true,
  '\n': true,
} as const

const SPACE_AFTER = {
  '\n': true,
} as const

const NO_SPACE_BEFORE = {
  ',': true,
  '.': true,
  '!': true,
  '?': true,
  '\n': true,
} as const

function joinTexts<T extends State>(
  chosen: readonly {readonly phrase: Phrase<T>, readonly textIndex: number}[]
): string {
  const r: string[] = []
  let capitalizeNext = true
  let spaceBeforeNext = false
  for (const {phrase, textIndex} of chosen) {
    const text = phrase.text[textIndex]
    if (!text) {
      continue
    }
    const endsWith = text.charAt(text.length - 1)
    if (spaceBeforeNext && !(endsWith in NO_SPACE_BEFORE)) {
      r.push(' ')
    }
    if (capitalizeNext) {
      r.push(text[0].toUpperCase())
      r.push(text.slice(1))
    } else {
      r.push(text)
    }
    capitalizeNext = endsWith in CAPITALIZE_AFTER
    spaceBeforeNext = endsWith in SPACE_AFTER
  }
  return r.join('')
}

export class PhraseGraph<T extends State> {
  private start: Phrase<T>;
  readonly phrases: readonly Phrase<T>[];
  readonly states: readonly (string & keyof T)[];

  constructor(
    start: Phrase<T>,
    phrases: readonly Phrase<T>[],
    states: readonly (string & keyof T)[],
  ) {
    this.start = start
    this.phrases = phrases
    this.states = states
  }

  generate(rng: PseudorandomStream, requireState: T) {
    const stateRemaining: {[key: string]: boolean} = {start: true, end: true}
    for (const s of this.states) {
      if (requireState[s]) {
        stateRemaining[s] = true
      }
    }
    const chosenPhrases: Phrase<T>[] = [this.start]
    while (true) {
      const phrase = chosenPhrases[chosenPhrases.length - 1]
      if (phrase.requires === 'end') {
        break
      } else if (phrase.requires) {
        stateRemaining[phrase.requires] = false
      }
      const reachedState = this.states.filter(s => stateRemaining).sort().join(',')
      const continuations = phrase.after.filter(a => reachedState in a.reachableStates)
      if (continuations.length === 0) {
        throw new Error(`No continuation has ${reachedState} at phrase ${phrase.id}`)
      }
      chosenPhrases.push(rng.uniformChoice(continuations))
    }
    const chosen = chosenPhrases.map(phrase => ({
      phrase, 
      textIndex: phrase.text.length > 0 ? rng.uniformInt({max: phrase.text.length}) : -1
    }))
    const text = joinTexts(chosen)
    return {chosen, text}
  }
}

export default function phraseGraph<T extends State>(
  fn: (args: {
    pg: (...args: PgNodeArgs<T>) => PgNode<T>;
    state: (...args: (string & keyof T)[]) => PgNode<T>;
    start: PgNode<T>;
    end: PgNode<T>;
    cut: PgNode<T>;
    skip: PgNode<T>;
  }) => void,
): PhraseGraph<T> {
  const pgBuilder = new PgBuilder<T>();

  const pg = (...args: PgNodeArgs<T>): PgNode<T> =>
    PgNode.coerce(pgBuilder, args);
  const state = (...args: (string & keyof T)[]): PgNode<T> => {
    const phrases = args.map((arg) => pgBuilder.phrase([], arg));
    return new PgNode(pgBuilder, phrases, phrases, false);
  };
  const start = new PgNode(
    pgBuilder,
    [],
    [pgBuilder.phrase([], "start")],
    false,
  );
  const end = new PgNode(pgBuilder, [pgBuilder.phrase([], "end")], [], false);
  const cut = new PgNode(pgBuilder, [], [], false);
  const skip = new PgNode(pgBuilder, [], [], true);

  fn({ pg, state, start, end, cut, skip });

  const phrases = sort(pgBuilder.phrases)
  align(phrases)
  traverse(phrases)
  const newStart = phrases.find(phrase => phrase.requires === 'start')!
  const states = Array.from(pgBuilder.states.values()).sort()

  return new PhraseGraph(newStart, phrases, states)
}