import { TriangulatedCavern } from "./02_triangulate";
import { Path } from "../../models/path";

/*
 * Returns an array of paths filtered from the input.
 * Some paths returned will have the kind 'spanning' - this set of paths comprises the
 * minimum spanning tree of the graph.
 *
 * It is assumed the ids of the paths are sequential, starting from 0.
 */
export default function span(cavern: TriangulatedCavern): TriangulatedCavern {
  const clusters: number[] = [];
  let nextCluster = 1;

  const paths = [];

  for (const path of [...cavern.paths].sort(
    (a, b) => a.batDistance - b.batDistance,
  )) {
    const oi = path.origin.id;
    const di = path.destination.id;
    const oc = clusters[oi];
    const dc = clusters[di];
    if (oc && dc) {
      if (oc === dc) {
        // Cycle detected (This path is not spanning)
        paths[path.id] = path;
        continue;
      }
      // Merge clusters
      clusters.forEach((c, i) => {
        if (c === dc) {
          clusters[i] = oc;
        }
      });
    } else if (oc) {
      // Add destination to existing cluster
      clusters[di] = oc;
    } else if (dc) {
      // Add origin to existing cluster
      clusters[oi] = dc;
    } else {
      // Create a new cluster for both
      clusters[oi] = nextCluster;
      clusters[di] = nextCluster;
      nextCluster++;
    }
    paths[path.id] = new Path(path.id, "spanning", path.baseplates);
  }
  return { ...cavern, paths: paths.filter((p) => p) };
}
