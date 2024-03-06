import { CavernContext } from '../common/context'
import { Baseplate } from './baseplate'
import { Path } from './path'

export type Cavern = {
  context: CavernContext
  baseplates?: readonly Baseplate[]
  paths?: readonly Path[]
}

export type CavernWithBaseplates = Cavern & {baseplates: NonNullable<Cavern['baseplates']>}
export type CavernWithBaseplatesAndPaths = CavernWithBaseplates & {paths: NonNullable<Cavern['paths']>}