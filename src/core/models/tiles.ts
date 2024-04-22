// Where possible, use colors from
// https://github.com/trigger-segfault/legorockraiders-analysis/blob/main/docs/LegoRR_Colors.h

// prettier-ignore
const TILES = {
  FLOOR:              {id:  1, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#2D004B"},
  LAVA:               {id:  6, isWall: false, passableByMiner: false, crystalYield: 0, oreYield: 0, inspectColor: "#FF5A00"},
  WATER:              {id: 11, isWall: false, passableByMiner: false, crystalYield: 0, oreYield: 0, inspectColor: "#002FB5"},
  DIRT:               {id: 26, isWall:  true, passableByMiner:  true, crystalYield: 0, oreYield: 4, inspectColor: "#AD59EF"},
  LOOSE_ROCK:         {id: 30, isWall:  true, passableByMiner:  true, crystalYield: 0, oreYield: 4, inspectColor: "#943CC3"},
  HARD_ROCK:          {id: 34, isWall:  true, passableByMiner:  true, crystalYield: 0, oreYield: 4, inspectColor: "#731CAD"},
  SOLID_ROCK:         {id: 38, isWall:  true, passableByMiner: false, crystalYield: 0, oreYield: 0, inspectColor: "#800080"},
  RUBBLE_1:           {id:  2, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 1, inspectColor: "#180032"},
  RUBBLE_2:           {id:  3, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 2, inspectColor: "#180032"},
  RUBBLE_3:           {id:  4, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 3, inspectColor: "#180032"},
  RUBBLE_4:           {id:  5, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 4, inspectColor: "#180032"},
  SLUG_HOLE:          {id: 12, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#BD2020"},
  FOUNDATION:         {id: 14, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#BFBFBF"},
  POWER_PATH:         {id: 24, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#9D9B00"},
  LANDSLIDE_RUBBLE_4: {id: 60, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#180032"},
  LANDSLIDE_RUBBLE_3: {id: 61, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#180032"},
  LANDSLIDE_RUBBLE_2: {id: 62, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#180032"},
  LANDSLIDE_RUBBLE_1: {id: 63, isWall: false, passableByMiner:  true, crystalYield: 0, oreYield: 0, inspectColor: "#180032"},
  CRYSTAL_SEAM:       {id: 42, isWall:  true, passableByMiner:  true, crystalYield: 4, oreYield: 4, inspectColor: "#B5FF00"},
  ORE_SEAM:           {id: 46, isWall:  true, passableByMiner:  true, crystalYield: 0, oreYield: 8, inspectColor: "#9C4108"},
  RECHARGE_SEAM:      {id: 50, isWall:  true, passableByMiner: false, crystalYield: 0, oreYield: 0, inspectColor: "#FFFF00"},
} as const;

export const Tile = TILES;
export type Tile = (typeof TILES)[keyof typeof TILES];

export type RoughTile =
  | typeof TILES.FLOOR
  | typeof TILES.LAVA
  | typeof TILES.WATER
  | typeof TILES.DIRT
  | typeof TILES.LOOSE_ROCK
  | typeof TILES.HARD_ROCK
  | typeof TILES.SOLID_ROCK;
export type FluidType = typeof TILES.LAVA | typeof TILES.WATER | null;

export const TILE_STYLE_VARS = (() => {
  const r: { [K: string]: string } = {};
  (Object.keys(TILES) as (keyof typeof TILES)[]).forEach((k) => {
    r[`--palette-tile-${TILES[k].id}`] = TILES[k].inspectColor;
  });
  return r;
})();
