import React, {
  CSSProperties,
  createRef,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import { Cavern } from "../../../core/models/cavern";
import BaseplatePreview from "./baseplate";
import PathPreview from "./path";
import PearlPreview from "./pearl";
import { PearledPlan } from "../../../core/transformers/01_planning/06_pearl";
import TilesPreview from "./tiles";
import EntityPreview from "./entity";
import OpenCaveFlagPreview from "./open_cave_flag";
import styles from "./style.module.scss";
import HeightPreview from "./height";
import Stats from "./stats";
import PlansPreview from "./plan";
import ScriptPreview, { ScriptOverlay } from "./script_preview";
import ObjectivesPreview from "./objectives";
import ResourcePreview from "./resource";

export type MapOverlay =
  | "about"
  | "crystals"
  | "discovery"
  | "entities"
  | "erosion"
  | "height"
  | "landslides"
  | "lore"
  | "objectives"
  | "ore"
  | "overview"
  | "oxygen"
  | "script"
  | "tiles"
  | null;

function getScale(
  cavern: Cavern,
  mapOverlay: MapOverlay,
  showOutlines: boolean,
  mapWrapper: HTMLDivElement | null,
) {
  if (!mapWrapper || cavern.left === undefined) {
    return 1;
  }
  const tw = Math.max(-1 * (cavern.left ?? 0), 1 + (cavern.right ?? 0)) + 1;
  const th = Math.max(-1 * (cavern.top ?? 0), 1 + (cavern.bottom ?? 0)) + 1;
  const overlayMargin =
    cavern.plans && showOutlines && mapOverlay !== "script" ? 400 : 0;
  const mw = 6 * 2 * tw + overlayMargin;
  const mh = 6 * 2 * th;
  return Math.max(
    Math.floor(
      Math.min(mapWrapper.clientWidth / mw, mapWrapper.clientHeight / mh) * 2,
    ) / 2,
    0.5,
  );
}

function getTransform(cavern: Cavern, mapOverlay: MapOverlay, scale: number) {
  if (mapOverlay !== "overview" || !cavern.cameraPosition) {
    return {
      "--pvw-scale": scale,
    } as CSSProperties;
  }
  const { x, y, yaw, pitch } = cavern.cameraPosition;
  return {
    "--pvw-scale": 6,
    "--pvw-pitch": `${pitch}rad`,
    "--pvw-yaw": `${Math.PI - ((yaw + Math.PI * 1.5) % (Math.PI * 2))}rad`,
    "--pvw-tr-x": -x * 6,
    "--pvw-tr-y": -y * 6,
  } as CSSProperties;
}

export default function CavernPreview({
  cavern,
  mapOverlay,
  showOutlines,
  showPearls,
}: {
  cavern: Cavern;
  mapOverlay: MapOverlay;
  showOutlines: boolean;
  showPearls: boolean;
}) {
  const [scriptLineHovered, setScriptLineHovered] = useState(-1);
  const [scriptLineOffsets, setScriptLineOffsets] = useReducer(
    (was: number[], now: number[]) => {
      if (was.length !== now.length) {
        return now;
      }
      for (let i = 0; i < was.length; i++) {
        if (was[i] !== now[i]) {
          return now;
        }
      }
      return was;
    },
    [],
  );

  const mapWrapperRef = createRef<HTMLDivElement>();
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const fn = () =>
      setScale(
        getScale(cavern, mapOverlay, showOutlines, mapWrapperRef.current),
      );
    window.addEventListener("resize", fn);
    fn();
    return () => window.removeEventListener("resize", fn);
  }, [cavern, mapOverlay, showOutlines, mapWrapperRef]);

  switch (mapOverlay) {
    case "about":
    case "lore":
      return null;
    default:
  }

  const targetSize = cavern.context?.targetSize;
  if (!targetSize) {
    return null;
  }
  const height = targetSize * 2 * 6;
  const width = Math.max(height, targetSize * 6 + 600);

  return (
    <div
      className={styles.cavernPreview}
      style={getTransform(cavern, mapOverlay, scale)}
    >
      {mapOverlay === "script" && (
        <ScriptPreview
          cavern={cavern}
          setScriptLineOffsets={setScriptLineOffsets}
          scriptLineHovered={scriptLineHovered}
          setScriptLineHovered={setScriptLineHovered}
        />
      )}
      <div className={styles.mapWrapper} ref={mapWrapperRef}>
        <svg
          className={`${styles.map} ${cavern.baseplates || cavern.plans ? "" : styles.void}`}
          style={{
            top: `calc(50% - ${height / 2}px)`,
            left: `calc(50% - ${width / 2}px)`,
            width: width,
            height: height,
          }}
          viewBox={`${width / -2} ${height / -2} ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {<TilesPreview cavern={cavern} mapOverlay={mapOverlay} />}
          {mapOverlay === "overview" && <ResourcePreview {...cavern} />}
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
            />
          ))}
          {cavern.creatures?.map((c) => (
            <EntityPreview
              key={c.id}
              entity={c}
              mapOverlay={mapOverlay}
              cavern={cavern}
            />
          ))}
          {cavern.miners?.map((m) => (
            <EntityPreview
              key={m.id}
              entity={m}
              mapOverlay={mapOverlay}
              cavern={cavern}
            />
          ))}
          {cavern.vehicles?.map((v) => (
            <EntityPreview
              key={v.id}
              entity={v}
              mapOverlay={mapOverlay}
              cavern={cavern}
            />
          ))}
          {mapOverlay === "discovery" &&
            cavern.openCaveFlags?.map((_, x, y) => (
              <OpenCaveFlagPreview key={`${x},${y}`} x={x} y={y} />
            ))}
          {mapOverlay === "objectives" && <ObjectivesPreview cavern={cavern} />}
          {mapOverlay === "script" && (
            <ScriptOverlay
              cavern={cavern}
              scriptLineOffsets={scriptLineOffsets}
              scriptLineHovered={scriptLineHovered}
              scale={scale}
            />
          )}
          {showOutlines && cavern.plans && (
            <PlansPreview cavern={cavern} mapOverlay={mapOverlay} />
          )}
          {showPearls &&
            cavern.plans
              ?.filter((pl) => "outerPearl" in pl)
              .map((pl) => (
                <PearlPreview
                  key={pl.id}
                  plan={pl as PearledPlan<any>}
                  pearl={"outerPearl"}
                />
              ))}
          {showPearls &&
            cavern.plans
              ?.filter((pl) => "innerPearl" in pl)
              .map((pl) => (
                <PearlPreview
                  key={pl.id}
                  plan={pl as PearledPlan<any>}
                  pearl={"innerPearl"}
                />
              ))}
        </svg>
      </div>
      <Stats cavern={cavern} mapOverlay={mapOverlay} />
    </div>
  );
}
