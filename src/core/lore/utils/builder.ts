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
      reachableStates: {},
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
      (r: Phrase<StateT, FormatT>[], n) => merge(r, n.heads), []);
    const tails = nodes.reduce(
      (r: Phrase<StateT, FormatT>[], n) => merge(r, n.tails), []);
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
) {
  const reachableAfter: { [key: string]: true } = {};
  for (const a of phrase.after) {
    Object.assign(reachableAfter, a.reachableStates);
  }

  if (Object.keys(reachableAfter).length === 0) {
    return phrase.requires ? { [phrase.requires]: true } : {};
  }

  if (!phrase.requires) {
    return reachableAfter;
  }

  const reachable: { [key: string]: true } = {};
  for (const ra in reachableAfter) {
    const states = ra.split(",");
    if (!states.some((s) => s === phrase.requires)) {
      states.push(phrase.requires);
      states.sort();
      reachable[states.join(",")] = true;
    }
  }
  return reachable;
}

function traverse<StateT extends BaseState, FormatT>(
  phrases: readonly Phrase<StateT, FormatT>[],
) {
  for (let i = phrases.length - 1; i >= 0; i--) {
    const phrase = phrases[i] as Mutable<Phrase<StateT, FormatT>>;
    phrase.reachableStates = getReachableStates(phrase);
  }
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

export class PhraseGraph<StateT extends BaseState, FormatT> {
  readonly name: string;
  private readonly start: Phrase<StateT, FormatT>;
  readonly phrases: readonly Phrase<StateT, FormatT>[];
  readonly states: readonly (string & keyof StateT)[];

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

  generate(
    rng: PseudorandomStream,
    requireState: StateT,
    format: FormatT,
  ): string {
    const states = [...this.states, "start", "end"];
    const stateRemaining: { [key: string]: boolean } = {
      start: true,
      end: true,
    };
    for (const s of this.states) {
      if (requireState[s]) {
        stateRemaining[s] = true;
      }
    }
    const chosenPhrases: Phrase<StateT, FormatT>[] = [this.start];
    while (true) {
      const phrase = chosenPhrases[chosenPhrases.length - 1];
      if (phrase.requires === "end") {
        break;
      } else if (phrase.requires) {
        stateRemaining[phrase.requires] = false;
      }
      const reachedState = states
        .filter((s) => stateRemaining[s])
        .sort()
        .join(",");
      const continuations = phrase.after.filter(
        (a) => reachedState in a.reachableStates,
      );
      if (continuations.length === 0) {
        console.log(
          "%o: No continutation has %s at phrase %o",
          this,
          reachedState,
          phrase,
        );
        throw new Error(
          `${this.name}: No continuation has ${reachedState} at phrase ${phrase.id}`,
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
  traverse(phrases);
  const newStart = phrases.find((phrase) => phrase.requires === "start")!;
  const states = Array.from(pgBuilder.states.values()).sort();

  return new PhraseGraph(name, newStart, phrases, states);
}

export const _forTests = { merge };
