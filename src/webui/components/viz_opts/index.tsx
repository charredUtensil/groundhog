import React from "react";
import styles from "./style.module.scss";
import { Cavern } from "../../../core/models/cavern";
import { MapOverlay } from "../map_preview";

const MAP_OVERLAY_BUTTONS: readonly {
  of: MapOverlay;
  label: string;
  enabled: (cavern: Cavern | undefined) => boolean;
}[] = [
  { of: "overview", label: "Overview", enabled: () => true },
  { of: "tiles", label: "Tiles", enabled: (c) => !!c?.tiles },
  { of: "crystals", label: "Crystals", enabled: (c) => !!c?.crystals },
  { of: "ore", label: "Ore", enabled: (c) => !!c?.ore },
  { of: "entities", label: "Entities", enabled: (c) => !!c?.buildings },
  { of: "discovery", label: "Discovery", enabled: (c) => !!c?.discoveryZones },
  { of: "erosion", label: "Erosion", enabled: (c) => !!c?.erosion },
  { of: "height", label: "Height", enabled: (c) => !!c?.height },
  { of: "landslides", label: "Landslides", enabled: (c) => !!c?.landslides },
  { of: "oxygen", label: "Oxygen", enabled: (c) => c?.oxygen !== undefined },
  { of: "objectives", label: "Objectives", enabled: (c) => !!c?.objectives },
  { of: "lore", label: "Lore", enabled: (c) => !!c?.lore },
  { of: "script", label: "Script", enabled: (c) => !!c?.script },
  { of: "about", label: "About", enabled: () => true },
];

export default function VizOptsPanel({
  cavern,
  mapOverlay,
  setMapOverlay,
  showOutlines,
  setShowOutlines,
  showPearls,
  setShowPearls,
}: {
  cavern: Cavern;
  mapOverlay: MapOverlay;
  setMapOverlay: React.Dispatch<React.SetStateAction<MapOverlay>>;
  showOutlines: boolean;
  setShowOutlines: React.Dispatch<React.SetStateAction<boolean>>;
  showPearls: boolean;
  setShowPearls: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.vizOptsPanel}>
      <h1>Show</h1>
      <button
        className={showOutlines ? styles.active : styles.inactive}
        onClick={() => setShowOutlines((v) => !v)}
      >
        Outlines
      </button>
      <button
        className={showPearls ? styles.active : styles.inactive}
        onClick={() => setShowPearls((v) => !v)}
      >
        Pearls
      </button>
      {MAP_OVERLAY_BUTTONS.map(({ of, label, enabled }) => (
        <button
          key={of}
          className={
            mapOverlay === of
              ? styles.active
              : enabled(cavern)
                ? styles.inactive
                : styles.disabled
          }
          onClick={() => setMapOverlay((v) => (v === of ? "overview" : of))}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
