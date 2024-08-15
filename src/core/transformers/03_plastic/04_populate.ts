import { MutableGrid, Grid } from "../../common/grid";
import { Erosion, Landslide } from "../../models/hazards";
import { Creature, CreatureFactory } from "../../models/creature";
import { Miner, MinerFactory } from "../../models/miner";
import { Plan } from "../../models/plan";
import { Vehicle, VehicleFactory } from "../../models/vehicle";
import { StrataformedCavern } from "./02_strataform";
import { EntityPosition } from "../../models/position";
import { AnyMetadata } from "../../architects";

export type PopulatedCavern = StrataformedCavern & {
  readonly landslides: Grid<Landslide>;
  readonly erosion: Grid<Erosion>;
  readonly creatures: readonly Creature[];
  readonly miners: readonly Miner[];
  readonly vehicles: readonly Vehicle[];
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
  cavern.plans.forEach(<T extends AnyMetadata>(plan: Plan<T>) => {
    const args = { ...diorama, plan };
    plan.architect.placeLandslides(args);
    plan.architect.placeErosion(args);
    const r = plan.architect.placeEntities(args);
    creatures.push(...(r.creatures ?? []));
    miners.push(...(r.miners ?? []));
    vehicles.push(...(r.vehicles ?? []));
  });
  return { ...cavern, ...diorama, creatures, miners, vehicles, cameraPosition };
}
