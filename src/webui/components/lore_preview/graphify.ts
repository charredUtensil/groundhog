import { Phrase } from "../../../core/lore/builder";
import { State } from "../../../core/lore/lore";

export type Link = {
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
};

export type Graph<T> = {
  readonly positions: {
    readonly node: T;
    readonly x: number;
    readonly y: number;
  }[];
  readonly links: Link[];
};

export function graphify<
  T extends {
    readonly id: number;
    readonly before: readonly T[];
    readonly after: readonly T[];
  },
>(nodes: readonly T[]): Graph<T> {
  const lanes: (
    | {
        readonly destinations: true[];
        y0: number;
      }
    | undefined
  )[] = [];

  const positions: {
    readonly node: T;
    readonly x: number;
    readonly y: number;
  }[] = [];
  const links: Link[] = [];
  for (const node of nodes) {
    // Choose a lane for the next node. It should be the first empty lane
    // or the first lane that has this node in it.
    const lane = (() => {
      for (let i = 0; i < lanes.length; i++) {
        if (!lanes[i] || lanes[i]!.destinations[node.id]) {
          return i;
        }
      }
      return lanes.length;
    })();
    // Convert lanes to links where they point at this node.
    for (let i = 0; i < lanes.length; i++) {
      const atLane = lanes[i];
      if (atLane?.destinations[node.id]) {
        delete atLane.destinations[node.id];
        if (atLane.destinations.some((v) => v)) {
          if (atLane.y0 < node.id - 1) {
            links.push({
              x1: i,
              y1: atLane.y0,
              x2: i,
              y2: node.id - 1,
            });
          }
          links.push({
            x1: i,
            y1: node.id - 1,
            x2: lane,
            y2: node.id,
          });
          atLane.y0 = node.id - 1;
        } else {
          links.push({
            x1: i,
            y1: atLane.y0,
            x2: lane,
            y2: node.id,
          });
          delete lanes[i];
        }
      }
    }
    // Merge lanes that have become identical.
    for (let i = 0; i < lanes.length; i++) {
      if (lanes[i]?.destinations.some((v) => v)) {
        for (let j = i + 1; j < lanes.length; j++) {
          if (
            !lanes[i]?.destinations.some((_, k) => !lanes[j]?.destinations[k])
          ) {
            links.push({
              x1: j,
              y1: node.id - 1,
              x2: i,
              y2: node.id,
            });
            links.push({
              x1: j,
              y1: lanes[j]!.y0,
              x2: j,
              y2: node.id - 1,
            });
            lanes[i]?.destinations.forEach(
              (_, k) => delete lanes[j]!.destinations[k],
            );
            if (lanes[j]?.destinations.some((v) => v)) {
              lanes[j]!.y0 = node.id - 1;
            } else {
              delete lanes[j];
            }
          }
        }
      }
    }
    // If the lane for this node has other destinations, fork it.
    if (lanes[lane]) {
      for (let i = lane + 1; i <= lanes.length; i++) {
        if (!lanes[i]) {
          links.push({
            x1: lane,
            y1: node.id - 1,
            x2: i,
            y2: node.id,
          });
          lanes[i] = {
            destinations: [...lanes[lane]!.destinations],
            y0: node.id,
          };
          delete lanes[lane];
          break;
        }
      }
    }
    // Push the node itself.
    positions.push({ node, x: lane, y: node.id });
    // Apply the lane afterward.
    if (node.after.length > 0) {
      const after = (() => {
        const destinations: true[] = [];
        for (const n of node.after) {
          destinations[n.id] = true;
        }
        return { destinations, y0: node.id };
      })();
      (() => {
        if (!after.destinations[node.id + 1]) {
          const al = after.destinations.join(" ");
          for (let i = 0; i < lanes.length; i++) {
            if (lanes[i]?.destinations.join(" ") === al) {
              links.push({
                x1: lane,
                y1: node.id,
                x2: i,
                y2: node.id + 1,
              });
              return;
            }
          }
        }
        lanes[lane] = after;
      })();
    }
  }
  return { positions, links };
}
