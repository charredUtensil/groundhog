import { Architect } from "../models/architect";
import SIMPLE_CAVE from "./simple_cave";
import SIMPLE_SPAWN from "./simple_spawn";
import THIN_HALL from "./thin_hall";

export const ARCHITECTS: readonly Architect[] = [
  ...SIMPLE_CAVE,
  ...SIMPLE_SPAWN,
  ...THIN_HALL,
];
