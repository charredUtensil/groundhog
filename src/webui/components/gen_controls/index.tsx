import React from "react";
import { Cavern } from "../../../core/models/cavern";
import styles from "./styles.module.scss";

function getDownloadLink(serializedData: string) {
  return `data:text/plain;charset=utf-8,${encodeURIComponent(serializedData)}`;
}

function DownloadButton({ cavern }: { cavern: Cavern }) {
  if (cavern.serialized) {
    return (
      <a
        className={styles.button}
        href={getDownloadLink(cavern.serialized)}
        download={`${cavern.fileName}.dat`}
        title="Download Cavern"
      >
        download
      </a>
    );
  }
  return (
    <div
      className={`${styles.button} ${styles.disabled}`}
      title="Download will be available when generation is complete"
    >
      download
    </div>
  );
}

export default function GenerateControls({
  cavern,
  autoGenerate,
  setAutoGenerate,
  step,
  reset,
}: {
  cavern: Cavern;
  autoGenerate: boolean;
  setAutoGenerate: React.Dispatch<React.SetStateAction<boolean>>;
  step: (() => void) | null;
  reset: () => void;
}) {
  return (
    <div className={styles.controls}>
      {(() => {
        if (!step) {
          return (
            <button onClick={reset} title="Regenerate Cavern">
              restart_alt
            </button>
          );
        }
        if (autoGenerate) {
          return (
            <button
              onClick={() => setAutoGenerate(false)}
              title="Pause generation"
            >
              pause
            </button>
          );
        }
        return (
          <>
            <button onClick={step} title="Generate one step">
              step
            </button>
            <button
              onClick={() => setAutoGenerate(true)}
              title="Resume generation"
            >
              play_arrow
            </button>
          </>
        );
      })()}
      <DownloadButton cavern={cavern} />
    </div>
  );
}
