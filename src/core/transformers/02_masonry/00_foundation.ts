import { MutableGrid, Grid } from "../../common/grid";
import { PlannedCavern } from "../../models/cavern";

export type FoundationPlasticCavern = PlannedCavern & {
  readonly pearlInnerDex: Grid<readonly number[]>;
  readonly pearlOuterDex: Grid<readonly number[]>;
};

export default function foundation(
  cavern: PlannedCavern,
): FoundationPlasticCavern {
  const pearlInnerDex = new MutableGrid<number[]>();
  const pearlOuterDex = new MutableGrid<number[]>();
  cavern.plans.forEach((plan) => {
    plan.innerPearl.forEach((layer, i) =>
      layer.forEach(([x, y]) => {
        const v = pearlInnerDex.get(x, y) || [];
        v[plan.id] = i;
        pearlInnerDex.set(x, y, v);
      }),
    );
    plan.outerPearl.forEach((layer, i) =>
      layer.forEach(([x, y]) => {
        const v = pearlOuterDex.get(x, y) || [];
        v[plan.id] = i;
        pearlOuterDex.set(x, y, v);
      }),
    );
  });
  return { ...cavern, pearlInnerDex, pearlOuterDex };
}
