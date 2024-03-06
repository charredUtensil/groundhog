import { CavernWithBaseplatesAndPaths } from "../../models/cavern";
import { Path } from "../../models/path";

/*
 * Returns an array of paths filtered from the input.
 * Some paths returned will have the kind 'spanning' - this set of paths comprises the
 * minimum spanning tree of the graph.
 *
 * It is assumed the ids of the paths are sequential, starting from 0.
 */
export default function span(
  cavern: CavernWithBaseplatesAndPaths,
): CavernWithBaseplatesAndPaths {
  const clusters: Map<number, number> = new Map();
  let nextCluster = 1;
  const paths = [];

  for (const path of [...cavern.paths].sort(
    (a, b) => a.batDistance - b.batDistance,
  )) {
    const oi = path.origin.id;
    const di = path.destination.id;
    const oc = clusters.get(oi);
    const dc = clusters.get(di);
    if (oc && dc) {
      if (oc === dc) {
        // Cycle detected (This path is not spanning)
        paths[path.id] = path;
        continue;
      }
      // Merge clusters
      for (const [key, value] of clusters.entries()) {
        if (value === dc) {
          clusters.set(key, oc);
        }
      }
    } else if (oc) {
      // Add destination to existing cluster
      clusters.set(di, oc);
    } else if (dc) {
      // Add origin to existing cluster
      clusters.set(oi, dc);
    } else {
      // Create a new cluster for both
      clusters.set(oi, nextCluster);
      clusters.set(di, nextCluster);
      nextCluster++;
    }
    paths[path.id] = new Path(path.id, "spanning", path.baseplates);
  }
  return { ...cavern, paths: paths.filter((p) => p) };
}
