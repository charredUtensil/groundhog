import React, { ReactNode, createRef, useRef } from "react";
import { Cavern } from "../../../../core/models/cavern";
import styles from './styles.module.scss'

function annotateLines(script: string) {
  return script.split('\n').map((line) => {
    if (line.startsWith('#')) {
      return (<div className={styles.comment}>{line}</div>);
    }
    if (!line) {
      return (<div>&nbsp;</div>);
    }
    return <div>{line}</div>;
  });
}

export default function ScriptPreview({cavern, setScriptRange}: {cavern: Cavern | undefined, setScriptRange: (args: [number, number]) => void}) {
  const scrollListener = (e: any) => {
    const container = e.target as HTMLDivElement;
    const children = Array.from(container.children) as HTMLElement[];
    let min = 0;
    for (; min < children.length; min++) {
      if (children[min].offsetTop >= container.scrollTop) {
        break;
      }
    }
    let max = min;
    for (; max < children.length; max++) {
      if (children[max].offsetTop >= container.scrollTop + container.clientHeight) {
        break;
      }
    }
    setScriptRange([min, max]);
  }
  return (
    <div className={styles.popoverWrapper}>
      <div className={styles.script}>
        <h2>Script</h2>
        <div className={styles.src} onScroll={scrollListener}>
          {cavern?.script && annotateLines(cavern.script)}
        </div>
      </div>
    </div>
  );
}

export function ScriptOverlay({cavern, scriptRange: [min, max]}: {cavern: Cavern | undefined, scriptRange: [number, number]}) {
  if (!cavern?.script) {
    return null;
  }
  return (
    <g transform={`translate(${cavern.left! * 6} ${cavern.top! * 6})`} >
      {cavern.script.split('\n').map((line, i) => {
        if (!line || line.startsWith('#') || i < min || i >= max) {
          return null;
        }
        const m = line.match(/(?<y>\d+),(?<x>\d+)/);
        if (!m) {
          return null;
        }
        return (<rect fill='#7fff00' x={parseInt(m.groups!.x, 10) * 6} y={parseInt(m.groups!.y, 10) * 6} width={6} height={6} />)
      })}
    </g>
  );
}