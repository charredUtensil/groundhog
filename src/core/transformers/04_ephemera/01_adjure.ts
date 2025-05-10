import { getTotalCrystals } from "../../architects/utils/resources";
import { Architect } from "../../models/architect";
import { Objectives } from "../../models/objectives";
import { AeratedCavern } from "./00_aerate";

export type AdjuredCavern = AeratedCavern & {
  objectives: Objectives;
};

export default function adjure(cavern: AeratedCavern): AdjuredCavern {
  const objectives = cavern.plans
    .reduce((r: NonNullable<Architect<any>["objectives"]>[], plan) => {
      const fn = plan.architect.objectives;
      if (fn && !r.some((f) => Object.is(fn, f))) {
        r.push(fn);
      }
      return r;
    }, [])
    .map((fn) => fn({ cavern }))
    .reduce(
      (r: Objectives & { sufficient: boolean }, obj) => {
        const tags = { ...r.tags, ...obj?.tags };
        if (obj?.tag) {
          tags[obj.tag] = true;
        }
        return {
          crystals: Math.max(r.crystals, obj?.crystals ?? 0),
          ore: Math.max(r.ore, obj?.ore ?? 0),
          studs: Math.max(r.studs, obj?.studs ?? 0),
          tags,
          variables: [...r.variables, ...(obj?.variables ?? [])],
          sufficient: r.sufficient || !!obj?.sufficient,
        };
      },
      {
        crystals: 0,
        ore: 0,
        studs: 0,
        tags: {},
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
