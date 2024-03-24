import React, { useEffect, useState } from "react";

import "./App.scss";
import { CavernContext, DiceBox } from "../core/common";
import { CavernContextInput } from "./components/context_editor/context";
import { Cavern } from "../core/models/cavern";
import CavernPreview from "./components/map_preview/cavern";
import { CAVERN_TF } from "../core/transformers";
import { TransformResult } from "../core/common/transform";
import LorePreview from "./components/lore_preview";

function App() {
  const [initialContext, setInitialContext] = useState<CavernContext | null>(null);
  const [cavern, setCavern] = useState<Cavern | null>(null);
  const [next, setNext] = useState<(() => TransformResult<Cavern>) | null>(null)
  const [cavernError, setCavernError] = useState<Error | null>(null)
  const [autoGenerate, setAutoGenerate] = useState(false)

  const [showLore, setShowLore] = useState(false)

  useEffect(() => {
    setCavern(null)
    setCavernError(null)
    setNext(() => initialContext ? init : null)
  }, [initialContext])

  useEffect(() => {
    if (next && autoGenerate) {
      setTimeout(step, 1)
    }
  }, [next, autoGenerate])

  function generate() {
    setAutoGenerate(true)
    step()
  }

  function init() {
    const dice = new DiceBox(initialContext!.seed)
    const cavern = {dice, context: {...initialContext!, logger: {info: (() => {})}}}
    return CAVERN_TF.first(cavern)
  }

  function step() {
    try {
      const r = next!()
      setCavern(r.result)
      setNext(() => r.next)
    } catch (e: unknown) {
      console.error(e)
      if (e instanceof Error) {
        setNext(null)
        setCavernError(e)
      }
    }
  };

  return (
    <div className="App">
      <div className="settingsPanel">
        <CavernContextInput onChanged={setInitialContext} />
        <div className="controls">
          {next && <button onClick={step}>Step</button>}
          {next && <button onClick={generate}>Generate</button>}
        </div>
      </div>
      <div className="mainPanel">
        {cavern && <CavernPreview cavern={cavern} error={cavernError} />}
        {showLore && <LorePreview cavern={cavern} />}
      </div>
      <div className="vizOptsPanel">
        <button onClick={() => setShowLore(v => !v)}>Lore</button>
      </div>
    </div>
  );
}

export default App;
