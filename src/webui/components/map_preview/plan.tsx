import React from "react";
import { Plan } from "../../../core/models/plan";
import PathPreview from "./path";
import styles from "./style.module.scss";

const SCALE = 6;

function getGClassName(plan: Partial<Plan>) {
  const r = [styles.plan];
  plan.kind && r.push(styles[`${plan.kind}Kind`]);
  plan.fluid && r.push(styles[`fluid${plan.fluid.id}`]);
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
        className={styles.bg}
        cx={x * SCALE}
        cy={y * SCALE}
        r={drawRadius(plan.pearlRadius!) * SCALE}
      />
      <text className={styles.fg} x={x * SCALE} y={y * SCALE}>
        {plan.id}
      </text>
      {plan.architect && (
        <text
          className={`${styles.fg} ${styles.architect}`}
          x={x * SCALE}
          y={y * SCALE}
        >
          {plan.architect.name}
        </text>
      )}
    </>
  );
}

function dWrapping(
  a: { x: number; y: number; radius: number },
  b: { x: number; y: number; radius: number },
): string {
  // There's no "picture" comments here, so accept this explanation that
  // vaguely resembles the geometry proofs I literally haven't had to deal
  // with in like 20 years.

  // Given: Two circles with centers A and B.
  // Given: Point A' which is on the circumference of A
  // Given: Point A'' which is the reflection of A' over line AB
  // Given: Point B' which is on the circumference of B
  // Given: Point B'' which is the reflection of B' over line AB
  // Given: The radius of A is greater than B
  if (a.radius < b.radius) {
    [a, b] = [b, a];
  }
  // First, get the polar coordinates of B relative to A.
  const [dx, dy] = [b.x - a.x, b.y - a.y];
  const lengthAB = Math.hypot(dx, dy);
  const angleAB = Math.atan2(dy, dx);

  // Create point C on AA'
  // Create a line BC which is perpendicular to AA'
  // ABC is a right triangle with hypotenuse AB
  // We know the length of AB and AC. Find angle BAC
  const lengthAC = a.radius - b.radius;
  const angleBAC = Math.acos(lengthAC / lengthAB);

  // This is enough to determine the locations of all the points.
  const prime1 = {x: Math.cos(angleAB - angleBAC), y: Math.sin(angleAB - angleBAC)};
  const prime2 = {x: Math.cos(angleAB + angleBAC), y: Math.sin(angleAB + angleBAC)};
  const aPrime1 = [a.x + a.radius * prime1.x, a.y + a.radius * prime1.y];
  const aPrime2 = [a.x + a.radius * prime2.x, a.y + a.radius * prime2.y];
  const bPrime1 = [b.x + b.radius * prime1.x, b.y + b.radius * prime1.y];
  const bPrime2 = [b.x + b.radius * prime2.x, b.y + b.radius * prime2.y];

  // Create SVG path segments
  return [
    `M ${aPrime2.join(',')}`,
    `A ${a.radius},${a.radius} 0 1 1 ${aPrime1.join(',')}`,
    `L ${bPrime1.join(',')}`,
    `A ${b.radius},${b.radius} 0 0 1 ${bPrime2.join(',')} Z`, 
  ].join();
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

  const [x0, y0] = plan.path!.baseplates[0].center;
  return (
    <>
      <path className={styles.bg} d={dWrapping(a, b)} />
      <text
        className={`${styles.fg} ${styles.id}`}
        x={x0 * SCALE}
        y={y0 * SCALE}
      >
        {plan.id}
      </text>
      {plan.architect && (
        <text
          className={`${styles.fg} ${styles.architect}`}
          x={x0 * SCALE}
          y={y0 * SCALE}
        >
          {plan.architect.name}
        </text>
      )}
    </>
  );
}

function hall(plan: Partial<Plan>) {
  const bps = plan.path!.baseplates;
  const d = bps
    .map((bp, i) => {
      const [x, y] = bp.center;
      return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
    })
    .join(" ");
  return (
    <>
      <path
        id={`plan${plan.id}`}
        className={styles.bg}
        d={d}
        fill="none"
        strokeWidth={drawRadius(plan.pearlRadius!) * 2 * SCALE}
      />
      <text className={styles.fg}>
        <textPath href={`#plan${plan.id}`} startOffset="50%">
          {plan.id}
        </textPath>
      </text>
      {plan.architect && (
        <text className={`${styles.fg} ${styles.architect}`}>
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
