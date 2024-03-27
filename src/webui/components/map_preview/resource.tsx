import React from "react";
import { Grid } from "../../../core/common/grid";
import './style.scss'

const SCALE = 6

export default function ResourcePreview({ore, crystals}: {ore?: Grid<number>, crystals?: Grid<number>}) {
  return (
    <>
    { ore && (
      <g className="ore">
        {ore.map((n, x, y) => (
          <circle
            className='ring'
            cx={(x + 0.25) * SCALE}
            cy={(y + 0.25) * SCALE}
            r={n * SCALE / 4}
          />
        ))}
      </g>
    )}
      { crystals && (
        <g className="crystals">
          {crystals.map((n, x, y) => (
            <circle
              className='ring'
              cx={(x + 0.75) * SCALE}
              cy={(y + 0.75) * SCALE}
              r={n * SCALE / 4}
            />
          ))}
        </g>
      )}
    </>)
}