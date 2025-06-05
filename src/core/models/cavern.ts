import { DiceBox } from "../common";
import { CavernContext, PartialCavernContext } from "../common/context";
import { AnyTfResultOf } from "../common/transform";
import { CollapseUnion } from "../common/utils";
import { CAVERN_TF } from "../transformers";
import { PearledCavern } from "../transformers/01_planning/06_pearl";
import { Architect } from "./architect";

export type BaseCavern = {
  initialContext: PartialCavernContext;
  context: CavernContext;
  dice: DiceBox;
};
export type PlannedCavern = PearledCavern;

export type Cavern = CollapseUnion<AnyTfResultOf<typeof CAVERN_TF>>;

export function getAnchor<T>(
  cavern: Cavern & { readonly plans: readonly T[]; readonly anchor: number },
) {
  return cavern.plans[cavern.anchor] as T & {
    readonly architect: Architect<any>;
  };
}
