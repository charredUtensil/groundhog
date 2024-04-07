import React, {
  CSSProperties,
  createRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  GenerateResult,
  Phrase,
  PhraseGraph,
} from "../../../core/lore/builder";
import { Lore, State } from "../../../core/lore/lore";
import { Point } from "../../../core/common/geometry";
import styles from "./style.module.scss"
import { Graph, graphify } from "./graphify";

// Idea: merge lanes based on "possible nexts"

const SVG_WIDTH = 300;
const PHRASE_HEIGHT = 32;
const LANE_WIDTH = 12;

const tx = (x: number) => (x + 1) * LANE_WIDTH;
const ty = (y: number) => (y + 0.5) * PHRASE_HEIGHT;

export default function PhraseGraphPreview<T extends State>({
  lore,
  pg,
  results,
}: {
  lore: Lore | undefined;
  pg: PhraseGraph<T>;
  results: GenerateResult<T> | undefined;
}) {
  const [graph, setGraph] = useState<Graph<Phrase<T>> | null>(null)

  useEffect(() => {
    setGraph(graphify(pg.phrases))
  }, [pg])

  return (
    <div
      className={styles.pg}
      style={{ "--phrase-height": `${PHRASE_HEIGHT}px` } as CSSProperties}
    >
      <svg
        className={styles.graph}
        style={{ width: SVG_WIDTH, height: (graph?.positions.length ?? 1) * PHRASE_HEIGHT }}
        width={SVG_WIDTH}
        height='100%'
        xmlns="http://www.w3.org/2000/svg"
      >
        {
          graph?.links.map(({x1, y1, x2, y2}) => {
            const d = [
              `M${tx(x1)} ${ty(y1)}`,
              ...((x1 !== x2) ? [`C${tx(x1)} ${ty(y1 + 0.5)} ${tx(x2)} ${ty(y1 + 0.5)} ${tx(x2)} ${ty(y1 + 1)}`]: []),
              `L${tx(x2)} ${ty(y2)}`
            ].join(' ');
            return (
              <path className={styles.link} d={d} />
            )
          })
        }
        {
          graph?.positions.map(({node, x, y}) => (
            <circle 
              className={styles.phrase}
              cx={tx(x)}
              cy={ty(y)}
              r={8}
            />
          ))
        }
      </svg>
      <div className={styles.list}>
        {pg.phrases.map((phrase) => (
          <a role="button">
            <div className={styles.phrase}>
              {phrase.text.map((text, i) => (
                <div
                  className={styles.text}
                >
                  {text}
                </div>
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
