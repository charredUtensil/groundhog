import { FoundationPlasticCavern } from "./00_foundation";
import { MutableGrid, Grid } from "../../common/grid";
import { RoughTile } from "../../models/tiles";

export type RoughPlasticCavern = FoundationPlasticCavern & {
  readonly tiles: Grid<RoughTile>;
};

export default function rough(
  cavern: FoundationPlasticCavern,
): RoughPlasticCavern {
  const tiles = new MutableGrid<RoughTile>();
  cavern.plans.forEach((plan) => {
    plan.architect.rough({ cavern, plan, tiles });
  });
  return { ...cavern, tiles };
}
