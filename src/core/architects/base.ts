import { Architect, BaseArchitect } from "../models/architect";

export const BaseCaveArchitect: Omit<BaseArchitect, 'name' | 'rough'> = {
  baroqueness: ({ cavern }) => cavern.context.caveBaroqueness,
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter,
  place_recharge_seam: () => {},
  place_buildings: () => {},
  place_crystals: () => {},
  place_ore: () => {},
  place_landslides: () => {},
  place_erosion: () => {},
  place_place_entities: () => {},
};

//export const DefaultHallArchitect: Architect = {
//  baroqueness: ({ cavern }) => cavern.context.hallBaroqueness,
//  crystals: () => 0,
//};
