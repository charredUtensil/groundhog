import { CavernContext } from "../common/context";
import { Baseplate } from "./baseplate";
import { Path } from "./path";
import { Plan } from "./plan";
import { RoughTile } from "./tiles";

export type BaseCavern = {
  context: CavernContext;
};
export type CavernWithBaseplates = BaseCavern & {
  baseplates: readonly Baseplate[];
};
export type CavernWithBaseplatesAndPaths = CavernWithBaseplates & {
  paths: readonly Path[];
};
export type CavernWithPartialPlans<T = Partial<Plan>> = BaseCavern & {
  plans: readonly T[];
};
export type CavernWithPlans = BaseCavern & { plans: readonly Plan[] };
export type CavernWithPlansAndRoughTiles = CavernWithPlans & {
  tiles: readonly RoughTile[];
};

export type Cavern = BaseCavern & {
  baseplates?: readonly Baseplate[];
  paths?: readonly Path[];
  plans?: readonly Partial<Plan>[];
  tiles?: readonly RoughTile[];
};
