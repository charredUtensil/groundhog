import { tf } from "../../common/transform";
import adjure from "./01_adjure";
import aerate from "./00_aerate";
import enscribe from "./02_enscribe";
import program from "./04_program";
import serialize from "./05_serialize";
import preprogram from "./03_preprogram";

export const EPHEMERA_TF = tf(aerate, "Aerating cavern")
  .then(adjure, "Adjuring objectives")
  .then(enscribe, "Enscribing briefing")
  .then(preprogram, "Preparing to write scripts")
  .then(program, "Writing scripts")
  .then(serialize, "Writing file contents");
