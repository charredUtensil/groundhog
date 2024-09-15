import { tf } from "../common/transform";
import { OUTLINE_TF } from "./00_outlines";
import { PLANNING_TF } from "./01_planning";
import { MASONRY_TF } from "./02_masonry";
import { PLASTIC_TF } from "./03_plastic";
import { EPHEMERA_TF } from "./04_ephemera";
import init from "./init";

export const CAVERN_TF = tf(init)
  .chain(OUTLINE_TF)
  .chain(PLANNING_TF)
  .chain(MASONRY_TF)
  .chain(PLASTIC_TF)
  .chain(EPHEMERA_TF);
