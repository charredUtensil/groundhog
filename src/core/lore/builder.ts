import { Mutable, PseudorandomStream } from "../common";

export type Phrase = {
  readonly id: number;
  readonly text: readonly string[];
  readonly after: Phrase[];
  readonly before: Phrase[];
};

type PgNodeArgs = (PgNode | string)[];

class PgBuilder {
  readonly phrases: Phrase[] = [];

  phrase(
    text: readonly string[],
  ): Phrase {
    const phrase: Phrase = {
      id: this.phrases.length,
      text: text,
      after: [],
      before: [],
    };
    this.phrases.push(phrase);
    return phrase;
  }
}

function join(a: Phrase, b: Phrase) {
  a.after.push(b);
  b.before.push(a);
}

function merge(
  a: readonly Phrase[],
  b: readonly Phrase[],
): Phrase[] {
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

class PgNode {
  private readonly v: PgBuilder;
  private readonly heads: readonly Phrase[];
  private readonly tails: readonly Phrase[];
  private readonly skip: boolean;

  constructor(
    v: PgBuilder,
    heads: readonly Phrase[],
    tails: readonly Phrase[],
    skip: boolean,
  ) {
    this.v = v;
    this.heads = heads;
    this.tails = tails;
    this.skip = skip;
  }

  static coerce(
    pgBuilder: PgBuilder,
    args: PgNodeArgs,
  ): PgNode {
    const text: string[] = [];
    const nodes: PgNode[] = [];
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

  then(...args: PgNodeArgs): PgNode {
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

function getReachableStates<T extends State>(phrase: Phrase<T>) {
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

function traverse<T extends State>(phrases: readonly Phrase<T>[]) {
  for (let i = phrases.length - 1; i >= 0; i--) {
    const phrase = phrases[i] as Mutable<Phrase<T>>;
    phrase.reachableStates = getReachableStates(phrase);
  }
}

export type GenerateResult<T extends State> = {
  readonly chosen: readonly {
    readonly phrase: Phrase<T>;
    readonly textIndex: number;
  }[];
  readonly text: string;
};

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

function joinTexts<T extends State>(
  chosen: readonly { readonly phrase: Phrase<T>; readonly textIndex: number }[],
): string {
  const r: string[] = [];
  let capitalizeNext = true;
  let spaceBeforeNext = false;
  for (const { phrase, textIndex } of chosen) {
    const text = phrase.text[textIndex];
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

const format = (text: string, formatVars: FormatVars) =>
  text.replace(/\@([a-zA-Z0-9_]+)\@/g, (_, key) => formatVars[key]);

export class PhraseGraph<StateT extends State, FVK extends string> {
  private start: Phrase<StateT>;
  readonly phrases: readonly Phrase<StateT>[];
  readonly states: readonly (string & keyof StateT)[];

  constructor(
    start: Phrase<StateT>,
    phrases: readonly Phrase<StateT>[],
    states: readonly (string & keyof StateT)[],
  ) {
    this.start = start;
    this.phrases = phrases;
    this.states = states;
  }

  generate(
    rng: PseudorandomStream,
    requireState: StateT,
    formatVars: {[K in FVK]: string},
  ): GenerateResult<StateT> {
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
    const chosenPhrases: Phrase<StateT>[] = [this.start];
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
          "No continutation has %s at phrase %o",
          reachedState,
          phrase,
        );
        throw new Error(
          `No continuation has ${reachedState} at phrase ${phrase.id}`,
        );
      }
      chosenPhrases.push(rng.uniformChoice(continuations));
    }
    const chosen = chosenPhrases.map((phrase) => ({
      phrase,
      textIndex:
        phrase.text.length > 0
          ? rng.uniformInt({ max: phrase.text.length })
          : -1,
    }));
    const text = format(joinTexts(chosen), formatVars);
    return { chosen, text };
  }
}

export type PgArgs<T> = {
  pg: (...args: PgNodeArgs) => PgNode;
  state: T;
  start: PgNode;
  end: PgNode;
  cut: PgNode;
  skip: PgNode;
};

export default function phraseGraph<T>(
  fn: (args: PgArgs<T>) => void,
): PhraseGraph<T> {
  const pgBuilder = new PgBuilder();

  const pg = (...args: PgNodeArgs): PgNode =>
    PgNode.coerce(pgBuilder, args);
  const state = (...args: SK[]): PgNode<{[K in SK]: boolean}> => {
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
  const fv = (() => {
    const r: {[K in FVK]?: string} = {};
    formatVarNames?.forEach((k) => (r[k] = `@${k}@`));
    return r as {[K in FVK]: string};
  })();

  fn({ pg, state, start, end, cut, skip, fv });

  const phrases = sort(pgBuilder.phrases);
  align(phrases);
  traverse(phrases);
  const newStart = phrases.find((phrase) => phrase.requires === "start")!;
  const states = Array.from(pgBuilder.states.values()).sort();

  return new PhraseGraph(newStart, phrases, states);
}

export const _forTests = { merge };
