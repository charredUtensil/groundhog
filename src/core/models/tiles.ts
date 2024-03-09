/* eslint-disable prettier/prettier */

class _Tile<ID> {
  readonly id: ID;
  readonly isWall: boolean;
  readonly passableByMiner: boolean;
  readonly crystalYield: number;
  readonly oreYield: number;
  readonly inspectColor: `#${string}`;
  constructor(
    id: ID,
    isWall: boolean,
    passableByMiner: boolean,
    crystalYield: number,
    oreYield: number,
    inspectColor: `#${string}`,
  ) {
    this.id = id;
    this.isWall = isWall;
    this.passableByMiner = passableByMiner;
    this.crystalYield = crystalYield;
    this.oreYield = oreYield;
    this.inspectColor = inspectColor;
  }
}

// Where possible, use colors from
// https://github.com/trigger-segfault/legorockraiders-analysis/blob/main/docs/LegoRR_Colors.h

export const Tile = {
  FLOOR: new _Tile<1>(1, false, true, 0, 0, "#2D004B"),
  LAVA: new _Tile<6>(6, false, false, 0, 0, "#FF5A00"),
  WATER: new _Tile<11>(11, false, false, 0, 0, "#002FB5"),
  DIRT: new _Tile<26>(26, true, true, 0, 4, "#AD59EF"),
  LOOSE_ROCK: new _Tile<30>(30, true, true, 0, 4, "#943CC3"),
  HARD_ROCK: new _Tile<34>(34, true, true, 0, 4, "#731CAD"),
  SOLID_ROCK: new _Tile<38>(38, true, false, 0, 0, "#800080"),
  RUBBLE_1: new _Tile<2>(2, false, true, 0, 1, "#180032"),
  RUBBLE_2: new _Tile<3>(3, false, true, 0, 2, "#180032"),
  RUBBLE_3: new _Tile<4>(4, false, true, 0, 3, "#180032"),
  RUBBLE_4: new _Tile<5>(5, false, true, 0, 4, "#180032"),
  SLUG_HOLE: new _Tile<12>(12, false, true, 0, 0, "#BD2020"),
  FOUNDATION: new _Tile<14>(14, false, true, 0, 0, "#BFBFBF"),
  POWER_PATH: new _Tile<24>(24, false, true, 0, 0, "#9D9B00"),
  LANDSLIDE_RUBBLE_4: new _Tile<60>(60, false, true, 0, 0, "#180032"),
  LANDSLIDE_RUBBLE_3: new _Tile<61>(61, false, true, 0, 0, "#180032"),
  LANDSLIDE_RUBBLE_2: new _Tile<62>(62, false, true, 0, 0, "#180032"),
  LANDSLIDE_RUBBLE_1: new _Tile<63>(63, false, true, 0, 0, "#180032"),
  CRYSTAL_SEAM: new _Tile<42>(42, true, true, 4, 4, "#B5FF00"),
  ORE_SEAM: new _Tile<46>(46, true, true, 0, 8, "#9C4108"),
  RECHARGE_SEAM: new _Tile<50>(50, true, false, 0, 0, "#FFFF00"),
};

export type Tile = _Tile<any>;
export type RoughTile = Tile & { id: 1 | 6 | 11 | 26 | 30 | 34 | 38 };
export type FluidType = (Tile & { id: 6 | 11 }) | null;
