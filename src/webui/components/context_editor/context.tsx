import React, { ReactElement, useEffect, useState } from "react";
import { CavernContext, DiceBox, inferContextDefaults } from "../../../core/common";
import { MAX_PLUS_ONE } from "../../../core/common/prng";

export function CavernContextInput({onChanged}: {
  onChanged: (v: CavernContext) => void;
}) {
  const [context, setContext] = useState<Partial<CavernContext>>({})

  function update<K extends keyof CavernContext>(key: K, value: CavernContext[K]) {
    const r = {...context}
    r[key] = value
    setContext(r)
  }

  useEffect(() => {
    const result = inferContextDefaults(new DiceBox(context.seed ?? 0x19930202), context)
    onChanged(result)
  }, [context])

  function Input({k}: {k: keyof CavernContext}): ReactElement {
    switch (k) {
      case "logger": 
      case "seed":
        return <></>
      case "biome":
      case "targetSize":
      case "baseplateMaxOblongness":
      case "baseplateMaxRatioOfSize":
      case "caveCount":
      case "auxiliaryPathCount":
      case "auxiliaryPathMinAngle":
      case "hasMonsters":
      case "caveBaroqueness":
      case "hallBaroqueness":
      case "caveCrystalRichness":
      case "hallCrystalRichness":
      case "caveOreRichness":
      case "hallOreRichness":
      case "caveHasRechargeSeamChance":
      case "hallHasRechargeSeamChance":
        return <></>
    }
  }

  return (
    <div>
      <input type="text" value={context?.seed?.toString(16) || 0}
    onChange={(ev) => {
      const seed = parseInt(ev.target.value, 16)
      if (seed >= 0 && seed < MAX_PLUS_ONE) {
        update('seed', seed)
      }
    }} />
      
    </div>
  );
}