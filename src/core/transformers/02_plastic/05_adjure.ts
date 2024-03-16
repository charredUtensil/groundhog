import { DiscoveredCavern } from "./04_discover";

export type AdjuredCavern = DiscoveredCavern & {
  adjurator: Adjurator
}

export default function adjure(cavern: DiscoveredCavern): AdjuredCavern {
  const adjurator = new Adjurator()
  return {...cavern, adjurator}
}