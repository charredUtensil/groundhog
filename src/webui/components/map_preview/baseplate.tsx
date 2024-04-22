import React from "react";
import { Baseplate } from "../../../core/models/baseplate";
import styles from "./style.module.scss";

const SCALE = 6;

export default function BaseplatePreview({
  baseplate,
}: {
  baseplate: Baseplate;
}) {
  return (
    <g
      key={`bp${baseplate.id}`}
      className={`${styles.baseplate} ${styles[`${baseplate.kind}Kind`]}`}
    >
      <rect
        className={styles.bg}
        x={baseplate.left * SCALE}
        y={baseplate.top * SCALE}
        width={baseplate.width * SCALE}
        height={baseplate.height * SCALE}
      />
      <text
        className={styles.fg}
        x={baseplate.left * SCALE}
        y={baseplate.top * SCALE + 8}
      >
        {baseplate.id}
      </text>
    </g>
  );
}
