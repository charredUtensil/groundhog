import { tf } from "../../common/transform";
import adjure from "./01_adjure";
import aerate from "./00_aerate";
import enscribe from "./02_enscribe";
import program from "./04_program";
import serialize from "./05_serialize";
import preprogram from "./03_preprogram";

export const EPHEMERA_TF = tf(aerate)
  .then(adjure)
  .then(enscribe)
  .then(preprogram)
  .then(program)
  .then(serialize);
