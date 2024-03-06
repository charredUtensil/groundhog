import React, { ReactElement, ReactNode, useState } from "react";
import { Cavern } from "../../../core/models/cavern";
import "./cavern.css"
import { Baseplate } from "../../../core/models/baseplate";
import { Path } from "../../../core/models/path";

const SCALE = 6;
const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;

export default function CavernPreview({cavern}: {cavern: Cavern}) {
  return (
    <div className="cavernPreview">
      <div>seed: {cavern.context.seed}</div>
      <svg
        className="map"
        style={{width: SVG_WIDTH, height: SVG_HEIGHT}}
        viewBox={`${SVG_WIDTH/-2} ${SVG_HEIGHT/-2} ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cavern.baseplates?.map(bp => <BaseplatePreview baseplate={bp} />)}
        {cavern.paths?.map(p => <PathPreview path={p} />)}
      </svg>
    </div>
  )
}

function BaseplatePreview({baseplate}: {baseplate: Baseplate}) {
  return (
    <g
      className={`baseplate ${baseplate.kind}Kind`}
    >
      <rect
        x={baseplate.left * SCALE}
        y={baseplate.top * SCALE}
        width={baseplate.width * SCALE}
        height={baseplate.height * SCALE}
      />
      <text
        x={baseplate.left * SCALE}
        y={baseplate.top * SCALE + 8}
      >
        {baseplate.id}
      </text>
    </g>
  )
}

function PathPreview({path}: {path: Path}) {
  const points = path.baseplates.map(bp => {
    if (!bp) { return '-999,-999' }
    const [x, y] = bp.center
    return `${x * SCALE},${y * SCALE}`
  }).join(' ')
  return (
    <polyline
      className={`path ${path.kind}Kind`}
      points={points}
      fill="none"
      stroke="black"
      strokeWidth={2}
    />
  )
}