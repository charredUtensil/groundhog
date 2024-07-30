import { PartitionedCavern } from "./00_partition";

export default function discriminate(
  cavern: PartitionedCavern,
): PartitionedCavern {
  const baseplates = [...cavern.baseplates];
  const dexes = cavern.baseplates
    .map((bp, i) => [bp.area, i])
    .sort(([a], [b]) => b - a);
  const count = Math.min(cavern.context.caveCount, baseplates.length - 1);
  for (let i = 0; i < count; i++) {
    const j = dexes[i][1];
    baseplates[j] = baseplates[j].withKind("cave");
  }
  return { ...cavern, baseplates };
}
