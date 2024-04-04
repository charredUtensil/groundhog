import { Architect } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect } from "./default";
import { Rough, RoughOyster } from "./utils/oyster";
import { getBuildings } from "./utils/buildings";
import { intersectsOnly } from "./utils/intersects";
import { getPlaceRechargeSeams } from "./utils/resources";
import { POSITION_DEFAULTS } from "../models/position";

const BASE: typeof DefaultCaveArchitect = {
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
    args.setCameraPosition({
      ...POSITION_DEFAULTS,
      x: toolStore.x,
      y: toolStore.y,
      yaw: toolStore.yaw + Math.PI * 0.75,
      pitch: Math.PI / 4,
    })
  },
};

const OPEN = new RoughOyster(
  { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
  { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
  { of: Rough.AT_MOST_HARD_ROCK },
);

const SIMPLE_SPAWN: readonly Architect<unknown>[] = [
  {
    name: "Open Spawn",
    ...BASE,
    ...OPEN,
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      intersectsOnly(cavern.plans, plan, null) &&
      1,
  },
  {
    name: "Spawn",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      intersectsOnly(cavern.plans, plan, null) &&
      1,
  },
  {
    // This is mostly a fallback in case there's no other viable spawn cave
    // that isn't entirely surrounded. 9 crystals should be enough to build
    name: "Open Spawn with Bonus Crystals",
    ...BASE,
    ...OPEN,
    crystals: () => 9,
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius >= 2 && 0.01,
  },
];
export default SIMPLE_SPAWN;
