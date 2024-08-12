import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { CavernContext, DiceBox } from "../core/common";
import { CavernContextInput } from "./components/context_editor";
import { Cavern } from "../core/models/cavern";
import CavernPreview, { MapOverlay } from "./components/map_preview";
import { CAVERN_TF } from "../core/transformers";
import { TransformResult } from "../core/common/transform";
import LorePreview from "./components/popovers/lore";
import About from "./components/popovers/about";
import styles from "./App.module.scss";
import ErrorPreview from "./components/popovers/error";
import { filterTruthy } from "../core/common/utils";

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
  { of: "lore", label: "Lore", enabled: (c) => !!c?.lore },
  { of: "script", label: "Script", enabled: (c) => !!c?.script },
  { of: "about", label: "About", enabled: (c) => true },
];

function getDownloadLink(serializedData: string) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(serializedData)}`;
}

type State = {
  cavern?: Cavern;
  name?: string;
  progress?: number;
  next?: () => TransformResult<Cavern>;
  error?: Error;
};

function App() {
  const [state, dispatchState] = useReducer(
    (was: State, action: State | { context: CavernContext }) => {
      if ("context" in action) {
        const cavern = {
          context: action.context,
          dice: new DiceBox(action.context.seed),
        };
        const r = CAVERN_TF.first(cavern);
        return {
          cavern: r.result,
          name: r.name,
          next: r.next || undefined,
        } as State;
      } else if ("error" in action) {
        return { cavern: was.cavern, ...action };
      }
      return action;
    },
    {},
  );

  const [autoGenerate, setAutoGenerate] = useState(true);
  const [mapOverlay, setMapOverlay] = useState<MapOverlay>("overview");
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
        name: r.name,
        progress: r.progress,
        next: r.next || undefined,
      });
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        dispatchState({ error });
      }
    }
  }, [state]);

  const reset = useCallback(() => {
    setAutoGenerate(false);
    if (state.cavern) {
      dispatchState({ context: state.cavern.context });
    }
  }, [state]);

  useEffect(() => {
    if (state.next && autoGenerate) {
      step();
    }
  }, [autoGenerate, state, step]);

  useEffect(() => {
    (window as any).cavern = state.cavern;
  }, [state]);

  const isLoading =
    (autoGenerate && !state.cavern?.serialized) || mapOverlay === "about";

  return (
    <div className={`${styles.App} ${styles[`${biome}Biome`]}`}>
      <div className={styles.settingsPanel}>
        <CavernContextInput dispatchState={dispatchState} />
      </div>
      <div className={styles.mainPanel}>
        <div
          className={filterTruthy([
            styles.grid,
            isLoading && styles.loading,
            state.error && styles.hasError,
          ]).join(" ")}
        />
        {state.cavern && !state.error && (
          <CavernPreview
            cavern={state.cavern}
            mapOverlay={mapOverlay}
            showOutlines={showOutlines}
            showPearls={showPearls}
          />
        )}
        {autoGenerate && state.progress !== undefined && (
          <div
            className={`${styles.progressBar} ${state.progress < 1 ? "" : styles.complete}`}
            style={
              {
                "--progress": `${(state.progress * 100).toFixed()}%`,
              } as CSSProperties
            }
          />
        )}
        {mapOverlay === "about" && <About />}
        {mapOverlay === "lore" && <LorePreview {...state.cavern} />}
        {state.error && <ErrorPreview error={state.error} context={state.cavern?.context}  />}
        {!autoGenerate && state.name && (
          <div className={styles.stepName}>{state.name}</div>
        )}
        <div className={styles.controls}>
          {state.next ? (
            <>
              {!autoGenerate && <button onClick={step}>step</button>}
              <button onClick={playPause}>
                {autoGenerate ? "pause" : "play_arrow"}
              </button>
            </>
          ) : (
            <button onClick={reset}>restart_alt</button>
          )}
          {state.cavern?.serialized ? (
            <a
              className={styles.button}
              href={getDownloadLink(state.cavern.serialized)}
              download={`${state.cavern.fileName ?? state.cavern.levelName ?? "groundhog"}.dat`}
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
                : enabled(state.cavern)
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
