import { tf } from "../../common/transform";
import foundation from "./00_foundation";
import rough from "./01_rough";

export const PLASTIC_TF = tf(foundation).then(rough)
