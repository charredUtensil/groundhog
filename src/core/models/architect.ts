import { PartialPlannedCavern } from "../transformers/01_planning/00_negotiate";
import { FoundationPlasticCavern } from "../transformers/02_plastic/00_foundation";
import { RoughPlasticCavern } from "../transformers/02_plastic/01_rough";
import { Plan } from "./plan";
import { EstablishedPlan } from "../transformers/01_planning/03_establish";
import { ArchitectedPlan } from "../transformers/01_planning/03_establish";
import { FloodedPlan } from "../transformers/01_planning/02_flood";
import { RoughTile, Tile } from "./tiles";
import { MutableGrid } from "../common/grid";

type SpawnBidArgs = {
  cavern: PartialPlannedCavern<FloodedPlan>;
  plan: FloodedPlan;
};

type BidArgs = SpawnBidArgs & {
  plans: readonly (FloodedPlan | EstablishedPlan)[];
  hops: number;
  totalCrystals: number;
};

type EstablishArgs = {
  cavern: PartialPlannedCavern<FloodedPlan>;
  plan: ArchitectedPlan;
  totalCrystals: number;
};

type FineArgs = {
  cavern: RoughPlasticCavern;
  plan: Plan;
  tiles: MutableGrid<Tile>;
  crystals: MutableGrid<number>;
  ore: MutableGrid<number>;
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
