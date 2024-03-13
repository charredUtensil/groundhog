import React from "react";
import { Plan } from "../../../core/models/plan";
import PathPreview from "./path";
import { Path } from "../../../core/models/path";
import "./plan.scss";

const SCALE = 6;

function caveWithOneBaseplate({
  path,
  pearlRadius,
}: Pick<Plan, "path" | "pearlRadius">) {
  const [x, y] = path.baseplates[0].center;
  return (
    <g className="plan caveKind">
      <circle
        className="bg"
        cx={x * SCALE}
        cy={y * SCALE}
        r={pearlRadius * SCALE}
      />
    </g>
  );
}

function dWrapping(
  circle1: { x: number; y: number; radius: number },
  circle2: { x: number; y: number; radius: number },
): string {
  // Calculate the distance and angle between circle centers
  const dx = circle2.x - circle1.x;
  const dy = circle2.y - circle1.y;
  const distance = Math.hypot(dx, dy);
  const angle = Math.atan2(dy, dx) - Math.PI / 2; // Offset angle by 90 degrees

  // Calculate start and end points for the path on each circle
  const startPoint1 = {
    x: circle1.x + Math.cos(angle) * circle1.radius,
    y: circle1.y + Math.sin(angle) * circle1.radius,
  };
  const endPoint1 = {
    x: circle1.x - Math.cos(angle) * circle1.radius,
    y: circle1.y - Math.sin(angle) * circle1.radius,
  };
  const startPoint2 = {
    x: circle2.x + Math.cos(angle) * circle2.radius,
    y: circle2.y + Math.sin(angle) * circle2.radius,
  };
  const endPoint2 = {
    x: circle2.x - Math.cos(angle) * circle2.radius,
    y: circle2.y - Math.sin(angle) * circle2.radius,
  };

  // Create SVG path segments
  const largeArcFlag = distance > 2 * (circle1.radius + circle2.radius) ? 1 : 0;
  const path = `M ${startPoint1.x},${startPoint1.y} 
                A ${circle1.radius},${circle1.radius} 0 0 ${largeArcFlag} ${endPoint1.x},${endPoint1.y}
                L ${endPoint2.x},${endPoint2.y} 
                A ${circle2.radius},${circle2.radius} 0 0 ${largeArcFlag} ${startPoint2.x},${startPoint2.y} 
                Z`; // Close the path

  return path;
}

function caveWithTwoBaseplates({ path }: { path: Path }) {
  const [a, b] = path.baseplates.map((bp) => {
    const [x, y] = bp.center;
    return {
      x: x * SCALE,
      y: y * SCALE,
      radius: bp.pearlRadius * SCALE,
    };
  });

  return (
    <g className="plan caveKind">
      <path className="bg" d={dWrapping(a, b)} />
    </g>
  );
}

function hall({ path, pearlRadius }: Pick<Plan, "path" | "pearlRadius">) {
  const d = path.baseplates
    .map((bp, i) => {
      const [x, y] = bp.center;
      return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
    })
    .join(" ");
  return (
    <g className="plan hallKind">
      <path
        className="bg"
        d={d}
        fill="none"
        strokeWidth={pearlRadius * 2 * SCALE}
      />
    </g>
  );
}

export default function PlanPreview({ plan }: { plan: Partial<Plan> }) {
  if (!plan) {
    return null;
  }
  if (plan.pearlRadius) {
    if (plan.kind === "cave") {
      if (plan.path!.baseplates.length === 2) {
        return caveWithTwoBaseplates(plan as any);
      }
      return caveWithOneBaseplate(plan as any);
    }
    return hall(plan as any);
  }
  if (plan.path?.baseplates.length ?? 0 > 1) {
    return <PathPreview path={plan.path!} />;
  }
  return null;
}
