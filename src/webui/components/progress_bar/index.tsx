import React, { CSSProperties } from "react";
import styles from "./style.module.scss";

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
  return (
    <div
      className={`${styles.progressBar} ${completed ? styles.completed : ""}`}
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
