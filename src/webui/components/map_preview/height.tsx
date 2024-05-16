import React from "react";
import { Grid } from "../../../core/common/grid";
import styles from "./style.module.scss";

const SCALE = 6;

export default function HeightPreview({
  height
}: {
  height: Grid<number>;
}) {
  return (
    <g className={styles.height}>
      {height.map((v, x, y) => {
        const vs = v.toString(16).padStart(2, '0');
        return (
          <rect
            className={styles.point}
            fill={`#${vs}${vs}${vs}`}
            x={(x - 0.5) * SCALE}
            y={(y - 0.5) * SCALE}
            width={SCALE}
            height={SCALE}
          />
        );
      })}
    </g>
  );
}
