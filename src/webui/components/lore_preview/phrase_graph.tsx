import React, {
  createRef,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Phrase, PhraseGraph } from "../../../core/lore/builder";
import { Lore, State } from "../../../core/lore/lore";
import "./style.scss";
import { Point } from "../../../core/common/geometry";

const NODE_HEIGHT = 48;
const LANE_WIDTH = 12;

function getCoord(phrase: Phrase<State>): Point {
  const x = LANE_WIDTH * (phrase.lane! + 1);
  const y = NODE_HEIGHT * (phrase.id + 0.5);
  return [x, y];
}

export default function PhraseGraphPreview({ lore, pg }: { lore: Lore | undefined, pg: PhraseGraph<State> }) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(pg.phrases.length)
  const [beforeSelected, setBeforeSelected] = useState<readonly boolean[]>([])
  const [afterSelected, setAfterSelected] = useState<readonly boolean[]>([])
  const nodesRef = createRef<HTMLDivElement>();

  const SVG_WIDTH = 300;
  const SVG_HEIGHT = NODE_HEIGHT * pg.phrases.length;

  useEffect(() => {
    setBeforeSelected([])
    setAfterSelected([])
  },[pg])

  function update() {
    const n = nodesRef.current;
    if (n) {
      setStart(Math.floor(n.scrollTop / NODE_HEIGHT));
      setEnd(Math.ceil((n.scrollTop + n.clientHeight) / NODE_HEIGHT));
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
      const [x2, y2] = getCoord(a)
      const d = `M${x1} ${y1} C${x1} ${y1 + NODE_HEIGHT / 2} ${x2} ${y1 + 24} ${x2} ${y1 + 48} L${x2} ${y2}`
      const onscreen = phrase.id >= start && a.id <= end
      const classes = [
        'link',
        onscreen ? 'onscreen' : 'offscreen',
      ]
      const selected = (beforeSelected[phrase.id] && beforeSelected[a.id])
        || (afterSelected[phrase.id] && afterSelected[a.id])
      if (selected) {
        classes.push('selected')
      }
      return {
        z: selected ? 2 : (onscreen ? 1 : 0),
        link: <path className={classes.join(' ')} d={d}/>,
      }
    })
  }

  function getPhraseClass(phrase: Phrase<State>) {
    const r = ['phrase']
    if (phrase.id % 2 === 0) {
      r.push('even')
    }
    if (phrase.text.length > 0) {
      r.push('text')
    }
    if (phrase.requires) {
      r.push('requires')
      if (phrase.requires === 'start') {
        r.push('start')
      } else if (phrase.requires === 'end') {
        r.push('end')
      } else if (lore) {
        r.push(lore.state[phrase.requires] ? 'present' : 'notPresent')
      }
    }
    if (beforeSelected[phrase.id]) {
      r.push('beforeSelected')
    }
    if (afterSelected[phrase.id]) {
      r.push('afterSelected')
    }
    return r.join(' ')
  }

  function select(phrase: Phrase<State>) {
    if (beforeSelected[phrase.id] && afterSelected[phrase.id]) {
      setBeforeSelected([])
      setAfterSelected([])
      return
    }
    const fn = (next: (p: Phrase<State>) => Phrase<State>[]) => {
      const s: boolean[] = []
      const q = [phrase]
      while (q.length > 0) {
        const p = q.shift()!
        if (!s[p.id]) {
          s[p.id] = true
          q.push(...next(p))
        }
      }
      return s
    }
    setBeforeSelected(fn((p) => p.before))
    setAfterSelected(fn((p) => p.after))
  }

  return (
    <div className="pg" ref={nodesRef} onScroll={update}>
      <svg
        className="graph"
        style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {pg.phrases.flatMap(getLinks).sort((a, b) => a.z - b.z).map(({link}) => link)}
        {pg.phrases.map(phrase => {
          const [x, y] = getCoord(phrase);
          return <circle className={getPhraseClass(phrase)} cx={x} cy={y} r={8} />
        })}
      </svg>
      <div className="list">
        {pg.phrases.map((phrase) => (
          <a
            role='button'
            onClick={() => select(phrase)}
          >
            <div className={getPhraseClass(phrase)}>
              {phrase.text.map((text) => (
                <div className="text">{text}</div>
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
