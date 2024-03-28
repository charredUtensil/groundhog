import React, { useEffect, useState } from "react";

import "./App.scss";
import { CavernContext, DiceBox } from "../core/common";
import { CavernContextInput } from "./components/context_editor/context";
import { Cavern } from "../core/models/cavern";
import CavernPreview from "./components/map_preview";
import { CAVERN_TF } from "../core/transformers";
import { TransformResult } from "../core/common/transform";
import LorePreview from "./components/lore_preview";

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
  const [autoGenerate, setAutoGenerate] = useState(false);

  const [showCrystals, setShowCrystals] = useState(true);
  const [showLore, setShowLore] = useState(false);
  const [showOre, setShowOre] = useState(true);

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
        <div>
          <h1>Settings</h1>
          <CavernContextInput onChanged={setInitialContext} />
        </div>
        <div className="controls">
          <button onClick={playPause}>
            {autoGenerate ? "pause" : "play_arrow"}
          </button>
          {next && !autoGenerate && <button onClick={step}>step</button>}
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
      </div>
      <div className="mainPanel">
        {cavern && (
          <CavernPreview
            cavern={cavern}
            error={cavernError}
            showCrystals={showCrystals}
            showOre={showOre}
          />
        )}
        {showLore && <LorePreview cavern={cavern} />}
      </div>
      <div className="vizOptsPanel">
        <h1>Show</h1>
        <button
          className={`crystals ${showCrystals ? "active" : "inactive"}`}
          onClick={() => setShowCrystals((v) => !v)}
        >
          Crystals
        </button>
        <button
          className={`ore ${showOre ? "active" : "inactive"}`}
          onClick={() => setShowOre((v) => !v)}
        >
          Ore
        </button>
        <button
          className={`lore ${showLore ? "active" : "inactive"}`}
          onClick={() => setShowLore((v) => !v)}
        >
          Lore
        </button>
      </div>
    </div>
  );
}

export default App;
