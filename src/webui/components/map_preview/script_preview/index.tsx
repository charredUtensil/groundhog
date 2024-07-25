import React, { Fragment, ReactNode, createRef, useLayoutEffect, useMemo, useRef } from "react";
import { Cavern } from "../../../../core/models/cavern";
import styles from './styles.module.scss'
import { Point } from "../../../../core/common/geometry";
import { filterTruthy } from "../../../../core/common/utils";

type Statement = {
  kind: string;
  code: string;
  pos?: Point;
}

const SCALE = 6;

function parse(script: string): Statement[] {
  return script.split('\n').map((line) => {
    if (line.startsWith('#')) {
      return {kind: 'misc', code: line};
    }
    if (!line) {
      return {kind: 'misc', code: '\u00A0'};
    }
    const m = line.match(/(?<prefix>(^|\())[a-z]+:(?<y>\d+),(?<x>\d+)/);
    if (m) {
      const kind = m.groups!.prefix === '(' ? 'condition' : 'event';
      return {kind: kind, code: line, pos: [parseInt(m.groups!.x, 10), parseInt(m.groups!.y)]};
    }
    return {kind: 'misc', code: line};
  });
}

function getLineOffsets(container: HTMLDivElement) {
  const result = [];
  const lines = Array.from(container.getElementsByClassName(styles.line)) as HTMLElement[];
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
    result[i] = (
      lines[i].offsetTop 
      + lines[i].clientHeight / 2
      - container.clientHeight / 2 
      - container.scrollTop
    );
  }
  return result;
}

export default function ScriptPreview({cavern, setScriptLineOffsets, scriptLineHovered, setScriptLineHovered}: {
  cavern: Cavern | undefined, setScriptLineOffsets: (v: number[]) => void, scriptLineHovered: number, setScriptLineHovered: (v: number) => void}) {
  const ref = createRef<HTMLDivElement>()
  useLayoutEffect(() => {
    const container = ref.current
    if (!container) {
      return;
    }
    setScriptLineOffsets(getLineOffsets(container));
  }, [ref]);
  const statements = useMemo(() => cavern?.script ? parse(cavern.script) : undefined, [cavern]);
  return (
    <div className={styles.script} ref={ref} onScroll={() => setScriptLineOffsets(getLineOffsets(ref.current!))}>
      <h2>Script</h2>
      <div className={styles.src}>
        {statements?.map(({code, pos, kind}, i) => {
          const className = filterTruthy([
            styles.line,
            scriptLineHovered === i && styles.hovered,
            styles[kind],
          ]).join(' ');
          return (
            <div className={className} onMouseOver={pos ? () => setScriptLineHovered(i) : undefined}>{code}</div>
          );
        })}
      </div>
    </div>
  );
}

export function ScriptOverlay({cavern, scriptLineOffsets, scriptLineHovered}: {
  cavern: Cavern | undefined, scriptLineOffsets: number[], scriptLineHovered: number}) {
  const statements = useMemo(() => cavern?.script ? parse(cavern.script) : undefined, [cavern]);
  if (!cavern?.script) {
    return null;
  }
  const ox = cavern.left!;
  const oy = cavern.top!;
  return (
    <>
      <g className={styles.tiles}>
        {statements!.map(({kind, pos}, i) => {
          if (!pos || scriptLineOffsets[i] === undefined) {
            return null;
          }
          const active = true;
          const className = filterTruthy([
            styles.tile,
            active ? styles.active : styles.inactive,
            scriptLineHovered === i && styles.hovered,
            styles[kind],
          ]).join(' ');
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
      </g>
      {parse(cavern.script).map(({kind, pos}, i) => {
        if (!pos || scriptLineOffsets[i] === undefined || scriptLineHovered !== i) {
          return null
        }
        const className = filterTruthy([
          styles.arrow,
          scriptLineHovered === i && styles.hovered,
          styles[kind],
        ]).join(' ');
        const lx = -9999;
        const ly = scriptLineOffsets[i]
        const px = (pos[0] + ox + 0.5) * SCALE;
        const py = (pos[1] + oy + 0.5) * SCALE;
        const bx = px - Math.abs(py - ly) * 0.3;
        const d = filterTruthy([
          `M ${px} ${py}`,
          `L ${bx} ${ly}`,
          `L ${lx} ${ly}`,
        ]).join("");
        return (
          <Fragment key={i}>
            <path
              className={className}
              d={d}
            />
            <circle
              className={className}
              cx={px}
              cy={py}
              r={10}
            />
          </Fragment>
        );
      })}
    </>
  );
}