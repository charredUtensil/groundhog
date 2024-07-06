import { PopulatedCavern } from "../03_plastic/04_populate";

export type AeratedCavern = PopulatedCavern & {
  oxygen: null | readonly [number, number],
}

export default function aerate(cavern: PopulatedCavern): AeratedCavern {

  return {...cavern, oxygen: [6000, 6000]}
}