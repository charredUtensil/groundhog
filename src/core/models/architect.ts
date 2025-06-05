import { FoundationPlasticCavern } from "../transformers/02_masonry/00_foundation";
import { RoughPlasticCavern } from "../transformers/02_masonry/01_rough";
import { Plan } from "./plan";
import {
  EstablishedPlan,
  OrderedOrEstablishedPlan,
  OrderedPlan,
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
import { StrataformedCavern } from "../transformers/03_plastic/03_strataform";
import { PreprogrammedCavern } from "../transformers/04_ephemera/03_preprogram";
import { EnscribedCavern } from "../transformers/04_ephemera/02_enscribe";
import { DiscoveryZone } from "./discovery_zone";
import { Point } from "../common/geometry";
import { ModdedCavern } from "../transformers/01_planning/04_mod";
import { AnchoredCavern } from "../transformers/01_planning/03_anchor";
import { DzPriority, ScriptBuilder } from "../architects/utils/script";
import { FinePlasticCavern } from "../transformers/02_masonry/05_fine";

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
  /**
   * This function should be used to place any plan-specific tiles needed.
   * For example, if this plan needs to place rubble everywhere, this is where
   * that would happen.
   */
  placeBuildings(args: {
    readonly cavern: RoughPlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
    readonly crystals: MutableGrid<number>;
    readonly ore: MutableGrid<number>;
    readonly openCaveFlags: MutableGrid<true>;
  }): {
    readonly buildings?: Building[];
    readonly cameraPosition?: EntityPosition;
    readonly metadata?: T;
  };
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
  closer?(args: {
    readonly cavern: FinePlasticCavern;
    readonly plan: Plan<T>;
    readonly tiles: MutableGrid<Tile>;
  }): void;

  preErode(args: {
    readonly cavern: DiscoveredCavern;
    readonly plan: Plan<T>;
    readonly erosion: MutableGrid<true>;
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
    readonly metadata?: T;
  };
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

  /**
   * Get the objectives offered by this plan. Return sufficient: true if the
   * objectives returned by this plan would be usable as a level objective even
   * if no other plans returned an objective. If this only makes sense as an
   * interim objective, return sufficient: false.
   *
   * If no plans return a sufficient objective, a "collect N crystals"
   * objective will be added.
   */
  objectives?: (args: {
    cavern: DiscoveredCavern;
  }) =>
    | (Partial<Objectives> & { sufficient: boolean; tag?: string })
    | undefined;

  readonly maxSlope: number | undefined;

  /**
   * Each plan bids for the right to add a scripted "cutscene" when a
   * DiscoveryZone is discovered. This prevents issues where multiple scripts
   * try to perform a pan + message simultaneously. If this plan loses the bid,
   * it MUST NOT perform a cutscene on discover.
   *
   * Note: It's generally OK to do something after a random delay, or to have
   * some other "quieter" effect on discover like spawning a monster without
   * bidding for the DZ.
   */
  claimEventOnDiscover(args: {
    cavern: EnscribedCavern;
    plan: Plan<T>;
  }): { priority: DzPriority; dz?: DiscoveryZone; pos?: Point }[];
  /**
   * This method is only called when this architect is the anchor.
   * If this method returns true, a script variable (gCreatures.anchorHold)
   * will be defined and all creature spawn scripts will check this when
   * tripped. In this case, it is expected that this architect's script will
   * set the value of that variable to 0 to release the hold.
   */
  holdCreatures?(args: { cavern: EnscribedCavern; plan: Plan<T> }): boolean;
  scriptGlobals?: (args: {
    cavern: PreprogrammedCavern;
    sb: ScriptBuilder;
  }) => void;
  script?(args: {
    cavern: PreprogrammedCavern;
    plan: Plan<T>;
    sb: ScriptBuilder;
  }): void;
  monsterSpawnScript?(args: {
    cavern: PreprogrammedCavern;
    plan: Plan<T>;
    sb: ScriptBuilder;
  }): void;
  slugSpawnScript?(args: {
    cavern: PreprogrammedCavern;
    plan: Plan<T>;
    sb: ScriptBuilder;
  }): void;
};

export type Architect<T extends BaseMetadata> = BaseArchitect<T> &
  (
    | { caveBid: NonNullable<BaseArchitect<T>["caveBid"]> }
    | { hallBid: NonNullable<BaseArchitect<T>["hallBid"]> }
    | { anchorBid: NonNullable<BaseArchitect<T>["anchorBid"]> }
  );
