import { EAST, NORTH, Point, SOUTH, WEST } from "../common/geometry";
import { MutableGrid } from "../common/grid";
import { CANTEEN, DOCKS, GEOLOGICAL_CENTER, MINING_LASER, ORE_REFINERY, POWER_STATION, SUPER_TELEPORT, SUPPORT_STATION, TELEPORT_PAD, TOOL_STORE, UPGRADE_STATION } from "../models/building";
import { BAT, CreatureFactory, ICE_MONSTER, LAVA_MONSTER, ROCK_MONSTER, SLIMY_SLUG, SMALL_SPIDER } from "../models/creature";
import { Erosion, Landslide } from "../models/hazards";
import { MinerFactory } from "../models/miner";
import { atCenterOfTile, position } from "../models/position";
import { Tile } from "../models/tiles";
import discover from "../transformers/02_plastic/04_discover";
import fence from "../transformers/02_plastic/07_fence";
import serialize from "../transformers/02_plastic/09_serialize";
import goldenTest from "./golden";

function fill<T>(
  grid: MutableGrid<T>,
  left: number,
  top: number,
  width: number,
  height: number,
  value: T,
) {
  for (let x = left; x < left + width; x++) {
    for (let y = top; y < top + height; y++) {
      grid.set(x, y, value)
    }
  }
}

const DUMMY_CAVERN = {
  briefing: {
    intro: "[INTRO]",
    success: "[SUCCESS]",
    failure: "[FAILURE]",
  },
  buildings: [],
  cameraPosition: position({x: 0, y: 0, yaw: 0, pitch: Math.PI / 4}),
  context: {
    biome: 'ice',
  },
  creatures: [],
  crystals: new MutableGrid<number>,
  erosion: new MutableGrid<Erosion>,
  landslides: new MutableGrid<Landslide>,
  miners: [],
  ore: new MutableGrid<number>,
  objectives: {},
  openCaveFlags: new MutableGrid<true>,
  script: '[SCRIPT]',
}

goldenTest('mvp', () => {
  const crystals = new MutableGrid<number>
  const tiles = new MutableGrid<Tile>
  const openCaveFlags = new MutableGrid<true>

  fill(crystals, 0, -3, 3, 3, 3)
  fill(tiles, 0, -2, 3, 1, Tile.HARD_ROCK)
  fill(tiles, 0, -2, 3, 1, Tile.LOOSE_ROCK)
  fill(tiles, 0, -1, 3, 1, Tile.DIRT)
  fill(tiles, 0, 0, 3, 2, Tile.FLOOR)
  tiles.set(2, 1, Tile.POWER_PATH)

  const buildings = [TOOL_STORE.atTile({x: 0, y: 1, facing: EAST})]
  buildings.forEach(b => b.foundation.forEach(point => tiles.set(...point, Tile.FOUNDATION)))
  openCaveFlags.set(0, 1, true)

  return serialize(
    fence(
      discover(
        {...DUMMY_CAVERN, crystals, tiles, buildings, openCaveFlags} as any
      ) as any
    ) as any
  ).serialized
})

goldenTest('building_zoo', () => {
  const tiles = new MutableGrid<Tile>
  const openCaveFlags = new MutableGrid<true>

  openCaveFlags.set(0, 0, true)
  const size = 12
  fill(tiles, 0, 0, size, size, Tile.FLOOR)

  tiles.set(5, 6, Tile.WATER)

  const buildings = [
    TOOL_STORE.atTile({x: 2, y: 0, facing: SOUTH}),
    TOOL_STORE.atTile({x: 0, y: 2, facing: EAST}),
    TOOL_STORE.atTile({x: 4, y: 2, facing: WEST}),
    TOOL_STORE.atTile({x: 2, y: 4, facing: NORTH}),

    TELEPORT_PAD.atTile({x: 6, y: 0, facing: SOUTH}),
    SUPPORT_STATION.atTile({x: 8, y: 0, facing: SOUTH}),

    CANTEEN.atTile({x: 7, y: 3, facing: WEST}),

    POWER_STATION.atTile({x: 11, y: 0, facing: SOUTH}),
    POWER_STATION.atTile({x: 10, y: 3, facing: NORTH}),
    POWER_STATION.atTile({x: 0, y: 5, facing: EAST}),
    POWER_STATION.atTile({x: 3, y: 6, facing: WEST}),

    DOCKS.atTile({x: 5, y: 5, facing: NORTH}),
    UPGRADE_STATION.atTile({x: 7, y: 5, facing: SOUTH}),
    GEOLOGICAL_CENTER.atTile({x: 9, y: 5, facing: SOUTH}),
    MINING_LASER.atTile({x: 11, y: 5, facing: SOUTH}),

    ORE_REFINERY.atTile({x: 1, y: 8, facing: EAST}),
    SUPER_TELEPORT.atTile({x: 5, y: 8, facing: NORTH}),

    TOOL_STORE.atTile({x: 8, y: 8, facing: NORTH, level: 2}),
    TOOL_STORE.atTile({x: 10, y: 8, facing: NORTH, level: 3}),

    TOOL_STORE.atTile({x: 0, y: 10, facing: SOUTH, isEssential: true}),
    TOOL_STORE.atTile({x: 2, y: 10, facing: SOUTH, teleportAtStart: true}),
    TOOL_STORE.atTile({x: 4, y: 10, facing: SOUTH,
      isEssential: true, teleportAtStart: true}),
    TOOL_STORE.atTile({x: 6, y: 10, facing: SOUTH,
      level: 3, isEssential:true, teleportAtStart: true}),
  ];

  buildings.forEach(b => b.foundation.forEach(point => tiles.set(...point, Tile.FOUNDATION)))

  return serialize(
    fence(
      discover(
        {...DUMMY_CAVERN, tiles, buildings, openCaveFlags} as any
      ) as any
    ) as any
  ).serialized
})

goldenTest('entity_zoo', () => {
  const tiles = new MutableGrid<Tile>
  const openCaveFlags = new MutableGrid<true>

  openCaveFlags.set(0, 0, true)
  const size = 12
  fill(tiles, 0, 0, size, size, Tile.FLOOR)

  const minersFacing: Point = [1.5, 1.5]
  const mf = new MinerFactory();
  const miners = [
    mf.create({
      ...atCenterOfTile({x: 0, y: 0, aimedAt: minersFacing}),
      level: 1
    }),
    mf.create({
      ...atCenterOfTile({x: 1, y: 0, aimedAt: minersFacing}),
      level: 2
    }),
    mf.create({
      ...atCenterOfTile({x: 2, y: 0, aimedAt: minersFacing}),
      level: 3
    }),
    mf.create({
      ...atCenterOfTile({x: 3, y: 0, aimedAt: minersFacing}),
      level: 4
    }),
    mf.create({
      ...atCenterOfTile({x: 4, y: 0, aimedAt: minersFacing}),
      level: 5
    }),
    mf.create({
      ...atCenterOfTile({x: 0, y: 1, aimedAt: minersFacing}),
      essential: true
    }),
    mf.create({
      ...atCenterOfTile({x: 2, y: 1, aimedAt: minersFacing}),
      unique: 'OFFICER'
    }),
    mf.create({
      ...atCenterOfTile({x: 3, y: 1, aimedAt: minersFacing}),
      unique: 'Chief'
    }),
    mf.create({
      ...atCenterOfTile({x: 0, y: 2, aimedAt: minersFacing}),
      unique: 'Axle',
      loadout: ['Drill', 'JobDriver']
    }),
    mf.create({
      ...atCenterOfTile({x: 1, y: 2, aimedAt: minersFacing}),
      unique: 'Bandit',
      loadout: ['Drill', 'JobSailor']
    }),
    mf.create({
      ...atCenterOfTile({x: 2, y: 2, aimedAt: minersFacing}),
      unique: 'Docs',
      loadout: ['Drill', 'JobGeologist']
    }),
    mf.create({
      ...atCenterOfTile({x: 3, y: 2, aimedAt: minersFacing}),
      unique: 'Jet',
      loadout: ['Drill', 'JobPilot']
    }),
    mf.create({
      ...atCenterOfTile({x: 4, y: 2, aimedAt: minersFacing}),
      unique: 'Sparks',
      loadout: ['Drill', 'JobEngineer']
    })
  ]

  const cf = new CreatureFactory()
  const creatures = [
    cf.create({template: ROCK_MONSTER, ...atCenterOfTile({ x: 5, y: 0 , facing: SOUTH})}),
    cf.create({template: ICE_MONSTER, ...atCenterOfTile({ x: 6, y: 0 , facing: SOUTH})}),
    cf.create({template: LAVA_MONSTER, ...atCenterOfTile({ x: 7, y: 0 , facing: SOUTH})}),

    cf.create({template: ROCK_MONSTER, ...atCenterOfTile({ x: 5, y: 3 , facing: NORTH}), sleep: true }),
    cf.create({template: ICE_MONSTER, ...atCenterOfTile({ x: 6, y: 3 , facing: NORTH}), sleep: true }),
    cf.create({template: LAVA_MONSTER, ...atCenterOfTile({ x: 7, y: 3 , facing: NORTH}), sleep: true }),

    cf.create({template: SLIMY_SLUG, ...atCenterOfTile({ x: 0, y: 3 , facing: EAST})}),
    cf.create({template: SLIMY_SLUG, ...atCenterOfTile({ x: 1, y: 3 , facing: WEST}), sleep: true }),

    cf.create({template: SMALL_SPIDER, ...atCenterOfTile({ x: 3, y: 3 , facing: NORTH})}),
    cf.create({template: BAT, ...atCenterOfTile({ x: 0, y: 5 , facing: NORTH})}),
  ]

  return serialize(
    fence(
      discover(
        {...DUMMY_CAVERN, tiles, miners, creatures, openCaveFlags} as any
      ) as any
    ) as any
  ).serialized
})