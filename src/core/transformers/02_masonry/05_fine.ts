import { RoughPlasticCavern } from "./01_rough";
import { MutableGrid, Grid } from "../../common/grid";
import { Tile } from "../../models/tiles";
import { Building } from "../../models/building";
import { Plan } from "../../models/plan";
import { EntityPosition } from "../../models/position";
import { AnyMetadata } from "../../architects";

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
  const diorama = {
    cavern,
    tiles: cavern.tiles.copy(),
    crystals: new MutableGrid<number>(),
    ore: new MutableGrid<number>(),
    openCaveFlags: new MutableGrid<true>(),
  };
  const buildings: Building[] = [];
  cavern.plans.forEach(<T extends AnyMetadata>(plan: Plan<T>) => {
    const args = { ...diorama, plan };
    plan.architect.placeRechargeSeam(args);
    const r = plan.architect.placeBuildings(args);
    buildings.push(...(r.buildings ?? []));
    if (r.cameraPosition) {
      if (cameraPosition) {
        throw new Error("Attempted to set a camera position twice.");
      }
      cameraPosition = r.cameraPosition;
    }
    plan.architect.placeCrystals(args);
    plan.architect.placeOre(args);
    plan.architect.placeSlugHoles(args);
  });
  return { ...cavern, ...diorama, buildings, cameraPosition };
}
