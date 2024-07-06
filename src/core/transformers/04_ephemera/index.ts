import { tf } from "../../common/transform";
import adjure from "./00_adjure";
import enscribe from "./01_enscribe";
import program from "./02_program";
import serialize from "./03_serialize";

export const EPHEMERA_TF = tf(aerate)
  .then(adjure)
  .then(enscribe)
  .then(program)
  .then(serialize);
