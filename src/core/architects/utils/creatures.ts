import { Biome, PseudorandomStream } from "../../common";
import { Point } from "../../common/geometry";
import { Architect } from "../../models/architect";
import { getAnchor } from "../../models/cavern";
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
  {
    cavern,
    plan,
    creatureFactory,
  }: Parameters<Architect<any>["placeEntities"]>[0],
  opts: {
    rng: PseudorandomStream;
    count: number;
    placement?: "outer" | "inner";
    from?: number;
    to?: number;
    force?: boolean;
  },
): Creature[] {
  if (
    opts.force ||
    (cavern.context.hasMonsters &&
      getAnchor(cavern).metadata?.tag !== "pandora")
  ) {
    const template = monsterForBiome(cavern.context.biome);
    const filterFn = TILE_CAN_HAVE_MONSTER[cavern.context.biome];
    return PLACEMENT_FN[opts.placement ?? "outer"](cavern, plan, {
      ...opts,
      filterFn,
    }).map((pos) =>
      creatureFactory.create({
        ...pos,
        planId: plan.id,
        template,
        sleep: true,
      }),
    );
  }
  return [];
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
  let placements =
    opts?.placements ??
    args.plan.innerPearl.flatMap((layer) =>
      layer.filter((pos) => args.tiles.get(...pos) === Tile.FLOOR),
    );
  for (let i = 1; i <= c && !!placements.length; i++) {
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
