import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import brace from "./02_brace";
import grout from "./03_grout";
import sand from "./04_sand";
import fine from "./05_fine";
import annex from "./06_annex";
import closer from "./07_closer";

export const MASONRY_TF = tf(foundation, "Computing foundations")
  .then(rough, "Rough pass over tiles")
  .then(brace, "Bracing walls")
  .then(grout, "Grouting voids")
  .then(sand, "Sanding hard edges")
  .then(fine, "Fine pass over tiles")
  .then(annex, "Annexing playable area")
  .then(closer, "Closing touches on tiles");
