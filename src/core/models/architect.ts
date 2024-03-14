import {
  CavernWithPartialPlans,
  CavernWithPlansAndBaseDiorama,
  CavernWithPlansAndRoughDiorama,
} from "./cavern";
import { MutableDiorama, MutableRoughDiorama } from "./diorama";
import { Architected, Established, Flooded, Measured, Plan } from "./plan";

type SpawnBidArgs = {
  cavern: CavernWithPartialPlans<Flooded>;
  plan: Flooded;
};

type BidArgs = SpawnBidArgs & {
  plans: readonly (Flooded | Established)[];
  hops: number;
  totalCrystals: number;
};

type EstablishArgs = {
  cavern: CavernWithPartialPlans<Flooded>;
  plan: Architected;
  totalCrystals: number;
};

type FineArgs = {
  cavern: CavernWithPlansAndRoughDiorama;
  plan: Plan;
  diorama: MutableDiorama;
};

export type BaseArchitect = {
  readonly name: string;

  caveBid?(args: BidArgs): number | false;
  hallBid?(args: BidArgs): number | false;
  spawnBid?(args: SpawnBidArgs): number | false;

  baroqueness(args: EstablishArgs): number;
  crystals(args: EstablishArgs): number;
  ore(args: EstablishArgs): number;

  roughExtent(plan: Established): number;

  rough(args: {
    cavern: CavernWithPlansAndBaseDiorama;
    plan: Plan;
    diorama: MutableRoughDiorama;
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
