import { tf } from "../../common/transform";
import negotiate from "./00_negotiate";
import measure from "./01_measure";
import flood from "./02_flood";
import establish from "./03_establish";
import pearl from "./04_pearl";
import prime from "./05_prime";

export const PLANNING_TF = tf(negotiate)
  .then(measure)
  .then(flood)
  .then(establish)
  .then(pearl)
  .then(prime);
