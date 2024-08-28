import { tf } from "../../common/transform";
import negotiate from "./00_negotiate";
import measure from "./01_measure";
import flood from "./02_flood";
import establish from "./05_establish";
import pearl from "./06_pearl";

export const PLANNING_TF = tf(negotiate)
  .then(measure)
  .then(flood)
  .then(establish)
  .then(pearl);
