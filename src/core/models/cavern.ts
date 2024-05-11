import { DiceBox } from "../common";
import { CavernContext } from "../common/context";
import { AnyTfResultOf } from "../common/transform";
import { GetOrUndefined, KeyOfUnion } from "../common/utils";
import { CAVERN_TF } from "../transformers";
import { Plan } from "./plan";

export type BaseCavern = {
  context: CavernContext;
  dice: DiceBox;
};
export type PlannedCavern = BaseCavern & { plans: readonly Plan[] };

type AnyCavern = AnyTfResultOf<typeof CAVERN_TF>
export type Cavern = BaseCavern & {[K in KeyOfUnion<AnyCavern>]?: GetOrUndefined<AnyCavern, K>}

