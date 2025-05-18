import React, { useCallback, useEffect, useMemo, useState } from "react";

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
import GenerateControls from "./components/gen_controls";

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
  { of: "erosion", label: "Erosion", enabled: (c) => !!c?.erosion },
  { of: "height", label: "Height", enabled: (c) => !!c?.height },
  { of: "landslides", label: "Landslides", enabled: (c) => !!c?.landslides },
  { of: "oxygen", label: "Oxygen", enabled: (c) => c?.oxygen !== undefined },
  { of: "objectives", label: "Objectives", enabled: (c) => !!c?.objectives },
  { of: "lore", label: "Lore", enabled: (c) => !!c?.lore },
  { of: "script", label: "Script", enabled: (c) => !!c?.script },
  { of: "about", label: "About", enabled: (c) => true },
];

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

  const step = useMemo(() => {
    const next = state.next;
    if (!next) {
      return null;
    }
    return () => {
      try {
        setState(next());
      } catch (e: unknown) {
        console.error(e);
        const error = e instanceof Error ? e : new Error("unknown error");
        setState(was => ({ ...was, next: null, error }));
      }
    }
  }, [state.next]);

  const reset = useCallback(() => {
    setAutoGenerate(false);
    setState((was) => getStateForInitialContext(was.result.initialContext));
  }, []);

  useEffect(() => {
    if (step && autoGenerate) {
      step();
    }
  }, [autoGenerate, step]);

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
        <GenerateControls cavern={state.result} {...{autoGenerate, setAutoGenerate, step, reset}} />
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
