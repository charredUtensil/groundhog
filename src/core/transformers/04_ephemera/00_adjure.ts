import { getTotalCrystals } from "../../architects/utils/resources";
import { Architect } from "../../models/architect";
import { Objectives } from "../../models/objectives";
import { PopulatedCavern } from "../03_plastic/04_populate";

export type AdjuredCavern = PopulatedCavern & {
  objectives: Objectives;
};

export default function adjure(cavern: PopulatedCavern): AdjuredCavern {
  const objectives = cavern.plans
    .reduce((r: Architect<unknown>['objectives'][], plan) => {
      const fn = plan.architect.objectives;
      if (!r.some(f => Object.is(fn, f))) {
        r.push(fn);
      }
      return r;
    }, [])
    .map((fn) => fn({ cavern }))
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
