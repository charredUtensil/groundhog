import { AnyMetadata } from "../architects";
import { DiceBox } from "../common";
import { CavernContext } from "../common/context";
import { AnyTfResultOf } from "../common/transform";
import { CollapseUnion } from "../common/utils";
import { CAVERN_TF } from "../transformers";
import { PearledCavern } from "../transformers/01_planning/06_pearl";

export type BaseCavern = {
  context: CavernContext;
  dice: DiceBox;
};
export type PlannedCavern = PearledCavern;

export type Cavern = CollapseUnion<AnyTfResultOf<typeof CAVERN_TF>>;
