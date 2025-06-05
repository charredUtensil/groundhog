import React, { CSSProperties } from "react";
import styles from "./style.module.scss";
import { CavernContext, Curve } from "../../../core/common";
import { radsToDegrees } from "../../../core/common/geometry";
import { PartialCavernContext } from "../../../core/common/context";

export type UpdateData = {
  update: React.Dispatch<Partial<CavernContext>>;
  initialContext: PartialCavernContext;
  context: CavernContext;
};
type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export const Choice = <
  K extends KeysMatching<CavernContext, string | boolean>,
>({
  of,
  choices,
  update,
  initialContext,
  context,
}: {
  of: K;
  choices: CavernContext[K][];
} & UpdateData) => (
  <>
    <p>{of}</p>
    <div className={styles.inputRow}>
      {choices.map((choice) => {
        const classes = [styles.choice];
        const selected = initialContext[of] === choice;
        if (selected) {
          classes.push(styles.override);
        }
        const active = context?.[of] === choice;
        classes.push(active ? styles.active : styles.inactive);

        return (
          <button
            key={`${choice}`}
            className={classes.join(" ")}
            onClick={() => {
              update({ [of]: selected ? undefined : choice });
            }}
          >
            {`${choice}`}
          </button>
        );
      })}
    </div>
  </>
);

export const CurveSliders = ({
  of,
  min,
  max,
  step,
  update,
  initialContext,
  context,
}: {
  of: KeysMatching<CavernContext, Curve>;
  min: number;
  max: number;
  step: number;
} & UpdateData) => {
  function updateCurve(key: "base" | "hops" | "order", value: number) {
    update({
      [of]: { ...context[of], [key]: value },
    });
  }

  return (
    <>
      <p>{of}:</p>
      <p>
        {context[of].base.toFixed(2)}, {context[of].hops.toFixed(2)},{" "}
        {context[of].order.toFixed(2)}
      </p>
      <div className={styles.inputRow}>
        <div className={styles.curve}>
          {(["base", "hops", "order"] as const).map((key) => {
            const value = context[of][key];
            return (
              <input
                key={key}
                className={styles.slider}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                style={
                  {
                    "--completion": `${(100 * (value - min)) / (max - min)}%`,
                  } as CSSProperties
                }
                onChange={(ev) => updateCurve(key, ev.target.valueAsNumber)}
              />
            );
          })}
        </div>
        {of in initialContext ? (
          <button
            className={`${styles.icon} ${styles.override}`}
            onClick={() => update({ [of]: undefined })}
          >
            undo
          </button>
        ) : (
          <div className={`${styles.icon} ${styles.invisible}`} />
        )}
      </div>
    </>
  );
};

export const Slider = ({
  of,
  min,
  max,
  percent,
  angle,
  step,
  zeroLabel,
  update,
  initialContext,
  context,
}: {
  of: KeysMatching<CavernContext, number>;
  min: number;
  max: number;
  percent?: boolean;
  angle?: boolean;
  step?: number;
  zeroLabel?: string;
} & UpdateData) => {
  const value = context[of];
  const label = (() => {
    if (zeroLabel && value === 0) {
      return zeroLabel;
    }
    if (percent) {
      return <>{(value * 100).toFixed()}%</>;
    }
    if (angle) {
      return <>{radsToDegrees(value).toFixed()}&deg;</>;
    }
    return value;
  })();
  return (
    <>
      <p>
        {of}: {label}
      </p>
      <div className={styles.inputRow}>
        <input
          className={styles.slider}
          type="range"
          min={min}
          max={max}
          step={step || (percent ? 0.01 : angle ? Math.PI / 36 : 1)}
          value={value}
          style={
            {
              "--completion": `${(100 * (value - min)) / (max - min)}%`,
            } as CSSProperties
          }
          onChange={(ev) => update({ [of]: ev.target.valueAsNumber })}
        />
        {of in initialContext ? (
          <button
            className={`${styles.icon} ${styles.override}`}
            onClick={() => update({ [of]: undefined })}
          >
            undo
          </button>
        ) : (
          <div className={`${styles.icon} ${styles.invisible}`} />
        )}
      </div>
    </>
  );
};

export const ExponentialSlider = ({
  of,
  min,
  max,
  step,
  zeroLabel,
  update,
  initialContext,
  context,
}: {
  of: KeysMatching<CavernContext, number>;
  min: number;
  max: number;
  step?: number;
  zeroLabel?: string;
} & UpdateData) => {
  const value = Math.log2(context[of]);
  const label = (() => {
    if (zeroLabel && value === 0) {
      return zeroLabel;
    }
    if (value < 0) {
      return `1/${Math.pow(2, -value).toFixed()}`;
    }
    return context[of].toFixed();
  })();
  return (
    <>
      <p>
        {of}: {label}
      </p>
      <div className={styles.inputRow}>
        <input
          className={styles.slider}
          type="range"
          min={min}
          max={max}
          step={step || 1}
          value={value}
          style={
            {
              "--completion": `${(100 * (value - min)) / (max - min)}%`,
            } as CSSProperties
          }
          onChange={(ev) =>
            update({ [of]: Math.pow(2, ev.target.valueAsNumber) })
          }
        />
        {of in initialContext ? (
          <button
            className={`${styles.icon} ${styles.override}`}
            onClick={() => update({ [of]: undefined })}
          >
            undo
          </button>
        ) : (
          <div className={`${styles.icon} ${styles.invisible}`} />
        )}
      </div>
    </>
  );
};
