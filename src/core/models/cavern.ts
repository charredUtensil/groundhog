import { DiceBox } from "../common";
import { CavernContext } from "../common/context";
import { Baseplate } from "./baseplate";
import { BaseDiorama, Diorama, RoughDiorama } from "./diorama";
import { Path } from "./path";
import { Plan } from "./plan";

export type BaseCavern = {
  context: CavernContext;
  dice: DiceBox;
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
export type CavernWithPlansAndBaseDiorama = CavernWithPlans & {
  diorama: BaseDiorama;
};
export type CavernWithPlansAndRoughDiorama = CavernWithPlans & {
  diorama: RoughDiorama;
};
export type CavernWithPlansAndDiorama = CavernWithPlans & {
  diorama: Diorama;
};

export type Cavern = BaseCavern & {
  baseplates?: readonly Baseplate[];
  paths?: readonly Path[];
  plans?: readonly Partial<Plan>[];
  diorama?: BaseDiorama;
};
