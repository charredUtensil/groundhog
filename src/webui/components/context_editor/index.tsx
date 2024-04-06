import React, { useEffect, useState } from "react";
import {
  Biome,
  CavernContext,
  DiceBox,
  inferContextDefaults,
} from "../../../core/common";
import { MAX_PLUS_ONE } from "../../../core/common/prng";
import styles from "./style.module.scss";

const INITIAL_SEED = Date.now() % MAX_PLUS_ONE;

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
      delete r[key];
    } else {
      r[key] = value;
    }
    setContext(r);
  }

  useEffect(() => {
    setContextWithDefaults(
      inferContextDefaults(new DiceBox(context.seed ?? INITIAL_SEED), context),
    );
  }, [context]);

  useEffect(() => {
    contextWithDefaults && onChanged(contextWithDefaults);
  }, [contextWithDefaults]);

  return (
    <div className={styles.contextInput}>
      <input
        type="text"
        className={styles.seed}
        value={(context?.seed ?? INITIAL_SEED).toString(16).toUpperCase()}
        onChange={(ev) => {
          const seed = parseInt(ev.target.value, 16);
          if (seed >= 0 && seed < MAX_PLUS_ONE) {
            update("seed", seed);
          }
        }}
        spellCheck={false}
      />
      <button
        className={styles.showAdvanced}
        onClick={() => setShowAdvanced((v) => !v)}
      >
        Advanced
      </button>
      {showAdvanced && (
        <>
          <div className={styles.inputRow}>
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
