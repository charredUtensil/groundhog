import React from "react";
import { Grid } from "../../../core/common/grid";
import styles from "./style.module.scss";
import {
  HEIGHT_MAX,
  HEIGHT_MIN,
} from "../../../core/transformers/03_plastic/04_strataflux/base";

const SCALE = 6;

function toColor(h: number) {
  const v = (h - HEIGHT_MIN) / (HEIGHT_MAX - HEIGHT_MIN);
  const lum = v * 100;
  const hue = 50 + 200 * (1 - v);
  return `hsl(${hue.toFixed()} 50% ${lum.toFixed()}%)`;
}

export default function HeightPreview({ height }: { height: Grid<number> }) {
  return (
    <g className={styles.height} style={{ scale: `${SCALE}` }}>
      {height.map((h, x, y) => {
        return (
          <rect
            key={`${x},${y}`}
            fill={toColor(h)}
            x={x - 0.5}
            y={y - 0.5}
            width={1}
            height={1}
          >
            <title>{h.toFixed()}</title>
          </rect>
        );
      })}
    </g>
  );
}
