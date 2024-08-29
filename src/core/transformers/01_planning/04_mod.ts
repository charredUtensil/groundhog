import { AnchoredCavern } from "./03_anchor";

export type ModdedCavern = AnchoredCavern;

// In this step, the anchor architect has carte blanche to change any aspect of
// the cavern before any plans are established. Use with caution.
export default function mod(cavern: AnchoredCavern): ModdedCavern {
  // const architect = (cavern.plans[cavern.anchor] as OrderedPlan).architect!;
  return cavern;
} 