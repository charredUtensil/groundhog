import { FencedCavern } from "./08_fence"

export type SerializedCavern = FencedCavern & {
  serialized: string
}

export default function serialize(cavern: FencedCavern): SerializedCavern {
  return {...cavern, serialized: 'foo'}
}