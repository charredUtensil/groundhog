import { tf } from "../../common/transform";
import discover from "./01_discover";
import populate from "./04_populate";
import fence from "./00_fence";
import strataform from "./02_strataform";
import strataflux from "./03_strataflux";

export const PLASTIC_TF = tf(fence)
  .then(discover)
  .then(strataform)
  .then(strataflux)
  .then(populate);