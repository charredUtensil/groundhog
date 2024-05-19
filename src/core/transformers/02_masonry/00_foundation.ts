import { MutableGrid, Grid } from "../../common/grid";
import { PlannedCavern } from "../../models/cavern";

export type FoundationPlasticCavern = PlannedCavern & {
  readonly intersectsPearlInner: Grid<readonly true[]>;
  readonly intersectsPearlOuter: Grid<readonly true[]>;
};

export default function foundation(
  cavern: PlannedCavern,
): FoundationPlasticCavern {
  const intersectsPearlInner = new MutableGrid<true[]>();
  const intersectsPearlOuter = new MutableGrid<true[]>();
  cavern.plans.forEach((plan) => {
    plan.innerPearl.forEach((layer) =>
      layer.forEach(([x, y]) => {
        const v = intersectsPearlInner.get(x, y) || [];
        v[plan.id] = true;
        intersectsPearlInner.set(x, y, v);
      }),
    );
    plan.outerPearl.forEach((layer) =>
      layer.forEach(([x, y]) => {
        const v = intersectsPearlOuter.get(x, y) || [];
        v[plan.id] = true;
        intersectsPearlOuter.set(x, y, v);
      }),
    );
  });
  return { ...cavern, intersectsPearlInner, intersectsPearlOuter };
}
