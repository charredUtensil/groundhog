import React, { useState } from 'react';

import './App.css';
import { CavernContext, PseudorandomStream } from '../core/common';
import { CavernContextInput } from './components/context_input';

function App() {
  const [cavernContext, setCavernContext] = useState<Partial<CavernContext>>({})

  return (
    <div className="App">
      <CavernContextInput get={cavernContext} set={setCavernContext} />
      <button>
        Generate!
      </button>
    </div>
  );
}

export default App;
