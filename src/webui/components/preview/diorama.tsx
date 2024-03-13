import React from "react";
import { Path } from "../../../core/models/path";
import { Diorama } from "../../../core/models/diorama";

const SCALE = 6;

function TilesPreview({ tiles }: { tiles: Diorama["tiles"] }) {
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

export default function DioramaPreview({
  diorama,
}: {
  diorama: Partial<Diorama>;
}) {
  return (
    <g className="diorama">
      {diorama.tiles && <TilesPreview tiles={diorama.tiles!} />}
    </g>
  );
}
