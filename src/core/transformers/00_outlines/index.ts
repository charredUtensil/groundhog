import { tf } from "../../common/transform";
import partition from "./00_partition";
import discriminate from "./01_discriminate";
import triangulate from "./02_triangulate";
import span from "./03_span";
import clip from "./04_clip";
import bore from "./05_bore";
import weave from "./06_weave";

export const OUTLINE_TF = tf(partition, "Partitioning target space")
  .then(discriminate, "Discriminating baseplates")
  .then(triangulate, "Triangulating paths")
  .then(span, "Spanning path graph")
  .then(clip, "Clipping boring paths")
  .then(bore, "Boring interesting paths")
  .then(weave, "Weaving best paths");
