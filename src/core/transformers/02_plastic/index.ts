import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import patch from "./02_patch";
import fine from "./03_fine";
import discover from "./04_discover";
import populate from "./05_populate";
import adjure from "./06_adjure";
import enscribe from "./07_enscribe";
import fence from "./08_fence";
import program from "./09_program";
import serialize from "./10_serialize";

export const PLASTIC_TF = tf(foundation)
  .then(rough)
  .then(patch)
  .then(fine)
  .then(discover)
  .then(populate)
  .then(adjure)
  .then(enscribe)
  .then(fence)
  .then(program)
  .then(serialize);
