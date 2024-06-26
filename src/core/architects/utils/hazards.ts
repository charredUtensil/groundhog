import { MutableGrid } from "../../common/grid";
import { Erosion, Landslide } from "../../models/hazards";
import { Plan } from "../../models/plan";
import { Tile } from "../../models/tiles";
import { DiscoveredCavern } from "../../transformers/03_plastic/01_discover";

const LANDSLIDABLE_TILES: readonly true[] = (() => {
  const r: true[] = [];
  r[Tile.DIRT.id] = true;
  r[Tile.LOOSE_ROCK.id] = true;
  r[Tile.HARD_ROCK.id] = true;
  return r;
})();

const BETA_SUM = 10;

export function placeLandslides(
  cooldownRange: { min: number; max: number },
  {
    cavern,
    plan,
    landslides,
  }: {
    cavern: DiscoveredCavern;
    plan: Plan;
    landslides: MutableGrid<Landslide>;
  },
) {
  const rng = cavern.dice.placeLandslides(plan.id);

  // A spread closer to 1 means more landslide tiles, but they will tend to
  // trigger less frequently.
  const spread = rng.uniform({ min: 0.2, max: 0.8 });

  plan.innerPearl
    .flatMap((layer) => layer)
    .filter(
      (point) =>
        !landslides.get(...point) &&
        LANDSLIDABLE_TILES[cavern.tiles.get(...point)?.id ?? -1] &&
        rng.chance(spread),
    )
    .forEach((point) => {
      const cooldown = rng.betaInt({
        ...cooldownRange,
        a: BETA_SUM * spread,
        b: BETA_SUM * (1 - spread),
      });
      landslides.set(...point, new Landslide(cooldown));
    });
}

export function placeErosion(
  cooldown: number,
  initialDelay: number,
  {
    cavern,
    plan,
    erosion,
  }: {
    cavern: DiscoveredCavern;
    plan: Plan;
    erosion: MutableGrid<Erosion>;
  },
) {
  if (plan.hasErosion) {
    const event = new Erosion(cooldown, initialDelay);
    plan.innerPearl.forEach((layer) =>
      layer.forEach((point) => {
        if (cavern.tiles.get(...point)?.isFluid === false) {
          erosion.set(...point, event);
        }
      }),
    );
  }
}
