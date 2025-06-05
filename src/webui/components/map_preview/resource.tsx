import React from "react";
import { Grid } from "../../../core/common/grid";
import styles from "./style.module.scss";
import { DiscoveryZone } from "../../../core/models/discovery_zone";

const SCALE = 6;

export default function ResourcePreview({
  ore,
  crystals,
  discoveryZones,
}: {
  ore?: Grid<number>;
  crystals?: Grid<number>;
  discoveryZones?: Grid<DiscoveryZone>;
}) {
  function dot(offset: number, n: number, x: number, y: number) {
    if (!discoveryZones?.get(x, y)?.openOnSpawn) {
      return null;
    }
    return Array.from({ length: n }, (_, i) => {
      return (
        <circle
          key={i}
          className={styles.ring}
          cx={(x + ((offset + 0.2 + (y + i * i) * 0.53) % 1)) * SCALE}
          cy={(y + ((offset + 0.7 + (x + i * i) * 0.35) % 1)) * SCALE}
          r={0.5}
        />
      );
    });
  }
  return (
    <g className={styles.resources}>
      {ore && (
        <g className={styles.ore}>{ore.map((...args) => dot(0.5, ...args))}</g>
      )}
      {crystals && (
        <g className={styles.crystals}>
          {crystals.map((...args) => dot(0, ...args))}
        </g>
      )}
    </g>
  );
}
