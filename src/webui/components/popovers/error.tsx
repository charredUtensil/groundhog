import React from "react";
import styles from "./styles.module.scss";
import { CavernContext } from "../../../core/common";

function getBugLink(error: Error, context: CavernContext | undefined) {
  return "https://github.com/charredUtensil/groundhog/issues";
}

const ErrorPreview = ({
  error,
  context,
}: {
  error: Error;
  context: CavernContext | undefined;
}) => (
  <div className={styles.popoverWrapper}>
    <div className={styles.error}>
      <h2>Cavern generation failed</h2>
      <p>
        This isn't supposed to happen. Please consider{" "}
        <a href={getBugLink(error, context)} target="_blank" rel="noreferrer">
          filing a bug
        </a>
        .
      </p>
      <ul className={styles.info}>
        <li>groundHog version: {process.env.REACT_APP_VERSION}</li>
        <li>
          seed: {context?.seed.toString(16).padStart(8, "0").toUpperCase()}
        </li>
        <li>overrides: {context?.hasOverrides ? "yes" : "no"}</li>
        <li>error: {error.message}</li>
        <li>line: {error.stack?.split("\n", 1)[0]}</li>
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
export default ErrorPreview;
