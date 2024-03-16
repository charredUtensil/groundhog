import React from "react";
import { Tile } from "../../../core/models/tiles";
import { Grid } from "../../../core/common/grid";

const SCALE = 6;

export default function TilesPreview({ tiles }: { tiles: Grid<Tile> }) {
  return (
    <g className="tiles">
      {tiles.map((t, x, y) => (
        <rect
          fill={t.inspectColor}
          x={(x - 0.5) * SCALE}
          y={(y - 0.5) * SCALE}
          width={SCALE}
          height={SCALE}
        />
      ))}
    </g>
  );
}
