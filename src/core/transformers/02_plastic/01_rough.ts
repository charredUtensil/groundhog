import {
  CavernWithPlansAndBaseDiorama,
  CavernWithPlansAndRoughDiorama,
} from "../../models/cavern";
import { MutableRoughDiorama } from "../../models/diorama";

export default function rough(
  cavern: CavernWithPlansAndBaseDiorama,
): CavernWithPlansAndRoughDiorama {
  const diorama: MutableRoughDiorama = cavern.diorama.copy();
  cavern.plans.forEach((plan) => {
    plan.architect.rough({ cavern, plan, diorama });
  });
  return { ...cavern, diorama };
}
