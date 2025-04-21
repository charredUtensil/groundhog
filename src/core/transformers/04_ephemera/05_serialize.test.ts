import { EAST, NORTH, Point, SOUTH, WEST } from "../../common/geometry";
import { MutableGrid } from "../../common/grid";
import {
  CANTEEN,
  DOCKS,
  GEOLOGICAL_CENTER,
  MINING_LASER,
  ORE_REFINERY,
  POWER_STATION,
  SUPER_TELEPORT,
  SUPPORT_STATION,
  TELEPORT_PAD,
  TOOL_STORE,
  UPGRADE_STATION,
} from "../../models/building";
import { Cavern } from "../../models/cavern";
import {
  BAT,
  CreatureFactory,
  ICE_MONSTER,
  LAVA_MONSTER,
  ROCK_MONSTER,
  SLIMY_SLUG,
  SMALL_SPIDER,
} from "../../models/creature";
import { Erosion, Landslide } from "../../models/hazards";
import { MinerFactory } from "../../models/miner";
import { atCenterOfTile, position } from "../../models/position";
import { Tile } from "../../models/tiles";
import discover from "../03_plastic/01_discover";
import fence from "../03_plastic/00_fence";
import serialize from "./05_serialize";
import goldenTest from "../../test_utils/golden";
import strataflux from "../03_plastic/04_strataflux";
import {
  CARGO_CARRIER,
  CHROME_CRUSHER,
  GRANITE_GRINDER,
  HOVER_SCOUT,
  LMLC,
  LOADER_DOZER,
  RAPID_RIDER,
  SMALL_DIGGER,
  SMALL_TRANSPORT_TRUCK,
  SMLC,
  TUNNEL_SCOUT,
  TUNNEL_TRANSPORT,
  VehicleFactory,
} from "../../models/vehicle";

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
      grid.set(x, y, value);
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
  cameraPosition: position({ x: 0, y: 0, yaw: 0, pitch: Math.PI / 4 }),
  context: {
    biome: "ice",
    heightTargetRange: 0,
  },
  creatures: [],
  crystals: new MutableGrid<number>(),
  erosion: new MutableGrid<Erosion>(),
  initialContext: {},
  landslides: new MutableGrid<Landslide>(),
  levelName: "Golden Test",
  miners: [],
  ore: new MutableGrid<number>(),
  objectives: {
    crystals: 50,
    ore: 0,
    studs: 0,
    variables: [],
  },
  openCaveFlags: new MutableGrid<true>(),
  vehicles: [],
  script: "[SCRIPT]",
};

const COMMENTS_RE = /^comments\{\n[\s\S]*?\n\}/m;

function ds(args: Partial<Cavern>) {
  return serialize(
    strataflux(
      fence(
        discover({
          ...DUMMY_CAVERN,
          ...args,
        } as any) as any,
      ) as any,
    ) as any,
  ).serialized.replace(COMMENTS_RE, "comments{\n  [REDACTED]\n}");
}

goldenTest("mvp.dat", () => {
  const crystals = new MutableGrid<number>();
  const tiles = new MutableGrid<Tile>();
  const openCaveFlags = new MutableGrid<true>();

  fill(crystals, 0, -3, 3, 3, 3);
  fill(tiles, 0, -2, 3, 1, Tile.HARD_ROCK);
  fill(tiles, 0, -2, 3, 1, Tile.LOOSE_ROCK);
  fill(tiles, 0, -1, 3, 1, Tile.DIRT);
  fill(tiles, 0, 0, 3, 2, Tile.FLOOR);
  tiles.set(2, 1, Tile.POWER_PATH);

  const buildings = [TOOL_STORE.atTile({ x: 0, y: 1, facing: EAST })];
  buildings.forEach((b) =>
    b.foundation.forEach((point) => tiles.set(...point, Tile.FOUNDATION)),
  );
  openCaveFlags.set(0, 1, true);

  return ds({
    crystals,
    tiles,
    buildings,
    openCaveFlags,
  });
});

goldenTest("building_zoo.dat", () => {
  const tiles = new MutableGrid<Tile>();
  const openCaveFlags = new MutableGrid<true>();

  openCaveFlags.set(0, 0, true);
  const size = 12;
  fill(tiles, 0, 0, size, size, Tile.FLOOR);

  tiles.set(5, 6, Tile.WATER);

  const buildings = [
    TOOL_STORE.atTile({ x: 2, y: 0, facing: SOUTH }),
    TOOL_STORE.atTile({ x: 0, y: 2, facing: EAST }),
    TOOL_STORE.atTile({ x: 4, y: 2, facing: WEST }),
    TOOL_STORE.atTile({ x: 2, y: 4, facing: NORTH }),

    TELEPORT_PAD.atTile({ x: 6, y: 0, facing: SOUTH }),
    SUPPORT_STATION.atTile({ x: 8, y: 0, facing: SOUTH }),

    CANTEEN.atTile({ x: 7, y: 3, facing: WEST }),

    POWER_STATION.atTile({ x: 11, y: 0, facing: SOUTH }),
    POWER_STATION.atTile({ x: 10, y: 3, facing: NORTH }),
    POWER_STATION.atTile({ x: 0, y: 5, facing: EAST }),
    POWER_STATION.atTile({ x: 3, y: 6, facing: WEST }),

    DOCKS.atTile({ x: 5, y: 5, facing: NORTH }),
    UPGRADE_STATION.atTile({ x: 7, y: 5, facing: SOUTH }),
    GEOLOGICAL_CENTER.atTile({ x: 9, y: 5, facing: SOUTH }),
    MINING_LASER.atTile({ x: 11, y: 5, facing: SOUTH }),

    ORE_REFINERY.atTile({ x: 1, y: 8, facing: EAST }),
    SUPER_TELEPORT.atTile({ x: 5, y: 8, facing: NORTH }),

    TOOL_STORE.atTile({ x: 8, y: 8, facing: NORTH, level: 2 }),
    TOOL_STORE.atTile({ x: 10, y: 8, facing: NORTH, level: 3 }),

    TOOL_STORE.atTile({ x: 0, y: 10, facing: SOUTH, isEssential: true }),
    TOOL_STORE.atTile({ x: 2, y: 10, facing: SOUTH, teleportAtStart: true }),
    TOOL_STORE.atTile({
      x: 4,
      y: 10,
      facing: SOUTH,
      isEssential: true,
      teleportAtStart: true,
    }),
    TOOL_STORE.atTile({
      x: 6,
      y: 10,
      facing: SOUTH,
      level: 3,
      isEssential: true,
      teleportAtStart: true,
    }),
  ];

  buildings.forEach((b) =>
    b.foundation.forEach((point) => tiles.set(...point, Tile.FOUNDATION)),
  );

  return ds({
    tiles,
    buildings,
    openCaveFlags,
  });
});

goldenTest("entity_zoo.dat", () => {
  const tiles = new MutableGrid<Tile>();
  const openCaveFlags = new MutableGrid<true>();

  openCaveFlags.set(0, 0, true);
  fill(tiles, 0, 0, 12, 12, Tile.FLOOR);
  fill(tiles, 9, 9, 3, 3, Tile.WATER);

  const minersAimedAt: Point = [1.5, 1.5];
  const mf = new MinerFactory();
  const miners = [
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 0, y: 0, aimedAt: minersAimedAt }),
      level: 1,
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 1, y: 0, aimedAt: minersAimedAt }),
      level: 2,
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 2, y: 0, aimedAt: minersAimedAt }),
      level: 3,
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 3, y: 0, aimedAt: minersAimedAt }),
      level: 4,
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 4, y: 0, aimedAt: minersAimedAt }),
      level: 5,
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 0, y: 1, aimedAt: minersAimedAt }),
      essential: true,
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 2, y: 1, aimedAt: minersAimedAt }),
      unique: "OFFICER",
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 3, y: 1, aimedAt: minersAimedAt }),
      unique: "Chief",
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 0, y: 2, aimedAt: minersAimedAt }),
      unique: "Axle",
      loadout: ["Drill", "JobDriver"],
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 1, y: 2, aimedAt: minersAimedAt }),
      unique: "Bandit",
      loadout: ["Drill", "JobSailor"],
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 2, y: 2, aimedAt: minersAimedAt }),
      unique: "Docs",
      loadout: ["Drill", "JobGeologist"],
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 3, y: 2, aimedAt: minersAimedAt }),
      unique: "Jet",
      loadout: ["Drill", "JobPilot"],
    }),
    mf.create({
      planId: 0,
      ...atCenterOfTile({ x: 4, y: 2, aimedAt: minersAimedAt }),
      unique: "Sparks",
      loadout: ["Drill", "JobEngineer"],
    }),
  ];

  const cf = new CreatureFactory();
  const creatures = [
    cf.create({
      planId: 0,
      template: ROCK_MONSTER,
      ...atCenterOfTile({ x: 5, y: 0, facing: SOUTH }),
    }),
    cf.create({
      planId: 0,
      template: ICE_MONSTER,
      ...atCenterOfTile({ x: 6, y: 0, facing: SOUTH }),
    }),
    cf.create({
      planId: 0,
      template: LAVA_MONSTER,
      ...atCenterOfTile({ x: 7, y: 0, facing: SOUTH }),
    }),

    cf.create({
      planId: 0,
      template: ROCK_MONSTER,
      ...atCenterOfTile({ x: 5, y: 3, facing: NORTH }),
      sleep: true,
    }),
    cf.create({
      planId: 0,
      template: ICE_MONSTER,
      ...atCenterOfTile({ x: 6, y: 3, facing: NORTH }),
      sleep: true,
    }),
    cf.create({
      planId: 0,
      template: LAVA_MONSTER,
      ...atCenterOfTile({ x: 7, y: 3, facing: NORTH }),
      sleep: true,
    }),

    cf.create({
      planId: 0,
      template: SLIMY_SLUG,
      ...atCenterOfTile({ x: 0, y: 3, facing: EAST }),
    }),
    cf.create({
      planId: 0,
      template: SLIMY_SLUG,
      ...atCenterOfTile({ x: 1, y: 3, facing: WEST }),
      sleep: true,
    }),

    cf.create({
      planId: 0,
      template: SMALL_SPIDER,
      ...atCenterOfTile({ x: 3, y: 3, facing: NORTH }),
    }),
    cf.create({
      planId: 0,
      template: BAT,
      ...atCenterOfTile({ x: 0, y: 5, facing: NORTH }),
    }),
  ];

  const vf = new VehicleFactory();
  const vehicles = [
    vf.create({
      planId: 0,
      template: HOVER_SCOUT,
      ...atCenterOfTile({ x: 0, y: 9, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: TUNNEL_SCOUT,
      ...atCenterOfTile({ x: 1, y: 9, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: SMALL_DIGGER,
      ...atCenterOfTile({ x: 0, y: 10, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: SMALL_TRANSPORT_TRUCK,
      ...atCenterOfTile({ x: 1, y: 10, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: SMLC,
      ...atCenterOfTile({ x: 2, y: 10, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: LOADER_DOZER,
      ...atCenterOfTile({ x: 0, y: 11, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: GRANITE_GRINDER,
      ...atCenterOfTile({ x: 2, y: 11, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: LMLC,
      ...atCenterOfTile({ x: 4, y: 11, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: CHROME_CRUSHER,
      ...atCenterOfTile({ x: 6, y: 11, facing: EAST }),
    }),
    vf.create({
      planId: 0,
      template: RAPID_RIDER,
      ...atCenterOfTile({ x: 11, y: 9, facing: WEST }),
    }),
    vf.create({
      planId: 0,
      template: CARGO_CARRIER,
      ...atCenterOfTile({ x: 11, y: 11, facing: WEST }),
    }),
    vf.create({
      planId: 0,
      template: TUNNEL_TRANSPORT,
      ...atCenterOfTile({ x: 6, y: 9, facing: WEST }),
    }),
  ];

  return ds({
    tiles,
    miners,
    creatures,
    vehicles,
    openCaveFlags,
  });
});
