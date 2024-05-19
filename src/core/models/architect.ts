import { PartialPlannedCavern } from "../transformers/01_planning/00_negotiate";
import { FoundationPlasticCavern } from "../transformers/02_masonry/00_foundation";
import { RoughPlasticCavern } from "../transformers/02_masonry/01_rough";
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
import { FencedCavern } from "../transformers/03_plastic/00_fence";
import { EntityPosition } from "./position";
import { Objectives } from "./objectives";
import { DiscoveredCavern } from "../transformers/03_plastic/01_discover";
import { Vehicle, VehicleFactory } from "./vehicle";
import { EnscribedCavern } from "../transformers/04_ephemera/01_enscribe";
import { StrataformedCavern } from "../transformers/03_plastic/02_strataform";

type SpawnBidArgs = {
  readonly cavern: PartialPlannedCavern<FloodedPlan>;
  readonly plan: FloodedPlan;
};

type BidArgs = SpawnBidArgs & {
  readonly plans: readonly (FloodedPlan | EstablishedPlan)[];
  readonly hops: number;
  readonly totalCrystals: number;
};

type EstablishArgs<T> = {
  readonly cavern: PartialPlannedCavern<FloodedPlan>;
  readonly plan: ArchitectedPlan<T>;
  readonly totalCrystals: number;
};

type PrimeArgs = {
  readonly cavern: PartialPlannedCavern<FloodedPlan>;
  readonly plan: FloodedPlan;
};

type PlanWithMetadata<T> = Plan & { readonly metadata: T };

export type BaseArchitect<T extends Readonly<T>> = {
  readonly name: string;

  caveBid?(args: BidArgs): number | false;
  hallBid?(args: BidArgs): number | false;
  spawnBid?(args: SpawnBidArgs): number | false;

  prime(args: PrimeArgs): T;

  baroqueness(args: EstablishArgs<T>): number;
  crystals(args: EstablishArgs<T>): number;
  ore(args: EstablishArgs<T>): number;

  roughExtent(plan: EstablishedPlan): number;

  rough(args: {
    cavern: FoundationPlasticCavern;
    plan: PlanWithMetadata<T>;
    tiles: MutableGrid<RoughTile>;
  }): void;

  placeRechargeSeam(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly tiles: MutableGrid<Tile>;
  }): void;
  placeBuildings(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly crystals: MutableGrid<number>;
    readonly ore: MutableGrid<number>;
    readonly buildings: Building[];
    readonly openCaveFlags: MutableGrid<true>;
    readonly setCameraPosition: (position: EntityPosition) => void;
  }): void;
  placeCrystals(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly crystals: MutableGrid<number>;
  }): void;
  placeOre(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly ore: MutableGrid<number>;
  }): void;

  placeLandslides(args: {
    readonly cavern: StrataformedCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly landslides: MutableGrid<Landslide>;
  }): void;
  placeErosion(args: {
    readonly cavern: StrataformedCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly erosion: MutableGrid<Erosion>;
  }): void;
  placeEntities(args: {
    readonly cavern: StrataformedCavern;
    readonly plan: PlanWithMetadata<T>;
    readonly creatureFactory: CreatureFactory;
    readonly creatures: Creature[];
    readonly minerFactory: MinerFactory;
    readonly miners: Miner[];
    readonly vehicleFactory: VehicleFactory;
    readonly vehicles: Vehicle[];
  }): void;

  objectives(args: {
    cavern: DiscoveredCavern;
  }): (Partial<Objectives> & { sufficient: boolean }) | undefined;

  readonly maxSlope: number | undefined;

  scriptGlobals(args: { cavern: EnscribedCavern }): string | undefined;
  script(args: {
    cavern: EnscribedCavern;
    plan: PlanWithMetadata<T>;
  }): string | undefined;
  monsterSpawnScript(args: {
    cavern: EnscribedCavern;
    plan: PlanWithMetadata<T>;
  }): string | undefined;
};

export type Architect<T> = BaseArchitect<T> &
  (
    | { caveBid: NonNullable<BaseArchitect<T>["caveBid"]> }
    | { hallBid: NonNullable<BaseArchitect<T>["hallBid"]> }
    | { spawnBid: NonNullable<BaseArchitect<T>["spawnBid"]> }
  );
