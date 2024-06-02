import React, { CSSProperties, useEffect, useState } from "react";
import {
  GenerateResult,
  Phrase,
  PhraseGraph,
} from "../../../core/lore/builder";
import { Lore, State } from "../../../core/lore/lore";
import styles from "./style.module.scss";
import { Graph, Link, graphify } from "./graphify";

// Idea: merge lanes based on "possible nexts"

const SVG_WIDTH = 300;
const PHRASE_HEIGHT = 32;
const LANE_WIDTH = 16;

const tx = (x: number) => (x + 1) * LANE_WIDTH;
const ty = (y: number) => (y + 0.5) * PHRASE_HEIGHT;

function linkClassName({ x1, y1, x2, y2 }: Link) {
  const r = [styles.link];
  y2 - y1 > 5 && r.push(styles.long);
  return r.join(" ");
}

function phraseClassName({ id, requires }: Phrase<any>) {
  const r = [styles.phrase, id % 2 === 0 ? styles.even : styles.odd];
  requires && r.push(styles.requires);
  return r.join(" ");
}

export default function PhraseGraphPreview({
  lore,
  pg,
  results,
}: {
  lore: Lore | undefined;
  pg: PhraseGraph<State & any>;
  results: GenerateResult<State & any> | undefined;
}) {
  const [graph, setGraph] = useState<Graph<Phrase<State & any>> | null>(null);

  useEffect(() => {
    setGraph(graphify(pg.phrases));
  }, [pg]);

  return (
    <div
      className={styles.pg}
      style={{ "--phrase-height": `${PHRASE_HEIGHT}px` } as CSSProperties}
    >
      <svg
        className={styles.graph}
        style={{
          width: SVG_WIDTH,
          height: (graph?.positions.length ?? 1) * PHRASE_HEIGHT,
        }}
        width={SVG_WIDTH}
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        {graph?.links.map((link) => {
          const { x1, y1, x2, y2 } = link;
          const d = `M${tx(x1)} ${ty(y1)} ${
            x1 === x2
              ? `L${tx(x1)} ${ty(y2)}`
              : `L${tx(x1)} ${ty(y2 - 1)} C${tx(x1)} ${ty(y2 - 0.5)} ${tx(x2)} ${ty(y2 - 0.5)} ${tx(x2)} ${ty(y2)}`
          }`;
          return <path className={linkClassName(link)} d={d} />;
        })}
        {graph?.positions.map(({ node, x, y }) => (
          <circle
            className={phraseClassName(node)}
            cx={tx(x)}
            cy={ty(y)}
            r={8}
          />
        ))}
      </svg>
      <div className={styles.list}>
        {pg.phrases.map((phrase) => (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a role="button">
            <div className={phraseClassName(phrase)}>
              {phrase.text.map((text, i) => (
                <div className={styles.text}>{text}</div>
              ))}
              {phrase.requires ? (
                <div className={styles.requires}>{phrase.requires}</div>
              ) : (
                <></>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
