import { getTotalCrystals } from "../../architects/utils/resources";
import { Architect } from "../../models/architect";
import { Objectives } from "../../models/objectives";
import { PopulatedCavern } from "./01_populate";

export type AdjuredCavern = PopulatedCavern & {
  objectives: Objectives;
};

export default function adjure(cavern: PopulatedCavern): AdjuredCavern {
  const objectives = Array.from(
    cavern.plans.reduce(
      (r, plan) => r.add(plan.architect),
      new Set<Architect<unknown>>(),
    ),
  )
    .map((architect) => architect.objectives({ cavern }))
    .reduce(
      (r: Objectives & { sufficient: boolean }, obj) => ({
        crystals: Math.max(r.crystals ?? 0, obj?.crystals ?? 0),
        ore: Math.max(r.ore ?? 0, obj?.ore ?? 0),
        studs: Math.max(r.studs ?? 0, obj?.studs ?? 0),
        variables: [...r.variables, ...(obj?.variables ?? [])],
        sufficient: !!(r.sufficient || obj?.sufficient),
      }),
      {
        crystals: 0,
        ore: 0,
        studs: 0,
        variables: [],
        sufficient: false,
      },
    );
  // If no architects produced sufficient objectives, use crystal goal ratio.
  if (!objectives.sufficient) {
    objectives.crystals = Math.max(
      objectives.crystals,
      Math.floor(
        (getTotalCrystals(cavern) * cavern.context.crystalGoalRatio) / 5,
      ) * 5,
    );
  }
  return { ...cavern, objectives };
}
