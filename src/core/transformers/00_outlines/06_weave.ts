import { Baseplate } from "../../models/baseplate";
import { TriangulatedCavern } from "./02_triangulate";
import { Path } from "../../models/path";

type GraphNode = {
  src: Baseplate;
  edges: { theta: number; distance: number; dest: Baseplate }[];
};

function getGraph(paths: readonly Path[]): GraphNode[] {
  const result: GraphNode[] = [];
  const push = (
    path: Path,
    src: Baseplate,
    next: Baseplate,
    dest: Baseplate,
  ) => {
    const [ax, ay] = src.center;
    const [bx, by] = next.center;
    const theta = Math.atan2(by - ay, bx - ax);
    const distance = path.snakeDistance;
    (result[src.id] ||= { src, edges: [] }).edges[path.id] = {
      theta,
      distance,
      dest,
    };
  };
  paths.forEach((path) => {
    const bps = path.baseplates;
    push(path, bps[0], bps[1], bps[bps.length - 1]);
    push(path, bps[bps.length - 1], bps[bps.length - 2], bps[0]);
  });
  return result;
}

// Returns the total distance
function getAllDistances(graph: GraphNode[], paths: Path[], src: Baseplate) {
  const distances: number[] = [];
  const queue: Baseplate[] = [];
  const result: { src: Baseplate; dest: Baseplate; distance: number }[] = [];

  distances[src.id] = 0;
  queue.push(src);

  // Dijkstra's algorithm
  while (queue.length) {
    const node = queue.shift()!;
    result.unshift({ src, dest: node, distance: distances[node.id] });
    graph[node.id].edges.forEach(({ distance, dest }, pathId) => {
      const pathKind = paths[pathId]?.kind;
      if (pathKind === "spanning" || pathKind === "auxiliary") {
        const d = distances[node.id] + distance;
        if (distances[dest.id] === undefined) {
          queue.push(dest);
          distances[dest.id] = d;
        } else if (d < distances[dest.id]) {
          distances[dest.id] = d;
        }
      }
    });
    queue.sort((a, b) => distances[a.id] - distances[b.id]);
  }

  return result;
}

// Returns the angle between two absolute angles.
function getOffset(t1: number, t2: number): number {
  const r = Math.abs(t1 - t2);
  // Invert reflex angles
  return r > Math.PI ? 2 * Math.PI - r : r;
}

export default function weave(cavern: TriangulatedCavern): TriangulatedCavern {
  const rng = cavern.dice.weave;
  const graph = getGraph(cavern.paths);
  const paths: Path[] = [];
  const pathIdsByEnds: number[][] = [];
  cavern.paths.forEach((path) => {
    paths[path.id] = path;
    (pathIdsByEnds[path.origin.id] ||= [])[path.destination.id] = path.id;
    (pathIdsByEnds[path.destination.id] ||= [])[path.origin.id] = path.id;
  });

  function minAngle(path: Path, node: GraphNode) {
    const theta = node.edges[path.id].theta;
    return node.edges.reduce((r, { theta: t }, pathId) => {
      const pathKind = paths[pathId]?.kind;
      if (pathKind === "spanning" || pathKind === "auxiliary") {
        return Math.min(getOffset(theta, t), r);
      }
      return r;
    }, Infinity);
  }

  // Delete any paths that don't form a minimum angle.
  // Returns true if there's at least one path left in the queue.
  function pruneByAngle() {
    let ok = false;
    paths
      .filter((path) => path.kind === "ambiguous")
      .forEach((path) => {
        if (
          Math.min(
            minAngle(path, graph[path.origin.id]),
            minAngle(path, graph[path.destination.id]),
          ) < cavern.context.auxiliaryPathMinAngle
        ) {
          // Yes, we do want to create a gap here.
          // eslint-disable-next-line @typescript-eslint/no-array-delete
          delete paths[path.id];
        } else {
          ok = true;
        }
      });
    return ok;
  }

  // Find the largest distance shortcut
  function addBestShortcut() {
    const distances = graph.map(({ src }) =>
      getAllDistances(graph, paths, src),
    );
    while (true) {
      const { src, dest } = distances
        .reduce((p, c) => (p[0].distance > c[0].distance ? p : c))
        .shift()!;
      const path = paths[pathIdsByEnds[src.id][dest.id]];
      if (path?.kind === "ambiguous") {
        paths[path.id] = new Path(path.id, "auxiliary", path.baseplates);
        break;
      }
    }
  }

  function addRandomShortcut() {
    const path = rng.betaChoice(
      paths
        .filter((path) => path.kind === "ambiguous")
        .map((path) => ({
          path,
          oa: minAngle(path, graph[path.origin.id]),
          da: minAngle(path, graph[path.destination.id]),
        }))
        .sort((a, b) => a.oa + a.da - b.oa - b.da),
      { a: 1, b: 5 },
    ).path;
    paths[path.id] = new Path(path.id, "auxiliary", path.baseplates);
  }

  for (let i = 0; i < cavern.context.optimalAuxiliaryPathCount; i++) {
    if (pruneByAngle()) {
      addBestShortcut();
    }
  }
  for (let i = 0; i < cavern.context.randomAuxiliaryPathCount; i++) {
    if (pruneByAngle()) {
      addRandomShortcut();
    }
  }

  return { ...cavern, paths: paths.filter((path) => path) };
}
