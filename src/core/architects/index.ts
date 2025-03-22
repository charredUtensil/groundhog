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
import BLACKOUT from "./blackout";
import MOB_FARM, { MobFarmMetadata } from "./mob_farm";
import ORE_WASTE from "./ore_waste";
import PANDORA from "./pandora";

export type AnyMetadata =
  | undefined
  | BuildAndPowerMetadata
  | HqMetadata
  | LostMinersMetadata
  | NomadsMetadata
  | MobFarmMetadata
  | {
      tag:
        | "blackout"
        | "oreWaste"
        | "pandora"
        | "seismic"
        | "slugNest"
        | "treasure";
    };

export const ARCHITECTS = [
  ...BLACKOUT,
  ...BUILD_AND_POWER,
  ...ESTABLISHED_HQ,
  ...SEISMIC,
  ...FLOODED,
  ...LOOPBACK,
  ...LOST_MINERS,
  ...MOB_FARM,
  ...NOMAD_SPAWN,
  ...ORE_WASTE,
  ...PANDORA,
  ...SIMPLE_CAVE,
  ...SIMPLE_HALL,
  ...SIMPLE_SPAWN,
  ...SLUGS,
  ...THIN_HALL,
  ...TREASURE,
] as const satisfies readonly Architect<AnyMetadata>[];
