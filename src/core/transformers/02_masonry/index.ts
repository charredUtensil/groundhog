import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import brace from "./02_brace";
import grout from "./03_grout";
import sand from "./04_sand";
import fine from "./05_fine";
import annex from "./06_annex";

export const MASONRY_TF = tf(foundation)
  .then(rough)
  .then(brace)
  .then(grout)
  .then(sand)
  .then(fine)
  .then(annex);
