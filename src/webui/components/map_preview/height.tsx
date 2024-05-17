import React from "react";
import { Grid } from "../../../core/common/grid";
import styles from "./style.module.scss";

const SCALE = 6;

function toColor(h: number) {
  const lum = h;
  const hue = 50 + 200 * (1 - lum / 100);
  return `hsl(${hue.toFixed()} 50% ${lum.toFixed()}%)`
}

export default function HeightPreview({
  height
}: {
  height: Grid<number>;
}) {
  return (
    <g className={styles.height}>
      {height.map((h, x, y) => {
        return (
          // <rect
          //   className={styles.point}
          //   fill={toColor(h)}
          //   x={(x - 0.5) * SCALE}
          //   y={(y - 0.5) * SCALE}
          //   width={SCALE}
          //   height={SCALE}
          // />
          <circle
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
