import { Architect } from "../models/architect"

export const DefaultCaveArchitect: Architect = {
  baroqueness: ({context}) => context.caveBaroqueness,
  crystals: ({context}) => 5,
  //rough: ({cavern}) => cavern
}

export const DefaultHallArchitect: Architect = {
  baroqueness: ({context}) => context.hallBaroqueness,
  crystals: () => 0,
}