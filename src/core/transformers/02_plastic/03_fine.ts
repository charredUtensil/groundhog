import { PlannedCavern } from "../../models/cavern";
import { RoughPlasticCavern } from "./01_rough";
import { MutableGrid, Grid } from "../../common/grid";
import { Tile } from "../../models/tiles";

export type FinePlasticCavern = PlannedCavern & {
  readonly tiles: Grid<Tile>;
  readonly crystals: Grid<number>;
  readonly ore: Grid<number>;
};

export default function fine(
  cavern: RoughPlasticCavern,
): FinePlasticCavern {
  const tiles: MutableGrid<Tile> = cavern.tiles.copy()
  const crystals = new MutableGrid<number>
  const ore = new MutableGrid<number>
  cavern.plans.forEach((plan) => {
    const args = { cavern, plan, tiles, crystals, ore };
    plan.architect.placeRechargeSeam(args);
    plan.architect.placeBuildings(args);
    plan.architect.placeCrystals(args);
    plan.architect.placeOre(args);
    plan.architect.placeLandslides(args);
    plan.architect.placeErosion(args);
    plan.architect.placeEntities(args);
  });
  return { ...cavern, tiles, crystals, ore };
}

