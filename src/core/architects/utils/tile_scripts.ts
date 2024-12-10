import { Tile } from "../../models/tiles";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";
import { EventChainLine, ScriptBuilder, transformPoint } from "./script";

const TRIGGERS = {
  flood: (cavern, x, y) =>
    `place:${transformPoint(cavern, [x, y])},${Tile.WATER.id};`,
  waste: (cavern, x, y) =>
    `place:${transformPoint(cavern, [x, y])},${Tile.WASTE_RUBBLE_2.id};`,
} as const satisfies {
  [key: string]: (
    cavern: PreprogrammedCavern,
    x: number,
    y: number,
  ) => EventChainLine;
};

export function tileScript({
  cavern,
  sb,
}: {
  cavern: PreprogrammedCavern;
  sb: ScriptBuilder;
}) {
  cavern.tiles.forEach((t, x, y) => {
    if (t.trigger) {
      sb.if(
        `drill:${transformPoint(cavern, [x, y])}`,
        TRIGGERS[t.trigger](cavern, x, y),
      );
    }
  });
}
