import { Rough, RoughOyster } from "./oyster";

const OPEN = new RoughOyster(
  { of: Rough.FLOOR, grow: 2 },
  { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK },
  { of: Rough.VOID, grow: 1 },
);

const FILLED = new RoughOyster(
  { of: Rough.DIRT, grow: 1 },
  { of: Rough.LOOSE_OR_HARD_ROCK },
  { of: Rough.VOID, grow: 1 },
);

const RIVER = new RoughOyster(
  { of: Rough.WATER, width: 2, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK },
  { of: Rough.VOID, grow: 1 },
);

const STREAM = new RoughOyster(
  { of: Rough.WATER, grow: 0.5 },
  { of: Rough.FLOOR, grow: 0.25, shrink: 1 },
  { of: Rough.DIRT_OR_LOOSE_ROCK, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK, shrink: 1 },
);

const LAVA_RIVER = new RoughOyster(
  { of: Rough.LAVA, width: 2, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK, width: 0, grow: 1 },
  { of: Rough.VOID, grow: 1 },
);
