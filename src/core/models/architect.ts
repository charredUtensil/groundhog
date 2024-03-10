import { CavernWithPartialPlans, CavernWithPlans } from "./cavern";
import { Architected, Flooded } from "./plan";

type ArchitectArgs = {
  cavern: CavernWithPartialPlans<Flooded>
  plan: Architected;
  totalCrystals: number;
};

export type Architect = {
  baroqueness(args: ArchitectArgs): number;
  crystals(args: ArchitectArgs): number;
  //rough(args: CavernWithPlans): CavernWithPlans
};
