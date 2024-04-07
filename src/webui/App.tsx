import React, { useEffect, useState } from "react";

import { Biome, CavernContext, DiceBox } from "../core/common";
import { CavernContextInput } from "./components/context_editor";
import { Cavern } from "../core/models/cavern";
import CavernPreview, { MapOverlay } from "./components/map_preview";
import { CAVERN_TF } from "../core/transformers";
import { TransformResult } from "../core/common/transform";
import LorePreview from "./components/lore_preview";
import About from "./components/about";
import styles from "./App.module.scss";
import { TILE_STYLE_VARS } from "../core/models/tiles";

const MAP_OVERLAY_BUTTONS: readonly { of: MapOverlay; label: String }[] = [
  { of: "tiles", label: "Tiles" },
  { of: "crystals", label: "Crystals" },
  { of: "ore", label: "Ore" },
  { of: "entities", label: "Entities" },
  { of: "landslides", label: "Landslides" },
  { of: "erosion", label: "Erosion" },
  { of: "discovery", label: "Discovery" },
  { of: "lore", label: "Lore" },
  { of: "about", label: "About" },
];

function getDownloadLink(serializedData: string) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(serializedData)}`;
}

function App() {
  const [initialContext, setInitialContext] = useState<CavernContext | null>(
    null,
  );
  const [biome, setBiome] = useState<Biome | null>(null);
  const [cavern, setCavern] = useState<Cavern | null>(null);
  const [next, setNext] = useState<(() => TransformResult<Cavern>) | null>(
    null,
  );
  const [cavernError, setCavernError] = useState<Error | null>(null);
  const [autoGenerate, setAutoGenerate] = useState(true);

  const [mapOverlay, setMapOverlay] = useState<MapOverlay>("tiles");

  const [showOutlines, setShowOutlines] = useState(false);
  const [showPearls, setShowPearls] = useState(false);

  useEffect(() => {
    setBiome(cavern?.context.biome || initialContext?.biome || null)
  }, [cavern, initialContext])

  useEffect(() => {
    setCavern(null);
    setCavernError(null);
    setNext(() => (initialContext ? () => {
      const dice = new DiceBox(initialContext!.seed);
      const cavern = {
        dice,
        context: { ...initialContext!, logger: { info: () => {} } },
      };
      return CAVERN_TF.first(cavern);
    } : null));
  }, [initialContext]);

  useEffect(() => {
    if (next && autoGenerate) {
      setTimeout(step, 1);
    }
  }, [next, autoGenerate]);

  useEffect(() => {
    if (cavern && !next) {
      console.log("Finished generating %o", cavern);
    }
  }, [cavern, next]);

  function playPause() {
    if (autoGenerate) {
      setAutoGenerate(false);
    } else {
      setAutoGenerate(true);
      if (next) {
        step();
      }
    }
  }

  function step() {
    try {
      const r = next!();
      setCavern(r.result);
      setNext(() => r.next);
    } catch (e: unknown) {
      console.error(e);
      if (e instanceof Error) {
        setNext(null);
        setCavernError(e);
      }
    }
  }

  return (
    <div 
      className={`${styles.App} ${styles[`${biome}Biome`]}`}
      style={TILE_STYLE_VARS}
    >
      <div className={styles.settingsPanel}>
        <CavernContextInput onChanged={setInitialContext} />
      </div>
      <div className={styles.mainPanel}>
        {cavern && (
          <CavernPreview
            cavern={cavern}
            error={cavernError}
            mapOverlay={mapOverlay}
            showOutlines={showOutlines}
            showPearls={showPearls}
          />
        )}
        <div className={styles.controls}>
          {next && !autoGenerate && <button onClick={step}>step</button>}
          <button onClick={playPause}>
            {autoGenerate ? "pause" : "play_arrow"}
          </button>
          {cavern?.serialized && (
            <a
              className={`${styles.button} ${styles.download}`}
              href={getDownloadLink(cavern.serialized)}
              download={`${cavern.levelName ?? "groundhog"}.dat`}
            >
              download
            </a>
          )}
        </div>
        {mapOverlay === "lore" && <LorePreview cavern={cavern} />}
        {mapOverlay === "about" && <About />}
      </div>
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
        {MAP_OVERLAY_BUTTONS.map(({ of, label }) => (
          <button
            className={mapOverlay === of ? styles.active : styles.inactive}
            onClick={() => setMapOverlay((v) => (v === of ? null : of))}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
