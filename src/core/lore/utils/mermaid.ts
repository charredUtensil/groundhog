import { EAST, NORTH } from "../../common/geometry";
import { filterTruthy } from "../../common/utils";
import { Creature, ROCK_MONSTER } from "../../models/creature";
import { atCenterOfTile } from "../../models/position";
import { HOVER_SCOUT, Vehicle } from "../../models/vehicle";
import { Format } from "../lore";
import { PhraseGraph } from "./builder";

const enemy: Creature = {
  ...atCenterOfTile({x: 0, y: 0, facing: EAST}),
  id: 0,
  planId: 0,
  template: ROCK_MONSTER,
  sleep: false,
}

const vehicle: Vehicle = {
  ...atCenterOfTile({x: 0, y: 0, facing: EAST}),
  id: 0,
  driverId: null,
  essential: false,
  planId: 0,
  template: HOVER_SCOUT,
  upgrades: [],
};

const MOCK_FORMAT = {
  buildAndPowerGcCount: 1,
  buildAndPowerSsCount: 1,
  enemy,
  enemies: "{enemies}",
  lostMiners: 1,
  lostMinerCaves: 1,
  monsters: "{monsters}",
  resourceGoal: "{resource goal}",
  resourceGoalNamesOnly: "{resource goal names}",
  vehicle,
} as const;

export function mermaidify(pg: PhraseGraph<any, typeof MOCK_FORMAT>) {
  const ph = pg.phrases.flatMap(phrase => {
    const t = phrase.text.map(
      (fn, i) => fn({chosen: phrase.text, index: i, format: MOCK_FORMAT}).replace('\n', '\\n')
    ).join('<br/>');
    const r = phrase.requires ? `[${phrase.requires}]` : '';
    const label = filterTruthy([t, r]).join('<br/>');
    return filterTruthy([
      label && `P${phrase.id}[${JSON.stringify(label)}]`,
      ...phrase.after.map(a => `P${phrase.id} --> P${a.id}`)
    ]);
  });
  return `\`\`\`mermaid\nflowchart TD;\n${ph.join('\n')}\n\`\`\``
}