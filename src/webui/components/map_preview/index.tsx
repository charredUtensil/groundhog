import React, { createRef, useLayoutEffect, useState } from "react";
import { Cavern } from "../../../core/models/cavern";
import BaseplatePreview from "./baseplate";
import PathPreview from "./path";
import PlanPreview from "./plan";
import PearlPreview from "./pearl";
import { PearledPlan } from "../../../core/transformers/01_planning/04_pearl";
import TilesPreview from "./tiles";
import EntityPreview from "./entity";
import {
  getTotalCrystals,
  getTotalOre,
} from "../../../core/architects/utils/resources";
import OpenCaveFlagPreview from "./open_cave_flag";
import styles from "./style.module.scss";

export type MapOverlay =
  | "about"
  | "crystals"
  | "discovery"
  | "entities"
  | "erosion"
  | "landslides"
  | "lore"
  | "ore"
  | "tiles"
  | null;

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
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(600);
  useLayoutEffect(() => {
    const onResize = () => {
      if (holder.current) {
        setWidth(holder.current.clientWidth);
        setHeight(holder.current.clientHeight);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [holder]);

  return (
    <div ref={holder} className={styles.cavernPreview}>
      <svg
        className={styles.map}
        style={{ width: width, height: height }}
        viewBox={`${width / -2} ${height / -2} ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {<TilesPreview cavern={cavern} mapOverlay={mapOverlay} />}
        {showOutlines &&
          cavern.baseplates?.map((bp) => (
            <BaseplatePreview key={bp.id} baseplate={bp} />
          ))}
        {showOutlines &&
          cavern.paths?.map((pa) => <PathPreview key={pa.id} path={pa} />)}
        {showOutlines &&
          cavern.plans?.map((pl) => <PlanPreview key={pl.id} plan={pl} />)}
        {showPearls &&
          cavern.plans
            ?.filter((pl) => 'outerPearl' in pl)
            .map((pl) => (
              <PearlPreview
                key={pl.id}
                plan={pl as PearledPlan}
                pearl={"outerPearl"}
              />
            ))}
        {showPearls &&
          cavern.plans
            ?.filter((pl) => 'innerPearl' in pl)
            .map((pl) => (
              <PearlPreview
                key={pl.id}
                plan={pl as PearledPlan}
                pearl={"innerPearl"}
              />
            ))}
        {mapOverlay === "entities" && (
          <>
            {cavern.buildings?.map((b, i) => (
              <EntityPreview key={i} entity={b} building />
            ))}
            {cavern.creatures?.map((c) => (
              <EntityPreview key={c.id} entity={c} creature />
            ))}
            {cavern.miners?.map((m) => (
              <EntityPreview key={m.id} entity={m} miner />
            ))}
            {cavern.vehicles?.map((v) => (
              <EntityPreview key={v.id} entity={v} vehicle />
            ))}
          </>
        )}
        {mapOverlay === "discovery" &&
          cavern.openCaveFlags?.map((_, x, y) => (
            <OpenCaveFlagPreview key={`${x},${y}`} x={x} y={y} />
          ))}
      </svg>
      <div className={styles.stats}>
        {mapOverlay === "crystals" && cavern.crystals && (
          <>{getTotalCrystals(cavern)} total Energy Crystals</>
        )}
        {mapOverlay === "ore" && cavern.ore && (
          <>{getTotalOre(cavern)} total Ore</>
        )}
        {cavern.briefing?.intro && <>Briefing: {cavern.briefing.intro}</>}
      </div>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
}
