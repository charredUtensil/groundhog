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
import "./style.scss";
import { Point } from "../../../core/common/geometry";

const PHRASE_HEIGHT = 32;
const LANE_WIDTH = 12;

function getCoord(phrase: Phrase<State>): Point {
  const x = LANE_WIDTH * (phrase.lane! + 1);
  const y = PHRASE_HEIGHT * (phrase.id + 0.5);
  return [x, y];
}

export default function PhraseGraphPreview({
  lore,
  pg,
  results,
}: {
  lore: Lore | undefined;
  pg: PhraseGraph<State>;
  results: GenerateResult<State> | undefined;
}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(pg.phrases.length);
  const [included, setIncluded] = useState<
    readonly ({ next: number; text: number } | undefined)[]
  >([]);
  const [selected, setSelected] = useState(-1);
  const [reachableFromSelected, setReachableFromSelected] = useState<
    readonly (readonly (true | undefined)[] | undefined)[]
  >([]);
  const nodesRef = createRef<HTMLDivElement>();

  const SVG_WIDTH = 300;
  const SVG_HEIGHT = PHRASE_HEIGHT * pg.phrases.length;

  useEffect(() => {
    if (results) {
      const r: ({ next: number; text: number } | undefined)[] = [];
      for (let i = 0; i < results.chosen.length; i++) {
        r[results.chosen[i].phrase.id] = {
          next: results.chosen[i + 1]?.phrase.id ?? -1,
          text: results.chosen[i].textIndex,
        };
      }
      setIncluded(r);
    } else {
      setIncluded([]);
    }
  }, [pg, results]);

  useEffect(() => {
    setReachableFromSelected([]);
    setSelected(-1);
  }, [pg]);

  function update() {
    const n = nodesRef.current;
    if (n) {
      setStart(Math.floor(n.scrollTop / PHRASE_HEIGHT));
      setEnd(Math.ceil((n.scrollTop + n.clientHeight) / PHRASE_HEIGHT));
    }
  }

  useLayoutEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [nodesRef]);

  function getLinks(phrase: Phrase<State>) {
    const [x1, y1] = getCoord(phrase);
    return phrase.after.map((a) => {
      const [x2, y2] = getCoord(a);
      const d = `M${x1} ${y1} C${x1} ${y1 + PHRASE_HEIGHT / 2} ${x2} ${y1 + PHRASE_HEIGHT / 2} ${x2} ${y1 + PHRASE_HEIGHT} L${x2} ${y2}`;
      const onscreen = phrase.id >= start && a.id <= end;
      const classes = ["link", onscreen ? "onscreen" : "offscreen"];
      const isIncluded = included[phrase.id]?.next === a.id;
      if (isIncluded) {
        classes.push("included");
      }
      const isSelected = reachableFromSelected[phrase.id]?.[a.id];
      if (isSelected) {
        classes.push("selected");
      }
      return {
        z: isSelected ? 3 : isIncluded ? 2 : onscreen ? 1 : 0,
        link: <path className={classes.join(" ")} d={d} />,
      };
    });
  }

  function getPhraseClass(phrase: Phrase<State>) {
    const r = ["phrase"];
    if (phrase.id % 2 === 0) {
      r.push("even");
    }
    if (phrase.text.length > 0) {
      r.push("text");
    }
    if (phrase.requires) {
      r.push("requires");
      if (phrase.requires === "start") {
        r.push("start");
      } else if (phrase.requires === "end") {
        r.push("end");
      } else if (lore) {
        r.push(lore.state[phrase.requires] ? "present" : "notPresent");
      }
    }
    if (included[phrase.id]) {
      r.push("included");
    }
    if (selected === phrase.id) {
      r.push("selected");
    }
    if (reachableFromSelected[phrase.id]) {
      r.push("reachableFromSelected");
    }
    return r.join(" ");
  }

  function select(phrase: Phrase<State>) {
    if (selected === phrase.id) {
      setSelected(-1);
      setReachableFromSelected([]);
      return;
    }
    const r: (true | undefined)[][] = [];
    const q = [phrase];
    // First, loop over all items in before and add them.
    while (q.length > 0) {
      const p = q.shift()!;
      for (const b of p.before) {
        (r[b.id] ||= [])[p.id] = true;
        q.push(b);
      }
    }
    // Next, loop over all items after and add them.
    q.push(phrase);
    while (q.length > 0) {
      const p = q.shift()!;
      if (!r[p.id]) {
        r[p.id] = [];
        for (const a of p.after) {
          r[p.id][a.id] = true;
        }
        q.push(...p.after);
      }
    }
    setReachableFromSelected(r);
    setSelected(phrase.id);
  }

  return (
    <div
      className="pg"
      ref={nodesRef}
      onScroll={update}
      style={{ "--phrase-height": `${PHRASE_HEIGHT}px` } as CSSProperties}
    >
      <svg
        className="graph"
        style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {pg.phrases
          .flatMap(getLinks)
          .sort((a, b) => a.z - b.z)
          .map(({ link }) => link)}
        {pg.phrases.map((phrase) => {
          const [x, y] = getCoord(phrase);
          return (
            <circle className={getPhraseClass(phrase)} cx={x} cy={y} r={8} />
          );
        })}
      </svg>
      <div className="list">
        {pg.phrases.map((phrase) => (
          <a role="button" onClick={() => select(phrase)}>
            <div className={getPhraseClass(phrase)}>
              {phrase.text.map((text, i) => (
                <div
                  className={`text ${included[phrase.id]?.text === i ? "included" : ""}`}
                >
                  {text}
                </div>
              ))}
              {phrase.requires ? (
                <div className="requires">{phrase.requires}</div>
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
