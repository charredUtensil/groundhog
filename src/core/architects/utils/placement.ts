import { Plan } from "../../models/plan";

export function pickPoint(
  plan: Plan,
  filter: (x: number, y: number) => boolean,
) {
  for (let ly = 0; ly < plan.innerPearl.length; ly++) {
    const layer = plan.innerPearl[ly];
    const start = plan.id % (layer.length - 1);
    for (let i = start; i < layer.length; i++) {
      if (filter(...layer[i])) {
        return layer[i];
      }
    }
    for (let i = 0; i < start; i++) {
      if (filter(...layer[i])) {
        return layer[i];
      }
    }
  }
  return undefined;
}