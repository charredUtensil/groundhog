import { Baseplate } from "../../models/baseplate";
import {
  CavernWithBaseplatesAndPaths,
  CavernWithPartialPlans,
} from "../../models/cavern";
import { Path } from "../../models/path";
import { Negotiated, Plan } from "../../models/plan";

/*
 * Returns whether these Baseplates can be combined into one big Cave.
 * Must call this both ways.
 */
function isMergeable(a: Baseplate, b: Baseplate): boolean {
  for (const [ua, ub, va1, va2, vb1, vb2] of [
    [a.right, b.left, a.top, a.bottom, b.top, b.bottom],
    [a.bottom, b.top, a.left, a.right, b.left, b.right],
  ]) {
    if (
      ua === ub &&
      Math.min(va2, vb2) - Math.max(va1, vb1) >
        Math.max(va2 - va1, vb2 - vb1) / 2
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Assign Baseplates and Paths to Plans.
 */
export default function negotiate(
  cavern: CavernWithBaseplatesAndPaths,
): CavernWithPartialPlans<Negotiated> {
  const bpIsInBigCave: boolean[] = [];
  const queue: Pick<Plan, "kind" | "path">[][] = [[], [], []];

  const paths: Path[] = [
    ...cavern.paths.filter((path) => path.kind === "spanning"),
    ...cavern.paths.filter((path) => path.kind === "auxiliary"),
  ];

  paths.forEach((path) => {
    if (path.baseplates.length === 2) {
      const [a, b] = path.baseplates;
      if (
        !bpIsInBigCave[a.id] &&
        !bpIsInBigCave[b.id] &&
        (isMergeable(a, b) || isMergeable(b, a))
      ) {
        bpIsInBigCave[a.id] = true;
        bpIsInBigCave[b.id] = true;
        queue[2].push({ path, kind: "cave" });
        return;
      }
    }
    queue[0].push({ path, kind: "hall" });
  });

  queue[1] = cavern.baseplates
    .filter((bp) => bp.kind === "cave" && !bpIsInBigCave[bp.id])
    .map((bp) => ({ path: new Path(-1, "single", [bp]), kind: "cave" }));

  const plans: Negotiated[] = queue
    .flatMap((a) => a)
    .map((plan, id) => ({ ...plan, id }));

  return { context: cavern.context, plans };
}