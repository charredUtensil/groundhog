import { tf } from "../../common/transform";
import discover from "./01_discover";
import populate from "./05_populate";
import fence from "./00_fence";
import strataform from "./03_strataform";
import strataflux from "./04_strataflux";
import { magmatize } from "./02_magmatize";

export const PLASTIC_TF = tf(fence, "Fencing final level bounds")
  .then(discover, "Discovering caverns")
  .then(magmatize, "Spreading magma")
  .then(strataform, "Rough pass over heightmap")
  .then(strataflux, "Final pass over heightmap")
  .then(populate, "Populating cavern with entities");
