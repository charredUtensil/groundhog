import { getTotalCrystals } from "../../architects/utils/resources";
import { Objectives } from "../../models/objectives";
import { DiscoveredCavern } from "./04_discover";

export type AdjuredCavern = DiscoveredCavern & {
  objectives: Objectives;
};

export default function adjure(cavern: DiscoveredCavern): AdjuredCavern {
  const objectives = {
    crystals:
      Math.floor(
        (getTotalCrystals(cavern) * cavern.context.crystalGoalRatio) / 5,
      ) * 5,
    ore: 0,
    studs: 0,
  };
  return { ...cavern, objectives };
}
