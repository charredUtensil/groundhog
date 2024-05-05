import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import patch from "./02_patch";
import fine from "./03_fine";

export const TILES_TF = tf(foundation)
  .then(rough)
  .then(patch)
  .then(fine);
