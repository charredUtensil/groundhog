import React from "react";
import { Building } from "../../../core/models/building";
import { Creature } from "../../../core/models/creature";
import { Miner } from "../../../core/models/miner";
import { radsToDegrees } from "../../../core/common/geometry";
import "./entity.scss";

const SCALE = 6;

export default function EntityPreview(
  {entity, enemy}: {entity: Building | Creature | Miner, enemy?: boolean}
) {
  const v = SCALE / 4
  return (
    <path 
      className={`entity ${enemy ? 'enemy' : ''}`}
      d={`M${SCALE / 2} 0 L${v} ${v} L${-v} ${v} L${-v} ${-v} L${v} ${-v} Z`}
      transform={`translate(${entity.x * SCALE} ${entity.y * SCALE}) rotate(${radsToDegrees(entity.yaw)})`}
      />
  );
}
