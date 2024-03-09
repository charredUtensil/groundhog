import negotiate from "./00_negotiate";
import measure from "./01_measure";
import flood from "./02_flood";
import establish from "./03_establish";

export const PLANNING_STEPS = [negotiate, measure, flood, establish];
