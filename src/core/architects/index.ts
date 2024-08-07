import { Architect } from "../models/architect";
import ESTABLISHED_HQ, { HqMetadata } from "./established_hq";
import FISSURE from "./fissure";
import FLOODED from "./flooded";
import LOOPBACK from "./loopback";
import LOST_MINERS, { LostMinersMetadata } from "./lost_miners";
import NOMAD_SPAWN, { NomadsMetadata } from "./nomads";
import SIMPLE_CAVE from "./simple_cave";
import SIMPLE_HALL from "./simple_hall";
import SIMPLE_SPAWN from "./simple_spawn";
import SLUGS from "./slugs";
import THIN_HALL from "./thin_hall";
import TREASURE from "./treasure";

export type AnyMetadata =
  | undefined
  | HqMetadata
  | LostMinersMetadata
  | NomadsMetadata
  | { tag: "slugNest" | "treasure" };

export const ARCHITECTS = [
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
] as const satisfies readonly Architect<AnyMetadata>[];
