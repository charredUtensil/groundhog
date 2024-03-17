import { PlannedCavern } from "../../models/cavern";
import { RoughPlasticCavern } from "./01_rough";
import { MutableGrid, Grid } from "../../common/grid";
import { Tile } from "../../models/tiles";
import { Building } from "../../models/building";
import { Erosion, Landslide } from "../../models/hazards";
import { Creature, CreatureFactory } from "../../models/creature";
import { Miner, MinerFactory } from "../../models/miner";
import { Architect, FineArgs } from "../../models/architect";
import { Plan } from "../../models/plan";

export type FinePlasticCavern = PlannedCavern & {
  readonly tiles: Grid<Tile>;
  readonly crystals: Grid<number>;
  readonly ore: Grid<number>;
  readonly buildings: readonly Building[];
  readonly landslides: Grid<Landslide>;
  readonly erosion: Grid<Erosion>;
  readonly creatures: readonly Creature[];
  readonly miners: readonly Miner[];
  readonly openCaveFlags: Grid<true>;
};

export default function fine(cavern: RoughPlasticCavern): FinePlasticCavern {
  const diorama: Omit<FineArgs<unknown>, "plan"> = {
    cavern,
    tiles: cavern.tiles.copy(),
    crystals: new MutableGrid<number>(),
    ore: new MutableGrid<number>(),
    buildings: [],
    landslides: new MutableGrid<Landslide>(),
    erosion: new MutableGrid<Erosion>(),
    creatureFactory: new CreatureFactory(),
    creatures: [],
    minerFactory: new MinerFactory(),
    miners: [],
    openCaveFlags: new MutableGrid<true>(),
  };
  cavern.plans.forEach(<T>(plan: Plan & {architect: Architect<T>, metadata: T}) => {
    const args: FineArgs<T> = { ...diorama, plan };
    plan.architect.placeRechargeSeam(args);
    plan.architect.placeBuildings(args);
    plan.architect.placeCrystals(args);
    plan.architect.placeOre(args);
    plan.architect.placeLandslides(args);
    plan.architect.placeErosion(args);
    plan.architect.placeEntities(args);
  });
  return { ...cavern, ...diorama };
}
