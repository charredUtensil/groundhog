import React from "react";
import { FOUND_HOARD } from "../../core/lore/graphs/events";
import { Phrase } from "../../core/lore/phrase_graph";
import { State } from "../../core/lore/lore";
import PREMISE from "../../core/lore/graphs/premise";

export default function LorePhraseGraph() {
  const phraseGraph = FOUND_HOARD

  const visited: boolean[] = []
  const stack = phraseGraph.phrases.filter(phrase => phrase.before.length === 0)
  const inOrder: Phrase<State>[] = []
  while (stack.length > 0) {
    const phrase = stack.shift()!
    if (visited[phrase.id]) {
      continue
    }
    const before = phrase.before.filter(b => !visited[b.id])
    if (before.length > 0) {
      stack.unshift(...before, phrase)
    } else {
      visited[phrase.id] = true
      inOrder.push(phrase)
      stack.unshift(...phrase.after)
    }
  }
  const lanes: number[] = [0, 0]
  for (const phrase of inOrder) {
    const lane = lanes[phrase.id]
    let i = 0
    phrase.after.forEach(a => {
      if (lanes[a.id] === undefined) {
        if (i > 0) {
          for (let j = 0; j < lanes.length; j++) {
            if (lanes[j] >= lane + i) {
              lanes[j] += 1
            }
          }
        }
        lanes[a.id] = lane + i++
      }
    })
  }
  const nodes = inOrder.map((phrase, i) => ({
    phrase,
    x: 20 + lanes[phrase.id] * 20,
    y: 24 + i * 48,
    after: []
  }))
  const io = nodes.slice().sort((a, b) => a.phrase.id - b.phrase.id)

  const SVG_WIDTH = 800
  const SVG_HEIGHT = 1000

  return (
      <svg
        className="map"
        style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {nodes.map(({phrase, x, y}) => (
          <>
            <circle cx={x} cy={y} r={8} />
            <text x={200} y={y} >
              {phrase.text[0] || phrase.requires}
            </text>
            {phrase.after.map(a => {
              const other = io[a.id]
              return <path stroke="black" strokeWidth={4} fill="none"
                d={`M${x} ${y} C${x} ${y + 24} ${other.x} ${y + 24} ${other.x} ${y + 48} L${other.x} ${other.y}`} />
            })}
          </>
        ))}
      </svg>
  )
}