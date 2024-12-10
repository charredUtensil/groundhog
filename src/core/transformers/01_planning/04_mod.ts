import { AnchoredCavern, OrderedPlan } from "./03_anchor";

export type ModdedCavern = AnchoredCavern & {
  readonly oxygen?: null | readonly [number, number];
};

// In this step, the anchor architect has carte blanche to change any aspect of
// the cavern before any plans are established. Use with caution.

// When defining mods, avoid:
// - Using mods to accomplish anything that can be done without them.
// - Redefining initial context or any context attribute that has already been
//   "used" up to this point like lake counts.

export default function mod(cavern: AnchoredCavern): ModdedCavern {
  const architect = (cavern.plans[cavern.anchor] as OrderedPlan).architect!;
  return architect.mod ? architect.mod(cavern) : cavern;
}
