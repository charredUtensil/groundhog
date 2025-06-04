import React, { ReactNode } from "react";
import { Tile } from "../../../core/models/tiles";
import { Cavern } from "../../../core/models/cavern";
import { MapOverlay } from ".";
import styles from "./style.module.scss";

const SCALE = 6;

const SCALE_COLORS = 8;

const MAX_EROSION = 600;
const MAX_LANDSLIDE = 300;

// tk - Use color used for tile in LRR radar screen
function tk(t: Tile) {
  return `tile${t.id}`;
}

// dk - Lowlight in order to highlight other things
const DK = {
  [Tile.WATER.id]: "dwater",
  [Tile.LAVA.id]: "dlava",
  [Tile.SOLID_ROCK.id]: "dsolid",
} as { [K: number]: string | undefined };

function dk(t: Tile) {
  return DK[t.id] ?? (t.isWall ? "dwall" : "dfloor");
}

// sk - Scaled values
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
    case "erosion": {
      if (t === Tile.WATER || t === Tile.LAVA) {
        return tk(t);
      }
      const er = cavern.erosion?.get(x, y);
      if (!er) {
        return dk(t);
      }
      if (er === true) {
        return sk(SCALE_COLORS - 1);
      }
      const cooldown = er.cooldown * 4 + er.initialDelay;
      return sk((SCALE_COLORS - 1) * Math.max(0, 1 - cooldown / MAX_EROSION));
    }
    case "landslides": {
      const ls = cavern.landslides?.get(x, y);
      if (!ls) {
        return dk(t);
      }
      const cooldown = ls.cooldown;
      return sk((SCALE_COLORS - 1) * Math.max(0, 1 - cooldown / MAX_LANDSLIDE));
    }
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
    case "objectives": {
      if (
        cavern.objectives?.crystals &&
        (t.crystalYield > 0 || cavern.crystals?.get(x, y))
      ) {
        return tk(Tile.CRYSTAL_SEAM);
      }
      if (
        (cavern.objectives?.ore || cavern.objectives?.studs) &&
        (t.oreYield > 0 || cavern.ore?.get(x, y))
      ) {
        return tk(Tile.ORE_SEAM);
      }
      return dk(t);
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
      const s = d > 0 ? `${c} + ${d} from ${t.name}` : c;
      return c + d > 0 && (t.isWall ? `Yields ${s}` : `${s} on ground`);
    }
    case "ore": {
      const o = cavern.ore?.get(x, y) ?? 0;
      const d = t.oreYield;
      const s = d > 0 ? `${o} + ${d} from ${t.name}` : o;
      return o + d > 0 && (t.isWall ? `Yields ${s}` : `${s} on ground`);
    }
    case "landslides": {
      const ls = cavern.landslides?.get(x, y);
      return ls && `${ls.cooldown}s`;
    }
    case "erosion": {
      const er = cavern.erosion?.get(x, y);
      if (er === true) {
        return null;
      }
      return er && `${er.cooldown}s cooldown + ${er.initialDelay}s delay`;
    }
    case "discovery": {
      const dz = cavern.discoveryZones?.get(x, y);
      return (
        dz && `${dz.openOnSpawn ? "Cavern" : "Undiscovered cavern"} ${dz.id}`
      );
    }
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
