import { Point } from "../../common/geometry";
import { PseudorandomStream } from "../../common/prng";
import { Falsy } from "../../common/utils";
import { FormatVars, PhraseGraph } from "../../lore/builder";
import { LoreDie, State } from "../../lore/lore";
import { Creature } from "../../models/creature";
import { FencedCavern } from "../../transformers/03_plastic/00_fence";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";

type VarType<T extends string> = {
  [p in T]: string;
};

export function mkVars<T extends string>(
  prefix: string,
  keys: readonly T[],
): VarType<T> {
  const r: Partial<VarType<T>> = {};
  keys.forEach((k) => (r[k] = `${prefix}_${k}`));
  return r as VarType<T>;
}

export function transformPoint(
  cavern: FencedCavern,
  [x, y]: Point,
): `${number},${number}` {
  return `${y - cavern.top},${x - cavern.left}`;
}

export type ScriptLine = string | Falsy;
export type EventChainLine = `${string};` | Falsy;

export function chainFragment(...rest: EventChainLine[]): `${string};` | "" {
  return rest.filter((s) => s).join("\n") as any;
}

export function check(
  condition: string,
  ifTrue: string,
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
type FromLoreArgs = DieOrRng & {
  pg: PhraseGraph<State>;
  formatVars?: FormatVars;
};
type FromLoreArgsWithState<T> = DieOrRng & {
  pg: PhraseGraph<State & T>;
  state: T;
  formatVars?: FormatVars;
};

export type ScriptBuilder = {
  /**
   * Declares an integer variable.
   *
   * Note: I've explicitly decided not to use boolean vars in level scripts.
   * This is partially because I keep accidentally using constructs like
   * `if(var)` instead of `if(var==true)` but also because, at least according
   * to documentation, declaring a boolean in script actually just delcares an
   * int.
   */
  declareInt(name: string, value: number): string;
  /**
   * Declares a string variable. Takes ether a string value or parameters to
   * determine the string from lore.
   */
  declareString(name: string, value: string | FromLoreArgs): string;
  declareString<T>(name: string, value: FromLoreArgsWithState<T>): string;
  declareArrow(name: string): string;
  declareBuilding(name: string): string;
  declareCreature(name: string, creature?: Creature): string;
  onInit(...rest: EventChainLine[]): void;
  if(condition: string, ...rest: EventChainLine[]): void;
  when(condition: string, ...rest: EventChainLine[]): void;
  event(name: string, ...rest: EventChainLine[]): void;
};

type Trigger = {
  kind: "if" | "when";
  condition: string;
  bodies: `${string};`[];
};

type ScriptBuilderX = ScriptBuilder & { build(): string };

export function mkScriptBuilder(cavern: PreprogrammedCavern): ScriptBuilderX {
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
    if (condition in triggers.byCondition) {
      triggers.byCondition[condition].bodies.push(body);
      return;
    }
    const t: Trigger = { kind, condition, bodies: [body] };
    triggers.inOrder.push(t);
    triggers.byCondition[condition] = t;
  }

  function buildTrigger({ kind, condition, bodies }: Trigger) {
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

    declareString<T>(
      name: string,
      value: string | FromLoreArgs | FromLoreArgsWithState<T>,
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
        };
        const formatVars = {
          ...cavern.lore.formatVars,
          ...(value.formatVars ?? {}),
        };
        strVal = value.pg.generate(rng, state as any, formatVars).text;
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
