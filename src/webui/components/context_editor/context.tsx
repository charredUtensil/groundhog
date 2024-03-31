import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  Biome,
  CavernContext,
  DiceBox,
  inferContextDefaults,
} from "../../../core/common";
import { MAX_PLUS_ONE } from "../../../core/common/prng";
import "./style.scss"

export function CavernContextInput({
  onChanged,
}: {
  onChanged: (v: CavernContext) => void;
}) {
  const [context, setContext] = useState<Partial<CavernContext>>({});
  const [contextWithDefaults, setContextWithDefaults] =
    useState<CavernContext>();
  const [showAdvanced, setShowAdvanced] = useState(false);

  function update<K extends keyof CavernContext>(
    key: K,
    value: CavernContext[K] | undefined,
  ) {
    const r = { ...context };
    if (value === undefined) {
      delete r[key]
    } else {
      r[key] = value;
    }
    setContext(r);
  }

  useEffect(() => {
    setContextWithDefaults(
      inferContextDefaults(new DiceBox(context.seed ?? 0x19930202), context),
    );
  }, [context]);

  useEffect(() => {
    contextWithDefaults && onChanged(contextWithDefaults);
  }, [contextWithDefaults]);

  return (
    <div className="contextInput">
      <input
        type="text"
        value={context?.seed?.toString(16) || 0}
        onChange={(ev) => {
          const seed = parseInt(ev.target.value, 16);
          if (seed >= 0 && seed < MAX_PLUS_ONE) {
            update("seed", seed);
          }
        }}
      />
      <button className="showAdvanced" onClick={() => setShowAdvanced((v) => !v)}>Advanced</button>
      {showAdvanced && (
        <>
          <div className="inputRow">
            {(["rock", "ice", "lava"] as Biome[]).map((biome) => {
              const classes = ["biome"];
              const selected = context?.biome === biome;
              if (selected) {
                classes.push("selected");
              }
              const active = contextWithDefaults?.biome === biome;
              if (active) {
                classes.push("active");
              }

              return (
                <button
                  key={biome}
                  className={classes.join(" ")}
                  onClick={() => {
                    update("biome", selected ? undefined : biome);
                  }}
                >
                  {biome}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
