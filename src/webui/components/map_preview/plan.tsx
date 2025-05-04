import React, { ReactNode } from "react";
import { Plan } from "../../../core/models/plan";
import PathPreview from "./path";
import styles from "./style.module.scss";
import { Cavern } from "../../../core/models/cavern";
import { Point } from "../../../core/common/geometry";
import { filterTruthy } from "../../../core/common/utils";
import { MapOverlay } from ".";

const SCALE = 6;

function drawRadius(pearlRadius: number) {
  return pearlRadius + 1;
}

function caveWithOneBaseplate(plan: Partial<Plan<any>>) {
  const [x, y] = plan.path!.baseplates[0].center;
  return (
    <circle
      className={styles.bg}
      cx={x * SCALE}
      cy={y * SCALE}
      r={drawRadius(plan.pearlRadius!) * SCALE}
    />
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
  const prime1 = {
    x: Math.cos(angleAB - angleBAC),
    y: Math.sin(angleAB - angleBAC),
  };
  const prime2 = {
    x: Math.cos(angleAB + angleBAC),
    y: Math.sin(angleAB + angleBAC),
  };
  const aPrime1 = [a.x + a.radius * prime1.x, a.y + a.radius * prime1.y];
  const aPrime2 = [a.x + a.radius * prime2.x, a.y + a.radius * prime2.y];
  const bPrime1 = [b.x + b.radius * prime1.x, b.y + b.radius * prime1.y];
  const bPrime2 = [b.x + b.radius * prime2.x, b.y + b.radius * prime2.y];

  // Create SVG path segments
  return [
    `M ${aPrime2.join(",")}`,
    `A ${a.radius},${a.radius} 0 1 1 ${aPrime1.join(",")}`,
    `L ${bPrime1.join(",")}`,
    `A ${b.radius},${b.radius} 0 0 1 ${bPrime2.join(",")} Z`,
  ].join("");
}

function caveWithTwoBaseplates(plan: Partial<Plan<any>>) {
  const [a, b] = plan.path!.baseplates.map((bp) => {
    const [x, y] = bp.center;
    return {
      x: x * SCALE,
      y: y * SCALE,
      radius: drawRadius(bp.pearlRadius) * SCALE,
    };
  });

  return <path className={styles.bg} d={dWrapping(a, b)} />;
}

function hall(plan: Partial<Plan<any>>) {
  const bps = plan.path!.baseplates;
  const d = bps
    .map((bp, i) => {
      const [x, y] = bp.center;
      return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
    })
    .join(" ");
  return (
    <path
      className={styles.bg}
      d={d}
      fill="none"
      strokeWidth={drawRadius(plan.pearlRadius!) * 2 * SCALE}
    />
  );
}

export default function PlansPreview({
  cavern,
  mapOverlay,
}: {
  cavern: Cavern;
  mapOverlay: MapOverlay;
}) {
  if (!cavern.plans) {
    return null;
  }

  function getGClassName(plan: Partial<Plan<any>>) {
    return filterTruthy([
      styles.plan,
      plan.kind && styles[`${plan.kind}Kind`],
      plan.path?.kind && styles[`${plan.path.kind}PathKind`],
      plan.fluid && styles[`fluid${plan.fluid.id}`],
      plan.hasErosion && styles["hasErosion"],
      (plan.architect?.script || plan.architect?.scriptGlobals) &&
        styles["hasScript"],
      plan.id === cavern.anchor && styles["isAnchor"],
    ]).join(" ");
  }

  // First, determine the center coordinate for all plans.
  const planCoords: Point[] = [];
  cavern.plans.forEach((plan) => {
    const bp = plan.path.baseplates;

    const i = Math.floor((bp.length - 1) / 2);
    const j = Math.floor(bp.length / 2);
    if (i === j) {
      planCoords[plan.id] = bp[i].center;
    } else {
      const [ix, iy] = bp[i].center;
      const [jx, jy] = bp[j].center;
      planCoords[plan.id] = [(ix + jx) / 2, (iy + jy) / 2];
    }
  });

  // Sort plans horizontally and split into two even columns.
  const right = [...cavern.plans];
  right.sort((a, b) => planCoords[b.id][0] - planCoords[a.id][0]);
  const left = right.splice(Math.floor(right.length / 2));
  // Sort plans vertically.
  right.sort((a, b) => planCoords[a.id][1] - planCoords[b.id][1]);
  left.sort(
    (a, b) =>
      planCoords[a.id][1] - planCoords[b.id][1] ||
      planCoords[a.id][0] - planCoords[b.id][0],
  );

  function drawLabels(
    plans: NonNullable<Cavern["plans"]>,
    sign: -1 | 1,
    className: string,
  ): ReactNode {
    if (mapOverlay === "script") {
      return null;
    }
    if (mapOverlay === "overview") {
      return plans.map((plan) => {
        const bps = plan.path.baseplates;
        if (bps.length <= 1) {
          const [x, y] = bps[0].center;
          return (
            <g
              key={plan.id}
              className={`${styles.inline} ${getGClassName(plan)}`}
            >
              <text className={styles.label} x={x * SCALE} y={y * SCALE}>
                {"architect" in plan && plan.architect?.name} {plan.id}
              </text>
            </g>
          );
        }
        const d = bps
          .map((bp, i) => {
            const [x, y] = bp.center;
            return `${i === 0 ? "M" : "L"}${x * SCALE} ${y * SCALE}`;
          })
          .join(" ");
        return (
          <g
            key={plan.id}
            className={`${styles.inline} ${getGClassName(plan)}`}
          >
            <path id={`planLabel${plan.id}`} d={d} fill="none" />
            <text className={styles.label}>
              <textPath href={`#planLabel${plan.id}`} startOffset="50%">
                {"architect" in plan && plan.architect?.name} {plan.id}
              </textPath>
            </text>
          </g>
        );
      });
    }
    let py = -Infinity;
    const targetSize = cavern.context?.targetSize ?? 0;
    return plans.map((plan, i) => {
      const px = SCALE * planCoords[plan.id][0];
      py = Math.max(SCALE * planCoords[plan.id][1], py + 4);
      const lx = ((SCALE * targetSize) / 2 + 50) * sign;
      const ly = SCALE * targetSize * ((i + 1) / plans.length - 0.5);
      const bx = lx - Math.abs(py - ly) * 0.56 * sign;
      const d = filterTruthy([
        `M ${lx + 25 * sign} ${ly}`,
        `L ${lx} ${ly}`,
        bx * sign > px * sign && `L ${bx} ${py}`,
        `L ${px} ${py}`,
      ]).join("");
      return (
        <g key={plan.id} className={`${className} ${getGClassName(plan)}`}>
          <path className={styles.pointer} d={d} />
          <text className={styles.label} x={lx + 25 * sign} y={ly}>
            {"architect" in plan && plan.architect?.name ? (
              <>
                {plan.architect.name}
                {!plan.hops?.length && "*"} {plan.id}
              </>
            ) : (
              <>{plan.id}</>
            )}
          </text>
        </g>
      );
    });
  }

  return (
    <>
      {cavern.plans.map((plan) => {
        if ("pearlRadius" in plan) {
          return (
            <g key={plan.id} className={getGClassName(plan)}>
              {plan.kind === "cave"
                ? plan.path.baseplates.length === 2
                  ? caveWithTwoBaseplates(plan)
                  : caveWithOneBaseplate(plan)
                : hall(plan)}
            </g>
          );
        }
        if (plan.path.baseplates.length ?? 0 > 1) {
          return <PathPreview key={plan.id} path={plan.path} />;
        }
        return null;
      })}
      {drawLabels(left, -1, styles.left)}
      {drawLabels(right, 1, styles.right)}
    </>
  );
}
