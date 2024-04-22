import React from "react";
import styles from "./style.module.scss";

const SCALE = 6;

export default function OpenCaveFlagPreview({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <path
      className={styles.openCaveFlag}
      d={`M0 0 L0 -9 L4 -7 L0 -5 Z`}
      transform={`translate(${(x + 0.5) * SCALE} ${(y + 0.5) * SCALE})`}
    />
  );
}
