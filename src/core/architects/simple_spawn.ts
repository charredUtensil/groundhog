import { Architect } from "../models/architect";
import { BaseCaveArchitect } from "./base";
import { Rough, RoughOyster } from "./oyster";

const SimpleSpawn = {
  ...BaseCaveArchitect,
  crystals: () => 5,
};

const OpenSimpleSpawn = {
  ...SimpleSpawn,
  ...new RoughOyster(
    {of: Rough.ALWAYS_FLOOR, width: 2, grow: 2},
    {of: Rough.AT_MOST_LOOSE_ROCK, grow: 1},
    {of: Rough.AT_MOST_HARD_ROCK})
}

const EmptySimpleSpawn = {
  ...SimpleSpawn,
  ...new RoughOyster(
    {of: Rough.ALWAYS_FLOOR, width: 2, grow: 2},
    {of: Rough.LOOSE_ROCK, grow: 1},
    {of: Rough.AT_MOST_HARD_ROCK})
}

const SIMPLE_SPAWN: readonly Architect[] = [
  {
    ...OpenSimpleSpawn,
    name: 'Simple Spawn (Open)',
    spawnBid: ({cavern, plan}) => 
      cavern.plans.some(p => plan.intersects[p.id] && p.fluid) ? 1 : 0,
  },
  {
    ...EmptySimpleSpawn,
    name: 'Simple Spawn (Empty)',
    spawnBid: ({cavern, plan}) => 
      cavern.plans.some(p => plan.intersects[p.id] && p.fluid) ? 1 : 0,
  },
  {
    ...OpenSimpleSpawn,
    name: 'Simple Spawn (Open + Bonus Crystals)',
    crystals: () => 9,
    spawnBid: () => 0.01,
  }
]
export default SIMPLE_SPAWN