import { Mutable, PseudorandomStream } from "../../common";
import { BaseState, Phrase, PgNodeArgs, PgArgs, TextFn } from "./base";

class PgBuilder<StateT extends BaseState, FormatT> {
  readonly phrases: Phrase<StateT, FormatT>[] = [];
  readonly states = new Set<string & keyof StateT>();

  phrase(
    text: readonly TextFn<FormatT>[],
    requires?: (string & keyof StateT) | "start" | "end",
  ): Phrase<StateT, FormatT> {
    const phrase = {
      id: this.phrases.length,
      text,
      requires: requires ?? null,
      after: [],
      before: [],
      reachableStates: new Set<bigint>(),
      lane: -1,
    };
    this.phrases.push(phrase);
    if (requires && requires !== "start" && requires !== "end") {
      this.states.add(requires);
    }
    return phrase;
  }
}

function join<StateT extends BaseState, FormatT>(
  a: Phrase<StateT, FormatT>,
  b: Phrase<StateT, FormatT>,
) {
  a.after.push(b);
  b.before.push(a);
}

function merge<StateT extends BaseState, FormatT>(
  a: readonly Phrase<StateT, FormatT>[],
  b: readonly Phrase<StateT, FormatT>[],
): Phrase<StateT, FormatT>[] {
  let i = 0;
  let j = 0;
  const r = [];
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

function stateToMask<StateT extends BaseState>(
  state: "start" | "end" | (string & keyof StateT),
  allStates: readonly (string & keyof StateT)[],
) {
  if (state === "start") {
    return 1n;
  }
  if (state === "end") {
    return 2n;
  }
  return 4n << BigInt(allStates.indexOf(state));
}

function maskToStates<StateT extends BaseState>(
  mask: bigint,
  allStates: readonly (string & keyof StateT)[],
) {
  let n = mask;
  const r = [];
  for (const s of ["start", "end", ...allStates]) {
    if ((n & 1n) === 1n) {
      r.push(s);
    }
    n >>= 1n;
  }
  return r.join(" ");
}

export class PgNode<StateT extends BaseState, FormatT> {
  private readonly v: PgBuilder<StateT, FormatT>;
  private readonly heads: readonly Phrase<StateT, FormatT>[];
  private readonly tails: readonly Phrase<StateT, FormatT>[];
  private readonly skip: boolean;

  constructor(
    v: PgBuilder<StateT, FormatT>,
    heads: readonly Phrase<StateT, FormatT>[],
    tails: readonly Phrase<StateT, FormatT>[],
    skip: boolean,
  ) {
    this.v = v;
    this.heads = heads;
    this.tails = tails;
    this.skip = skip;
  }

  static coerce<StateT extends BaseState, FormatT>(
    pgBuilder: PgBuilder<StateT, FormatT>,
    args: PgNodeArgs<StateT, FormatT>,
  ): PgNode<StateT, FormatT> {
    const text: TextFn<FormatT>[] = [];
    const nodes: PgNode<StateT, FormatT>[] = [];
    for (const arg of args) {
      if (arg instanceof PgNode) {
        nodes.push(arg);
      } else if (typeof arg === "function") {
        text.push(arg);
      } else {
        text.push(() => arg);
      }
    }
    if (nodes.length === 0) {
      const p = [pgBuilder.phrase(text)];
      return new PgNode(pgBuilder, p, p, false);
    }
    const heads = nodes.reduce(
      (r: Phrase<StateT, FormatT>[], n) => merge(r, n.heads),
      [],
    );
    const tails = nodes.reduce(
      (r: Phrase<StateT, FormatT>[], n) => merge(r, n.tails),
      [],
    );
    const skip = nodes.some((n) => n.skip);
    if (text.length > 0) {
      const phrase = pgBuilder.phrase(text);
      heads.push(phrase);
      tails.push(phrase);
    }
    return new PgNode(pgBuilder, heads, tails, skip);
  }

  then(...args: PgNodeArgs<StateT, FormatT>): PgNode<StateT, FormatT> {
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
function sort<StateT extends BaseState, FormatT>(
  phrases: readonly Phrase<StateT, FormatT>[],
): readonly Phrase<StateT, FormatT>[] {
  const newIndex: (number | undefined)[] = [];
  const stack = phrases.filter((phrase) => phrase.before.length === 0);
  const inOrder: Mutable<Phrase<StateT, FormatT>>[] = [];

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
      inOrder.push({ ...phrase, id: inOrder.length });
      stack.unshift(...phrase.after);
    }
  }

  // inOrder now contains new Phrases with new ids that are copies of the existing
  // phrases, but their after and before values are still pointing to the old ones.

  inOrder.forEach((phrase) => {
    phrase.after = phrase.after
      .map((a) => inOrder[newIndex[a.id]!])
      .sort((a, b) => a.id - b.id);
    phrase.before = phrase.before
      .map((b) => inOrder[newIndex[b.id]!])
      .sort((a, b) => a.id - b.id);
  });

  return inOrder;
}

function getReachableStates<StateT extends BaseState, FormatT>(
  phrase: Phrase<StateT, FormatT>,
  allStates: readonly (string & keyof StateT)[],
) {
  const reachableAfter = new Set<bigint>();

  for (const after of phrase.after) {
    for (const ars of after.reachableStates) {
      reachableAfter.add(ars);
    }
  }

  const requiresMask = phrase.requires
    ? stateToMask(phrase.requires, allStates)
    : 0n;

  if (reachableAfter.size === 0) {
    const r = new Set<bigint>();
    if (requiresMask !== 0n) {
      r.add(requiresMask);
    }
    return r;
  }

  if (!phrase.requires) {
    return reachableAfter;
  }

  const result = new Set<bigint>();
  for (const ra of reachableAfter) {
    if ((ra & requiresMask) === 0n) {
      result.add(ra | requiresMask);
    }
  }
  return result;
}

const CAPITALIZE_AFTER = {
  ".": true,
  "!": true,
  "?": true,
  "\n": true,
} as const;

const NO_SPACE_AFTER = {
  "\n": true,
} as const;

const NO_SPACE_BEFORE = {
  ",": true,
  ".": true,
  "!": true,
  "?": true,
  "\n": true,
} as const;

function joinTexts<FormatT>(
  chosen: readonly (TextFn<FormatT> | null)[],
  format: FormatT,
): string {
  const r: string[] = [];
  let capitalizeNext = true;
  let spaceBeforeNext = false;
  for (let index = 0; index < chosen.length; index++) {
    const text = chosen[index]?.({ chosen, index, format });
    if (!text) {
      continue;
    }
    if (spaceBeforeNext && !(text.charAt(0) in NO_SPACE_BEFORE)) {
      r.push(" ");
    }
    if (capitalizeNext) {
      r.push(text[0].toUpperCase());
      r.push(text.slice(1));
    } else {
      r.push(text);
    }
    const endsWith = text.charAt(text.length - 1);
    capitalizeNext = endsWith in CAPITALIZE_AFTER;
    spaceBeforeNext = !(endsWith in NO_SPACE_AFTER);
  }
  return r.join("");
}

export class NoContinuationError extends Error {}

export class PhraseGraph<StateT extends BaseState, FormatT> {
  readonly name: string;
  private readonly start: Phrase<StateT, FormatT>;
  readonly phrases: readonly Phrase<StateT, FormatT>[];
  readonly states: readonly (string & keyof StateT)[];
  private didTraverse = false;

  constructor(
    name: string,
    start: Phrase<StateT, FormatT>,
    phrases: readonly Phrase<StateT, FormatT>[],
    states: readonly (string & keyof StateT)[],
  ) {
    this.name = name;
    this.start = start;
    this.phrases = phrases;
    this.states = states;
  }

  cacheReachableStates() {
    if (!this.didTraverse) {
      for (let i = this.phrases.length - 1; i >= 0; i--) {
        const phrase = this.phrases[i] as Mutable<Phrase<StateT, FormatT>>;
        phrase.reachableStates = getReachableStates(phrase, this.states);
      }
      this.didTraverse = true;
    }
  }

  generate(
    rng: PseudorandomStream,
    requireState: StateT,
    format: FormatT,
  ): string {
    this.cacheReachableStates();
    let stateRemaining: bigint = 3n;
    for (const s of this.states) {
      if (requireState[s]) {
        stateRemaining |= stateToMask(s, this.states);
      }
    }
    const chosenPhrases: Phrase<StateT, FormatT>[] = [this.start];
    while (true) {
      const phrase = chosenPhrases[chosenPhrases.length - 1];
      if (phrase.requires === "end") {
        break;
      } else if (phrase.requires) {
        stateRemaining ^= stateToMask(phrase.requires, this.states);
      }
      const continuations = phrase.after.filter((a) =>
        a.reachableStates.has(stateRemaining),
      );
      if (continuations.length === 0) {
        throw new NoContinuationError(
          `${this.name}: No continuation has state ${maskToStates(stateRemaining, this.states)} at phrase ${phrase.id}`,
        );
      }
      chosenPhrases.push(rng.uniformChoice(continuations));
    }
    const chosen = chosenPhrases.map((phrase) =>
      phrase.text.length ? rng.uniformChoice(phrase.text) : null,
    );
    return joinTexts(chosen, format);
  }
}

export default function phraseGraph<StateT extends BaseState, FormatT>(
  name: string,
  fn: (args: PgArgs<StateT, FormatT>) => void,
): PhraseGraph<StateT, FormatT> {
  const pgBuilder = new PgBuilder<StateT, FormatT>();

  const pg = (...args: PgNodeArgs<StateT, FormatT>): PgNode<StateT, FormatT> =>
    PgNode.coerce(pgBuilder, args);
  const state = (
    ...args: (string & keyof StateT)[]
  ): PgNode<StateT, FormatT> => {
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

  const phrases = sort(pgBuilder.phrases);
  const states = Array.from(pgBuilder.states.values()).sort();
  const newStart = phrases.find((phrase) => phrase.requires === "start")!;

  return new PhraseGraph(name, newStart, phrases, states);
}

export const _forTests = { merge, stateToMask, maskToStates };
