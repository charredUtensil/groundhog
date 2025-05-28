#!/usr/bin/env node

import { Worker } from 'node:worker_threads';
import { cpus } from 'node:os';
import { MAX_PLUS_ONE } from "../src/core/common/prng";
import { getFlags } from "../src/cli/flags";
import { exit } from "node:process";
import type { GenCompleteInputMessage, GenCompleteOutputMessage } from "../src/workers/gen-complete.types";
import { Mutable } from '../src/core/common/utils';

function main({
  firstSeed,
  totalCount,
  maxFailures,
}: {
  firstSeed: number;
  totalCount: number;
  maxFailures: number;
}) {
  const numCores = cpus().length;
  const numWorkers = Math.max(1, numCores - 1);
  
  let assigned = 0;
  let completed = 0;
  
  const failures: { seed: number; error: any }[] = [];
  
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

  function failinfo(fc: number, onSuccess: string) {
    if (failures.length == 0) {
      return onSuccess;
    }
    const rows = ["\x1b[38;5;1mFailures:"];
    for (let j = 0; j < fc && j < failures.length; j++) {
      rows.push(
        `  ${failures[j].seed.toString(16)}: ${failures[j].error.message}`,
      );
    }
    if (failures.length > fc) {
      rows.push(`  (and ${failures.length - fc} more)`);
    }
    return `${rows.join("\n")}\x1b[m`;
  }

  function updateProgress() {
    const remaining = estimateTimeRemaining(completed);
    console.log(`\x1bcFinished ${completed} of ${totalCount}${remaining ? `, ${remaining} remaining` : ""}
${failinfo(5, "\x1b[38;5;3mAll passing so far.\x1b[m")}
Processing...`);
  }

  function finish() {
    console.log(`\x1bcFinished ${totalCount} seeds ${firstSeed.toString(16)}..${(firstSeed + totalCount - 1).toString(16)}
${failinfo(Infinity, "\x1b[38;5;2mAll caverns generated successfully.\x1b[m")}`);
    exit(failures.length ? 1 : 0);
  }

  const workers: Worker[] = [];
  const chunkSize = Math.ceil(totalCount / numWorkers / 10);

  function assignWorkOrDie(w: Worker) {
    const requests: Mutable<GenCompleteInputMessage['requests']> = [];
    for (let i = 0; i < chunkSize && assigned < totalCount; i++) {
      requests.push({initialContext: {seed: (firstSeed + assigned) % MAX_PLUS_ONE}});
      assigned++;
    }
    if (requests.length > 0) {
      w.postMessage({ requests });
    } else {
      w.terminate();
    }
  }

  const spawnWorker = () => {
    const worker = new Worker('../src/workers/gen-complete.ts');

    worker.on('message', (message: GenCompleteOutputMessage) => {
      completed += message.results.length;
      message.results.forEach(({initialContext, error}) => {
        if (error) {
          failures.push({seed: initialContext.seed, error});
        }
      });
      if (maxFailures > 0 && failures.length >= maxFailures) {
        console.log(`\x1bcFinished ${completed} seeds ${firstSeed.toString(16)}..${(firstSeed + assigned).toString(16)}
${failinfo(Infinity, "n/a")}
Found ${maxFailures} failures. Exiting.`);
        workers.forEach(w => w.terminate());
        exit(1);
      }
      updateProgress();
      assignWorkOrDie(worker);
    });

    worker.on('error', (err) => {
      console.error(`Worker error: ${err.message}`);
      workers.forEach(w => w.terminate());
      exit(1);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker exited with code ${code}`);
      }
      const index = workers.indexOf(worker);
      if (index > -1) {
        workers.splice(index, 1);
      }
      // &? should be or? error condition??
      if (workers.length === 0 && assigned >= totalCount) {
        finish();
      }
    });

    workers.push(worker);
  };

  // Initial work distribution
  for (let i = 0; i < numWorkers; i++) {
    spawnWorker();
  }

  if (totalCount === 0) {
    finish();
  }
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