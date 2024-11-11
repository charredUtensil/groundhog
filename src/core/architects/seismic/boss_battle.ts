import { Architect } from "../../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "../default";
import { mkRough, Rough } from "../utils/rough";
import { EventChainLine, mkVars, transformPoint } from "../utils/script";
import { Plan } from "../../models/plan";
import { monsterSpawnScript } from "../utils/creature_spawners";
import { SEISMIC_BASE, gSeismic } from "./base";
import { monsterForBiome } from "../../models/creature";
import { randomlyInTile } from "../../models/position";
import { PearledPlan } from "../../transformers/01_planning/06_pearl";
import { Point } from "../../common/geometry";
import { FoundationPlasticCavern } from "../../transformers/02_masonry/00_foundation";
import { filterTruthy } from "../../common/utils";
import { Tile } from "../../models/tiles";

type Metadata = {
  readonly tag: "seismic";
};

const sVars = (plan: Plan<any>) =>
  mkVars(`p${plan.id}SmBBa`, ["boss", "onTrip", "doArm", "tripCount"]);

function findSpokes(
  cavern: FoundationPlasticCavern,
  plan: PearledPlan<Metadata>,
  dLayer: number,
) {
  const result: Point[][] = [];
  const max = Math.min(dLayer + 3, plan.pearlRadius);
  for (let i = dLayer + 1; i <= max; i++) {
    plan.innerPearl[i].forEach((pos) => {
      const bucket = cavern.pearlInnerDex
        .get(...pos)
        ?.reduce((r: number | null, layerInOther, otherId) => {
          if (r !== null) {
            return r;
          }
          if (otherId !== plan.id && layerInOther < 2) {
            return otherId;
          }
          return null;
        }, null);
      if (bucket) {
        (result[bucket] ||= []).push(pos);
      }
    });
  }
  debugger;
  return filterTruthy(result);
}

const BASE: PartialArchitect<Metadata> = {
  ...DefaultCaveArchitect,
  ...SEISMIC_BASE,
  placeBuildings: ({ plan, tiles }) => {
    for (let i = 0; i < plan.pearlRadius; i++) {
      let found = false;
      for (const pos of plan.innerPearl[i]) {
        if (tiles.get(...pos) === Tile.FLOOR) {
          found = true;
          tiles.set(...pos, Tile.LANDSLIDE_RUBBLE_4);
        }
      }
      if (!found) {
        break;
      }
    }
    return {};
  },
  placeEntities: ({ cavern, plan, creatureFactory }) => {
    const monsterPos = plan.innerPearl[0][0];
    const rng = cavern.dice.placeEntities(plan.id);
    const boss = creatureFactory.create({
      template: monsterForBiome(cavern.context.biome),
      planId: plan.id,
      sleep: false,
      ...randomlyInTile({ rng, x: monsterPos[0], y: monsterPos[1], scale: 2 }),
    });
    return { creatures: [boss] };
  },
  script: ({ cavern, plan, sh }) => {
    const v = sVars(plan);

    const discoPoint = plan.innerPearl[0][0];
    const boss = cavern.creatures.find((c) => c.planId === plan.id)!;

    // Find the inner layer of solid rock.
    let dLayer = 1;
    while (true) {
      const layer = plan.innerPearl[dLayer];
      const walls = layer.reduce(
        (r, pos) => (cavern.tiles.get(...pos)?.isWall ? r + 1 : r),
        0,
      );
      if (walls * 2 >= layer.length) {
        break;
      }
      dLayer++;
    }
    const spokes = findSpokes(cavern, plan, dLayer);

    let totalTrips = 0;

    sh.declareCreature(v.boss, boss);
    sh.declareInt(v.tripCount, 0);
    spokes.forEach((spoke) =>
      spoke.forEach((pos) => {
        if (cavern.pearlInnerDex.get(...pos)![plan.id] > dLayer + 1) {
          const isWall = cavern.tiles.get(...pos)?.isWall;
          const tv = isWall ? 3 : 1;
          totalTrips += tv;
          sh.if(
            `${isWall ? "drill" : "enter"}:${transformPoint(cavern, pos)}`,
            `${v.tripCount}+=${tv};`,
          );
        }
      }),
    );
    sh.if(
      `${v.tripCount}>=${Math.ceil(totalTrips / 4)}`,
      `wait:random(5)(30);`,
      `shake:1;`,
      `${gSeismic.showMessage}+=1;`,
      `wait:random(15)(60);`,
      `shake:2;`,
      `pan:${transformPoint(cavern, [Math.floor(boss.x), Math.floor(boss.y)])};`,
      `wait:1;`,
      `shake:4;`,
      ...spokes.flatMap(
        (spoke) =>
          [
            ...spoke
              .filter(
                (pos) =>
                  cavern.tiles.get(...pos)?.isWall &&
                  cavern.pearlInnerDex.get(...pos)![plan.id] <= dLayer + 2,
              )
              .flatMap(
                (pos) =>
                  [
                    `drill:${transformPoint(cavern, pos)};`,
                  ] satisfies EventChainLine[],
              ),
            // There is a bug in Manic Miners where caves don't become
            // "discovered" properly when more than one discovery zone is
            // revealed in the same tick. Prevent this while making the monster
            // reveal more dramatic.
            `wait:0.25;` satisfies EventChainLine,
          ] satisfies EventChainLine[],
      ),
      `shake:5;`,
      ...plan.innerPearl[dLayer]
        .filter((pos) => cavern.tiles.get(...pos)?.isWall)
        .map(
          (pos) =>
            `drill:${transformPoint(cavern, pos)};` satisfies EventChainLine,
        ),
    );
    sh.if(
      `change:${transformPoint(cavern, discoPoint)}`,
      `${v.tripCount}=9999;`,
      `${v.doArm};`,
    );
  },
  monsterSpawnScript: (args) => {
    return monsterSpawnScript(args, {
      armEvent: sVars(args.plan).doArm,
      tripOnArmed: "first",
    });
  },
};

const BOSS_BATTLE = [
  {
    name: "Seismic.BossBattle",
    ...BASE,
    ...mkRough(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 1 },
      { of: Rough.ALWAYS_SOLID_ROCK, width: 2 },
      { of: Rough.MIX_LOOSE_HARD_ROCK, shrink: 1 },
      { of: Rough.MIX_AT_MOST_DIRT_LOOSE_ROCK, grow: 1 },
      { of: Rough.MIX_FRINGE, shrink: 1 },
      { of: Rough.VOID, width: 0, grow: 1 },
    ),
    caveBid: ({ cavern, plan, plans }) =>
      !plan.fluid &&
      cavern.context.hasMonsters &&
      plan.pearlRadius >= 5 &&
      plan.path.baseplates.length === 1 &&
      !plan.intersects.some((_, i) => plans[i].metadata?.tag === "seismic") &&
      0.1,
  },
] as const satisfies readonly Architect<Metadata>[];

export default BOSS_BATTLE;
