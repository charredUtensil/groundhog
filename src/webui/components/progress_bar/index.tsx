import React, { CSSProperties } from "react";
import styles from "./style.module.scss";
import { filterTruthy } from "../../../core/common/utils";

export default function ProgressBar({
  autoGenerate,
  completedSteps,
  totalSteps,
  lastStepName,
  nextStepName,
}: {
  autoGenerate: boolean;
  completedSteps: number;
  totalSteps: number;
  lastStepName: string;
  nextStepName: string;
}) {
  const progress = `${((completedSteps / totalSteps) * 100).toFixed()}%`;
  const completed = completedSteps >= totalSteps;
  const text = (() => {
    if (completed) {
      return "100% \u2022 Done!";
    }
    if (autoGenerate) {
      return `${progress.padStart(4)} \u2022 ${nextStepName}...`;
    }
    return `Finished ${lastStepName} \u2022 Next: ${nextStepName}`;
  })();
  const className = filterTruthy([
    styles.progressBar,
    completedSteps == 0 && styles.initial,
    completed && styles.completed,
  ]).join(" ");
  return (
    <div
      className={className}
      style={
        {
          "--progress": progress,
        } as CSSProperties
      }
    >
      <div className={styles.empty}>{text}</div>
      <div className={styles.filled}>{text}</div>
    </div>
  );
}
