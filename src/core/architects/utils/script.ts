import { Point } from "../../common/geometry";
import { PseudorandomStream } from "../../common/prng";
import { Falsy } from "../../common/utils";
import { PhraseGraph } from "../../lore/utils/builder";
import { Format, State } from "../../lore/lore";
import { LoreDie } from "../../common/prng";
import { Creature } from "../../models/creature";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

type VarType<T extends string> = {
  [p in T]: string;
};

/**
 * Creates an object that contains strings with the given prefix. For example,
 * `mkVars('foo', ['bar', 'baz'])` returns `{bar: 'foo_bar', baz: 'foo_baz'}`.
 * This helps with type-checking.
 */
export function mkVars<T extends string>(
  prefix: string,
  keys: readonly T[],
): VarType<T> {
  const r: Partial<VarType<T>> = {};
  keys.forEach((k) => (r[k] = `${prefix}_${k}`));
  return r as VarType<T>;
}

/**
 * Given a point in GroundHog's coordinate system, translate it to a point that
 * can be used in MMScript. This means adding the fence as an offset and
 * presenting a string in [Y,X] format.
 */
export function transformPoint(
  cavern: FencedCavern,
  [x, y]: Point,
): `${number},${number}` {
  return `${y - cavern.top},${x - cavern.left}`;
}

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type ScriptLine = string | Falsy;
export type EventChainLine = `${string};` | Falsy;

export function chainFragment(...rest: EventChainLine[]) {
  return rest.filter((s) => s).join("\n") as `${string};` | "";
}

export function check(
  condition: string,
  ifTrue: string,
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  ifFalse?: string | Falsy,
): EventChainLine {
  if (ifFalse) {
    return `((${condition}))[${ifTrue}][${ifFalse}];`;
  }
  return `((${condition}))${ifTrue};`;
}

function eventChain(name: string, ...rest: EventChainLine[]) {
  return `${name}::;\n${chainFragment(...rest)}\n`;
}

export function sanitizeString(s: string) {
  return s.replace(/[\\"]+/g, "").replace(/\s*\n[\s\n]*/g, " ");
}

type DieOrRng =
  | {
      die: LoreDie;
    }
  | {
      rng: PseudorandomStream;
    };
type StateFormatArgs<ST extends object, FT extends object> =
  | {
      pg: PhraseGraph<State, Format>;
    }
  | {
      pg: PhraseGraph<State, Format & FT>;
      format: FT;
    }
  | {
      pg: PhraseGraph<State & ST, Format>;
      state: ST;
    }
  | {
      pg: PhraseGraph<State & ST, Format & FT>;
      state: ST;
      format: FT;
    };
type FromLoreArgs<ST extends object, FT extends object> = DieOrRng &
  StateFormatArgs<ST, FT>;

export type ScriptBuilder = {
  /**
   * Declares an integer variable. Returns the variable name.
   *
   * Note: I've explicitly decided not to use boolean vars in level scripts.
   * This is partially because I keep accidentally using constructs like
   * `if(var)` instead of `if(var==true)` but also because, at least according
   * to documentation, declaring a boolean in script actually just delcares an
   * int.
   */
  declareInt(name: string, value: number): string;
  /**
   * Declares a float variable. Returns the variable name.
   */
  declareFloat(name: string, value: number): string;
  /**
   * Declares a string variable. Takes ether a string value or parameters to
   * determine the string from lore. Returns the variable name.
   */
  declareString<ST extends object = object, FT extends object = object>(
    name: string,
    value: string | FromLoreArgs<ST, FT>,
  ): string;
  /**
   * Declares an arrow variable. Returns the variable name.
   */
  declareArrow(name: string): string;
  /**
   * Declares a building variable. Returns the variable name.
   */
  declareBuilding(name: string): string;
  /**
   * Declares a creature variable. Returns the variable name.
   */
  declareCreature(name: string, creature?: Creature): string;
  /**
   * Runs the given events when the level starts.
   */
  onInit(...rest: EventChainLine[]): void;
  /**
   * Runs the given events once when the condition is true.
   */
  if(condition: string, ...rest: EventChainLine[]): void;
  /**
   * Runs the given events once whenever the condition is true.
   */
  when(condition: string, ...rest: EventChainLine[]): void;
  /**
   * Declares an event chain with the given name.
   */
  event(name: string, ...rest: EventChainLine[]): void;
};

type Trigger = {
  condition: string;
  ifs: `${string};`[];
  whens: `${string};`[];
};

type BuildableScriptBuilder = ScriptBuilder & { build(): string };

export function mkScriptBuilder(
  cavern: PreprogrammedCavern,
): BuildableScriptBuilder {
  let uid: number = 0;
  const declarations: string[] = [];
  const triggers: {
    readonly byCondition: { [condition: string]: Trigger };
    readonly withCalls: { [call: string]: string };
    readonly inOrder: Trigger[];
  } = { byCondition: {}, withCalls: {}, inOrder: [] };
  const events: string[] = [];

  function declareTrigger(
    kind: "if" | "when",
    condition: string,
    lines: EventChainLine[],
  ) {
    const body = chainFragment(...lines);
    if (!body) {
      return;
    }
    const tx: Trigger | undefined = triggers.byCondition[condition];
    if (tx) {
      triggers.byCondition[condition][`${kind}s`].push(body);
      return;
    }
    const t: Trigger =
      kind === "if"
        ? { condition, ifs: [body], whens: [] }
        : { condition, ifs: [], whens: [body] };
    triggers.inOrder.push(t);
    triggers.byCondition[condition] = t;
  }

  function buildTrigger({ condition, ifs, whens }: Trigger) {
    if (ifs.length && whens.length) {
      // If there are both ifs and whens, need to trigger them separately.
      const v = `tf${uid++}`;
      return [
        `int ${v}=0`,
        buildTriggerHelper("if", `${v}>0`, ifs),
        buildTriggerHelper("when", condition, [`${v}=1;`, ...whens]),
      ].join("\n");
    } else if (ifs.length) {
      return buildTriggerHelper("if", condition, ifs);
    } else if (whens.length) {
      return buildTriggerHelper("when", condition, whens);
    }
    return "";
  }

  function buildTriggerHelper(
    kind: "if" | "when",
    condition: Trigger["condition"],
    bodies: `${string};`[],
  ) {
    const calls: `${string};`[] = [];
    const extra: string[] = [];
    bodies.forEach((body) => {
      if (body.includes("\n")) {
        // Body is multiple lines and needs its own event chain
        const name = `t${uid++}`;
        calls.push(`${name};`);
        extra.push(eventChain(name, body));
      } else {
        // Body is one line and doesn't need an event chain
        calls.push(body);
      }
    });
    if (calls.length > 1) {
      // Multiple calls: need another "wrapper" chain
      const cb = chainFragment(...calls);
      if (cb in triggers.withCalls) {
        // Optimize for a specific case that comes up often with overlapping
        // monster spawners. If there is another trigger defined that has the
        // _exact same_ body, no need to redefine it. This won't catch all
        // theoretical instances but that's probably fine.
        calls.length = 1;
        calls[0] = `${triggers.withCalls[cb]};`;
      } else {
        const name = `tw${uid++}`;
        extra.unshift(eventChain(name, cb));
        triggers.withCalls[cb] = name;
        calls.length = 1;
        calls[0] = `${name};`;
      }
    }
    // calls is now length 1
    return [
      `${kind}(${condition})[${calls[0].substring(0, calls[0].length - 1)}]`,
      ...extra,
    ].join("\n");
  }

  return {
    build(): string {
      if (uid > 0) {
        throw new Error("Already used");
      }
      return [
        ...declarations,
        ...triggers.inOrder.map(buildTrigger),
        ...events,
      ].join("\n");
    },

    declareInt(name, value) {
      declarations.push(`int ${name}=${value.toFixed()}`);
      return name;
    },

    declareFloat(name, value) {
      declarations.push(`float ${name}=${value}`);
      return name;
    },

    declareString<ST extends object = object, FT extends object = object>(
      name: string,
      value: string | FromLoreArgs<ST, FT>,
    ) {
      let strVal = "";
      if (typeof value === "string") {
        strVal = value;
      } else {
        const rng: PseudorandomStream =
          "rng" in value ? value.rng : cavern.dice.lore(value.die);
        const state = {
          ...cavern.lore.state,
          ...("state" in value ? value.state : {}),
        } as State & ST;
        const format = {
          ...cavern.lore.format,
          ...("format" in value ? value.format : {}),
        } as Format & FT;
        strVal = value.pg.generate(rng, state, format);
      }
      declarations.push(`string ${name}="${sanitizeString(strVal)}"`);
      return name;
    },

    declareArrow(name) {
      declarations.push(`arrow ${name}`);
      return name;
    },
    declareBuilding(name) {
      declarations.push(`building ${name}`);
      return name;
    },
    declareCreature(name, creature) {
      declarations.push(`creature ${name}${creature ? `=${creature.id}` : ""}`);
      return name;
    },

    if: (condition, ...rest) => {
      declareTrigger("if", condition, rest);
    },
    when: (condition, ...rest) => {
      declareTrigger("when", condition, rest);
    },
    event(name, ...rest) {
      events.push(eventChain(name, ...rest));
    },
    onInit(...rest) {
      declareTrigger("if", "time:0", rest);
    },
  };
}

export enum DzPriority {
  CRITICAL = 0,
  OBJECTIVE,
  HINT,
  TRIVIAL,
}
