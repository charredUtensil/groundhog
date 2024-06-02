import { OUTLINE_TF } from "./00_outlines";
import { PLANNING_TF } from "./01_planning";
import { MASONRY_TF } from "./02_masonry";
import { PLASTIC_TF } from "./03_plastic";
import { EPHEMERA_TF } from "./04_ephemera";

export const CAVERN_TF = OUTLINE_TF.chain(PLANNING_TF)
  .chain(MASONRY_TF)
  .chain(PLASTIC_TF)
  .chain(EPHEMERA_TF);
