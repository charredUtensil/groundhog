import React from "react";
import { Cavern } from "../../../core/models/cavern";
import { Plan } from "../../../core/models/plan";
import styles from "./style.module.scss";

const SCALE = 6;

export default function ObjectivesPreview({ cavern }: { cavern: Cavern }) {
  return (
    <g className={styles.objectives}>
      {cavern.anchor &&
        (() => {
          const [x, y] = cavern.plans![cavern.anchor].path.baseplates[0].center;
          return (
            <circle
              r={10}
              cx={x * SCALE}
              cy={y * SCALE}
              className={styles.origin}
            />
          );
        })()}
      {cavern.plans?.map((plan: Partial<Plan<any>>) => {
        if (plan.architect?.objectives) {
          const [x, y] = plan.path!.baseplates[0].center;
          return (
            <g
              key={plan.id}
              transform={`translate(${x * SCALE} ${y * SCALE})`}
              className={styles.objective}
            >
              <path d={`M -10 -10 L 10 10 M -10 10 L 10 -10`} strokeWidth={5} />
            </g>
          );
        }
        return null;
      })}
    </g>
  );
}
