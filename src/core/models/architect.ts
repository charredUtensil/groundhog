import { FoundationPlasticCavern } from "../transformers/02_masonry/00_foundation";
import { RoughPlasticCavern } from "../transformers/02_masonry/01_rough";
import { Plan } from "./plan";
import {
  EstablishedPlan,
  OrderedOrEstablishedPlan,
} from "../transformers/01_planning/05_establish";
import { ArchitectedPlan } from "../transformers/01_planning/05_establish";
import {
  FloodedCavern,
  FloodedPlan,
} from "../transformers/01_planning/02_flood";
import { RoughTile, Tile } from "./tiles";
import { MutableGrid } from "../common/grid";
import { Building } from "./building";
import { Erosion, Landslide } from "./hazards";
import { Creature, CreatureFactory } from "./creature";
import { Miner, MinerFactory } from "./miner";
import { EntityPosition } from "./position";
import { Objectives } from "./objectives";
import { DiscoveredCavern } from "../transformers/03_plastic/01_discover";
import { Vehicle, VehicleFactory } from "./vehicle";
import { StrataformedCavern } from "../transformers/03_plastic/02_strataform";
import { PreprogrammedCavern } from "../transformers/04_ephemera/03_preprogram";
import { EnscribedCavern } from "../transformers/04_ephemera/02_enscribe";
import { DiscoveryZone } from "./discovery_zone";
import { Point } from "../common/geometry";
import { ModdedCavern } from "../transformers/01_planning/04_mod";
import {
  AnchoredCavern,
  OrderedPlan,
} from "../transformers/01_planning/03_anchor";
import { ScriptHelper } from "../architects/utils/script";

export type BaseMetadata = { readonly tag: string } | undefined;

type BidArgs = {
  readonly cavern: ModdedCavern;
  readonly plan: FloodedPlan;
  readonly plans: readonly OrderedOrEstablishedPlan[];
  readonly hops: readonly number[];
  readonly totalCrystals: number;
};

type EstablishArgs<T extends BaseMetadata> = {
  readonly cavern: ModdedCavern;
  readonly plan: ArchitectedPlan<T>;
  readonly totalCrystals: number;
};

type PrimeArgs = {
  readonly cavern: ModdedCavern;
  readonly plan: OrderedPlan;
};

export type BaseArchitect<T extends BaseMetadata> = {
  readonly name: string;

  caveBid?(args: BidArgs): number | false;
  hallBid?(args: BidArgs): number | false;
  anchorBid?(args: {
    readonly cavern: FloodedCavern;
    readonly plan: FloodedPlan;
  }): number | false;

  mod?(args: AnchoredCavern): ModdedCavern;

  prime(args: PrimeArgs): T;

  baroqueness(args: EstablishArgs<T>): number;
  crystalsToPlace(args: EstablishArgs<T>): number;
  crystalsFromMetadata(metadata: T): number;
  ore(args: EstablishArgs<T>): number;

  roughExtent(plan: EstablishedPlan<T>): number;

  rough(args: {
    cavern: FoundationPlasticCavern;
    plan: Plan<T>;
    tiles: MutableGrid<RoughTile>;
  }): void;

  placeRechargeSeam(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
  }): void;
  placeBuildings(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly crystals: MutableGrid<number>;
    readonly ore: MutableGrid<number>;
    readonly openCaveFlags: MutableGrid<true>;
  }): { buildings?: Building[]; cameraPosition?: EntityPosition };
  placeCrystals(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly crystals: MutableGrid<number>;
  }): void;
  placeOre(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly ore: MutableGrid<number>;
  }): void;
  placeSlugHoles(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
  }): void;

  placeLandslides(args: {
    readonly cavern: StrataformedCavern;
    readonly plan: Plan<T>;
    readonly landslides: MutableGrid<Landslide>;
  }): void;
  placeErosion(args: {
    readonly cavern: StrataformedCavern;
    readonly plan: Plan<T>;
    readonly erosion: MutableGrid<Erosion>;
  }): void;
  placeEntities(args: {
    readonly cavern: StrataformedCavern;
    readonly plan: Plan<T>;
    readonly creatureFactory: CreatureFactory;
    readonly minerFactory: MinerFactory;
    readonly vehicleFactory: VehicleFactory;
  }): {
    readonly creatures?: Creature[];
    readonly miners?: Miner[];
    readonly vehicles?: Vehicle[];
    readonly cameraPosition?: EntityPosition;
  };

  objectives(args: {
    cavern: DiscoveredCavern;
  }): (Partial<Objectives> & { sufficient: boolean }) | undefined;

  readonly maxSlope: number | undefined;

  claimEventOnDiscover(args: {
    cavern: EnscribedCavern;
    plan: Plan<T>;
  }): { priority: number; dz?: DiscoveryZone; pos?: Point }[];
  scriptGlobals?(args: {
    cavern: PreprogrammedCavern;
    sh: ScriptHelper;
  }): string | undefined;
  script?(args: {
    cavern: PreprogrammedCavern;
    plan: Plan<T>;
    sh: ScriptHelper;
  }): string | undefined;
  monsterSpawnScript?(args: {
    cavern: PreprogrammedCavern;
    plan: Plan<T>;
    sh: ScriptHelper;
  }): string | undefined;
  slugSpawnScript?(args: {
    cavern: PreprogrammedCavern;
    plan: Plan<T>;
    sh: ScriptHelper;
  }): string | undefined;
};

export type Architect<T extends BaseMetadata> = BaseArchitect<T> &
  (
    | { caveBid: NonNullable<BaseArchitect<T>["caveBid"]> }
    | { hallBid: NonNullable<BaseArchitect<T>["hallBid"]> }
    | { anchorBid: NonNullable<BaseArchitect<T>["anchorBid"]> }
  );
