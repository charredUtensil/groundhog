import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CavernContext } from "../../../core/common";

const GITHUB_ISSUE = "https://github.com/charredUtensil/groundhog/issues/new";

export default function ErrorPreview({
  error,
  context,
}: {
  error: Error;
  context: CavernContext | undefined;
}) {
  const [show, setShow] = useState(true);
  const [wasCopied, setWasCopied] = useState(false);
  if (!show) {
    return null;
  }
  const debugInfo = [
    `error: ${error.message}`,
    `groundHog version: ${process.env.REACT_APP_VERSION}`,
    `seed: ${context?.seed.toString(16).padStart(8, "0").toUpperCase()}`,
    `overrides: ${context?.overrides.join(", ") || "[none]"}`,
    `stack: ${error.stack}`,
    `context: ${JSON.stringify(context)}`,
  ].join("\n");
  const bugLink = `${GITHUB_ISSUE}?body=${encodeURIComponent(`Add any relevant info here:\n\n\n${debugInfo}`)}`;
  return (
    <div className={styles.popoverWrapper}>
      <div className={styles.error}>
        <h2>Cavern generation failed</h2>
        <p className={styles.message}>{error.message}</p>
        <p>
          This isn't supposed to happen. Please consider{" "}
          <a href={bugLink} target="_blank" rel="noreferrer">
            filing a bug
          </a>
          .
        </p>
        <ul>
          <li>groundHog version: {process.env.REACT_APP_VERSION}</li>
          <li>
            seed: {context?.seed.toString(16).padStart(8, "0").toUpperCase()}
          </li>
          <li>overrides: {context?.overrides.join(", ") || "[none]"}</li>
          <li>
            <a href={bugLink} target="_blank" rel="noreferrer">
              Report issue on GitHub (Requires GitHub account)
            </a>
          </li>
          <li>
            <button
              onClick={() =>
                navigator.clipboard
                  .writeText(debugInfo)
                  .then(() => setWasCopied(true))
              }
            >
              Copy Bug Report
              {wasCopied && " [ Copied! ]"}
            </button>
          </li>
          <li>
            <button onClick={() => setShow(false)}>Hide this window</button>
          </li>
        </ul>
        {error.stack && (
          <>
            <h3>Stack</h3>
            <p className={styles.stack}>{error.stack}</p>
          </>
        )}
        {context && (
          <>
            <h3>Context</h3>
            <p className={styles.context}>{JSON.stringify(context)}</p>
          </>
        )}
      </div>
    </div>
  );
}
