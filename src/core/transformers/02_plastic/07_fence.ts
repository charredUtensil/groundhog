import { EnscribedCavern } from "./06_enscribe";

export type FencedCavern = EnscribedCavern & {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export default function fence(cavern: EnscribedCavern): FencedCavern {
  let { left, top, right, bottom } = cavern.tiles.bounds;
  const width = right - left;
  const height = bottom - top;
  const size = Math.max(width, height);

  left = left - Math.floor((size - width) / 2) - 1;
  top = top - Math.floor((size - height) / 2) - 1;
  right = left + size + 2;
  bottom = top + size + 2;

  return { ...cavern, left, top, right, bottom };
}
