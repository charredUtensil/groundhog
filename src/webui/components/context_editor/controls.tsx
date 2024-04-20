import React, { CSSProperties, useEffect, useReducer, useState } from "react";
import styles from "./style.module.scss"
import { CavernContext, Curve } from "../../../core/common";

export type UpdateData = {
  update: React.Dispatch<Partial<CavernContext>>,
  context: Partial<CavernContext>,
  contextWithDefaults: CavernContext | undefined,
}
type KeysMatching<T, V> = {[K in keyof T]-?: T[K] extends V ? K : never}[keyof T];

export const Choice = <K extends keyof CavernContext>(
  {of, choices, update, context, contextWithDefaults}:
  {
    of: K,
    choices: CavernContext[K][],
  } & UpdateData
) => (
  <>
    <p>{of}</p>
    <div className={styles.inputRow}>
      {choices.map((choice) => {
        const classes = [styles.choice];
        const selected = context[of] === choice;
        if (selected) {
          classes.push(styles.override);
        }
        const active = contextWithDefaults?.[of] === choice;
        classes.push(active ? styles.active : styles.inactive);

        return (
          <button
            key={`${choice}`}
            className={classes.join(" ")}
            onClick={() => {
              update({[of]: selected ? undefined : choice});
            }}
          >
            {`${choice}`}
          </button>
        );
      })}
    </div>
  </>
)

export const CurveSliders = (
  {of, min, max, step, update, context, contextWithDefaults}:
  {
    of: KeysMatching<CavernContext, Curve>,
    min: number,
    max: number,
    step: number
  } & UpdateData
) => {
  function updateCurve(
    key: 'base' | 'hops' | 'order',
    value: number,
  ) {
    update({[of]: {...contextWithDefaults?.[of], ...context?.[of], [key]: value}})
  }

  return (
    <>
      <p>
        {of}:
      </p>
      <p>
        {contextWithDefaults?.[of]?.base?.toFixed(2)},{' '}
        {contextWithDefaults?.[of]?.hops?.toFixed(2)},{' '}
        {contextWithDefaults?.[of]?.order?.toFixed(2)}
      </p>
      <div className={styles.inputRow}>
        <div className={styles.curve}>
          {(['base', 'hops', 'order'] as const).map(key => {
            const value = contextWithDefaults?.[of]?.[key] ?? min;
            return (
              <input
                key={key}
                className={styles.slider}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                style={{'--completion': `${100 * (value - min) / (max - min)}%`} as CSSProperties}
                onChange={(ev) => updateCurve(key, ev.target.valueAsNumber)} />
            );
          })}
        </div>
        <button
          className={`${styles.icon} ${of in context ? styles.override : styles.inactive}`}
          onClick={() => update({[of]: undefined})}>cancel</button>
      </div>
    </>
  );
}

export const Slider = (
  {of, min, max, percent, step, update, context, contextWithDefaults}:
  {
    of: KeysMatching<CavernContext, number>,
    min: number,
    max: number,
    percent?: boolean,
    step?: number
  } & UpdateData
) => {
  const value = context[of] ?? contextWithDefaults?.[of] ?? min;
  return (
    <>
      <p>
        {of}:{' '}
        {percent ? `${(value * 100).toFixed()}%` : value}
      </p>
      <div className={styles.inputRow}>
        <input
          className={styles.slider}
          type="range"
          min={min}
          max={max}
          step={step || (percent ? 0.01 : 1)}
          value={value}
          style={{ '--completion': `${100 * (value - min) / (max - min)}%` } as CSSProperties}
          onChange={(ev) => update({ [of]: ev.target.valueAsNumber })} />
        <button
          className={`${styles.icon} ${context[of] === undefined ? styles.inactive : styles.override}`}
          onClick={() => update({ [of]: undefined })}>cancel</button>
      </div>
    </>
  );
}