import { EntityPosition } from "../../models/position";
import { PopulatedCavern } from "./04_populate";

export type ComposedCavern = PopulatedCavern & {
  readonly cameraPosition: EntityPosition;
};