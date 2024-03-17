import { Architect } from "../models/architect";
import { RoughTile, Tile } from "../models/tiles";

function rr({
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

function roughNotFloodedTo(to: RoughTile) {
  return rr({
    floor: to,
    dirt: to,
    looseRock: to,
    hardRock: to,
    solidRock: to,
  });
}

type ReplaceFn<T extends Tile> = (has: T) => T | null;

export const Rough = {
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
  AT_MOST_DIRT: rr({
    looseRock: Tile.DIRT,
    hardRock: Tile.DIRT,
    solidRock: Tile.DIRT,
  }),
  AT_MOST_LOOSE_ROCK: rr({
    hardRock: Tile.LOOSE_ROCK,
    solidRock: Tile.LOOSE_ROCK,
  }),
  AT_MOST_HARD_ROCK: rr({ solidRock: Tile.HARD_ROCK }),
  // No prefix: Replaces any non-flooded tile with the given tile
  FLOOR: roughNotFloodedTo(Tile.FLOOR),
  DIRT: roughNotFloodedTo(Tile.DIRT),
  LOOSE_ROCK: roughNotFloodedTo(Tile.LOOSE_ROCK),
  HARD_ROCK: roughNotFloodedTo(Tile.HARD_ROCK),
  SOLID_ROCK: roughNotFloodedTo(Tile.SOLID_ROCK),
  WATER: roughNotFloodedTo(Tile.WATER),
  LAVA: roughNotFloodedTo(Tile.LAVA),
  // Replaces floor -> dirt / loose rock <- hard rock, solid rock
  DIRT_OR_LOOSE_ROCK: rr({
    floor: Tile.DIRT,
    hardRock: Tile.LOOSE_ROCK,
    solidRock: Tile.LOOSE_ROCK,
  }),
  // Replaces floor, dirt -> loose rock / hard rock <- solid rock
  LOOSE_OR_HARD_ROCK: rr({
    floor: Tile.LOOSE_ROCK,
    dirt: Tile.LOOSE_ROCK,
    solidRock: Tile.HARD_ROCK,
  }),
  // Bridges - Replaces placed rock with floor and floods solid rock
  // This can be used by caves to create a path to an island.
  // Avoid using these if the cave intersects halls with fluid as the results
  // will look extremely strange.
  BRIDGE_ON_WATER: rr({
    dirt: Tile.FLOOR,
    looseRock: Tile.FLOOR,
    hardRock: Tile.FLOOR,
    solidRock: Tile.WATER,
  }),
  BRIDGE_ON_LAVA: rr({
    dirt: Tile.FLOOR,
    looseRock: Tile.FLOOR,
    hardRock: Tile.FLOOR,
    solidRock: Tile.LAVA,
  }),
  // Solid becomes dirt, other rock becomes floor.
  INVERT_TO_DIRT: rr({
    dirt: Tile.FLOOR,
    looseRock: Tile.FLOOR,
    hardRock: Tile.FLOOR,
    solidRock: Tile.DIRT,
  }),
  // Solid becomes loose rock, other rock becomes floor.
  INVERT_TO_LOOSE_ROCK: rr({
    dirt: Tile.FLOOR,
    looseRock: Tile.FLOOR,
    hardRock: Tile.FLOOR,
    solidRock: Tile.LOOSE_ROCK,
  }),
};

type Layer<T> = {
  of: T;
  width: number;
  shrink: number;
  grow: number;
};

function* expand<T>(
  layers: Layer<T>[],
  shrinkFactor: number,
  growFactor: number,
) {
  let w = 0;
  for (const { of, width, shrink, grow } of layers) {
    w = w + width * Math.max(0, 1 - shrink * shrinkFactor) + grow * growFactor;
    while (Math.round(w) > 0) {
      yield of;
      w -= 1;
    }
  }
}

// Oyster class
class BaseOyster<T> {
  protected readonly _layers: Layer<T>[];

  constructor(
    ...layers: {
      of: T;
      width?: number;
      shrink?: number;
      grow?: number;
    }[]
  ) {
    this._layers = layers.map((ly) => ({
      of: ly.of,
      width: ly.width ?? 1,
      shrink: ly.shrink ?? 0,
      grow: ly.grow ?? 0,
    }));
  }

  protected _expand(radius: number): T[] {
    radius = radius + 1;
    const totalWidth = this._layers.reduce((t, { width }) => t + width, 0);
    const totalShrink = this._layers.reduce((t, { shrink }) => t + shrink, 0);
    const totalGrow = this._layers.reduce((t, { grow }) => t + grow, 0);
    let growFactor = 0;
    let shrinkFactor = 0;
    if (radius < totalWidth && totalShrink > 0) {
      // For the shrink case,
      // r = (w0 * (1 - s0 * sf)) + (w1 * (1 - s1 * sf)) + ...
      //     + (wn * (1 - sn * sf))

      // Solve for sf
      // r = w0 - w0 * s0 * sf + w1 - w1 * s1 * sf + ... + wn - wn * sn * sf
      // r = (w0 + w1 + ... + wn) - (w0 * s0 + w1 * s1 + ... + wn * sn) * sf
      // (w0 * s0 + w1 * s1 + ... + wn * sn) * sf = (w0 + w1 + ... + wn) - r
      // sf = ((w0 + w1 + ... + wn) - r) / (w0 * s0 + w1 * s1 + ... + wn * sn)

      shrinkFactor =
        (totalWidth - radius) /
        this._layers.reduce((t, { width, shrink }) => t + width * shrink, 0);
    } else if (radius > totalWidth && totalGrow > 0) {
      // For the growth case,
      // r = (w0 + g0 * gf) + (w1 + g1 * gf) + ... + (wn + gn * gf)

      // Solve for gf
      // r = (w0 + w1 + ... + wn) + (g0 + g1 + ... + gn) * gf
      // (r - (w0 + w1 + ... + wn)) /  (g0 + g1 + ... + gn) = gf
      growFactor = (radius - totalWidth) / totalGrow;
    }

    return Array.from(expand(this._layers, shrinkFactor, growFactor));
  }
}

export class Oyster<T> extends BaseOyster<T> {
  expand = (radius: number) => this._expand(radius);
}

export class RoughOyster
  extends BaseOyster<ReplaceFn<RoughTile>>
  implements Pick<Architect, "roughExtent" | "rough">
{
  roughExtent: Architect["roughExtent"] = (plan) => {
    if (this._layers[this._layers.length - 1].of !== Rough.VOID) {
      return plan.pearlRadius;
    }
    const ly = this._expand(plan.pearlRadius);
    for (let i = ly.length - 1; i > 0; i--) {
      if (ly[i] !== Rough.VOID) {
        return i;
      }
    }
    return 0;
  };
  rough: Architect["rough"] = ({ plan, tiles }) => {
    const replacements = this._expand(plan.pearlRadius);
    plan.innerPearl.forEach((layer, i) => {
      layer.forEach(([x, y]) => {
        const r = replacements[i](tiles.get(x, y) ?? Tile.SOLID_ROCK);
        if (r) {
          tiles.set(x, y, r);
        }
      });
    });
  };
}
