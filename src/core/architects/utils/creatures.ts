import { Biome, PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import { Architect } from "../../models/architect";
import { Creature, monsterForBiome } from "../../models/creature";
import { Tile } from "../../models/tiles";
import { circumferencePositions, innerPositions } from "./placement";

const TILE_CAN_HAVE_MONSTER = {
  rock: (_, __, t) => !t.isFluid,
  ice: (_, __, t) => t !== Tile.LAVA,
  lava: (_, __, t) => t !== Tile.WATER,
} as const satisfies {
  [K in Biome]: (x: number, y: number, t: Tile) => boolean;
};

const PLACEMENT_FN = {
  inner: innerPositions,
  outer: circumferencePositions,
} as const;

export function placeSleepingMonsters(
  args: Parameters<Architect<any>["placeEntities"]>[0],
  rng: PseudorandomStream,
  count: number,
  placement: "outer" | "inner" = "outer",
): Creature[] {
  if (!args.cavern.context.hasMonsters) {
    return [];
  }
  const template = monsterForBiome(args.cavern.context.biome);
  const filterFn = TILE_CAN_HAVE_MONSTER[args.cavern.context.biome];
  return PLACEMENT_FN[placement](
    args.cavern,
    args.plan,
    count,
    rng,
    filterFn,
  ).map((pos) =>
    args.creatureFactory.create({ ...pos, planId: args.plan.id, template, sleep: true }),
  );
}

export function sprinkleSlugHoles(
  args: Parameters<Architect<any>["placeSlugHoles"]>[0],
  opts?: {
    count?: number;
    placements?: readonly Point[];
  },
) {
  const rng = args.cavern.dice.placeSlugHoles(args.plan.id);
  const c =
    opts?.count ??
    (rng.chance(args.cavern.context[`${args.plan.kind}HasSlugHoleChance`])
      ? 1
      : 0);
  var placements =
    opts?.placements ??
    args.plan.innerPearl.flatMap((layer) =>
      layer.filter((pos) => args.tiles.get(...pos) === Tile.FLOOR),
    );
  for (var i = 1; i <= c && !!placements.length; i++) {
    const [x, y] = rng.uniformChoice(placements);
    args.tiles.set(x, y, Tile.SLUG_HOLE);
    if (i === c) {
      return;
    }
    // Don't place another slug hole on or adjacent to this one.
    placements = placements.filter(
      ([x1, y1]) => x1 < x - 1 || x1 > x + 1 || y1 < y - 1 || y1 > y + 1,
    );
  }
}
