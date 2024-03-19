import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import patch from "./02_patch";
import fine from "./03_fine";
import discover from "./04_discover";
import adjure from "./05_adjure";
import enscribe from "./06_enscribe";
import program from "./08_program";
import fence from "./07_fence";
import serialize from "./09_serialize";

export const PLASTIC_TF = tf(foundation)
  .then(rough)
  .then(patch)
  .then(fine)
  .then(discover)
  .then(adjure)
  .then(enscribe)
  .then(fence)
  .then(program)
  .then(serialize);
