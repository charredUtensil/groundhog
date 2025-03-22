import { Architect } from "../../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "../default";
import { mkRough, Rough } from "../utils/rough";
import {
  chainFragment,
  EventChainLine,
  mkVars,
  transformPoint,
} from "../utils/script";
import { Plan } from "../../models/plan";
import { monsterSpawnScript } from "../utils/creature_spawners";
import { SEISMIC_BASE, gSeismic } from "./base";
import { monsterForBiome } from "../../models/creature";
import { randomlyInTile } from "../../models/position";
import { PearledPlan } from "../../transformers/01_planning/06_pearl";
import { NEIGHBORS8, offsetBy, Point } from "../../common/geometry";
import { Tile } from "../../models/tiles";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";
import { DiscoveryZone } from "../../models/discovery_zone";
import { filterTruthy } from "../../common/utils";

type Metadata = {
  readonly tag: "seismic";
};

const sVars = (plan: Plan<any>) =>
  mkVars(`p${plan.id}SmBBa`, ["boss", "onTrip", "doArm", "tripCount"]);

function getAdjacentDzs(
  cavern: PreprogrammedCavern,
  pos: Point,
): DiscoveryZone[] {
  const result: DiscoveryZone[] = [];
  NEIGHBORS8.forEach((o) => {
    const dz = cavern.discoveryZones.get(...offsetBy(pos, o));
    if (dz && !dz.openOnSpawn) {
      result[dz.id] = dz;
    }
  });
  return filterTruthy(result);
}

function getRevealGroups(
  cavern: PreprogrammedCavern,
  plan: PearledPlan<Metadata>,
  dLayer: number,
) {
  // There is a bug in Manic Miners where caves don't become
  // "discovered" properly when more than one discovery zone is
  // revealed in the same tick. Prevent this while making the monster
  // reveal more dramatic by breaking the reveal up into multiple
  // events. Each event will reveal at most one discovery zone, with
  // the final reveal revealing the monster.
  const sLayer = dLayer;
  const dzPoints: Point[][] = [];
  const penultimatePoints: Point[] = [];
  const monsterRevealPoints: Point[] = [];
  plan.innerPearl.forEach((layer, lyi) => {
    if (lyi < dLayer) {
      // Ignore anything in the center
    } else if (lyi < dLayer + 2) {
      // The ring around the monster den - always last
      monsterRevealPoints.push(
        ...layer.filter((pos) => cavern.tiles.get(...pos)?.isWall),
      );
    } else {
      // Remaining points: Anything that is part of one other plan goes in that
      // group. Anything that is part of more than one goes in the "mixed" bin.
      layer.forEach((pos) => {
        const isSpoke = cavern.pearlInnerDex
          .get(...pos)
          ?.some(
            (layerInSpoke, spokePlanId) =>
              spokePlanId !== plan.id && layerInSpoke < sLayer,
          );
        if (isSpoke) {
          const dzs = getAdjacentDzs(cavern, pos);
          (dzs.length === 1
            ? (dzPoints[dzs[0].id] ||= [])
            : penultimatePoints
          ).push(pos);
        }
      });
    }
  });
  return [...filterTruthy(dzPoints), penultimatePoints, monsterRevealPoints];
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
          tiles.set(...pos, Tile.WASTE_RUBBLE_4);
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
  script: ({ cavern, plan, sb }) => {
    const v = sVars(plan);

    const discoPoint = plan.innerPearl[0][0];
    const boss = cavern.creatures.find((c) => c.planId === plan.id)!;
    sb.declareCreature(v.boss, boss);

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
    const revealGroups = getRevealGroups(cavern, plan, dLayer);

    sb.declareInt(v.tripCount, 0);
    let totalTrips = 0;
    revealGroups.forEach((group, gi) => {
      if (gi < revealGroups.length - 1) {
        group.forEach((pos) => {
          const isWall = cavern.tiles.get(...pos)?.isWall;
          const tv = isWall ? 3 : 1;
          totalTrips += tv;
          sb.if(
            `${isWall ? "drill" : "enter"}:${transformPoint(cavern, pos)}`,
            `${v.tripCount}+=${tv};`,
          );
        });
      }
    });
    sb.if(
      `${v.tripCount}>=${Math.ceil(totalTrips / 4)}`,
      `wait:random(5)(30);`,
      `shake:1;`,
      `${gSeismic.showMessage}+=1;`,
      `wait:random(15)(60);`,
      `shake:2;`,
      `pan:${transformPoint(cavern, [Math.floor(boss.x), Math.floor(boss.y)])};`,
      `wait:1;`,
      `shake:4;`,
      ...revealGroups.map(
        (group, gi) =>
          gi < revealGroups.length - 1 &&
          chainFragment(
            ...group
              .filter((pos) => cavern.tiles.get(...pos)?.isWall)
              .map(
                (pos) =>
                  `drill:${transformPoint(cavern, pos)};` satisfies EventChainLine,
              ),
            `wait:0.25;` satisfies EventChainLine,
          ),
      ),
      `shake:5;`,
      ...revealGroups[revealGroups.length - 1]
        .filter((pos) => cavern.tiles.get(...pos)?.isWall)
        .map(
          (pos) =>
            `drill:${transformPoint(cavern, pos)};` satisfies EventChainLine,
        ),
    );
    sb.if(
      `change:${transformPoint(cavern, discoPoint)}`,
      `${v.tripCount}=9999;`,
      `${v.doArm};`,
    );
  },
  monsterSpawnScript: (args) =>
    monsterSpawnScript(args, {
      armEvent: sVars(args.plan).doArm,
      tripOnArmed: "first",
    }),
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
      plans[cavern.anchor].metadata?.tag !== "pandora" &&
      plan.pearlRadius >= 5 &&
      plan.path.baseplates.length === 1 &&
      !plan.intersects.some((_, i) => plans[i].metadata?.tag === "seismic") &&
      cavern.context.planWhimsy * 0.1,
  },
] as const satisfies readonly Architect<Metadata>[];

export default BOSS_BATTLE;
