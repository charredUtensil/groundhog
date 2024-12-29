import React, { CSSProperties } from 'react';
import styles from './style.module.scss';

export default function ProgressBar({completedSteps, totalSteps, nextStepName}: {completedSteps: number, totalSteps: number, nextStepName: string}) {
  const progress = `${(((completedSteps - 1) / (totalSteps - 1)) * 100).toFixed()}%`;
  const completed = completedSteps >= totalSteps;
  return (
    <div
      className={`${styles.progressBar} ${completed ? styles.completed : ""}`}
      style={
        {
          "--progress": progress,
        } as CSSProperties
      }
    >
      {completed ?  "100% Done!" : `${progress.padStart(4)} ${nextStepName}...`}
    </div>
  )
}