import React, { ReactNode } from "react";
import { Tile } from "../../../core/models/tiles";
import { Grid } from "../../../core/common/grid";
import { Cavern } from "../../../core/models/cavern";
import { MapOverlay } from ".";

const SCALE = 6;

const UNIQUE_COLORS = [
  '#cc0000',
  '#993300',
  '#666600',
  '#339900',
  '#00cc00',
  '#009933',
  '#006666',
  '#003399',
  '#0000cc',
  '#330099',
  '#660066',
  '#990033',
]

const SCALE_COLORS = [
  '#555544',
  '#777744',
  '#999944',
  '#bbbb44',
  '#dddd44',
  '#ffff44',
] as const

const MAX_COOLDOWN = {
  landslides: 300,
  erosion: 100,
} as const

function getFill(cavern: Cavern, mapOverlay: MapOverlay, t: Tile, x: number, y: number): string | null {
  switch (mapOverlay) {
    case 'entities':
    case 'tiles':
      return t.inspectColor
    case 'crystals':
      if (t === Tile.CRYSTAL_SEAM) { return t.inspectColor }
      const c = cavern.crystals?.get(x, y) ?? 0
      if (c > 0) {
        return SCALE_COLORS[Math.min(c, SCALE_COLORS.length) - 1]
      }
      break
    case 'ore':
      if (t === Tile.ORE_SEAM) { return t.inspectColor }
      const o = cavern.ore?.get(x, y) ?? 0
      if (o > 0) {
        return SCALE_COLORS[Math.min(o, SCALE_COLORS.length) - 1]
      }
      break
    case 'discovery':
      const dz = cavern.discoveryZones?.get(x, y)
      if (dz) {
        return UNIQUE_COLORS[dz.id % UNIQUE_COLORS.length]
      }
      break
    case 'erosion':
      if (t === Tile.WATER || t === Tile.LAVA) {
        return t.inspectColor
      }
    case 'landslides':
      const cooldown = cavern[mapOverlay]?.get(x, y)?.cooldown
      if (cooldown) {
        const i = Math.floor(
          (SCALE_COLORS.length - 1) * Math.max(0, 1 - cooldown / MAX_COOLDOWN[mapOverlay])
        )
        return SCALE_COLORS[i]
      }
      break
    case 'about':
    case 'lore':
    case null:
      return null
  }
  if (t === Tile.WATER || t === Tile.LAVA) {
    return "#080022"
  }
  return t.isWall ? "#2D004B" : "#180032"
}

function getLabel(cavern: Cavern, mapOverlay: MapOverlay, t: Tile, x: number, y: number): ReactNode | null {
  switch (mapOverlay) {
    case 'crystals':
      const c = cavern.crystals?.get(x, y) ?? 0
      return c > 4 ? c.toString() : null
    case 'ore':
      const o = cavern.ore?.get(x, y) ?? 0
      return o > 4 ? o.toString() : null
    case 'landslides':
      return cavern.landslides?.get(x, y)?.cooldown.toString() ?? null
    case 'erosion':
      const er = cavern.erosion?.get(x, y)
      return er ? (<><tspan x={(x + 0.5) * SCALE}>{er.cooldown}</tspan><tspan x={(x + 0.5) * SCALE} dy="1em">+{er.initialDelay}</tspan></>) : null
    case 'about':
    case 'discovery':
    case 'entities':
    case 'lore':
    case 'tiles':
    case null:
      return null
  }
}

export default function TilesPreview({ cavern, mapOverlay }: { cavern: Cavern, mapOverlay: MapOverlay }) {
  if (!cavern.tiles || !mapOverlay) {
    return <></>
  }
  return (
    <g className={`tiles ${mapOverlay}Overlay`}>
      {cavern.tiles.map((t, x, y) => {
        const fill = getFill(cavern, mapOverlay, t, x, y)
        const label = getLabel(cavern, mapOverlay, t, x, y)
        if (!fill) {
          return <></>
        }
        return (
          <>
            <rect
              className="tile"
              fill={fill}
              x={x * SCALE}
              y={y * SCALE}
              width={SCALE}
              height={SCALE} />
            {label && <text className="label" x={(x + 0.5) * SCALE} y={(y + 0.5) * SCALE}>{label}</text>}
          </>
        );
      })}
    </g>
  );
}
