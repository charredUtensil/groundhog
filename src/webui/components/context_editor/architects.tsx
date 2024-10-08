import { UpdateData } from "./controls";
import { ARCHITECTS } from "../../../core/architects";
import styles from "./style.module.scss";
import React from "react";

export const ArchitectsInput = ({ update, initialContext }: UpdateData) => {
  function updateArchitects(
    key: string,
    value: "encourage" | "disable" | undefined,
  ) {
    const r = { ...initialContext.architects };
    if (value === undefined) {
      if (key in r) {
        delete r[key];
      }
      if (Object.keys(r).length === 0) {
        update({ architects: undefined });
        return;
      }
    } else {
      if (r[key] !== value) {
        r[key] = value;
      }
    }
    update({ architects: r });
  }

  return [...ARCHITECTS].map((a) => {
    const state = initialContext.architects?.[a.name];
    return (
      <React.Fragment key={a.name}>
        <p>{a.name}</p>
        <div className={styles.inputRow}>
          <button
            className={`${styles.choice} ${state === "encourage" ? styles.override : styles.inactive}`}
            onClick={() =>
              updateArchitects(
                a.name,
                state === "encourage" ? undefined : "encourage",
              )
            }
          >
            Encourage
          </button>
          <button
            className={`${styles.choice} ${state === "disable" ? styles.override : styles.inactive}`}
            onClick={() =>
              updateArchitects(
                a.name,
                state === "disable" ? undefined : "disable",
              )
            }
          >
            Disable
          </button>
        </div>
      </React.Fragment>
    );
  });
};
