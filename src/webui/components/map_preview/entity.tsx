import React from "react";
import { Building } from "../../../core/models/building";
import { Creature } from "../../../core/models/creature";
import { Miner } from "../../../core/models/miner";
import { radsToDegrees } from "../../../core/common/geometry";
import styles from "./style.module.scss";
import { Vehicle } from "../../../core/models/vehicle";

const SCALE = 6;

type Params = {
  building?: true;
  creature?: true;
  miner?: true;
  vehicle?: true;
} & (
  | {
      entity: Building;
      building: true;
    }
  | {
      entity: Creature;
      creature: true;
    }
  | {
      entity: Miner;
      miner: true;
    }
  | {
      entity: Vehicle;
      vehicle: true;
    }
);

export default function EntityPreview({
  entity,
  building,
  creature,
  miner,
  vehicle,
}: Params) {
  if (building) {
  }
  const v = building ? SCALE / 3 : SCALE / 4;
  const u = vehicle ? SCALE / 2 : v;
  return (
    <g
      className={`${styles.entity} ${creature ? styles.enemy : ""}`}
      transform={`translate(${entity.x * SCALE} ${entity.y * SCALE}) rotate(${radsToDegrees(entity.yaw)})`}
    >
      {"template" in entity ? (
        <>
          <path
            className={styles.marker}
            d={`M${u + SCALE / 4} 0 L${u} ${v} L${-u} ${v} L${-u} ${-v} L${u} ${-v} Z`}
          />
          <text className={styles.label} x={0} y={0.75}>
            {entity.template.inspectAbbrev}
          </text>
        </>
      ) : (
        <path
          className={styles.marker}
          d={`M${u + SCALE / 4} 0 L${-u} ${v} L${-u / 2} 0 L${-u} ${-v} Z`}
        />
      )}
    </g>
  );
}
