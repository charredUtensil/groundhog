#!/usr/bin/env node

import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { MAX_PLUS_ONE } from "../src/core/common/prng";
import { getFlags } from "../src/cli/flags";

function gen(seed: number) {
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({ seed }),
  });

  while (state.next) {
    state = state.next();
  }
}

function main({ firstSeed, totalCount }: { firstSeed: number, totalCount: number}) {

  for (let i = 0; i < totalCount; i++) {
    const seed = (firstSeed + i) % MAX_PLUS_ONE;
    console.log(`\x1bc${seed.toString(16)} (${i + 1} of ${totalCount})`);
    gen(seed);
  }
  console.log(`\x1bcDone.`);
}

const args = getFlags({
  args: process.argv.slice(2),
  usage: "USAGE: yarn find-failures [FLAGS]\nBuilds many maps to find any that cause an error.",
  options: {
    firstSeed: {
      type: 'string',
      short: 's',
      default: 'EFE63E54',
      help: 'The first seed to check.',
      parse: it => parseInt(it, 16),
    },
    totalCount: {
      type: 'string',
      short: 'c',
      default: '10000',
      help: 'The number of seeds to check.',
      parse: it => parseInt(it, 10),
    },
  },
});

main(args);