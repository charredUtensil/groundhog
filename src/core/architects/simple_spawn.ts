import { Architect } from "../models/architect";
import { DefaultCaveArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";

const SimpleSpawn = {
  ...DefaultCaveArchitect,
  crystals: () => 5,
};

const OPEN = new RoughOyster(
  { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
  { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK },
);

const EMPTY = new RoughOyster(
  { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
  { of: Rough.LOOSE_ROCK, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK },
);

const SIMPLE_SPAWN: readonly Architect[] = [
  {
    name: "Simple Spawn (Open)",
    ...SimpleSpawn,
    ...OPEN,
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      cavern.plans.some((p) => plan.intersects[p.id] && p.fluid) &&
      1,
  },
  {
    name: "Simple Spawn (Empty)",
    ...SimpleSpawn,
    ...EMPTY,
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      cavern.plans.some((p) => plan.intersects[p.id] && p.fluid) &&
      1,
  },
  {
    name: "Simple Spawn (Open + Bonus Crystals)",
    ...SimpleSpawn,
    ...OPEN,
    crystals: () => 9,
    spawnBid: ({ plan }) => !plan.fluid && 0.01,
  },
];
export default SIMPLE_SPAWN;
