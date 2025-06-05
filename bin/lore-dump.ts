#!/usr/bin/env node
import "dotenv/config";
import { PseudorandomStream } from "../src/core/common/prng";
import ALL_GRAPHS from "../src/core/lore/graphs";
import { getFlags } from "../src/cli/flags";
import { MOCK_FORMAT } from "../src/core/lore/mock";
import wrap from "word-wrap";
import { NoContinuationError } from "../src/core/lore/utils/builder";
import { exit } from "node:process";
import { FoundLostMinersState, State } from "../src/core/lore/lore";

type CombinedState = State & FoundLostMinersState & { readonly commend: true };

/* eslint-disable no-console */
function main({
  seed,
  count,
  graph,
  positionals,
}: {
  seed: number;
  count: number;
  graph: number;
  positionals: string[];
}) {
  if (graph < 0) {
    console.log(
      ALL_GRAPHS.map((pg, i) => `${`${i}`.padStart(3)} ${pg.name}`).join("\n"),
    );
    return;
  }

  const pg = ALL_GRAPHS[graph];
  const state: Partial<State> = {};
  let hasAny = false;
  pg.states.forEach((st) => {
    const has = positionals.includes(st);
    hasAny ||= has;
    state[st] = has;
  });
  console.log(pg.name);
  console.log(
    `states: \n  ${pg.states
      .map((st: string) =>
        state[st] ? `+ \x1b[48;5;19m${st}\x1b[m` : `- ${st}`,
      )
      .join("\n  ")}`,
  );
  const rng = new PseudorandomStream(seed);
  try {
    for (let i = 0; i < count; i++) {
      const text = pg.generate(rng, state as CombinedState, MOCK_FORMAT);
      const wrapped = wrap(text, { indent: "", width: 96 })
        .split("\n")
        .join("\n    ");
      console.log(
        `${i % 2 === 0 ? "\x1b[38;5;118m" : ""}${`${i}`.padStart(3)} ${wrapped}\x1b[m`,
      );
    }
  } catch (e) {
    if (e instanceof NoContinuationError) {
      console.log("No continuation. Choose different states.");
      exit(1);
    } else {
      throw e;
    }
  }
}

const args = getFlags({
  args: process.argv.slice(2),
  usage: `USAGE: yarn lore-dump [FLAGS] [STATES]
Prints a dump of lore strings.`,
  allowPositionals: true,
  options: {
    seed: {
      type: "string",
      short: "s",
      default: "EFE63E54",
      help: "The seed to use for the lore dump.",
      parse: (it) => parseInt(it, 16),
    },
    count: {
      type: "string",
      short: "c",
      default: "10",
      help: "The number of strings to generate.",
      parse: (it) => parseInt(it, 10),
    },
    graph: {
      type: "string",
      short: "g",
      help: "The index of the graph to dump.",
      parse: (it) => parseInt(it ?? "-1", 10),
    },
  },
});

main(args);
