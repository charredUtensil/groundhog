import React, { useState } from "react";

import "./App.css";
import { CavernContext, DiceBox, inferContextDefaults } from "../core/common";
import { CavernContextInput } from "./components/context_input";
import { CavernGenerator } from "../core/transformers/generator";
import { Cavern } from "../core/models/cavern";
import { Logger } from "../core/common/logger";
import CavernPreview from "./components/preview/cavern";
import LorePhraseGraph from "./components/phrase_graph";

function App() {
  const [generator, setGenerator] = useState<CavernGenerator | undefined>();
  const [cavern, setCavern] = useState<Cavern>();
  const [isDone, setIsDone] = useState(false);
  const logger: Logger = {
    info: setCavern,
  };

  const [cavernContext, setCavernContext] = useState<Partial<CavernContext>>({
    logger,
  });

  const startGenerating = () => {
    const dice = new DiceBox(0x19930202);
    const context = inferContextDefaults(dice, cavernContext);
    const cavern = { context, dice };
    setCavern(cavern);
    setGenerator(new CavernGenerator(cavern));
  };

  const stepGenerate = () => {
    generator?.step();
    setIsDone(generator?.isDone ?? false);
  };

  return (
    <div className="App">
      {!generator && (
        <>
          <LorePhraseGraph />
          <CavernContextInput get={cavernContext} set={setCavernContext} />
          <button onClick={startGenerating}>Generate</button>
        </>
      )}
      {cavern && generator && (
        <>
          <CavernPreview cavern={cavern} />
          {!isDone && <button onClick={stepGenerate}>Step</button>}
        </>
      )}
    </div>
  );
}

export default App;
