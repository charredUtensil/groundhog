import {
  HINT_EJECT_ORE,
  HINT_SELECT_LASER_GROUP,
} from "../../lore/graphs/hints";
import { MINING_LASER, ORE_REFINERY } from "../../models/building";
import { LMLC, SMLC } from "../../models/vehicle";
import { mkVars, ScriptBuilder } from "./script";

export function hintEjectRefineOre(sb: ScriptBuilder) {
  const v = mkVars("hintEjectOre", ["do", "msg"]);
  sb.declareInt(v.do, 0);
  sb.when(
    "ore>10",
    `((${ORE_REFINERY.id}==0))return;`,
    `((studs<5))return;`,
    `${v.do}=1;`,
  );
  sb.declareString(v.msg, HINT_EJECT_ORE);
  sb.if(`${v.do}>0`, `msg:${v.msg};`);
}

export function hintSelectLaserGroup(sb: ScriptBuilder) {
  const v = mkVars("hintLG", ["do", "msg"]);
  sb.declareInt(v.do, 0);
  [MINING_LASER, SMLC, LMLC].forEach((e) =>
    sb.when(`${e.id}.click`, `((${e.id}>1))${v.do}=1;`),
  );
  sb.declareString(v.msg, HINT_SELECT_LASER_GROUP);
  sb.if(`${v.do}>0`, `msg:${v.msg};`);
}
