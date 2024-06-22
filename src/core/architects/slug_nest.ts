import { Architect } from "../models/architect";
import { PartialArchitect, DefaultCaveArchitect } from "./default";
import { slugSpawnScript } from "./utils/creature_spawners";
import { sprinkleSlugHoles } from "./utils/creatures";
import { intersectsOnly } from "./utils/intersects";
import { Rough, RoughOyster, weightedSprinkle } from "./utils/oyster";
import { getTotalCrystals, sprinkleCrystals } from "./utils/resources";

const BASE: PartialArchitect<unknown> = {
  ...DefaultCaveArchitect,
  isSlugNest: true,
  placeCrystals(args) {
    sprinkleCrystals(args, {seamBias: Math.max(args.cavern.context.caveCrystalSeamBias, 0.5)})
  },
  placeSlugHoles(args) {
    sprinkleSlugHoles(args, 5);
  },
  slugSpawnScript: (args) => slugSpawnScript(args, {
    initialCooldown: {min: 20, max: 60},
    maxTriggerCount: 1,
    needCrystals: { base: Math.floor(getTotalCrystals(args.cavern) / 10) },
    rng: args.cavern.dice.slugSpawnScript(args.plan.id),
    triggerOnFirstArmed: true,
    waveSize: 5,
  }),
};

const SLUG_NEST: readonly Architect<unknown>[] = [
  {
    name: "Slug Nest",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.FLOOR, width: 3, grow: 1 },
      { of: Rough.AT_MOST_DIRT, width: 0, grow: 0.5 },
      {
        of: weightedSprinkle(
          { item: Rough.DIRT, bid: 0.25 },
          { item: Rough.LOOSE_ROCK, bid: 1 },
        ),
        grow: 1,
      },
      { of: Rough.LOOSE_OR_HARD_ROCK, grow: 0.25 },
    ),
    caveBid: ({cavern, plans, plan}) => (
      cavern.context.hasSlugs &&
      plan.pearlRadius >= 5 &&
      plan.path.baseplates.length === 1 &&
      !plan.fluid &&
      !plan.hasErosion &&
      intersectsOnly(plans, plan, null) &&
      !plans.some(p => p.architect?.isSlugNest) &&
      0.5
    ),
  }
];
export default SLUG_NEST;