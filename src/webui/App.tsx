import React, { useCallback, useEffect, useReducer, useState } from "react";

import { CavernContext, DiceBox } from "../core/common";
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

type State = {
  cavern?: Cavern;
  next?: () => TransformResult<Cavern>;
  error?: Error;
};

function App() {
  const [state, dispatchState] = useReducer(
    (was: State, action: State | { context: CavernContext }) => {
      if ("context" in action) {
        const cavern: Cavern = {
          context: action.context,
          dice: new DiceBox(action.context.seed),
        };
        const next = () => CAVERN_TF.first(cavern);
        return { cavern, next };
      } else if ("error" in action) {
        return { cavern: was.cavern, ...action };
      }
      return action;
    },
    {},
  );

  const [autoGenerate, setAutoGenerate] = useState(true);
  const [mapOverlay, setMapOverlay] = useState<MapOverlay>("tiles");
  const [showOutlines, setShowOutlines] = useState(false);
  const [showPearls, setShowPearls] = useState(false);

  const biome = state?.cavern?.context.biome;

  function playPause() {
    if (autoGenerate) {
      setAutoGenerate(false);
    } else {
      setAutoGenerate(true);
    }
  }

  const step = useCallback(() => {
    try {
      const r = state.next!();
      dispatchState({
        cavern: r.result,
        next: r.next || undefined,
      });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        dispatchState({ error });
      }
    }
  }, [state])

  useEffect(() => {
    if (state.next && autoGenerate) {
      step();
    }
  }, [autoGenerate, state, step]);

  return (
    <div
      className={`${styles.App} ${styles[`${biome}Biome`]}`}
      style={TILE_STYLE_VARS}
    >
      <div className={styles.settingsPanel}>
        <CavernContextInput dispatchState={dispatchState} />
      </div>
      <div className={styles.mainPanel}>
        {state.cavern && (
          <CavernPreview
            cavern={state.cavern}
            error={state.error}
            mapOverlay={mapOverlay}
            showOutlines={showOutlines}
            showPearls={showPearls}
          />
        )}
        <div className={styles.controls}>
          {state.next && !autoGenerate && <button onClick={step}>step</button>}
          <button onClick={playPause}>
            {autoGenerate ? "pause" : "play_arrow"}
          </button>
          {state.cavern?.serialized ? (
            <a
              className={styles.button}
              href={getDownloadLink(state.cavern.serialized)}
              download={`${state.cavern.levelName ?? "groundhog"}.dat`}
            >
              download
            </a>
          ) : (
            <div className={`${styles.button} ${styles.disabled}`}>
              download
            </div>
          )}
        </div>
        {mapOverlay === "lore" && <LorePreview cavern={state.cavern} />}
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
            key={of}
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
