import { RoughPlasticCavern } from "./01_rough";
import { MutableGrid, Grid } from "../../common/grid";
import { Tile } from "../../models/tiles";
import { Building } from "../../models/building";
import { Architect } from "../../models/architect";
import { Plan } from "../../models/plan";
import { EntityPosition } from "../../models/position";

export type FinePlasticCavern = Omit<RoughPlasticCavern, "tiles"> & {
  readonly tiles: Grid<Tile>;
  readonly crystals: Grid<number>;
  readonly ore: Grid<number>;
  readonly buildings: readonly Building[];
  readonly openCaveFlags: Grid<true>;
  readonly cameraPosition: EntityPosition | undefined;
};

export default function fine(cavern: RoughPlasticCavern): FinePlasticCavern {
  let cameraPosition: EntityPosition | undefined = undefined;
  const setCameraPosition = (pos: EntityPosition) => (cameraPosition = pos);
  const diorama = {
    cavern,
    tiles: cavern.tiles.copy(),
    crystals: new MutableGrid<number>(),
    ore: new MutableGrid<number>(),
    buildings: [] as Building[],
    openCaveFlags: new MutableGrid<true>(),
  };
  cavern.plans.forEach(
    <T>(plan: Plan & { architect: Architect<T>; metadata: T }) => {
      const args = { ...diorama, setCameraPosition, plan };
      plan.architect.placeRechargeSeam(args);
      plan.architect.placeBuildings(args);
      plan.architect.placeCrystals(args);
      plan.architect.placeOre(args);
    },
  );
  return { ...cavern, ...diorama, cameraPosition };
}
