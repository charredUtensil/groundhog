import React from "react";
import { Plan } from "../../../core/models/plan";
import PathPreview from "./path";
import { Path } from "../../../core/models/path";
import "./style.scss";

const SCALE = 6;

function getGClassName(plan: Partial<Plan>) {
  const r = ["plan"];
  plan.kind && r.push(`${plan.kind}Kind`);
  plan.fluid && r.push(`fluid${plan.fluid.id}`);
  plan.hasErosion && r.push("hasErosion");
  return r.join(" ");
}

function drawRadius(pearlRadius: number) {
  return pearlRadius + 1;
}

function caveWithOneBaseplate(plan: Partial<Plan>) {
  const [x, y] = plan.path!.baseplates[0].center;
  return (
    <>
      <circle
        className="bg"
        cx={x * SCALE}
        cy={y * SCALE}
        r={drawRadius(plan.pearlRadius!) * SCALE}
      />
      <text className="fg" x={x * SCALE} y={y * SCALE}>{plan.id}</text>
      {plan.architect && <text className="fg architect" x={x * SCALE} y={y * SCALE}>{plan.architect.name}</text>}
    </>
  );
}

// TODO: I tried making AI write this but it's subtly janky and the points are
// definitely not in the right place. Rewrite this and do it properly. This probably
// requires breaking out the paper & pencil do do _actual geometry_.
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

function caveWithTwoBaseplates(plan: Partial<Plan>) {
  const [a, b] = plan.path!.baseplates.map((bp) => {
    const [x, y] = bp.center;
    return {
      x: x * SCALE,
      y: y * SCALE,
      radius: drawRadius(bp.pearlRadius) * SCALE,
    };
  });

  const [x0, y0] = plan.path!.baseplates[0].center
  return (<>
    <path className="bg" d={dWrapping(a, b)} />
    <text className="fg id" x={x0 * SCALE} y={y0 * SCALE}>{plan.id}</text>
      {plan.architect && <text className="fg architect" x={x0 * SCALE} y={y0 * SCALE}>{plan.architect.name}</text>}
  </>)
}

function hall(plan: Partial<Plan>) {
  const bps = plan.path!.baseplates
  const d = bps.map((bp, i) => {
      const [x, y] = bp.center;
      return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
    })
    .join(" ");
  return (
    <>
      <path
        id={`plan${plan.id}`}
        className="bg"
        d={d}
        fill="none"
        strokeWidth={drawRadius(plan.pearlRadius!) * 2 * SCALE}
      />
      <text className="fg">
        <textPath href={`#plan${plan.id}`} startOffset="50%">
          {plan.id}
        </textPath>
      </text>
      {plan.architect && (
        <text className="fg architect">
          <textPath href={`#plan${plan.id}`} startOffset="50%">
            {plan.architect.name}
          </textPath>
        </text>
      )}
    </>
  );
}

export default function PlanPreview({ plan }: { plan: Partial<Plan> }) {
  if (!plan) {
    return null;
  }
  if (plan.pearlRadius) {
    return (
      <g className={getGClassName(plan)}>
        {plan.kind === "cave"
          ? plan.path!.baseplates.length === 2
            ? caveWithTwoBaseplates(plan)
            : caveWithOneBaseplate(plan)
          : hall(plan)}
      </g>
    );
  }
  if (plan.path?.baseplates.length ?? 0 > 1) {
    return <PathPreview path={plan.path!} />;
  }
  return null;
}
