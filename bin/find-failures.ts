#!/usr/bin/env node

import { inferContextDefaults } from "../src/core/common";
import { CAVERN_TF } from "../src/core/transformers";
import { MAX_PLUS_ONE } from "../src/core/common/prng";
import { getFlags } from "../src/cli/flags";
import { exit } from "node:process";

/* eslint-disable no-console */
function gen(seed: number) {
  let state = CAVERN_TF.first({
    initialContext: inferContextDefaults({ seed }),
  });

  while (state.next) {
    state = state.next();
  }
}

function main({
  firstSeed,
  totalCount,
  maxFailures,
}: {
  firstSeed: number;
  totalCount: number;
  maxFailures: number;
}) {
  const startedAt = Date.now();
  function estimateTimeRemaining(completed: number) {
    if (completed < 10) {
      return null;
    }
    const elapsed = Date.now() - startedAt;
    const seconds = ((elapsed / completed) * (totalCount - completed)) / 1000;
    if (seconds >= 60 * 60) {
      return `${(seconds / (60 * 60)).toFixed()}h`;
    }
    if (seconds >= 60) {
      return `${(seconds / 60).toFixed()}m`;
    }
    return `${seconds.toFixed()}s`;
  }

  const failures: { seed: number; error: unknown }[] = [];

  function failinfo(maxFailures: number, onSuccess: string) {
    if (failures.length == 0) {
      return onSuccess;
    }
    const rows = ["\x1b[38;5;1mFailures:"];
    for (let j = 0; j < maxFailures && j < failures.length; j++) {
      const error = failures[j].error;
      const message = error instanceof Error ? error.message : String(error);
      rows.push(`  ${failures[j].seed.toString(16)}: ${message}`);
    }
    if (failures.length > maxFailures) {
      rows.push(`  (and ${failures.length - maxFailures} more)`);
    }
    return `${rows.join("\n")}\x1b[m`;
  }

  for (let index = 0; index < totalCount; index++) {
    const seed = (firstSeed + index) % MAX_PLUS_ONE;
    const remaining = estimateTimeRemaining(index);
    console.log(`\x1bcFinished ${index + 1} of ${totalCount}${remaining ? `, ${remaining} remaining` : ""}
${failinfo(5, "\x1b[38;5;3mAll passing so far.\x1b[m")}
Building ${seed.toString(16)}...`);

    try {
      gen(seed);
    } catch (error: any) {
      failures.push({ seed, error });
      if (maxFailures > 0 && failures.length >= maxFailures) {
        console.log(`\x1bcFinished ${index + 1} seeds ${firstSeed.toString(16)}..${(firstSeed + index).toString(16)}
${failinfo(Infinity, "n/a")}
Found ${maxFailures} failures. Exiting.`);
        exit(1);
      }
    }
  }
  console.log(`\x1bcFinished ${totalCount} seeds ${firstSeed.toString(16)}..${(firstSeed + totalCount - 1).toString(16)}
${failinfo(Infinity, "\x1b[38;5;2mAll caverns generated successfully.\x1b[m")}`);
  exit(failures.length ? 1 : 0);
}

const args = getFlags({
  args: process.argv.slice(2),
  usage: `USAGE: yarn find-failures [FLAGS]
Builds many maps and discards the results, but logs any error.`,
  options: {
    firstSeed: {
      type: "string",
      short: "s",
      default: "EFE63E54",
      help: "The first seed to check.",
      parse: (it) => parseInt(it, 16),
    },
    totalCount: {
      type: "string",
      short: "c",
      default: "1000",
      help: "The number of seeds to check.",
      parse: (it) => parseInt(it, 10),
    },
    maxFailures: {
      type: "string",
      short: "m",
      default: "-1",
      help: "If this many failures occur, exit immediately.",
      parse: (it) => parseInt(it, 10),
    },
  },
});

main(args);
