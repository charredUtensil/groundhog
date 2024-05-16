import { tf } from "../../common/transform";
import discover from "./00_discover";
import populate from "./01_populate";
import adjure from "./02_adjure";
import enscribe from "./03_enscribe";
import fence from "./04_fence";
import strataform from "./05_strataform";
import strataflux from "./06_strataflux";
import program from "./07_program";
import serialize from "./08_serialize";

export const PLASTIC_TF = tf(discover)
  .then(populate)
  .then(adjure)
  .then(enscribe)
  .then(fence)
  .then(strataform)
  .then(strataflux)
  .then(program)
  .then(serialize);
