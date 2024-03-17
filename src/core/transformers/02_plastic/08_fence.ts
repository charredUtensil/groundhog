import { ProgrammedCavern } from "./07_program"

export type FencedCavern = ProgrammedCavern & {
  left: number,
  top: number,
  right: number,
  bottom: number,
}

export default function fence(cavern: ProgrammedCavern): FencedCavern {
  const bounds = cavern.tiles.bounds
  return {...cavern, ...bounds}
}