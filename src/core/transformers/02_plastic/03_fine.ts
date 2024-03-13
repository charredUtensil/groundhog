import {
  CavernWithPlansAndBaseDiorama,
  CavernWithPlansAndDiorama,
} from "../../models/cavern";
import { MutableDiorama } from "../../models/diorama";

export default function fine(
  cavern: CavernWithPlansAndBaseDiorama,
): CavernWithPlansAndDiorama {
  const diorama: MutableDiorama = cavern.diorama.copy();
  cavern.plans.forEach((plan) => {
    const args = { cavern, plan, diorama };
    plan.architect.place_recharge_seam(args);
    plan.architect.place_buildings(args);
    plan.architect.place_crystals(args);
    plan.architect.place_ore(args);
    plan.architect.place_landslides(args);
    plan.architect.place_erosion(args);
    plan.architect.place_place_entities(args);
  });
  return { ...cavern, diorama };
}
