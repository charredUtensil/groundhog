import {
  CavernWithPlans,
  CavernWithPlansAndRoughDiorama,
} from "../../models/cavern";
import { Diorama } from "../../models/diorama";

export default function rough(
  cavern: CavernWithPlans,
): CavernWithPlansAndRoughDiorama {
  return { ...cavern, diorama: {} as Diorama };
}
