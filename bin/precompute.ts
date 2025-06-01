import ALL_GRAPHS from '../src/core/lore/graphs';
import { Phrase } from '../src/core/lore/utils/base';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(__dirname, '../src/core/lore/graphs');

function wrapPhrase(p: Phrase<any, any>) {
  const pr = [...p.reachableStates.keys()]
    .sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0))
    .map(s => `${s}n`);
  return `new Set([${pr.join(',')}])`;
}

function main() {
  // First: Map each unique phrase reachable states to the number of times it
  // is seen in all graphs.
  const allSets: Map<string, number> = new Map();
  ALL_GRAPHS.forEach(g => {
    (g.phrases as Phrase<any, any>[]).forEach(p => {
      const wp = wrapPhrase(p);
      if (allSets.has(wp)) {
        allSets.set(wp, allSets.get(wp)! + 1);
      } else {
        allSets.set(wp, 1);
      }
    });
  });
  // Next: Transform this from a map of the count to a unique index.
  let i = 0;
  for(const [key, count] of [...allSets.entries()]) {
    if (count > 1) {
      allSets.set(key, i++);
    } else {
      allSets.delete(key);
    }
  }
  const agr = ALL_GRAPHS.map(g => {
    const gr = (g.phrases as Phrase<any, any>[]).map(p => {
      const wp = wrapPhrase(p);
      return allSets.has(wp) ? `p${allSets.get(wp)!.toString(36)}` : wp;
    });
    return `${JSON.stringify(g.name)}:[${gr.join(',')}]`;
  });
  const zips = [...allSets.entries()].sort((a, b) => a[1] - b[1]);
  const code = `// @ts-nocheck
const [${zips.map(z => `p${z[1].toString(36)}`).join(',')}]=[${zips.map(z => z[0]).join(',')}] as Set<bigint>[];
export const COMPUTED_REACHABLE_STATES={${agr.join(',')}} as Record<string, Set<bigint>[]>;`;
  const outFile = path.join(OUT_DIR, 'precomputed.ts');
  fs.writeFileSync(outFile, code);
}

main();