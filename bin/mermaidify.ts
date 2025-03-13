import * as build_and_power from "../src/core/lore/graphs/build_and_power";
import * as conclusions from "../src/core/lore/graphs/conclusions";
import * as events from "../src/core/lore/graphs/events";
import * as names from "../src/core/lore/graphs/names";
import * as orders from "../src/core/lore/graphs/orders";
import * as pandora from "../src/core/lore/graphs/pandora";
import * as premise from "../src/core/lore/graphs/premise";
import * as seismic from "../src/core/lore/graphs/seismic";

import { PhraseGraph } from "../src/core/lore/utils/builder";
import { mermaidify } from "../src/core/lore/utils/mermaid";

import * as fs from 'fs';
import * as path from 'path';

const MODULES = [
  build_and_power,
  conclusions,
  events,
  names,
  orders,
  pandora,
  premise,
  seismic,
] as const;

function modulesMatch(m1: any, m2: any): boolean {
  const keys1 = Object.keys(m1).sort();
  const keys2 = Object.keys(m2).sort();
  if (keys1.length !== keys2.length) {
    return false;
  }
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) {
      return false;
    }
  }
  return true;
}

function main() {
  MODULES.forEach(module => {
    const contents = Object.values(module).map((pg) => {
      if (!(pg instanceof PhraseGraph)) {
        return '';
      }
      return `## ${pg.name}\n\n${mermaidify(pg)}`;
    }).filter(content => content !== '').join('\n\n');

    if (contents) {
      const modulePath = Object.keys(require.cache).find(key => modulesMatch(require.cache[key]?.exports, module));
      const directory = path.dirname(modulePath);
      const fileName = path.basename(modulePath, '.ts') + '.md';
      const filePath = path.join(directory, fileName);
      console.log('write to %o', filePath);
      fs.writeFileSync(filePath, contents);
    }

  });
}

main()