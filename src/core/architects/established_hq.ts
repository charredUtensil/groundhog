import Delaunator from "delaunator";
import { Point, plotLine } from "../common/geometry";
import { Architect } from "../models/architect";
import { Building, GEOLOGICAL_CENTER, MINING_LASER, POWER_STATION, SUPER_TELEPORT, SUPPORT_STATION, TELEPORT_PAD, TOOL_STORE, UPGRADE_STATION } from "../models/building";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { MakeBuildingFn, getBuildings } from "./utils/buildings";
import { Rough, RoughOyster } from "./utils/oyster";
import { position } from "../models/position";
import { getPlaceRechargeSeams } from "./utils/resources";

const T0_BUILDINGS = [
  TOOL_STORE,
] as const
const T1_BUILDINGS = [
  TELEPORT_PAD,
  POWER_STATION,
  SUPPORT_STATION,
] as const
const T2_BUILDINGS = [
  UPGRADE_STATION,
  GEOLOGICAL_CENTER,
  MINING_LASER,
] as const
const T3_BUILDINGS = [
  MINING_LASER,
  MINING_LASER,
] as const

function getPlaceBuildings(): Architect<unknown>['placeBuildings'] {
  return (args) => {
    const rng = args.cavern.dice.placeBuildings(args.plan.id)
    let crystalBudget = rng.uniformInt({min: 3, max: Math.max(10, args.plan.crystals / 3)})

    const tq = [
      ...T0_BUILDINGS,
      ...rng.shuffle(T1_BUILDINGS),
      ...rng.shuffle(T2_BUILDINGS),
      ...rng.shuffle(T3_BUILDINGS),
    ]
    const bq: MakeBuildingFn[] = []
    for (const bt of tq) {
      if (crystalBudget > bt.crystals) {
        bq.push((pos) => bt.atTile(pos))
        crystalBudget -= bt.crystals
      }
    }
    const buildings = getBuildings({from: 2, queue: bq}, args);
    buildings.forEach(b => {
      b.foundation.forEach(([x, y]) =>
        args.tiles.set(x, y, Tile.FOUNDATION),
      );
      args.buildings.push(b)
    })

    const getPorch: (b: Building) => Point = b => b.foundation[b.foundation.length - 1]

    const points = buildings.flatMap(getPorch);
    const delaunay = new Delaunator(points);
    for (let i = 0; i < delaunay.triangles.length; i++) {
      if (i > delaunay.halfedges[i]) {
        const source = buildings[delaunay.triangles[i]];
        const dest =
          buildings[delaunay.triangles[i + (i % 3 === 2 ? -2 : 1)]];
        for (const point of plotLine(getPorch(source), getPorch(dest))) {
          if (args.tiles.get(...point) === Tile.FLOOR) {
            args.tiles.set(...point, Tile.POWER_PATH)
          }
        }
      }
    }

    const [xt, yt] = buildings.reduce(([x, y], b) => [x + b.x, y + b.y], [0, 0])
    args.setCameraPosition(position({
      x: buildings[0].x,
      y: buildings[0].y,
      aimedAt: [xt / buildings.length, yt / buildings.length],
      pitch: Math.PI / 4,
    }))

  }
}

const BASE: PartialArchitect<unknown> & Pick<Architect<unknown>, 'rough' | 'roughExtent'> = {
  ...DefaultCaveArchitect,
  ...new RoughOyster(
    {of: Rough.ALWAYS_FLOOR, grow: 2},
    {of: Rough.FLOOR, grow: 2},
    {of: Rough.DIRT, width: 0, grow: 0.5},
    {of: Rough.DIRT_OR_LOOSE_ROCK, grow: 0.25},
    {of: Rough.HARD_ROCK, grow: 0.25},
  ),
  crystals: ({ plan }) => plan.crystalRichness * plan.perimeter + 10,
  placeRechargeSeam: getPlaceRechargeSeams(1),
}

export const ESTABLISHED_HQ: readonly Architect<unknown>[] = [
  {
    name: 'Established HQ Spawn',
    ...BASE,
    placeBuildings: getPlaceBuildings(),
    spawnBid: ({ plan }) => !plan.fluid && plan.pearlRadius > 5 && 1,
  }
]