import { Architect } from "../models/architect";
import { BUILD_AND_POWER, BuildAndPowerMetadata } from "./build_and_power";
import ESTABLISHED_HQ from "./established_hq";
import { HqMetadata } from "./established_hq/base";
import SEISMIC from "./seismic";
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
  | BuildAndPowerMetadata
  | HqMetadata
  | LostMinersMetadata
  | NomadsMetadata
  | { tag: "seismic" | "slugNest" | "treasure" };

export const ARCHITECTS = [
  ...BUILD_AND_POWER,
  ...ESTABLISHED_HQ,
  ...SEISMIC,
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
