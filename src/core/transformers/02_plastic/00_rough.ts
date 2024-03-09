import { CavernWithPlans, CavernWithPlansAndRoughTiles } from "../../models/cavern";

export default function rough(cavern: CavernWithPlans): CavernWithPlansAndRoughTiles {
  return {...cavern, tiles: []}
}