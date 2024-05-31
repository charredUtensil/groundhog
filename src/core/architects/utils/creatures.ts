import { Biome, PseudorandomStream } from "../../common";
import { Architect } from "../../models/architect";
import { monsterForBiome } from "../../models/creature";
import { Tile } from "../../models/tiles";
import { circumferencePositions, innerPositions } from "./placement";


const TILE_CAN_HAVE_MONSTER = {
  rock: (_, __, t) => !t.isFluid,
  ice: (_, __, t) => t !== Tile.LAVA,
  lava: (_, __, t) => t !== Tile.WATER,
} as const satisfies {[K in Biome]: (x: number, y: number, t: Tile) => boolean}

const PLACEMENT_FN = {
  'inner': innerPositions,
  'outer': circumferencePositions,
} as const;

export function placeSleepingMonsters(
  args: Parameters<Architect<unknown>['placeEntities']>[0],
  rng: PseudorandomStream,
  count: number,
  placement: 'outer' | 'inner' = 'outer',
) {
  if (!args.cavern.context.hasMonsters) {
    return;
  }
  const template = monsterForBiome(args.cavern.context.biome);
  const filterFn = TILE_CAN_HAVE_MONSTER[args.cavern.context.biome];
  const r = PLACEMENT_FN[placement](args.cavern, args.plan, count, rng, filterFn)
    .map(pos => args.creatureFactory.create({...pos, template, sleep: true}));
  args.creatures.push(...r);
}