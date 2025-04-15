import { EAST } from "../common/geometry";
import { CollapseUnion } from "../common/utils";
import { Creature, ROCK_MONSTER } from "../models/creature";
import { atCenterOfTile } from "../models/position";
import { Vehicle, HOVER_SCOUT } from "../models/vehicle";
import ALL_GRAPHS from "./graphs";

const enemy: Creature = {
  ...atCenterOfTile({ x: 0, y: 0, facing: EAST }),
  id: 0,
  planId: 0,
  template: ROCK_MONSTER,
  sleep: false,
};

const vehicle: Vehicle = {
  ...atCenterOfTile({ x: 0, y: 0, facing: EAST }),
  id: 0,
  driverId: null,
  essential: false,
  planId: 0,
  template: HOVER_SCOUT,
  upgrades: [],
};

type F = CollapseUnion<Parameters<(typeof ALL_GRAPHS)[number]["generate"]>[2]>;
type FN = { [K in keyof F]-?: NonNullable<F[K]> };

export const MOCK_FORMAT = {
  buildAndPowerGcCount: 3,
  buildAndPowerSsCount: 3,
  enemy,
  enemies: "{enemies}",
  foundMiners: 3,
  lostMiners: 3,
  lostMinerCaves: 3,
  monsters: "{monsters}",
  remainingCount: 2,
  resourceGoal: "{resource goal}",
  resourceGoalNamesOnly: "{resource goal names}",
  vehicle,
} as const satisfies FN;
