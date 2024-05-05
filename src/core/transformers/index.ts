import { OUTLINE_TF } from "./00_outlines";
import { PLANNING_TF } from "./01_planning";
import { TILES_TF } from "./02_tiles";
import { PLASTIC_TF } from "./03_plastic";

export const CAVERN_TF = OUTLINE_TF.chain(PLANNING_TF).chain(TILES_TF).chain(PLASTIC_TF);
