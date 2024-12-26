import { MutableGrid, Grid } from "../../common/grid";
import { Erosion, Landslide } from "../../models/hazards";
import { Creature, CreatureFactory } from "../../models/creature";
import { Miner, MinerFactory } from "../../models/miner";
import { Plan } from "../../models/plan";
import { Vehicle, VehicleFactory } from "../../models/vehicle";
import { StrataformedCavern } from "./03_strataform";
import { EntityPosition } from "../../models/position";
import { AnyMetadata } from "../../architects";
import { Architect } from "../../models/architect";

export type PopulatedCavern = Omit<StrataformedCavern, "erosion"> & {
  readonly landslides: Grid<Landslide>;
  readonly erosion: Grid<Erosion>;
  readonly creatures: readonly Creature[];
  readonly miners: readonly Miner[];
  readonly vehicles: readonly Vehicle[];
  readonly cameraPosition: EntityPosition;
};

export default function populate(cavern: StrataformedCavern): PopulatedCavern {
  let cameraPosition: EntityPosition | undefined = cavern.cameraPosition;
  const diorama = {
    cavern,
    landslides: new MutableGrid<Landslide>(),
    erosion: new MutableGrid<Erosion>(),
    creatureFactory: new CreatureFactory(),
    minerFactory: new MinerFactory(),
    vehicleFactory: new VehicleFactory(),
  };
  const creatures: Creature[] = [];
  const miners: Miner[] = [];
  const vehicles: Vehicle[] = [];
  const plans = [...cavern.plans];
  cavern.plans.forEach(<T extends AnyMetadata>(plan: Plan<T>) => {
    const architect: Architect<T> = plan.architect;
    const r = architect.placeEntities({ ...diorama, plan });
    creatures.push(...(r.creatures ?? []));
    miners.push(...(r.miners ?? []));
    vehicles.push(...(r.vehicles ?? []));
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
    architect.placeLandslides({ ...diorama, plan });
    architect.placeErosion({ ...diorama, plan });
  });
  if (!cameraPosition) {
    throw new Error(
      "No architect set a camera position! The anchor cave was expected to " +
        "do this during either the populate or fine step.",
    );
  }
  return { ...cavern, ...diorama, creatures, miners, vehicles, cameraPosition };
}
