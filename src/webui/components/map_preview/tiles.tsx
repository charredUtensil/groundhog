import React, { ReactNode } from "react";
import { Tile } from "../../../core/models/tiles";
import { Cavern } from "../../../core/models/cavern";
import { MapOverlay } from ".";
import styles from "./style.module.scss";

const SCALE = 6;

const SCALE_COLORS = [
  "#555544",
  "#777744",
  "#999944",
  "#bbbb44",
  "#dddd44",
  "#ffff44",
  "#ffff66",
  "#ffff88",
] as const;

const MAX_COOLDOWN = {
  landslides: 300,
  erosion: 100,
} as const;

function getBoundsFill(mapOverlay: MapOverlay): string | null {
  switch (mapOverlay) {
    case "entities":
    case "tiles":
      return Tile.SOLID_ROCK.inspectColor;
    default:
      return null;
  }
}

function getFill(
  cavern: Cavern,
  mapOverlay: MapOverlay,
  t: Tile,
  x: number,
  y: number,
): string | null {
  switch (mapOverlay) {
    case "overview": {
      for (let ox = -1; ox <= 1; ox++) {
        for (let oy = -1; oy <= 1; oy++) {
          if (cavern.discoveryZones?.get(x + ox, y + oy)?.openOnSpawn) {
            return t.inspectColor;
          }
        }
      }
      return null;
    }
    case "entities":
      if (t === Tile.FOUNDATION) {
        return t.inspectColor;
      }
      break;
    case "tiles":
      return t.inspectColor;
    case "crystals":
      {
        if (t.crystalYield > 0) {
          return t.inspectColor;
        }
        const c = cavern.crystals?.get(x, y) ?? 0;
        if (c > 0) {
          return SCALE_COLORS[Math.min(c, SCALE_COLORS.length) - 1];
        }
      }
      break;
    case "ore":
      {
        if (t.oreYield > 4) {
          return t.inspectColor;
        }
        const o = (cavern.ore?.get(x, y) ?? 0) + t.oreYield;
        if (o > 0) {
          return SCALE_COLORS[Math.min(o, SCALE_COLORS.length) - 1];
        }
      }
      break;
    case "discovery":
      {
        const dz = cavern.discoveryZones?.get(x, y);
        if (dz) {
          return dz.openOnSpawn ? "#FFFF44" : "#882222";
        }
      }
      break;
    case "erosion":
      if (t === Tile.WATER || t === Tile.LAVA) {
        return t.inspectColor;
      }
    // Fall through
    case "landslides":
      const cooldown = cavern[mapOverlay]?.get(x, y)?.cooldown;
      if (cooldown) {
        const i = Math.floor(
          (SCALE_COLORS.length - 1) *
            Math.max(0, 1 - cooldown / MAX_COOLDOWN[mapOverlay]),
        );
        return SCALE_COLORS[i];
      }
      break;
    case "about":
    case "height":
    case "lore":
    case null:
      return null;
  }
  if (t === Tile.WATER || t === Tile.LAVA) {
    return "#080022";
  }
  return t.isWall ? "#2D004B" : "#180032";
}

function getTitle(
  cavern: Cavern,
  mapOverlay: MapOverlay,
  t: Tile,
  x: number,
  y: number,
): ReactNode {
  switch (mapOverlay) {
    case "crystals": {
      const c = cavern.crystals?.get(x, y) ?? 0;
      const d = t.crystalYield;
      return (
        c + d > 0 &&
        `${t.isWall ? "Yields " : ""}${c}${d > 0 ? ` + ${d} from ${t.name}` : ""}`
      );
    }
    case "ore": {
      const o = cavern.ore?.get(x, y) ?? 0;
      const d = t.oreYield;
      return (
        o + d > 0 &&
        `${t.isWall ? "Yields " : ""}${o}${d > 0 ? ` + ${d} from ${t.name}` : ""}`
      );
    }
    case "landslides": {
      const ls = cavern.landslides?.get(x, y);
      return ls && `${ls.cooldown} sec cooldown`;
    }
    case "erosion": {
      const er = cavern.erosion?.get(x, y);
      return (
        er &&
        `${er.cooldown} sec cooldown + ${er.initialDelay} sec initial delay`
      );
    }
    case "discovery":
      const dz = cavern.discoveryZones?.get(x, y);
      return (
        dz && `${dz.openOnSpawn ? "Cavern" : "Undiscovered cavern"} ${dz.id}`
      );
    case "overview":
    case "tiles":
      return t.name;
    case "about":
    case "entities":
    case "height":
    case "lore":
    case null:
      return null;
  }
}

export default function TilesPreview({
  cavern,
  mapOverlay,
}: {
  cavern: Cavern;
  mapOverlay: MapOverlay;
}) {
  if (!cavern.tiles || !mapOverlay) {
    return null;
  }
  const boundsFill = getBoundsFill(mapOverlay);
  return (
    <g
      className={`${styles.tiles} ${styles[`${mapOverlay}Overlay`]}`}
      style={{ scale: `${SCALE}` }}
    >
      {boundsFill && cavern.top && (
        <rect
          className={styles.bounds}
          fill={boundsFill}
          x={cavern.left!}
          y={cavern.top!}
          width={cavern.right! - cavern.left!}
          height={cavern.bottom! - cavern.top!}
        />
      )}
      {cavern.tiles.map((t, x, y) => {
        const fill = getFill(cavern, mapOverlay, t, x, y);
        const title = getTitle(cavern, mapOverlay, t, x, y);
        if (!fill) {
          return null;
        }
        return (
          <rect
            key={`${x},${y}`}
            className={styles.tile}
            fill={fill}
            x={x}
            y={y}
            width={1}
            height={1}
          >
            {title && <title>{title}</title>}
          </rect>
        );
      })}
    </g>
  );
}
