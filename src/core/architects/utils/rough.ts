import { PseudorandomStream } from "../../common";
import { Architect } from "../../models/architect";
import { RoughTile, Tile } from "../../models/tiles";
import { Layer, expand, fixLayers } from "./oyster";

export function roughReplace({
  floor,
  dirt,
  looseRock,
  hardRock,
  solidRock,
  water,
  lava,
}: {
  floor?: RoughTile;
  dirt?: RoughTile;
  looseRock?: RoughTile;
  hardRock?: RoughTile;
  solidRock?: RoughTile;
  water?: RoughTile;
  lava?: RoughTile;
}): ReplaceFn<RoughTile> {
  const r: RoughTile[] = [];
  if (floor) {
    r[Tile.FLOOR.id] = floor;
  }
  if (dirt) {
    r[Tile.DIRT.id] = dirt;
  }
  if (looseRock) {
    r[Tile.LOOSE_ROCK.id] = looseRock;
  }
  if (hardRock) {
    r[Tile.HARD_ROCK.id] = hardRock;
  }
  if (solidRock) {
    r[Tile.SOLID_ROCK.id] = solidRock;
  }
  if (water) {
    r[Tile.WATER.id] = water;
  }
  if (lava) {
    r[Tile.LAVA.id] = lava;
  }
  return (has: Tile) => r[has.id] ?? null;
}

function notFloodedTo(to: RoughTile) {
  return roughReplace({
    floor: to,
    dirt: to,
    looseRock: to,
    hardRock: to,
    solidRock: to,
  });
}

export const uniformSprinkle =
  <T extends Tile>(...args: ReplaceFn<T>[]) =>
  (has: T, rng: PseudorandomStream) =>
    rng.uniformChoice(args)(has, rng);

export const weightedSprinkle =
  <T extends Tile>(...args: { bid: number; item: ReplaceFn<T> }[]) =>
  (has: T, rng: PseudorandomStream) =>
    rng.weightedChoice(args)(has, rng);

const _Rough = {
  // VOID: No effect whatsoever
  VOID: () => null,
  // ALWAYS_*: Ignores existing tile
  ALWAYS_FLOOR: () => Tile.FLOOR,
  ALWAYS_DIRT: () => Tile.DIRT,
  ALWAYS_LOOSE_ROCK: () => Tile.LOOSE_ROCK,
  ALWAYS_HARD_ROCK: () => Tile.HARD_ROCK,
  ALWAYS_SOLID_ROCK: () => Tile.SOLID_ROCK,
  ALWAYS_WATER: () => Tile.WATER,
  ALWAYS_LAVA: () => Tile.LAVA,
  // AT_MOST_*: Replaces only if the existing tile is harder rock
  AT_MOST_DIRT: roughReplace({
    looseRock: Tile.DIRT,
    hardRock: Tile.DIRT,
    solidRock: Tile.DIRT,
  }),
  AT_MOST_LOOSE_ROCK: roughReplace({
    hardRock: Tile.LOOSE_ROCK,
    solidRock: Tile.LOOSE_ROCK,
  }),
  AT_MOST_HARD_ROCK: roughReplace({ solidRock: Tile.HARD_ROCK }),
  // AT_LEAST_*: Replaces only if the existing tile is softer rock
  AT_LEAST_DIRT: roughReplace({
    floor: Tile.DIRT,
  }),
  AT_LEAST_LOOSE_ROCK: roughReplace({
    floor: Tile.LOOSE_ROCK,
    dirt: Tile.LOOSE_ROCK,
  }),
  AT_LEAST_HARD_ROCK: roughReplace({
    floor: Tile.HARD_ROCK,
    dirt: Tile.HARD_ROCK,
    looseRock: Tile.HARD_ROCK,
  }),
  // No prefix: Replaces any non-flooded tile with the given tile
  FLOOR: notFloodedTo(Tile.FLOOR),
  DIRT: notFloodedTo(Tile.DIRT),
  LOOSE_ROCK: notFloodedTo(Tile.LOOSE_ROCK),
  HARD_ROCK: notFloodedTo(Tile.HARD_ROCK),
  SOLID_ROCK: notFloodedTo(Tile.SOLID_ROCK),
  WATER: notFloodedTo(Tile.WATER),
  LAVA: notFloodedTo(Tile.LAVA),
  // Replaces floor -> dirt / loose rock <- hard rock, solid rock
  DIRT_OR_LOOSE_ROCK: roughReplace({
    floor: Tile.DIRT,
    hardRock: Tile.LOOSE_ROCK,
    solidRock: Tile.LOOSE_ROCK,
  }),
  // Replaces floor, dirt -> loose rock / hard rock <- solid rock
  LOOSE_OR_HARD_ROCK: roughReplace({
    floor: Tile.LOOSE_ROCK,
    dirt: Tile.LOOSE_ROCK,
    solidRock: Tile.HARD_ROCK,
  }),
  // Bridges - Replaces placed rock with floor and floods solid rock
  // This can be used by caves to create a path to an island.
  // Avoid using these if the cave intersects halls with fluid as the results
  // will look extremely strange.
  BRIDGE_ON_WATER: roughReplace({
    dirt: Tile.FLOOR,
    looseRock: Tile.FLOOR,
    hardRock: Tile.FLOOR,
    solidRock: Tile.WATER,
  }),
  BRIDGE_ON_LAVA: roughReplace({
    dirt: Tile.FLOOR,
    looseRock: Tile.FLOOR,
    hardRock: Tile.FLOOR,
    solidRock: Tile.LAVA,
  }),
};

export const Rough = {
  ..._Rough,
  MIX_DIRT_LOOSE_ROCK: weightedSprinkle(
    { item: _Rough.DIRT, bid: 1 },
    { item: _Rough.LOOSE_ROCK, bid: 4 },
  ),
  MIX_AT_MOST_DIRT_LOOSE_ROCK: weightedSprinkle(
    { item: _Rough.AT_MOST_DIRT, bid: 1 },
    { item: _Rough.AT_MOST_LOOSE_ROCK, bid: 4 },
  ),
  MIX_LOOSE_HARD_ROCK: weightedSprinkle(
    { item: _Rough.LOOSE_ROCK, bid: 4 },
    { item: _Rough.LOOSE_OR_HARD_ROCK, bid: 1 },
  ),
  MIX_FRINGE: weightedSprinkle(
    { item: _Rough.AT_MOST_LOOSE_ROCK, bid: 10 },
    { item: _Rough.AT_MOST_HARD_ROCK, bid: 1 },
    { item: _Rough.VOID, bid: 4 },
  ),
} as const;

export type ReplaceFn<T extends Tile> = (
  has: T,
  rng: PseudorandomStream,
) => T | null;

export function mkRough(
  ...args: Layer<ReplaceFn<RoughTile>>[]
): Pick<Architect<any>, "roughExtent" | "rough"> {
  const layers = fixLayers(args);

  const roughExtent: Architect<any>["roughExtent"] =
    layers[layers.length - 1].of === Rough.VOID
      ? (plan) => {
          const ly = expand(layers, plan.pearlRadius);
          for (let i = ly.length - 1; i > 0; i--) {
            if (ly[i] !== Rough.VOID) {
              return i;
            }
          }
          return 0;
        }
      : (plan) => plan.pearlRadius;

  const rough: Architect<any>["rough"] = ({ cavern, plan, tiles }) => {
    const rng = cavern.dice.rough(plan.id);
    const replacements = expand(layers, plan.pearlRadius);
    plan.innerPearl.forEach((layer, i) => {
      layer.forEach(([x, y]) => {
        const r = replacements[i](tiles.get(x, y) ?? Tile.SOLID_ROCK, rng);
        if (r) {
          tiles.set(x, y, r);
        }
      });
    });
  };

  return { roughExtent, rough };
}
