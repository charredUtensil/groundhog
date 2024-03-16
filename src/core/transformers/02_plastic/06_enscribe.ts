import { AdjuredCavern } from "./05_adjure"

export type EnscribedCavern = AdjuredCavern & {
  briefing: string
}

export default function enscribe(cavern: AdjuredCavern): EnscribedCavern {
  return {...cavern, briefing: 'briefing!'}
}