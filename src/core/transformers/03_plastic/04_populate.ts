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
  readonly cameraPosition: EntityPosition;
};

export default function populate(cavern: StrataformedCavern): PopulatedCavern {
  let cameraPosition: EntityPosition | undefined = cavern.cameraPosition;
  const setCameraPosition = (pos: EntityPosition) => (cameraPosition = pos);
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
  cavern.plans.forEach(<T extends AnyMetadata>(plan: Plan<T>) => {
    const args = { ...diorama, setCameraPosition, plan };
    plan.architect.placeLandslides(args);
    plan.architect.placeErosion(args);
    plan.architect.placeEntities(args);
  });
  if (!cameraPosition) {
    throw new Error(
      "No architect set a camera position! The spawn cave was expected to " +
        "do this during either the populate or fine step.",
    );
  }
  return { ...cavern, ...diorama, cameraPosition };
}
