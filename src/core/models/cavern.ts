import { DiceBox } from "../common";
import { CavernContext } from "../common/context";
import { TriangulatedCavern } from "../transformers/00_outlines/02_triangulate";
import { PartialPlannedCavern } from "../transformers/01_planning/00_negotiate";
import { SerializedCavern } from "../transformers/02_plastic/10_serialize";
import { Plan } from "./plan";

export type BaseCavern = {
  context: CavernContext;
  dice: DiceBox;
};
export type OutlinedCavern = TriangulatedCavern;
export type PlannedCavern = BaseCavern & { plans: readonly Plan[] };
export type PlasticCavern = SerializedCavern;
export type Cavern = BaseCavern &
  Partial<OutlinedCavern> &
  Partial<PartialPlannedCavern<Partial<Plan>>> &
  Partial<PlasticCavern>;
