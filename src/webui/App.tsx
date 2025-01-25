import React, { CSSProperties, useCallback, useEffect, useState } from "react";

import {
  CavernContextInput,
  getInitialSeed,
} from "./components/context_editor";
import { Cavern } from "../core/models/cavern";
import CavernPreview, { MapOverlay } from "./components/map_preview";
import { CAVERN_TF } from "../core/transformers";
import LorePreview from "./components/popovers/lore";
import About from "./components/popovers/about";
import styles from "./App.module.scss";
import ErrorPreview from "./components/popovers/error";
import { filterTruthy } from "../core/common/utils";
import { PartialCavernContext } from "../core/common/context";
import { TfResult } from "../core/common/transform";
import ProgressBar from "./components/progress_bar";

const MAP_OVERLAY_BUTTONS: readonly {
  of: MapOverlay;
  label: String;
  enabled: (cavern: Cavern | undefined) => boolean;
}[] = [
  { of: "overview", label: "Overview", enabled: (c) => true },
  { of: "tiles", label: "Tiles", enabled: (c) => !!c?.tiles },
  { of: "crystals", label: "Crystals", enabled: (c) => !!c?.crystals },
  { of: "ore", label: "Ore", enabled: (c) => !!c?.ore },
  { of: "entities", label: "Entities", enabled: (c) => !!c?.buildings },
  { of: "discovery", label: "Discovery", enabled: (c) => !!c?.discoveryZones },
  { of: "height", label: "Height", enabled: (c) => !!c?.height },
  { of: "landslides", label: "Landslides", enabled: (c) => !!c?.landslides },
  { of: "erosion", label: "Erosion", enabled: (c) => !!c?.erosion },
  { of: "oxygen", label: "Oxygen", enabled: (c) => c?.oxygen !== undefined },
  { of: "objectives", label: "Objectives", enabled: (c) => !!c?.objectives },
  { of: "lore", label: "Lore", enabled: (c) => !!c?.lore },
  { of: "script", label: "Script", enabled: (c) => !!c?.script },
  { of: "about", label: "About", enabled: (c) => true },
];

function getDownloadLink(serializedData: string) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(serializedData)}`;
}

function getStateForInitialContext(initialContext: PartialCavernContext) {
  return CAVERN_TF.start({ initialContext });
}

type State = TfResult<Cavern, Cavern> & {
  error?: Error;
};

function App() {
  const [state, setState] = useState<State>(() =>
    getStateForInitialContext({
      seed: getInitialSeed(),
    }),
  );

  const setInitialContext = useCallback(
    (arg: React.SetStateAction<PartialCavernContext>) => {
      setState((was) =>
        getStateForInitialContext(
          typeof arg === "function" ? arg(was.result.initialContext) : arg,
        ),
      );
    },
    [],
  );

  const [autoGenerate, setAutoGenerate] = useState(true);
  const [mapOverlay, setMapOverlay] = useState<MapOverlay>("overview");
  const [showOutlines, setShowOutlines] = useState(false);
  const [showPearls, setShowPearls] = useState(false);

  const biome = state.result.context?.biome;

  const step = useCallback(() => {
    try {
      setState(state.next!());
    } catch (e: unknown) {
      console.error(e);
      const error = e instanceof Error ? e : new Error("unknown error");
      setState({ ...state, next: null, error });
    }
  }, [state]);

  const reset = () => {
    setAutoGenerate(false);
    setState((was) => getStateForInitialContext(was.result.initialContext));
  };

  useEffect(() => {
    if (state.next && autoGenerate) {
      step();
    }
  }, [autoGenerate, state, step]);

  useEffect(() => {
    (window as any).cavern = state.result;
  }, [state]);

  const isLoading =
    (autoGenerate && !state.result.serialized) || mapOverlay === "about";

  return (
    <div className={`${styles.App} ${styles[`${biome}Biome`]}`}>
      <div className={styles.settingsPanel}>
        <CavernContextInput
          initialContext={state.result.initialContext}
          cavern={state.result}
          setInitialContext={setInitialContext}
        />
      </div>
      <div className={styles.mainPanel}>
        <div
          className={filterTruthy([
            styles.grid,
            isLoading && styles.loading,
            state.error && styles.hasError,
          ]).join(" ")}
        />
        {state.result && (
          <CavernPreview
            cavern={state.result}
            mapOverlay={mapOverlay}
            showOutlines={showOutlines}
            showPearls={showPearls}
          />
        )}
        {mapOverlay === "about" && <About />}
        {mapOverlay === "lore" && <LorePreview {...state.result} />}
        {state.error && (
          <ErrorPreview
            error={state.error}
            initialContext={state.result.initialContext}
            context={state.result?.context}
          />
        )}
        <ProgressBar autoGenerate={autoGenerate} {...state} />
        <div className={styles.controls}>
          {state.next ? (
            <>
              {!autoGenerate && <button onClick={step}>step</button>}
              <button onClick={() => setAutoGenerate(v => !v)}>
                {autoGenerate ? "pause" : "play_arrow"}
              </button>
            </>
          ) : (
            <button onClick={reset}>restart_alt</button>
          )}
          {state.result.serialized ? (
            <a
              className={styles.button}
              href={getDownloadLink(state.result.serialized)}
              download={`${state.result.fileName ?? state.result.levelName ?? "groundhog"}.dat`}
            >
              download
            </a>
          ) : (
            <div className={`${styles.button} ${styles.disabled}`}>
              download
            </div>
          )}
        </div>
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
        {MAP_OVERLAY_BUTTONS.map(({ of, label, enabled }) => (
          <button
            key={of}
            className={
              mapOverlay === of
                ? styles.active
                : enabled(state.result)
                  ? styles.inactive
                  : styles.disabled
            }
            onClick={() => setMapOverlay((v) => (v === of ? "overview" : of))}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
