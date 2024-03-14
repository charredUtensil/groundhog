import { Grid, ReadOnlyGrid } from "../common/grid";
import { RoughTile, Tile } from "./tiles";

export type BaseDiorama = {
  copy(): MutableBaseDiorama & MutableRoughDiorama & MutableDiorama;
  intersectsPearlInner: ReadOnlyGrid<readonly boolean[]>;
  intersectsPearlOuter: ReadOnlyGrid<readonly boolean[]>;
};

export type MutableBaseDiorama = BaseDiorama & {
  intersectsPearlInner: Grid<readonly boolean[]>;
  intersectsPearlOuter: Grid<readonly boolean[]>;
};

export type RoughDiorama = BaseDiorama & {
  tiles: ReadOnlyGrid<RoughTile>;
};

export type MutableRoughDiorama = BaseDiorama & {
  tiles: Grid<RoughTile>;
};

export type Diorama = BaseDiorama & {
  tiles: ReadOnlyGrid<Tile>;
  crystals: ReadOnlyGrid<number>;
  ore: ReadOnlyGrid<number>;
};

export type MutableDiorama = Diorama & {
  tiles: Grid<Tile>;
  crystals: Grid<number>;
  ore: Grid<number>;
};

class MutableDioramaImpl implements MutableRoughDiorama, MutableDiorama {
  intersectsPearlInner: Grid<readonly boolean[]>;
  intersectsPearlOuter: Grid<readonly boolean[]>;
  tiles: Grid<Tile>;
  crystals: Grid<number>;
  ore: Grid<number>;

  constructor(copyOf?: Partial<Diorama>) {
    this.intersectsPearlInner =
      copyOf?.intersectsPearlInner?.copy() ?? new Grid();
    this.intersectsPearlOuter =
      copyOf?.intersectsPearlOuter?.copy() ?? new Grid();
    this.tiles = copyOf?.tiles?.copy() ?? new Grid();
    this.crystals = copyOf?.crystals?.copy() ?? new Grid();
    this.ore = copyOf?.ore?.copy() ?? new Grid();
  }

  copy(): MutableBaseDiorama & MutableRoughDiorama & MutableDiorama {
    return new MutableDioramaImpl(this);
  }
}

export function emptyDiorama(): MutableBaseDiorama {
  return new MutableDioramaImpl();
}
