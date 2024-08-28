import { PearledPlan } from "../transformers/01_planning/06_pearl";
import { BaseMetadata } from "./architect";
export type Plan<T extends BaseMetadata> = PearledPlan<T>;
