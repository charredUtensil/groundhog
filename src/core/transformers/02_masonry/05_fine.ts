import { RoughPlasticCavern } from "./01_rough";
import { MutableGrid, Grid } from "../../common/grid";
import { Tile } from "../../models/tiles";
import { Building } from "../../models/building";
import { Plan } from "../../models/plan";
import { EntityPosition } from "../../models/position";
import { AnyMetadata } from "../../architects";
import { Architect } from "../../models/architect";

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
  const plans = [...cavern.plans];
  cavern.plans.forEach(<T extends AnyMetadata>(plan: Plan<T>) => {
    const architect: Architect<T> = plan.architect;
    architect.placeRechargeSeam({ ...diorama, plan });

    const r = architect.placeBuildings({ ...diorama, plan });
    if (r.buildings) {
      buildings.push(...r.buildings);
    }
    if (r.cameraPosition) {
      if (cameraPosition) {
        throw new Error("Attempted to set a camera position twice.");
      }
      cameraPosition = r.cameraPosition;
    }
    if (r.metadata) {
      plan = { ...plan, metadata: r.metadata };
      plans[plan.id] = plan;
    }

    architect.placeCrystals({ ...diorama, plan });
    architect.placeOre({ ...diorama, plan });
    architect.placeSlugHoles({ ...diorama, plan });
  });
  return { ...cavern, ...diorama, plans, buildings, cameraPosition };
}
