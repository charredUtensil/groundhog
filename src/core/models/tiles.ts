export enum Hardness {
  NONE = 0,
  RUBBLE,
  DIRT,
  LOOSE,
  SEAM,
  HARD,
  SOLID,
}

type BaseTile = {
  id: number;
  name: string;
  hardness: Hardness;
  canLandslide: boolean;
  isWall: boolean;
  isFluid: boolean;
  maxSlope: number | undefined;
  crystalYield: number;
  oreYield: number;
};

// prettier-ignore
const TILES = {
  FLOOR:              {id:  1, name: "Cavern Floor",        canLandslide: false, crystalYield: 0, hardness:   Hardness.NONE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 0},
  LAVA:               {id:  6, name: "Lava",                canLandslide: false, crystalYield: 0, hardness:   Hardness.NONE, isFluid:  true, isWall: false, maxSlope:         0, oreYield: 0},
  WATER:              {id: 11, name: "Water",               canLandslide: false, crystalYield: 0, hardness:   Hardness.NONE, isFluid:  true, isWall: false, maxSlope:         0, oreYield: 0},
  DIRT:               {id: 26, name: "Dirt",                canLandslide:  true, crystalYield: 0, hardness:   Hardness.DIRT, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 4},
  LOOSE_ROCK:         {id: 30, name: "Loose Rock",          canLandslide:  true, crystalYield: 0, hardness:  Hardness.LOOSE, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 4},
  HARD_ROCK:          {id: 34, name: "Hard Rock",           canLandslide:  true, crystalYield: 0, hardness:   Hardness.HARD, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 4},
  SOLID_ROCK:         {id: 38, name: "Solid Rock",          canLandslide: false, crystalYield: 0, hardness:  Hardness.SOLID, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 4},
  RUBBLE_1:           {id:  2, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 1},
  RUBBLE_2:           {id:  3, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 2},
  RUBBLE_3:           {id:  4, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 3},
  RUBBLE_4:           {id:  5, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 4},
  SLUG_HOLE:          {id: 12, name: "Slimy Slug Hole",     canLandslide: false, crystalYield: 0, hardness:   Hardness.NONE, isFluid: false, isWall: false, maxSlope:        15, oreYield: 0},
  FOUNDATION:         {id: 14, name: "Foundation",          canLandslide: false, crystalYield: 0, hardness:   Hardness.NONE, isFluid: false, isWall: false, maxSlope:        15, oreYield: 0},
  POWER_PATH:         {id: 24, name: "Power Path",          canLandslide: false, crystalYield: 0, hardness:   Hardness.NONE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 0},
  LANDSLIDE_RUBBLE_4: {id: 60, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 0},
  LANDSLIDE_RUBBLE_3: {id: 61, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 0},
  LANDSLIDE_RUBBLE_2: {id: 62, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 0},
  LANDSLIDE_RUBBLE_1: {id: 63, name: "Rubble",              canLandslide: false, crystalYield: 0, hardness: Hardness.RUBBLE, isFluid: false, isWall: false, maxSlope: undefined, oreYield: 0},
  CRYSTAL_SEAM:       {id: 42, name: "Energy Crystal Seam", canLandslide: false, crystalYield: 4, hardness:   Hardness.SEAM, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 4},
  ORE_SEAM:           {id: 46, name: "Ore Seam",            canLandslide: false, crystalYield: 0, hardness:   Hardness.SEAM, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 8},
  RECHARGE_SEAM:      {id: 50, name: "Recharge Seam",       canLandslide: false, crystalYield: 0, hardness:  Hardness.SOLID, isFluid: false, isWall:  true, maxSlope: undefined, oreYield: 0},
} as const satisfies { [K in any]: BaseTile };

export const Tile = TILES;
export type Tile = (typeof TILES)[keyof typeof TILES]; // eslint-disable-line @typescript-eslint/no-redeclare

export type RoughTile =
  | typeof TILES.FLOOR
  | typeof TILES.LAVA
  | typeof TILES.WATER
  | typeof TILES.DIRT
  | typeof TILES.LOOSE_ROCK
  | typeof TILES.HARD_ROCK
  | typeof TILES.SOLID_ROCK;
export type FluidType = typeof TILES.LAVA | typeof TILES.WATER | null;
