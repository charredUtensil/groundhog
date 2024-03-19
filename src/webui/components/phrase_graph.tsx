import React from "react";
import { FOUND_HOARD } from "../../core/lore/graphs/events";
import { Phrase, PhraseGraph } from "../../core/lore/phrase_graph";
import { State } from "../../core/lore/lore";
import PREMISE from "../../core/lore/graphs/premise";

type PhraseNode = {
  readonly index: number;
  readonly id: number;
  readonly text: readonly string[];
  readonly after: readonly number[];
  readonly before: readonly number[];
  readonly requires: string;
  lane?: number
}

/** Assuming the input is a DAG, returns nodes in a topological order. */
function arrange(phrases: readonly Phrase<any>[]): readonly PhraseNode[] {
  const newIndex: (number | undefined)[] = [];
  const stack = phrases.filter(
    (phrase) => phrase.before.length === 0,
  );
  const inOrder: Omit<PhraseNode, 'after' | 'before'>[] = [];
  while (stack.length > 0) {
    const phrase = stack.shift()!;
    if (newIndex[phrase.id] !== undefined) {
      continue;
    }
    const before = phrase.before.filter((b) => !(newIndex[b.id] !== undefined));
    if (before.length > 0) {
      stack.unshift(...before, phrase);
    } else {
      newIndex[phrase.id] = inOrder.length;
      inOrder.push({
        index: inOrder.length,
        id: phrase.id,
        text: phrase.text,
        requires: String(phrase.requires),
      });
      stack.unshift(...phrase.after);
    }
  }
  return inOrder.map(phrase => ({
    ...phrase,
    after: phrases[phrase.id].after.map(a => newIndex[a.id]!),
    before: phrases[phrase.id].before.map(a => newIndex[a.id]!),
  }))
}

function alignLong(
  nodes: readonly PhraseNode[],
  lane: number,
  start: number,
  end: number,
): {maxLane: number, end: number} {
  let maxLane = lane
  for (let i = start; i < end;) {
    const r = alignWide(nodes, lane, i)
    i = r.end
    maxLane = Math.max(maxLane, r.maxLane)
  }
  return {maxLane, end}
}

function alignWide(
  nodes: readonly PhraseNode[], 
  lane: number, 
  start: number
): {maxLane: number, end: number} {
  nodes[start].lane = lane
  const seen: (true | undefined)[] = []
  seen[start] = true
  let end = -1
  // Visit every descendant node from the start node until there is only one left.
  for (let i = start; i == start || i < end; i++) {
    if (!seen[i]) {
      continue
    }
    const node = nodes[i]
    for(const ai of node.after) {
      if (nodes[ai].lane === undefined) {
        seen[ai] = true
        end = Math.max(end, ai)
      }
    }
  }
  if (end < 0) {
    return {maxLane: lane, end: Infinity}
  }
  let maxLane = lane
  // Trace back from the end, assigning each node to the current lane.
  for (let i = end; i > start;) {
    nodes[i].lane = lane
    i = nodes[i].before.filter(bi => seen[bi]).reduce((r, bi) => Math.min(r, bi))
    for (const ai of nodes[i].after) {
      if (nodes[ai].lane === undefined) {
        const r = alignLong(nodes, maxLane + 1, ai, end)
        maxLane = Math.max(maxLane, r.maxLane)
      }
    }
  }
  return {maxLane, end}
}

function makeNodes(phraseGraph: PhraseGraph<any>) {
  const nodes = arrange(phraseGraph.phrases);
  alignLong(nodes, 0, 0, nodes.length);
  (window as any).pgnodes = nodes;
  return nodes
}

const NODE_HEIGHT = 48;
const LANE_WIDTH = 12;

function getCoord(node: PhraseNode) {
  const x = LANE_WIDTH * (node.lane! + 0.5)
  const y = NODE_HEIGHT * (node.index + 0.5)
  return [x, y]
}

export default function LorePhraseGraph() {
  const nodes = makeNodes(PREMISE)

  const SVG_WIDTH = 800;
  const SVG_HEIGHT = NODE_HEIGHT * nodes.length;

  return (
    <svg
      className="map"
      style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
      viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {nodes.map((node) => {
        const [x, y] = getCoord(node)
        return (
          <>
            <circle cx={x} cy={y} r={8} />
            <text x={200} y={y}>
              {node.index} id={node.id} {node.text[0] || node.requires}
            </text>
            {node.after.map((ai) => {
              const [x1, y1] = getCoord(nodes[ai]);
              return (
                <path
                  stroke="black"
                  strokeWidth={4}
                  fill="none"
                  d={`M${x} ${y} C${x} ${y + NODE_HEIGHT / 2} ${x1} ${y + 24} ${x1} ${y + 48} L${x1} ${y1}`}
                />
              );
            })}
          </>
        )
          })}
    </svg>
  );
}
