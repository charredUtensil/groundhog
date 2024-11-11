import React, { ReactNode } from "react";
import { Tile } from "../../../core/models/tiles";
import { Cavern } from "../../../core/models/cavern";
import { MapOverlay } from ".";
import styles from "./style.module.scss";

const SCALE = 6;

const SCALE_COLORS = 8;

const MAX_COOLDOWN = {
  landslides: 300,
  erosion: 100,
} as const;

function tk(t: Tile) {
  return `tile${t.id}`;
}

function dk(t: Tile) {
  if (t === Tile.WATER || t === Tile.LAVA) {
    return "dfluid";
  }
  return t.isWall ? "dwall" : "dfloor";
}

function sk(s: number) {
  return `scale${Math.min(Math.floor(s), SCALE_COLORS - 1)}`;
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
            return tk(t);
          }
        }
      }
      return null;
    }
    case "entities":
      if (t === Tile.FOUNDATION || t === Tile.POWER_PATH) {
        return tk(t);
      }
      return dk(t);
    case "tiles":
      return tk(t);
    case "crystals": {
      if (t.crystalYield > 0) {
        return tk(t);
      }
      const c = cavern.crystals?.get(x, y) ?? 0;
      if (c > 0) {
        return sk(c - 1);
      }
      return dk(t);
    }
    case "ore": {
      if (t.oreYield > 4) {
        return tk(t);
      }
      const o = (cavern.ore?.get(x, y) ?? 0) + t.oreYield;
      if (o > 0) {
        return sk(o - 1);
      }
      return dk(t);
    }
    case "discovery": {
      const dz = cavern.discoveryZones?.get(x, y);
      if (dz) {
        return dz.openOnSpawn ? "disco0" : "disco1";
      }
      return dk(t);
    }
    case "erosion":
      if (t === Tile.WATER || t === Tile.LAVA) {
        return tk(t);
      }
    // Fall through
    case "landslides":
      const cooldown = cavern[mapOverlay]?.get(x, y)?.cooldown;
      if (cooldown) {
        return sk(
          (SCALE_COLORS - 1) *
            Math.max(0, 1 - cooldown / MAX_COOLDOWN[mapOverlay]),
        );
      }
      return dk(t);
    case "oxygen": {
      const aeration = cavern.aerationLog?.get(x, y);
      if (!aeration) {
        return dk(t);
      }
      if (cavern.crystals?.get(x, y)) {
        return "oxhc";
      }
      return t.isWall ? tk(t) : "oxex";
    }
    case "script":
      return dk(t);
  }
  return null;
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
    default:
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
  return (
    <g className={styles.tiles} style={{ scale: `${SCALE}` }}>
      {cavern.tiles.map((t, x, y) => {
        const fill = getFill(cavern, mapOverlay, t, x, y);
        if (!fill) {
          return null;
        }
        const title = getTitle(cavern, mapOverlay, t, x, y);
        const [tx, ty] = cavern.top
          ? [x - cavern.left!, y - cavern.top]
          : [x, y];
        return (
          <rect
            key={`${x},${y}`}
            className={styles.tile}
            fill={`var(--pvw-${fill})`}
            x={x}
            y={y}
            width={1}
            height={1}
          >
            {title && (
              <title>
                {tx}, {ty}: {title}
              </title>
            )}
          </rect>
        );
      })}
    </g>
  );
}
