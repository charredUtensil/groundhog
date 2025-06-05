import React, { useState } from "react";
import styles from "./styles.module.scss";
import { CavernContext } from "../../../core/common";
import { PartialCavernContext } from "../../../core/common/context";
import GROUNDHOG_VERSION from "../../../core/common/version";

const GITHUB_ISSUE = "https://github.com/charredUtensil/groundhog/issues/new";

export default function ErrorPreview({
  error,
  initialContext,
  context,
}: {
  error: Error;
  initialContext: PartialCavernContext;
  context: CavernContext | undefined;
}) {
  const [show, setShow] = useState(true);
  const [copiedState, setCopiedState] = useState<"no" | "copied" | "fail">(
    "no",
  );
  if (!show) {
    return null;
  }

  const debugInfo = [
    `error: ${error.message}`,
    `groundHog version: ${GROUNDHOG_VERSION}}`,
    `initial context: ${JSON.stringify(initialContext)}`,
    `context: ${JSON.stringify(context)}`,
    `stack: ${error.stack}`,
  ].join("\n");
  function copyToClipboard() {
    navigator.clipboard
      .writeText(debugInfo)
      .then(() => setCopiedState("copied"))
      .catch(() => setCopiedState("fail"));
  }

  const bugLink = `${GITHUB_ISSUE}?body=${encodeURIComponent(`Add any relevant info here:\n\n\n${debugInfo}`)}`;
  return (
    <div className={styles.popoverWrapper}>
      <div className={styles.error}>
        <h2>Cavern generation failed</h2>
        <p className={styles.message}>{error.message}</p>
        <p>
          This isn&apos;t supposed to happen. Please consider{" "}
          <a href={bugLink} target="_blank" rel="noreferrer">
            filing a bug
          </a>
          .
        </p>
        <ul>
          <li>groundHog version: {GROUNDHOG_VERSION}</li>
          <li>
            seed: {context?.seed.toString(16).padStart(8, "0").toUpperCase()}
          </li>
          <li>
            <a href={bugLink} target="_blank" rel="noreferrer">
              Report issue on GitHub (Requires GitHub account)
            </a>
          </li>
          <li>
            <button onClick={copyToClipboard}>
              Copy Bug Report
              {copiedState === "copied" && " [ Copied! ]"}
              {copiedState === "fail" && " [ Failed :( ]"}
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
        <h3>Initial Context</h3>
        <p className={styles.context}>{JSON.stringify(initialContext)}</p>
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
