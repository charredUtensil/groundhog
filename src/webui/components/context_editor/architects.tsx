import { UpdateData } from "./controls";
import { ARCHITECTS } from "../../../core/architects";
import styles from "./style.module.scss";
import React, { useMemo } from "react";
import { Cavern } from "../../../core/models/cavern";
import { Plan } from "../../../core/models/plan";

export const ArchitectsInput = ({
  update,
  initialContext,
  cavern,
}: UpdateData & { cavern: Cavern | undefined }) => {
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

  const used = useMemo(() => {
    const r: { [K: string]: number } = {};
    (cavern?.plans as Partial<Plan<any>>[] | undefined)?.forEach(
      (plan) =>
        plan.architect &&
        (r[plan.architect.name] = (r[plan.architect.name] ?? 0) + 1),
    );
    return r;
  }, [cavern]);

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
          {state === "encourage" &&
          !used[a.name] &&
          cavern?.plans?.some((p) => "architect" in p) ? (
            <div className={`${styles.architectCount} ${styles.icon}`}>
              warning
            </div>
          ) : (
            <div className={styles.architectCount}>{used[a.name]}</div>
          )}
        </div>
      </React.Fragment>
    );
  });
};
