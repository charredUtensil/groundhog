import { NSEW, offsetBy } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import { Architect } from "../../models/architect";
import { Erosion, Landslide } from "../../models/hazards";
import { Plan } from "../../models/plan";
import { Tile } from "../../models/tiles";
import { DiscoveredCavern } from "../../transformers/03_plastic/01_discover";

const BETA_SUM = 10;

export function placeLandslides(
  cooldownRange: { min: number; max: number },
  {
    cavern,
    plan,
    landslides,
  }: {
    cavern: DiscoveredCavern;
    plan: Plan<any>;
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
        cavern.tiles.get(...point)?.canLandslide &&
        rng.chance(spread),
    )
    .forEach((pos) => {
      const cooldown = rng.betaInt({
        ...cooldownRange,
        a: BETA_SUM * spread,
        b: BETA_SUM * (1 - spread),
      });
      landslides.set(...pos, new Landslide(cooldown));
    });
}

export function preErode({
  cavern,
  plan,
  erosion,
}: Parameters<Architect<any>["preErode"]>[0]) {
  plan.innerPearl.forEach((layer) =>
    layer.forEach((pos) => {
      if (cavern.tiles.get(...pos)?.isFluid === false) {
        erosion.set(...pos, true);
      }
    }),
  );
}

export function placeErosion(
  { cavern, plan, erosion }: Parameters<Architect<any>["placeErosion"]>[0],
  opts?: {
    cooldown?: number;
    initialDelay?: number;
    initialDelayStartsExposed?: number;
  },
) {
  const event = new Erosion(opts?.cooldown ?? 30, opts?.initialDelay ?? 10);
  const startsExposedEvent = new Erosion(
    opts?.cooldown ?? 30,
    opts?.initialDelayStartsExposed ?? 120,
  );
  plan.innerPearl.forEach((layer) =>
    layer.forEach((pos) => {
      if (cavern.erosion.get(...pos)) {
        const startsExposed =
          cavern.discoveryZones.get(...pos)?.openOnSpawn &&
          NSEW.some(
            (oPos) => cavern.tiles.get(...offsetBy(pos, oPos)) === Tile.LAVA,
          );
        erosion.set(...pos, startsExposed ? startsExposedEvent : event);
      }
    }),
  );
}
