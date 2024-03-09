import { Architect } from "./architect";
import { Path } from "./path";
import { FluidType, Tile } from "./tiles";

export type PlanKind = "cave" | "hall";

export type Negotiated = {
  /** Unique ID of the Plan, used for RNG and indexing. */
  readonly id: number;
  /** Is this a cave or a hall? */
  readonly kind: PlanKind;
  /** The Path this Plan is built on. */
  readonly path: Path;
};

export type Measured = Negotiated & {
  /**
   * If intersects[id] is true, this plan intersects the plan with the given id.
   * Plans do not intersect themselves.
   */
  readonly intersects: boolean[];
  /** How many layers of different tiles can be added to this Plan? */
  readonly pearlRadius: number;
};

export type Flooded = Measured & {
  /** What kind of fluid is present in this plan. */
  readonly fluid: FluidType;
  /** Should this plan contain erosion? */
  readonly hasErosion: boolean;
};

export type Architected = Flooded & {
  /** The architect to use to build out the plan. */
  readonly architect: Architect;
  readonly crystalRichness: number;
};

export type Established = Architected & {
  /** How blobby the pearl should be. */
  readonly baroqueness: number;
  /** How many crystals the Plan will add. */
  readonly crystals: number;
};

export type Plan = Established;