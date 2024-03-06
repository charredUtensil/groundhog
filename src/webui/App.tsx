import React, { useState } from "react";

import "./App.css";
import {
  CavernContext,
  PseudorandomStream,
  inferContextDefaults,
} from "../core/common";
import { CavernContextInput } from "./components/context_input";
import { CavernGenerator } from "../core/transformers/generator";
import { Cavern } from "../core/models/cavern";
import { Logger } from "../core/common/logger";
import CavernPreview from "./components/preview/cavern";

function App() {
  const [generator, setGenerator] = useState<CavernGenerator | undefined>();
  const [cavern, setCavern] = useState<Cavern>();
  const logger: Logger = {
    info: setCavern,
  };

  const [cavernContext, setCavernContext] = useState<Partial<CavernContext>>({
    logger,
  });

  const doGenerate = () => {
    const context = inferContextDefaults(cavernContext);
    setCavern({ context });
    setGenerator(new CavernGenerator(context));
  };

  return (
    <div className="App">
      {!generator && (
        <>
          <CavernContextInput get={cavernContext} set={setCavernContext} />
          <button onClick={doGenerate}>Generate</button>
        </>
      )}
      {cavern && generator && (
        <>
          <CavernPreview cavern={cavern} />
          <button onClick={() => generator.step()}>Step</button>
        </>
      )}
    </div>
  );
}

export default App;
