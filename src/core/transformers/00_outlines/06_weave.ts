import { Mutable } from "../../common";
import { Baseplate } from "../../models/baseplate";
import { CavernWithBaseplatesAndPaths } from "../../models/cavern";
import { Path } from "../../models/path";

type AngleInfo = readonly number[][]

function getAngleInfo(paths: readonly Path[]): AngleInfo {
  const result: Mutable<AngleInfo> = [];
  const push = (id: number, a: Baseplate, b: Baseplate) => {
    const [ax, ay] = a.center
    const [bx, by] = b.center
    const theta = Math.atan2(by - ay, bx - ax)
    result[a.id] ||= []
    result[a.id][id] = theta
  }
  paths.forEach((path) => {
    const bps = path.baseplates
    push(path.id, bps[0], bps[1])
    push(path.id, bps[bps.length - 1], bps[bps.length - 2])
  });
  return result;
}

/** Returns the angle between two absolute angles. */
function getOffset(t1: number, t2: number): number {
  const r = Math.abs(t1 - t2)
  // Invert reflex angles
  return r > Math.PI ? 2 * Math.PI - r : r
}

export default function weave(
  cavern: CavernWithBaseplatesAndPaths,
): CavernWithBaseplatesAndPaths {
  const rng = cavern.context.dice.weave
  const angleInfo = getAngleInfo(cavern.paths);

  const result: Path[] = [];
  cavern.paths
    .filter(path => path.kind === "spanning")
    .forEach(path => (result[path.id] = path));

  let queue: {path: Path, nfo1: number[], nfo2: number[]}[] = cavern.paths
    .filter(path => path.kind === "ambiguous")
    .map(path => {
      const bps = path.baseplates
      return {
        path,
        nfo1: angleInfo[bps[0].id],
        nfo2: angleInfo[bps[bps.length - 1].id],
      }})

  for (let i = 0; i < cavern.context.auxiliaryPathCount && queue.length; i++) {
    queue = queue
      .map(args => {
        const minAngle = (nfo: number[]) => {
          const theta = nfo[args.path.id]
          const angles = nfo
            // Only look at paths that already exist in the result set.
            .filter((_, id) => result[id])
            .map(t => getOffset(theta, t))
          return Math.min(...angles)
        }
        return {
          ...args,
          t1: minAngle(args.nfo1),
          t2: minAngle(args.nfo2)
        }})
      .filter(({t1, t2}) => Math.min(t1, t2) >= cavern.context.auxiliaryPathMinAngle)
      .sort((a, b) => a.t1 + a.t2 - b.t1 - b.t2)
    const path = queue.splice(rng.betaInt({a: 1, b: 5, max: queue.length}), 1)[0].path
    result[path.id] = new Path(path.id, 'auxiliary', path.baseplates)
  }

  return { ...cavern, paths: result.filter((path) => path) };
}
