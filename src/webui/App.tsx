import React, { useEffect, useState } from "react";

import "./App.scss";
import { CavernContext, DiceBox } from "../core/common";
import { CavernContextInput } from "./components/context_editor";
import { Cavern } from "../core/models/cavern";
import CavernPreview, { MapOverlay } from "./components/map_preview";
import { CAVERN_TF } from "../core/transformers";
import { TransformResult } from "../core/common/transform";
import LorePreview from "./components/lore_preview";
import About from "./components/about";

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
    setCavern(null);
    setCavernError(null);
    setNext(() => (initialContext ? init : null));
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

  function init() {
    const dice = new DiceBox(initialContext!.seed);
    const cavern = {
      dice,
      context: { ...initialContext!, logger: { info: () => {} } },
    };
    return CAVERN_TF.first(cavern);
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
    <div className="App">
      <div className="settingsPanel">
        <h1>Settings</h1>
        <CavernContextInput onChanged={setInitialContext} />
      </div>
      <div className="mainPanel">
        {cavern && (
          <CavernPreview
            cavern={cavern}
            error={cavernError}
            mapOverlay={mapOverlay}
            showOutlines={showOutlines}
            showPearls={showPearls}
          />
        )}
        <div className="controls">
          {next && !autoGenerate && <button onClick={step}>step</button>}
          <button onClick={playPause}>
            {autoGenerate ? "pause" : "play_arrow"}
          </button>
          {cavern?.serialized && (
            <a
              className="button download"
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
      <div className="vizOptsPanel">
        <h1>Show</h1>
        <button
          className={`outlines ${showOutlines ? "active" : "inactive"}`}
          onClick={() => setShowOutlines((v) => !v)}
        >
          Outlines
        </button>
        <button
          className={`pearls ${showPearls ? "active" : "inactive"}`}
          onClick={() => setShowPearls((v) => !v)}
        >
          Pearls
        </button>
        {MAP_OVERLAY_BUTTONS.map(({ of, label }) => (
          <button
            className={`tiles ${mapOverlay === of ? "active" : "inactive"}`}
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
