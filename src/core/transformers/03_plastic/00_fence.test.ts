import { FinePlasticCavern } from "../02_masonry/05_fine";
import fence, { FencedCavern } from "./00_fence";

function bounds({ left, right, bottom, top }: FencedCavern) {
  return { left, right, bottom, top };
}

test("fence keeps a square square", () => {
  const r = fence({
    tiles: {
      bounds: {
        left: -2,
        top: -3,
        right: 4,
        bottom: 3,
      },
    },
  } as FinePlasticCavern);

  expect(bounds(r)).toEqual({ left: -3, top: -4, right: 5, bottom: 4 });
});

test("fence makes a wide rectangle square", () => {
  const r = fence({
    tiles: {
      bounds: {
        left: -7,
        top: -7,
        right: 4,
        bottom: 0,
      },
    },
  } as FinePlasticCavern);

  expect(bounds(r)).toEqual({ left: -8, top: -10, right: 5, bottom: 3 });
});
