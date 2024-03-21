import { OUTLINE_TF } from "./00_outlines";
import { PLANNING_TF } from "./01_planning";
import { PLASTIC_TF } from "./02_plastic";

export const CAVERN_TF = OUTLINE_TF.chain(PLANNING_TF).chain(PLASTIC_TF);
