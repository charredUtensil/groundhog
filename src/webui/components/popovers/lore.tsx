import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import { Cavern } from "../../../core/models/cavern";

export default function LorePreview({
  levelName,
  briefing,
  script,
}: Pick<Cavern, "levelName" | "briefing" | "script">) {
  const scriptStrings = script
    ?.split("\n")
    .map((s) =>
      s.match(
        /^string\s+(?<name>[a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*"(?<value>.*)"$/,
      ),
    );
  if (!(briefing || script)) {
    return null;
  }
  return (
    <div className={styles.popoverWrapper}>
      <div className={styles.lore}>
        <h1>{levelName}</h1>
        <h2>Briefing</h2>
        <h3>Introduction</h3>
        <p>{briefing?.intro}</p>
        <h3>Success</h3>
        <p>{briefing?.success}</p>
        <h3>Failure</h3>
        <p>{briefing?.failure}</p>
        {scriptStrings && <h2>Scripted Events</h2>}
        {scriptStrings?.map((m) => {
          if (!m) {
            return null;
          }
          const { name, value } = m.groups!;
          return (
            <Fragment key={name}>
              <h3>{name}</h3>
              <p>{value}</p>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
