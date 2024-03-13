import {
  CavernWithPartialPlans,
  CavernWithPlans,
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
  baroqueness(args: EstablishArgs): number;
  crystals(args: EstablishArgs): number;
  rough(args: {
    cavern: CavernWithPlansAndBaseDiorama;
    plan: Plan;
    diorama: MutableRoughDiorama;
  }): void;
  place_recharge_seam(args: FineArgs): void;
  place_buildings(args: FineArgs): void;
  place_crystals(args: FineArgs): void;
  place_ore(args: FineArgs): void;
  place_landslides(args: FineArgs): void;
  place_erosion(args: FineArgs): void;
  place_place_entities(args: FineArgs): void;
};

export type Architect = BaseArchitect &
  (
    | { caveBid(args: BidArgs): number }
    | { hallBid(args: BidArgs): number }
    | { spawnBid(args: SpawnBidArgs): number }
  );
