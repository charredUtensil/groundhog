import { Point } from "../../common/geometry";
import { Plan } from "../../models/plan";
import { DiscoveredCavern } from "../../transformers/03_plastic/00_discover";

export function getDiscoveryPoint(
  cavern: DiscoveredCavern,
  plan: Plan,
): Point | undefined {
  for (let i = 0; i < plan.innerPearl.length; i++) {
    const layer = plan.innerPearl[i];
    for (let j = 0; j < layer.length; j++) {
      const point = layer[j];
      const dz = cavern.discoveryZones.get(...point);
      if (dz) {
        return dz.openOnSpawn ? undefined : point;
      }
    }
  }
}
