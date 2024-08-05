import { Architect } from "../models/architect";
import { ESTABLISHED_HQ } from "./established_hq";
import FLOODED from "./flooded";
import LOST_MINERS from "./lost_miners";
import NOMAD_SPAWN from "./nomads";
import SIMPLE_CAVE from "./simple_cave";
import SIMPLE_HALL from "./simple_hall";
import SIMPLE_SPAWN from "./simple_spawn";
import SLUGS from "./slugs";
import THIN_HALL from "./thin_hall";
import TREASURE from "./treasure";

export const ARCHITECTS = [
  ...ESTABLISHED_HQ,
  ...FLOODED,
  ...LOST_MINERS,
  ...NOMAD_SPAWN,
  ...SIMPLE_CAVE,
  ...SIMPLE_HALL,
  ...SIMPLE_SPAWN,
  ...SLUGS,
  ...THIN_HALL,
  ...TREASURE,
] as const satisfies readonly Architect<any>[];

export type AnyMetadata = ReturnType<(typeof ARCHITECTS)[number]['prime']>