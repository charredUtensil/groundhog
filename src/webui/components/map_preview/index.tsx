import React, { createRef } from "react";
import { Cavern } from "../../../core/models/cavern";
import BaseplatePreview from "./baseplate";
import PathPreview from "./path";
import PearlPreview from "./pearl";
import { PearledPlan } from "../../../core/transformers/01_planning/04_pearl";
import TilesPreview from "./tiles";
import EntityPreview from "./entity";
import OpenCaveFlagPreview from "./open_cave_flag";
import styles from "./style.module.scss";
import HeightPreview from "./height";
import Stats from "./stats";
import PlansPreview from "./plan";

export type MapOverlay =
  | "about"
  | "crystals"
  | "discovery"
  | "entities"
  | "erosion"
  | "height"
  | "landslides"
  | "lore"
  | "ore"
  | "overview"
  | "oxygen"
  | "tiles"
  | null;

function getTransform(cavern: Cavern, mapOverlay: MapOverlay) {
  if (mapOverlay !== "overview" || !cavern.cameraPosition) {
    return undefined;
  }
  const { x, y, yaw, pitch } = cavern.cameraPosition;
  return `scale(6) rotate3d(1, 0, 0, ${pitch}rad) rotate(${Math.PI / -2 - yaw}rad) translate(${-x * 6}px, ${-y * 6}px)`;
}

export default function CavernPreview({
  cavern,
  error,
  mapOverlay,
  showOutlines,
  showPearls,
}: {
  cavern: Cavern;
  error: Error | undefined;
  mapOverlay: MapOverlay;
  showOutlines: boolean;
  showPearls: boolean;
}) {
  const holder = createRef<HTMLDivElement>();
  const height = cavern.context.targetSize * 2 * 6;
  const width = Math.max(height, cavern.context.targetSize * 6 + 600);

  return (
    <div ref={holder} className={styles.cavernPreview}>
      <svg
        className={styles.map}
        style={{
          top: `calc(50% - ${height / 2}px)`,
          left: `calc(50% - ${width / 2}px)`,
          width: width,
          height: height,
          transform: getTransform(cavern, mapOverlay),
        }}
        viewBox={`${width / -2} ${height / -2} ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {<TilesPreview cavern={cavern} mapOverlay={mapOverlay} />}
        {mapOverlay === "height" && cavern.height && (
          <HeightPreview height={cavern.height} />
        )}
        {showOutlines &&
          cavern.baseplates?.map((bp) => (
            <BaseplatePreview key={bp.id} baseplate={bp} />
          ))}
        {showOutlines &&
          cavern.paths?.map((pa) => <PathPreview key={pa.id} path={pa} />)}
        {cavern.buildings?.map((b, i) => (
          <EntityPreview
            key={i}
            entity={b}
            mapOverlay={mapOverlay}
            cavern={cavern}
            building
          />
        ))}
        {cavern.creatures?.map((c) => (
          <EntityPreview
            key={c.id}
            entity={c}
            mapOverlay={mapOverlay}
            cavern={cavern}
            creature
          />
        ))}
        {cavern.miners?.map((m) => (
          <EntityPreview
            key={m.id}
            entity={m}
            mapOverlay={mapOverlay}
            cavern={cavern}
            miner
          />
        ))}
        {cavern.vehicles?.map((v) => (
          <EntityPreview
            key={v.id}
            entity={v}
            mapOverlay={mapOverlay}
            cavern={cavern}
            vehicle
          />
        ))}
        {mapOverlay === "discovery" &&
          cavern.openCaveFlags?.map((_, x, y) => (
            <OpenCaveFlagPreview key={`${x},${y}`} x={x} y={y} />
          ))}
        {showOutlines && cavern.plans && <PlansPreview cavern={cavern} />}
        {showPearls &&
          cavern.plans
            ?.filter((pl) => "outerPearl" in pl)
            .map((pl) => (
              <PearlPreview
                key={pl.id}
                plan={pl as PearledPlan}
                pearl={"outerPearl"}
              />
            ))}
        {showPearls &&
          cavern.plans
            ?.filter((pl) => "innerPearl" in pl)
            .map((pl) => (
              <PearlPreview
                key={pl.id}
                plan={pl as PearledPlan}
                pearl={"innerPearl"}
              />
            ))}
      </svg>
      <Stats cavern={cavern} mapOverlay={mapOverlay} />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}
