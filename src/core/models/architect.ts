import { PartialPlannedCavern } from "../transformers/01_planning/00_negotiate";
import { FoundationPlasticCavern } from "../transformers/02_plastic/00_foundation";
import { RoughPlasticCavern } from "../transformers/02_plastic/01_rough";
import { Plan } from "./plan";
import { EstablishedPlan } from "../transformers/01_planning/03_establish";
import { ArchitectedPlan } from "../transformers/01_planning/03_establish";
import { FloodedPlan } from "../transformers/01_planning/02_flood";
import { RoughTile, Tile } from "./tiles";
import { MutableGrid } from "../common/grid";
import { Building } from "./building";
import { Erosion, Landslide } from "./hazards";
import { Creature, CreatureFactory } from "./creature";
import { Miner, MinerFactory } from "./miner";

type SpawnBidArgs = {
  readonly cavern: PartialPlannedCavern<FloodedPlan>;
  readonly plan: FloodedPlan;
};

type BidArgs = SpawnBidArgs & {
  readonly plans: readonly (FloodedPlan | EstablishedPlan)[];
  readonly hops: number;
  readonly totalCrystals: number;
};

type EstablishArgs = {
  readonly cavern: PartialPlannedCavern<FloodedPlan>;
  readonly plan: ArchitectedPlan;
  readonly totalCrystals: number;
};

export type FineArgs = {
  readonly cavern: RoughPlasticCavern;
  readonly plan: Plan;
  readonly tiles: MutableGrid<Tile>;
  readonly crystals: MutableGrid<number>;
  readonly ore: MutableGrid<number>;
  readonly buildings: Building[];
  readonly landslides: MutableGrid<Landslide>,
  readonly erosion: MutableGrid<Erosion>,
  readonly creatureFactory: CreatureFactory,
  readonly creatures: Creature[],
  readonly minerFactory: MinerFactory,
  readonly miners: Miner[],
  readonly openCaveFlags: MutableGrid<true>,
};

export type BaseArchitect = {
  readonly name: string;

  caveBid?(args: BidArgs): number | false;
  hallBid?(args: BidArgs): number | false;
  spawnBid?(args: SpawnBidArgs): number | false;

  baroqueness(args: EstablishArgs): number;
  crystals(args: EstablishArgs): number;
  ore(args: EstablishArgs): number;

  roughExtent(plan: EstablishedPlan): number;

  rough(args: {
    cavern: FoundationPlasticCavern;
    plan: Plan;
    tiles: MutableGrid<RoughTile>;
  }): void;

  placeRechargeSeam(args: FineArgs): void;
  placeBuildings(args: FineArgs): void;
  placeCrystals(args: FineArgs): void;
  placeOre(args: FineArgs): void;
  placeLandslides(args: FineArgs): void;
  placeErosion(args: FineArgs): void;
  placeEntities(args: FineArgs): void;
};

export type Architect = BaseArchitect &
  (
    | { caveBid: NonNullable<BaseArchitect["caveBid"]> }
    | { hallBid: NonNullable<BaseArchitect["hallBid"]> }
    | { spawnBid: NonNullable<BaseArchitect["spawnBid"]> }
  );
