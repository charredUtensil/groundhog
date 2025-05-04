import { getAnchor } from "../../models/cavern";
import { FinePlasticCavern } from "./05_fine";

export default function closer(cavern: FinePlasticCavern): FinePlasticCavern {
  const plan = getAnchor(cavern);
  if (plan.architect.closer) {
    const tiles = cavern.tiles.copy();
    plan.architect.closer?.({ cavern, plan, tiles });
    return { ...cavern, tiles };
  }
  return cavern;
}
