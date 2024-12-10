import { FinePlasticCavern } from "./05_fine";

export default function closer(cavern: FinePlasticCavern): FinePlasticCavern {
  const plan = cavern.plans[cavern.anchor];
  if (plan.architect.closer) {
    const tiles = cavern.tiles.copy();
    plan.architect.closer?.({ cavern, plan, tiles });
    return { ...cavern, tiles };
  }
  return cavern;
}
