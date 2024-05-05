import { MutableGrid, Grid } from "../../common/grid";
import { Erosion, Landslide } from "../../models/hazards";
import { Creature, CreatureFactory } from "../../models/creature";
import { Miner, MinerFactory } from "../../models/miner";
import { Architect } from "../../models/architect";
import { Plan } from "../../models/plan";
import { Vehicle, VehicleFactory } from "../../models/vehicle";
import { DiscoveredCavern } from "./04_discover";

export type PopulatedCavern = DiscoveredCavern & {
  readonly landslides: Grid<Landslide>;
  readonly erosion: Grid<Erosion>;
  readonly creatures: readonly Creature[];
  readonly miners: readonly Miner[];
  readonly vehicles: readonly Vehicle[];
};

export default function populate(cavern: DiscoveredCavern): PopulatedCavern {
  const diorama = {
    cavern,
    landslides: new MutableGrid<Landslide>(),
    erosion: new MutableGrid<Erosion>(),
    creatureFactory: new CreatureFactory(),
    creatures: [] as Creature[],
    minerFactory: new MinerFactory(),
    miners: [] as Miner[],
    vehicleFactory: new VehicleFactory(),
    vehicles: [] as Vehicle[],
  };
  cavern.plans.forEach(
    <T>(plan: Plan & { architect: Architect<T>; metadata: T }) => {
      const args = { ...diorama, plan };
      plan.architect.placeLandslides(args);
      plan.architect.placeErosion(args);
      plan.architect.placeEntities(args);
    },
  );
  return { ...cavern, ...diorama };
}
