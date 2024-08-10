import { AnyMetadata } from "../architects";
import { DiceBox } from "../common";
import { CavernContext } from "../common/context";
import { AnyTfResultOf } from "../common/transform";
import { CollapseUnion } from "../common/utils";
import { CAVERN_TF } from "../transformers";
import { Plan } from "./plan";

export type BaseCavern = {
  context: CavernContext;
  dice: DiceBox;
};
export type PlannedCavern = BaseCavern & {
  plans: readonly Plan<AnyMetadata>[];
};

export type Cavern = CollapseUnion<AnyTfResultOf<typeof CAVERN_TF>>;
