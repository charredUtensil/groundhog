import { Architect } from "../../models/architect";
import { METADATA } from "./base";
import ERUPTION from "./eruption";
import SECRET_TUNNEL from "./secret_tunnel";

const FISSURE = [
  ...ERUPTION,
  ...SECRET_TUNNEL,
] as const satisfies readonly Architect<typeof METADATA>[];

export default FISSURE;