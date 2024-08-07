import { Architect } from "../models/architect";
import { TOOL_STORE } from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { mkRough, Rough } from "./utils/rough";
import { getBuildings } from "./utils/buildings";
import { intersectsOnly } from "./utils/intersects";
import { getPlaceRechargeSeams } from "./utils/resources";
import { position } from "../models/position";
import { sprinkleSlugHoles } from "./utils/creatures";
import { slugSpawnScript } from "./utils/creature_spawners";

const BASE: PartialArchitect<undefined> = {
  ...DefaultCaveArchitect,
  crystalsToPlace: () => 5,
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
    args.setCameraPosition(
      position({
        x: toolStore.x,
        y: toolStore.y,
        yaw: toolStore.yaw + Math.PI * 0.75,
        pitch: Math.PI / 4,
      }),
    );
  },
  placeSlugHoles: (args) => {
    const count = args.cavern.context.hasSlugs
      ? args.cavern.dice
          .placeSlugHoles(args.plan.id)
          .betaInt({ a: 1.5, b: 2, min: 1, max: 4 })
      : undefined;
    sprinkleSlugHoles(args, { count });
  },
  slugSpawnScript: (args) =>
    slugSpawnScript(args, {
      initialCooldown: { min: 120, max: 240 },
      needCrystals: { base: 5, increment: 4 },
      spawnRate: 0.2,
      waveSize: 1,
    }),
  maxSlope: 15,
};

const OPEN = mkRough(
  { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
  { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
  { of: Rough.MIX_FRINGE },
);

const SIMPLE_SPAWN = [
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
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE },
    ),
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      intersectsOnly(cavern.plans, plan, null) &&
      1,
  },
  {
    // This is mostly a fallback in case there's no other viable spawn cave
    // that isn't entirely surrounded by fluid. 9 crystals should be enough to
    // ensure an escape route.
    name: "Open Spawn with Bonus Crystals",
    ...BASE,
    ...OPEN,
    crystalsToPlace: () => 9,
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius >= 2 && 0.01,
  },
] as const satisfies readonly Architect<undefined>[];
export default SIMPLE_SPAWN;
