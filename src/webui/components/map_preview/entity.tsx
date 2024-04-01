import React from "react";
import { Building } from "../../../core/models/building";
import { Creature } from "../../../core/models/creature";
import { Miner } from "../../../core/models/miner";
import { radsToDegrees } from "../../../core/common/geometry";
import "./style.scss";

const SCALE = 6;

export default function EntityPreview({
  entity,
  enemy,
}: {
  entity: Building | Creature | Miner;
  enemy?: boolean;
}) {
  if ('foundation' in entity) {

  }
  const v = SCALE / 4;
  return (
    <g
      className={`entity ${enemy ? "enemy" : ""}`}
      transform={`translate(${entity.x * SCALE} ${entity.y * SCALE}) rotate(${radsToDegrees(entity.yaw)})`}>
      <path
        className="marker"
        d={`M${SCALE / 2} 0 L${v} ${v} L${-v} ${v} L${-v} ${-v} L${v} ${-v} Z`}
      />
      {'template' in entity && <text className="label" x={0} y={0.75}>{entity.template.inspectAbbrev}</text>}
    </g>
  );
}
