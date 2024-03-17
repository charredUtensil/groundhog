/*
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import PREMISE from "../../core/lore/graphs/premise";
import { Phrase, PhraseGraph } from "../../core/lore/phrase_graph";
import { FOUND_HOARD } from "../../core/lore/graphs/events";

function getLabel(
  phrase: Phrase<any>
): string {
  return `${phrase.id}: ${phrase.text.length > 0 ? phrase.text[0] : (phrase.requires ? String(phrase.requires) : '<>')}`
}

function linkArc(d:any) {
  const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
  return `
    M${d.source.x},${d.source.y}
    A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
  `;
}

function runForceGraph(
  container: HTMLDivElement,
  phraseGraph: PhraseGraph<any>
) {
  const containerRect = container.getBoundingClientRect();
  const height = containerRect.height;
  const width = containerRect.width;

  const phrases = phraseGraph.phrases
  const nodes: (d3.SimulationNodeDatum & {phrase: Phrase<any>})[] = phrases
    .map(phrase => ({index: phrase.id, phrase: phrase}))
  nodes[0].fx = width / -2 + 20
  nodes[1].fx = width / 2 - 20
  nodes[0].fy = height / -2 + 20
  nodes[1].fy = height / 2 - 20
  const links = phrases
    .flatMap(source => source.after
      .map(target => ({
        source: nodes[source.id],
        target: nodes[target.id],
      })))

  const color = () => { return "#9D79A0"; };

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.index!))
    .force("charge", d3.forceManyBody().strength(-400));

  const svg = d3
    .select(container)
    .append("svg")
    .attr("viewBox", [-width / 2, -height / 2, width, height]);

  const link = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => 2)

  const node = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 2)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 18)
    .attr("fill", color)
    //.call(drag(simulation));

  const label = svg.append("g")
    .attr("class", "labels")
    .selectAll("text")
    .data(nodes)
    .enter()
    .append("text")
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'central')
    .text(d => getLabel(d.phrase))
    //.call(drag(simulation));

  simulation.on("tick", () => {
    //update link positions
    link
      .attr("x1", d => d.source.x!)
      .attr("y1", d => d.source.y!)
      .attr("x2", d => d.target.x!)
      .attr("y2", d => d.target.y!);

    // update node positions
    node
      .attr("cx", d => d.x!)
      .attr("cy", d => d.y!);

    // update label positions
    label
      .attr("x", d => { return d.x!; })
      .attr("y", d => { return d.y!; })
  });

  return {
    destroy: () => {
      simulation.stop();
    },
    nodes: () => {
      return svg.node();
    }
  };
}

export default function LoreGraph({}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, PREMISE);
      destroyFn = destroy;
    }

    return destroyFn;
  }, []);

  return <div ref={containerRef} style={{width: 800, height: 600}} />;
}
*/