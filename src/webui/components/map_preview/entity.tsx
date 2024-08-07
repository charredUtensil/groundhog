import React, { useMemo } from "react";
import {
  Building,
  CANTEEN,
  DOCKS,
  GEOLOGICAL_CENTER,
  MINING_LASER,
  ORE_REFINERY,
  POWER_STATION,
  SUPER_TELEPORT,
} from "../../../core/models/building";
import { Creature } from "../../../core/models/creature";
import { Miner } from "../../../core/models/miner";
import { radsToDegrees } from "../../../core/common/geometry";
import styles from "./style.module.scss";
import { Vehicle } from "../../../core/models/vehicle";
import { MapOverlay } from ".";
import { Cavern } from "../../../core/models/cavern";
import { CollapseUnion, filterTruthy } from "../../../core/common/utils";

const SCALE = 6;

type Params = {
  entity: CollapseUnion<Building | Creature | Miner | Vehicle>;
  mapOverlay: MapOverlay;
  cavern: Cavern;
};

function getMarkerD(
  template:
    | CollapseUnion<
        Building["template"] | Creature["template"] | Vehicle["template"]
      >
    | undefined,
) {
  const building = !!template?.footprint;
  const vehicle = !!template?.frame;
  const hasText = building || vehicle;

  const oy = building ? SCALE / 3 : SCALE / 4;
  const top = template === SUPER_TELEPORT ? -oy - SCALE : -oy;
  const bottom = template === POWER_STATION ? oy + SCALE : oy;

  const ox = vehicle ? SCALE / 2 : oy;
  const left = template === ORE_REFINERY ? -ox - SCALE : -ox;
  const right = template === GEOLOGICAL_CENTER ? ox + SCALE : ox;

  return filterTruthy([
    `M${left} ${top}`,
    hasText && `L${right} ${top}`,
    top !== -oy && `L${right + SCALE / 4}, ${-SCALE}`,
    template !== MINING_LASER && `L${right + SCALE / 4} 0`,
    hasText && `L${right} ${oy}`,
    bottom !== oy && `L${right} ${bottom}`,
    `L${left} ${bottom}`,
    !hasText && `L${-SCALE / 4} 0`,
    (template === DOCKS || template === CANTEEN) && `L${left - SCALE / 4} 0`,
    `Z`,
  ]).join("");
}

function getTitle(entity: Params["entity"]) {
  return filterTruthy([
    entity.template?.name,
    entity.unique || (entity.loadout && "Rock Raider"),
    entity.level && `Lv${entity.level}`,
    ((s) => s && `(${s})`)(
      filterTruthy([
        entity.sleep && "Sleeping",
        entity.essential && "VIP",
        ...(entity.loadout ?? []),
        ...(entity.upgrades ?? []),
      ]).join(", "),
    ),
  ]).join(" ");
}

export default function EntityPreview({ entity, cavern, mapOverlay }: Params) {
  const d = useMemo(() => getMarkerD(entity.template), [entity.template]);
  if (mapOverlay === "overview") {
    if (
      !cavern.discoveryZones?.get(Math.floor(entity.x), Math.floor(entity.y))
        ?.openOnSpawn
    ) {
      return null;
    }
  } else if (mapOverlay !== "entities") {
    return null;
  }
  return (
    <g
      className={`${styles.entity} ${"sleep" in entity ? styles.enemy : ""}`}
      transform={`translate(${entity.x * SCALE} ${entity.y * SCALE}) rotate(${radsToDegrees(entity.yaw)})`}
    >
      <path className={styles.marker} d={d}>
        <title>{getTitle(entity)}</title>
      </path>
      {entity.template?.inspectAbbrev && (
        <text className={styles.label} x={0} y={0.75}>
          {entity.template?.inspectAbbrev}
        </text>
      )}
    </g>
  );
}
