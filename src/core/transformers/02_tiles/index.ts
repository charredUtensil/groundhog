import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import brace from "./02_brace";
import grout from "./03_grout";
import fine from "./04_fine";
import annex from "./05_annex";

export const TILES_TF = tf(foundation)
  .then(rough)
  .then(brace)
  .then(grout)
  .then(fine)
  .then(annex);
