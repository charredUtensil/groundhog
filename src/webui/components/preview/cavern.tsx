import React, { ReactElement, ReactNode, useState } from "react";
import { Cavern } from "../../../core/models/cavern";
import "./cavern.css";
import { Baseplate } from "../../../core/models/baseplate";
import { Path } from "../../../core/models/path";
import { Plan } from "../../../core/models/plan";

const SCALE = 6;
const SVG_WIDTH = 800;
const SVG_HEIGHT = 600;

export default function CavernPreview({ cavern }: { cavern: Cavern }) {
  return (
    <div className="cavernPreview">
      <div>seed: {cavern.context.seed}</div>
      <svg
        className="map"
        style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
        viewBox={`${SVG_WIDTH / -2} ${SVG_HEIGHT / -2} ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {cavern.baseplates?.map((bp) => <BaseplatePreview baseplate={bp} />)}
        {cavern.paths?.map((pa) => <PathPreview path={pa} />)}
        {cavern.plans?.map((pl) => <PlanPreview plan={pl} />)}
      </svg>
    </div>
  );
}

function BaseplatePreview({ baseplate }: { baseplate: Baseplate }) {
  return (
    <g className={`baseplate ${baseplate.kind}Kind`}>
      <rect
        x={baseplate.left * SCALE}
        y={baseplate.top * SCALE}
        width={baseplate.width * SCALE}
        height={baseplate.height * SCALE}
      />
      <text x={baseplate.left * SCALE} y={baseplate.top * SCALE + 8}>
        {baseplate.id}
      </text>
    </g>
  );
}

function PathPreview({ path }: { path: Path }) {
  const d = path.baseplates
    .map((bp, i) => {
      const [x, y] = bp.center;
      return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
    })
    .join(" ");
  return (
    <g className={`path ${path.kind}Kind`}>
      <path id={`path${path.id}`} d={d} fill="none" />
      <text>
        <textPath href={`#path${path.id}`} startOffset="25%">
          {path.id}
        </textPath>
      </text>
    </g>
  );
}

function createWrappingPath(
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

function PlanPreview({ plan }: { plan: Partial<Plan> }) {
  if (!plan) {
    return null;
  }
  if (plan.pearlRadius) {
    return (
      <g className="plan">
        {(() => {
          const path = plan.path!;
          if (plan.kind === "cave") {
            if (path.baseplates.length === 2) {
              const [a, b] = path.baseplates.map((bp) => {
                const [x, y] = bp.center;
                return {
                  x: x * SCALE,
                  y: y * SCALE,
                  radius: bp.pearlRadius * SCALE,
                };
              });

              return <path d={createWrappingPath(a, b)} fill="white" />;
            }
            const [x, y] = path.baseplates[0].center;
            return (
              <circle
                cx={x * SCALE}
                cy={y * SCALE}
                r={plan.pearlRadius * SCALE}
              />
            );
          }
          const d = path.baseplates
            .map((bp, i) => {
              const [x, y] = bp.center;
              return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
            })
            .join(" ");
          return (
            <path
              d={d}
              fill="none"
              stroke="white"
              strokeWidth={plan.pearlRadius * 2 * SCALE}
            />
          );
        })()}
      </g>
    );
  }
  if (plan.path?.baseplates.length ?? 0 > 1) {
    return <PathPreview path={plan.path!} />;
  }
  return null;
}
