import { Architect } from "../models/architect";

export const DefaultCaveArchitect: Architect = {
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  //rough: ({cavern}) => cavern
};

export const DefaultHallArchitect: Architect = {
  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
  crystals: () => 0,
};
