import React, { CSSProperties } from 'react';
import styles from './style.module.scss';

export default function ProgressBar({completedSteps, totalSteps, nextStepName}: {completedSteps: number, totalSteps: number, nextStepName: string}) {
  const progress = `${((completedSteps / totalSteps) * 100).toFixed()}%`;
  return (
    <div
      className={`${styles.progressBar} ${completedSteps < totalSteps ? "" : styles.completed}`}
      style={
        {
          "--progress": progress,
        } as CSSProperties
      }
    >
    {progress.padStart(4)} {nextStepName}...
    </div>
  )
}