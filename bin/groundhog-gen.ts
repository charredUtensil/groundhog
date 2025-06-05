#!/usr/bin/env node
import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { SerializedCavern } from "../src/core/transformers/04_ephemera/05_serialize";
import { getFlags } from "../src/cli/flags";

function main({ seed }: { seed: number }) {
  if (!seed) {
    throw new Error("Usage:\n  SEED=... yarn gen");
  }
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({ seed }),
  });

  while (state.next) {
    state = state.next();
  }

  // eslint-disable-next-line no-console
  console.log((state.result as SerializedCavern).serialized);
}

const args = getFlags({
  args: process.argv.slice(2),
  usage: `USAGE: yarn groundhog-gen [FLAGS]
Builds a cavern and prints to stdout.`,
  options: {
    seed: {
      type: "string",
      short: "s",
      default: "EFE63E54",
      help: "The seed to build.",
      parse: (it) => parseInt(it, 16),
    },
  },
});

main(args);
