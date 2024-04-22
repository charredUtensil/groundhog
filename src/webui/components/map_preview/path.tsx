import React from "react";
import { Path } from "../../../core/models/path";
import styles from "./style.module.scss";

const SCALE = 6;

export default function PathPreview({ path }: { path: Path }) {
  const d = path.baseplates
    .map((bp, i) => {
      const [x, y] = bp.center;
      return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
    })
    .join(" ");
  return (
    <g
      key={`path${path.id}`}
      className={`${styles.path} ${styles[`${path.kind}Kind`]}`}
    >
      <path id={`path${path.id}`} d={d} fill="none" />
      <text>
        <textPath href={`#path${path.id}`} startOffset="25%">
          {path.id}
        </textPath>
      </text>
    </g>
  );
}
