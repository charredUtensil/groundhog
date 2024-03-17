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
import { PearledPlan } from "../transformers/01_planning/04_pearl";

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

type PrimeArgs = {
  readonly cavern: PartialPlannedCavern<PearledPlan>;
  readonly plan: PearledPlan;
};

type PlanWithMetadata<T> = Plan & {readonly metadata: T}

export type FineArgs<T> = {
  readonly cavern: RoughPlasticCavern;
  readonly plan: PlanWithMetadata<T>;
  readonly tiles: MutableGrid<Tile>;
  readonly crystals: MutableGrid<number>;
  readonly ore: MutableGrid<number>;
  readonly buildings: Building[];
  readonly landslides: MutableGrid<Landslide>;
  readonly erosion: MutableGrid<Erosion>;
  readonly creatureFactory: CreatureFactory;
  readonly creatures: Creature[];
  readonly minerFactory: MinerFactory;
  readonly miners: Miner[];
  readonly openCaveFlags: MutableGrid<true>;
};

export type BaseArchitect<T extends Readonly<T>> = {
  readonly name: string;

  caveBid?(args: BidArgs): number | false;
  hallBid?(args: BidArgs): number | false;
  spawnBid?(args: SpawnBidArgs): number | false;

  baroqueness(args: EstablishArgs): number;
  crystals(args: EstablishArgs): number;
  ore(args: EstablishArgs): number;

  roughExtent(plan: EstablishedPlan): number;

  prime(args: PrimeArgs): T

  rough(args: {
    cavern: FoundationPlasticCavern;
    plan: PlanWithMetadata<T>;
    tiles: MutableGrid<RoughTile>;
  }): void;

  placeRechargeSeam(args: FineArgs<T>): void;
  placeBuildings(args: FineArgs<T>): void;
  placeCrystals(args: FineArgs<T>): void;
  placeOre(args: FineArgs<T>): void;
  placeLandslides(args: FineArgs<T>): void;
  placeErosion(args: FineArgs<T>): void;
  placeEntities(args: FineArgs<T>): void;
};

export type Architect<T> = BaseArchitect<T> &
  (
    | { caveBid: NonNullable<BaseArchitect<T>["caveBid"]> }
    | { hallBid: NonNullable<BaseArchitect<T>["hallBid"]> }
    | { spawnBid: NonNullable<BaseArchitect<T>["spawnBid"]> }
  );