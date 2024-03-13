import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";
import patch from "./02_patch";

export const PLASTIC_TF = tf(foundation).then(rough).then(patch);
