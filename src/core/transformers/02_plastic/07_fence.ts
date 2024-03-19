import { EnscribedCavern } from "./06_enscribe";

export type FencedCavern = EnscribedCavern & {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export default function fence(cavern: EnscribedCavern): FencedCavern {
  const bounds = cavern.tiles.bounds;
  return { ...cavern, ...bounds };
}
