import Delaunator from "delaunator";
import { Path } from "../../models/path";
import { PartitionedCavern } from "./00_partition";

export type TriangulatedCavern = PartitionedCavern & {
  paths: readonly Path[];
};

/**
 * Performs Delaunay triangulation over all the baseplates with the 'cave' kind to generate
 * ambiguous paths.
 */
export default function triangulate(
  cavern: PartitionedCavern,
): TriangulatedCavern {
  const caveBaseplates = cavern.baseplates.filter((bp) => bp.kind === "cave");
  const points = caveBaseplates.flatMap((bp) => bp.center);
  const delaunay = new Delaunator(points);
  const paths: Path[] = [];
  for (let i = 0; i < delaunay.triangles.length; i++) {
    if (i > delaunay.halfedges[i]) {
      const id = paths.length;
      const source = caveBaseplates[delaunay.triangles[i]];
      const dest =
        caveBaseplates[delaunay.triangles[i + (i % 3 === 2 ? -2 : 1)]];
      paths[id] = new Path(id, "ambiguous", [source, dest]);
    }
  }
  return { ...cavern, paths };
}
