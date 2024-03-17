import { Architect } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect } from "./default";
import { Rough, RoughOyster } from "./oyster";
import { getBuildings } from "./utils/buildings";
import { getPlaceRechargeSeams } from "./utils/resources";

const SimpleSpawn: typeof DefaultCaveArchitect = {
  ...DefaultCaveArchitect,
  crystals: () => 5,
  placeRechargeSeam: getPlaceRechargeSeams(1),
  placeBuildings: (args) => {
    const [toolStore] = getBuildings(
      {
        queue: [(pos) => TOOL_STORE.atTile({ ...pos, teleportAtStart: true })],
      },
      args,
    );
    toolStore.foundation.forEach(([x, y]) =>
      args.tiles.set(x, y, Tile.FOUNDATION),
    );
    args.buildings.push(toolStore);
    args.openCaveFlags.set(...toolStore.foundation[0], true);
  },
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
