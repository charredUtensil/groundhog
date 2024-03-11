import React from "react";
import { Baseplate } from "../../../core/models/baseplate";
import "./baseplate.scss"

const SCALE = 6

export default function BaseplatePreview({ baseplate }: { baseplate: Baseplate }) {
  return (
    <g className={`baseplate ${baseplate.kind}Kind`}>
      <rect
        className="bg"
        x={baseplate.left * SCALE}
        y={baseplate.top * SCALE}
        width={baseplate.width * SCALE}
        height={baseplate.height * SCALE}
      />
      <text
        className="fg"
        x={baseplate.left * SCALE} y={baseplate.top * SCALE + 8}>
        {baseplate.id}
      </text>
    </g>
  );
}
