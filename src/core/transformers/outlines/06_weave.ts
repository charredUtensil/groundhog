import { CavernWithBaseplatesAndPaths } from "../../models/cavern";
import { Path } from "../../models/path";

function getPathIdsByBpId(paths: readonly Path[]): readonly number[][] {
  const result: number[][] = []
  paths.forEach(path => {
    path.baseplates.forEach(bp => {
      result[bp.id] ||= []
      result[bp.id].push(path.id)
    })
  })
  return result
}

export default function weave(cavern: CavernWithBaseplatesAndPaths): CavernWithBaseplatesAndPaths {
  const pathIdsByBpId = getPathIdsByBpId(cavern.paths)

  const result: Path[] = []
  cavern.paths.filter(path => path.kind === 'spanning').forEach(path => result[path.id] = path)
  const queue = cavern.paths.filter(path => path.kind === 'ambiguous')

  return {...cavern, paths: result.filter(path => path)}
}