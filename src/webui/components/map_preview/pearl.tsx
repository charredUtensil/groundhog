import React from "react";
import { Point, isAdjacent8 } from "../../../core/common/geometry";
import { pairMap } from "../../../core/common/utils";
import { PearledPlan } from "../../../core/transformers/01_planning/04_pearl";
import "./style.scss";

const SCALE = 6;

function dPearl(layer: readonly Point[]) {
  if (layer.length === 0) {
    return "";
  }
  const result = pairMap(layer, ([x1, y1], [x2, y2]) => {
    const cmd = isAdjacent8([x1, y1], [x2, y2]) ? "L" : "M";
    return `${cmd}${(x2 + 0.5) * SCALE} ${(y2 + 0.5) * SCALE}`;
  });
  const [x0, y0] = layer[0];
  return `M${(x0 + 0.5) * SCALE} ${(y0 + 0.5) * SCALE} ${result.join(" ")}`;
}

export default function PearlPreview({
  plan,
  pearl,
}: {
  plan: PearledPlan;
  pearl: "innerPearl" | "outerPearl";
}) {
  const io = pearl === "outerPearl" ? plan.innerPearl.length : 0;
  return (
    <g key={`pearl${plan.id}`} className={`pearl ${pearl} ${plan.kind}Kind`}>
      {plan[pearl].map((layer, i) => (
        <path
          className={`layer layer${(i + io) % 4}`}
          d={dPearl(layer)}
          fill="none"
        />
      ))}
    </g>
  );
}
