import { Architect } from "../models/architect";
import ESTABLISHED_HQ from "./established_hq";
import FISSURE from "./fissure";
import FLOODED from "./flooded";
import LOOPBACK from "./loopback";
import LOST_MINERS from "./lost_miners";
import NOMAD_SPAWN from "./nomads";
import SIMPLE_CAVE from "./simple_cave";
import SIMPLE_HALL from "./simple_hall";
import SIMPLE_SPAWN from "./simple_spawn";
import SLUGS from "./slugs";
import THIN_HALL from "./thin_hall";
import TREASURE from "./treasure";

export const ARCHITECTS: readonly Architect<unknown>[] = [
  ...ESTABLISHED_HQ,
  ...FISSURE,
  ...FLOODED,
  ...LOOPBACK,
  ...LOST_MINERS,
  ...NOMAD_SPAWN,
  ...SIMPLE_CAVE,
  ...SIMPLE_HALL,
  ...SIMPLE_SPAWN,
  ...SLUGS,
  ...THIN_HALL,
  ...TREASURE,
];
