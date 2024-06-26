import { tf } from "../../common/transform";
import partition from "./00_partition";
import discriminate from "./01_discriminate";
import triangulate from "./02_triangulate";
import span from "./03_span";
import clip from "./04_clip";
import bore from "./05_bore";
import weave from "./06_weave";

export const OUTLINE_TF = tf(partition)
  .then(discriminate)
  .then(triangulate)
  .then(span)
  .then(clip)
  .then(bore)
  .then(weave);
