import { Grid, MutableGrid } from "../../common/grid";
import { DiscoveredCavern } from "./01_discover";

export type MagmatisedCavern = DiscoveredCavern & {
  erosion: Grid<true>;
};

export function magmatize(cavern: DiscoveredCavern): MagmatisedCavern {
  const erosion = new MutableGrid<true>();
  cavern.plans.forEach((plan) => {
    if (plan.hasErosion) {
      return plan.architect.preErode({ cavern, plan, erosion });
    }
  });
  return { ...cavern, erosion };
}
