import React, { Fragment, createRef, useLayoutEffect, useMemo } from "react";
import { Cavern } from "../../../../core/models/cavern";
import styles from "./styles.module.scss";
import { offsetBy, Point } from "../../../../core/common/geometry";
import { filterTruthy } from "../../../../core/common/utils";

type Statement = {
  kind: "h3" | "h4" | "condition" | "event" | "misc";
  code: string;
  pos?: Point;
};

const SCALE = 6;

const H4_RE = /^# (P\d+|Globals):/;

function parse(cavern: Cavern): Statement[] {
  const script = cavern.script;
  if (!script) {
    return [];
  }
  return script.split("\n").map((code): Statement => {
    if (code.startsWith("#>")) {
      return { kind: "h3", code };
    }
    if (code.startsWith("#")) {
      if (H4_RE.test(code)) {
        return { kind: "h4", code };
      }
      return { kind: "misc", code };
    }
    if (!code) {
      return { kind: "misc", code: "\u00A0" };
    }
    let m = code.match(/(?<prefix>(^|\())[a-z]+:(?<y>\d+),(?<x>\d+)/);
    if (m) {
      const kind = m.groups!.prefix === "(" ? "condition" : "event";
      return {
        kind,
        code,
        pos: [parseInt(m.groups!.x, 10), parseInt(m.groups!.y)],
      };
    }
    m = code.match(/\bp(?<id>\d+)/);
    if (m) {
      const bp = cavern.plans?.[parseInt(m.groups!.id, 10)].path.baseplates;
      if (bp) {
        return {
          kind: "misc",
          code,
          pos: offsetBy(bp[Math.floor(bp.length / 2)].center, [
            -cavern.left!,
            -cavern.top!,
          ]),
        };
      }
    }
    return { kind: "misc", code };
  });
}

function getLineOffsets(container: HTMLDivElement) {
  const result = [];
  const lines = Array.from(
    container.getElementsByClassName(styles.line),
  ) as HTMLElement[];
  let i = 0;
  for (; i < lines.length; i++) {
    if (lines[i].offsetTop + lines[i].clientHeight >= container.scrollTop) {
      break;
    }
  }
  for (; i < lines.length; i++) {
    if (lines[i].offsetTop >= container.scrollTop + container.clientHeight) {
      break;
    }
    result[i] =
      lines[i].offsetTop +
      lines[i].clientHeight / 2 -
      container.clientHeight / 2 -
      container.scrollTop;
  }
  return result;
}

export default function ScriptPreview({
  cavern,
  setScriptLineOffsets,
  scriptLineHovered,
  setScriptLineHovered,
}: {
  cavern: Cavern | undefined;
  setScriptLineOffsets: (v: number[]) => void;
  scriptLineHovered: number;
  setScriptLineHovered: (v: number) => void;
}) {
  const ref = createRef<HTMLDivElement>();
  useLayoutEffect(() => {
    const container = ref.current;
    if (!container) {
      return;
    }
    setScriptLineOffsets(getLineOffsets(container));
  }, [ref, setScriptLineOffsets]);
  const statements = useMemo(
    () => (cavern?.script ? parse(cavern) : undefined),
    [cavern],
  );
  return (
    <div
      className={styles.script}
      ref={ref}
      onScroll={() => {
        if (ref.current) {
          setScriptLineOffsets(getLineOffsets(ref.current));
        }
      }}
    >
      <h2>Script</h2>
      <p>{statements?.length ?? 0} lines</p>
      <div className={styles.src}>
        {statements?.map(({ code, kind }, i) => {
          const className = filterTruthy([
            styles.line,
            scriptLineHovered === i && styles.hovered,
            styles[kind],
          ]).join(" ");
          return (
            <div
              key={i}
              className={className}
              onMouseOver={() => setScriptLineHovered(i)}
              onMouseLeave={() =>
                scriptLineHovered === i && setScriptLineHovered(-1)
              }
            >
              {code}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ScriptOverlay({
  cavern,
  scriptLineOffsets,
  scriptLineHovered,
  scale,
}: {
  cavern: Cavern | undefined;
  scriptLineOffsets: number[];
  scriptLineHovered: number;
  scale: number;
}) {
  const statements = useMemo(
    () => (cavern?.script ? parse(cavern) : undefined),
    [cavern],
  );
  if (!cavern?.script) {
    return null;
  }
  const ox = cavern.left!;
  const oy = cavern.top!;
  return (
    <g className={styles.scriptOverlay}>
      {statements!.map(({ kind, pos }, i) => {
        if (!pos || scriptLineOffsets[i] === undefined || kind === "misc") {
          return null;
        }
        const className = filterTruthy([
          styles.tile,
          scriptLineHovered === i && styles.hovered,
          styles[kind],
        ]).join(" ");
        return (
          <rect
            key={i}
            className={className}
            x={(pos[0] + ox) * SCALE}
            y={(pos[1] + oy) * SCALE}
            width={SCALE}
            height={SCALE}
          />
        );
      })}
      {parse(cavern).map(({ kind, pos }, i) => {
        if (
          !pos ||
          scriptLineHovered !== i ||
          scriptLineOffsets[i] === undefined
        ) {
          return null;
        }
        const lx = -9999;
        const ly = scriptLineOffsets[i] / scale;
        const px = (pos[0] + ox + 0.5) * SCALE;
        const py = (pos[1] + oy + 0.5) * SCALE;
        const bx = px - Math.abs(py - ly) * 0.3;
        const d = `M ${px} ${py} L ${bx} ${ly} L ${lx} ${ly}`;
        const cr = 10;
        const tr = 4;
        return (
          <Fragment key={i}>
            <path className={`${styles.arrow} ${styles[kind]}`} d={d} />
            {kind !== "misc" && (
              <>
                <circle
                  className={`${styles.arrowhead} ${styles[kind]}`}
                  cx={px}
                  cy={py}
                  r={cr}
                />
                <rect
                  className={`${styles.tile} ${styles[kind]}`}
                  x={px - tr}
                  y={py - tr}
                  width={2 * tr}
                  height={2 * tr}
                />
              </>
            )}
          </Fragment>
        );
      })}
    </g>
  );
}
