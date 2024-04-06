import React from "react";
import { Grid } from "../../../core/common/grid";
import styles from "./style.module.scss"

const SCALE = 6;

export default function ResourcePreview({
  ore,
  crystals,
}: {
  ore?: Grid<number>;
  crystals?: Grid<number>;
}) {
  return (
    <>
      {ore && (
        <g className={styles.ore}>
          {ore.map((n, x, y) => (
            <circle
              className={styles.ring}
              cx={(x + 0.25) * SCALE}
              cy={(y + 0.25) * SCALE}
              r={(n * SCALE) / 4}
            />
          ))}
        </g>
      )}
      {crystals && (
        <g className={styles.crystals}>
          {crystals.map((n, x, y) => (
            <circle
              className={styles.ring}
              cx={(x + 0.75) * SCALE}
              cy={(y + 0.75) * SCALE}
              r={(n * SCALE) / 4}
            />
          ))}
        </g>
      )}
    </>
  );
}
