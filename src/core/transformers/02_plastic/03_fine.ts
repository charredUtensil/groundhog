import {
  CavernWithPlansAndDiorama,
  CavernWithPlansAndRoughDiorama,
} from "../../models/cavern";
import { MutableDiorama } from "../../models/diorama";

export default function fine(
  cavern: CavernWithPlansAndRoughDiorama,
): CavernWithPlansAndDiorama {
  const diorama: MutableDiorama = cavern.diorama.copy();
  cavern.plans.forEach((plan) => {
    const args = { cavern, plan, diorama };
    plan.architect.placeRechargeSeam(args);
    plan.architect.placeBuildings(args);
    plan.architect.placeCrystals(args);
    plan.architect.placeOre(args);
    plan.architect.placeLandslides(args);
    plan.architect.placeErosion(args);
    plan.architect.placeEntities(args);
  });
  return { ...cavern, diorama };
}
