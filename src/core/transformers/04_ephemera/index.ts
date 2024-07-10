import { tf } from "../../common/transform";
import adjure from "./01_adjure";
import aerate from "./00_aerate";
import enscribe from "./02_enscribe";
import program from "./03_program";
import serialize from "./04_serialize";

export const EPHEMERA_TF = tf(aerate)
  .then(adjure)
  .then(enscribe)
  .then(program)
  .then(serialize);
