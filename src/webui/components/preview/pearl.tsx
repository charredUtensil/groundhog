import React from "react"
import { adjacent8 } from "../../../core/common/geometry"
import { pairMap } from "../../../core/common/utils"
import { Pearled } from "../../../core/models/plan"
import "./pearl.scss"

const SCALE = 6;

function dPearl(layer: ReadonlyArray<readonly [number, number]>) {
  if (layer.length === 0) {
    return ''
  }
  const result = pairMap(layer, ([x1, y1], [x2, y2]) => {
    const cmd = adjacent8([x1, y1], [x2, y2]) ? 'L' : 'M'
    return `${cmd}${x2 * SCALE} ${y2 * SCALE}`
  })
  const [x0, y0] = layer[0]
  return `M${x0 * SCALE} ${y0 * SCALE} ${result.join(' ')}`
}

export default function PearlPreview({plan, pearl}: {plan: Pearled, pearl: 'innerPearl' | 'outerPearl'}) {
  const io = pearl === 'outerPearl' ? plan.innerPearl.length : 0
  return (
    <g  key={`pearl${plan.id}`} className={`pearl ${pearl} ${plan.kind}Kind`}>
      {plan[pearl].map((layer, i) => (
        <path
          className={`layer layer${(i + io) % 4}`}
          d={dPearl(layer)}
          fill="none"
          />
      ))}
    </g>
  )
}