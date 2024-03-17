import { Architect } from "../models/architect";
import FLOODED from "./flooded";
import LOST_MINERS from "./lost_miners";
import SIMPLE_CAVE from "./simple_cave";
import SIMPLE_HALL from "./simple_hall";
import SIMPLE_SPAWN from "./simple_spawn";
import THIN_HALL from "./thin_hall";
import TREASURE from "./treasure";

export const ARCHITECTS: readonly Architect<unknown>[] = [
  ...FLOODED,
  ...LOST_MINERS,
  ...SIMPLE_CAVE,
  ...SIMPLE_HALL,
  ...SIMPLE_SPAWN,
  ...THIN_HALL,
  ...TREASURE,
];
