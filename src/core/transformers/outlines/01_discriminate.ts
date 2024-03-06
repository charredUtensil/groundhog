import { CavernWithBaseplates } from "../../models/cavern"

export default function discriminate(cavern: CavernWithBaseplates): CavernWithBaseplates {
  const dexes = cavern.baseplates.map((bp, i) => [bp.area, i]).sort(
    ([_, a], [__, b]) => a - b)
  const baseplates = [...cavern.baseplates]
  for (let i = 0; i < cavern.context.caveCount; i++) {
    const j = dexes[i][1]
    baseplates[j] = baseplates[j].withKind('cave')
  }
  return {...cavern, baseplates}
}