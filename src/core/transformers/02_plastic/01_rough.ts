import {
  CavernWithPlansAndBaseDiorama,
  CavernWithPlansAndRoughDiorama,
} from "../../models/cavern";
import { RoughDiorama } from "../../models/diorama";

export default function rough(
  cavern: CavernWithPlansAndBaseDiorama,
): CavernWithPlansAndRoughDiorama {
  const diorama: RoughDiorama = cavern.diorama.copy()
  cavern.plans.forEach(plan => {
    
  })
  return {...cavern, diorama};
}
