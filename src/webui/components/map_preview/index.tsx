import React, { createRef, useLayoutEffect, useRef, useState } from "react";
import { Cavern } from "../../../core/models/cavern";
import "./style.scss";
import BaseplatePreview from "./baseplate";
import PathPreview from "./path";
import PlanPreview from "./plan";
import PearlPreview from "./pearl";
import { PearledPlan } from "../../../core/transformers/01_planning/04_pearl";
import TilesPreview from "./tiles";
import EntityPreview from "./entity";
import ResourcePreview from "./resource";
import {
  getTotalCrystals,
  getTotalOre,
} from "../../../core/architects/utils/resources";

const SCALE = 6;

export default function CavernPreview({
  cavern,
  error,
  showCrystals,
  showEntities,
  showOre,
  showOutlines,
  showPearls,
  showTiles,
}: {
  cavern: Cavern;
  error: Error | null;
  showCrystals: boolean;
  showEntities: boolean;
  showOre: boolean;
  showOutlines: boolean;
  showPearls: boolean;
  showTiles: boolean;
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
    <div ref={holder} className="cavernPreview">
      <svg
        className="map"
        style={{ width: width, height: height }}
        viewBox={`${width / -2} ${height / -2} ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {showOutlines && cavern.baseplates?.map((bp) => <BaseplatePreview baseplate={bp} />)}
        {showOutlines && cavern.paths?.map((pa) => <PathPreview path={pa} />)}
        {showOutlines && cavern.plans?.map((pl) => <PlanPreview plan={pl} />)}
        {showPearls && cavern.plans
          ?.filter((pl) => pl.outerPearl)
          .map((pl) => (
            <PearlPreview plan={pl as PearledPlan} pearl={"outerPearl"} />
          ))}
        {showPearls && cavern.plans
          ?.filter((pl) => pl.innerPearl)
          .map((pl) => (
            <PearlPreview plan={pl as PearledPlan} pearl={"innerPearl"} />
          ))}
        {showTiles && cavern.tiles && <TilesPreview tiles={cavern.tiles} />}
        {showOre && cavern.ore && <ResourcePreview ore={cavern.ore} />}
        {showCrystals && cavern.crystals && (
          <ResourcePreview crystals={cavern.crystals} />
        )}
        {showEntities && cavern.buildings?.map((b) => <EntityPreview entity={b} />)}
        {showEntities && cavern.creatures?.map((c) => <EntityPreview entity={c} enemy />)}
        {showEntities && cavern.miners?.map((m) => <EntityPreview entity={m} />)}
      </svg>
      <ul className="stats">
        {showCrystals && cavern.crystals && (
          <li>{getTotalCrystals(cavern)} total Energy Crystals</li>
        )}
        {showOre && cavern.ore && <li>{getTotalOre(cavern)} total Ore</li>}
        {cavern.briefing?.intro && <li>Briefing: {cavern.briefing.intro}</li>}
      </ul>
      {error && <div className="error">{error.message}</div>}
    </div>
  );
}
