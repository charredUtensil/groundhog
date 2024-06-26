import React from "react";
import { Grid } from "../../../core/common/grid";
import styles from "./style.module.scss";
import {
  HEIGHT_MAX,
  HEIGHT_MIN,
} from "../../../core/transformers/03_plastic/03_strataflux";

const SCALE = 6;

function toColor(h: number) {
  const v = (h - HEIGHT_MIN) / (HEIGHT_MAX - HEIGHT_MIN);
  const lum = v * 100;
  const hue = 50 + 200 * (1 - v);
  return `hsl(${hue.toFixed()} 50% ${lum.toFixed()}%)`;
}

export default function HeightPreview({ height }: { height: Grid<number> }) {
  return (
    <g className={styles.height}>
      {height.map((h, x, y) => {
        return (
          <circle
            key={`${x},${y}`}
            fill={toColor(h)}
            cx={x * SCALE}
            cy={y * SCALE}
            r={3}
          />
        );
      })}
    </g>
  );
}
