import React, { useEffect, useState } from "react";
import styles from "./style.module.scss"
import { CavernContext, Curve } from "../../../core/common";

export type UpdateData = {
  update: <K extends keyof CavernContext>(
    key: K,
    value: CavernContext[K] | undefined,
  ) => void,
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
              update(of, selected ? undefined : choice);
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
  const [base, setBase]   = useState<number>()
  const [hops, setHops]   = useState<number>()
  const [order, setOrder] = useState<number>()
  
  useEffect(() => {
    if (base === undefined && hops === undefined && order === undefined) {
      update(of, undefined)
    } else {
      update(of, {
        base: base ?? (context[of] ?? contextWithDefaults?.[of])?.base!,
        hops: hops ?? (context[of] ?? contextWithDefaults?.[of])?.hops!,
        order: order ?? (context[of] ?? contextWithDefaults?.[of])?.order!,
      })
    }
  }, [base, hops, order])

  return (
    <>
      <p>
        {of}:
      </p>
      <p>
        {(base ?? (context[of] ?? contextWithDefaults?.[of])?.base)?.toFixed(2)},{' '}
        {(hops ?? (context[of] ?? contextWithDefaults?.[of])?.hops)?.toFixed(2)},{' '}
        {(order ?? (context[of] ?? contextWithDefaults?.[of])?.order)?.toFixed(2)}
      </p>
      <div className={styles.inputRow}>
        <div className={styles.curve}>
          <input
            className={styles.slider}
            type="range"
            min={min}
            max={max}
            step={step}
            value={base ?? (context[of] ?? contextWithDefaults?.[of])?.base}
            onChange={(ev) => setBase(ev.target.valueAsNumber)}
          />
          <input
            className={styles.slider}
            type="range"
            min={min}
            max={max}
            step={step}
            value={hops ?? (context[of] ?? contextWithDefaults?.[of])?.hops}
            onChange={(ev) => setHops(ev.target.valueAsNumber)}
          />
          <input
            className={styles.slider}
            type="range"
            min={min}
            max={max}
            step={step}
            value={order ?? (context[of] ?? contextWithDefaults?.[of])?.order}
            onChange={(ev) => setOrder(ev.target.valueAsNumber)}
          />
        </div>
        <button
          className={`${styles.icon} ${context[of] === undefined ? styles.inactive : styles.override}`}
          onClick={() => {
            setBase(undefined)
            setHops(undefined)
            setOrder(undefined)
          }}>cancel</button>
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
) => (
  <>
    <p>
      {of}:{' '}
      {
        percent
        ? `${((context[of] ?? contextWithDefaults?.[of] ?? 0) * 100).toFixed()}%`
        : (context[of] ?? contextWithDefaults?.[of])
      }
    </p>
    <div className={styles.inputRow}>
      <input
        className={styles.slider}
        type="range"
        min={min}
        max={max}
        step={step || (percent ? 0.01 : 1)}
        value={context[of] ?? contextWithDefaults?.[of]}
        onChange={(ev) => update(of, ev.target.valueAsNumber)}
      />
      <button 
        className={`${styles.icon} ${
          context[of] === undefined ? styles.inactive : styles.override
        }`}
        onClick={() => update(of, undefined)}>cancel</button>
    </div>
  </>
)