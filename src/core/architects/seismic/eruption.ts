import { Architect } from "../../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "../default";
import { mkRough, Rough, weightedSprinkle } from "../utils/rough";
import { mkVars, scriptFragment, transformPoint } from "../utils/script";
import { Plan } from "../../models/plan";
import { monsterSpawnScript } from "../utils/creature_spawners";
import { Tile } from "../../models/tiles";
import { plotLine, Point } from "../../common/geometry";
import { PreprogrammedCavern } from "../../transformers/04_ephemera/03_preprogram";
import { placeErosion } from "../utils/hazards";
import { SEISMIC_BASE, gSeismic, METADATA } from "./base";

const sVars = (plan: Plan<any>) =>
  mkVars(`p${plan.id}SE`, [`doSpawn`, "tripCount"]);

function getEruptPoints(
  cavern: PreprogrammedCavern,
  plan: Plan<typeof METADATA>,
) {
  const [b0x, b0y] = plan.path.baseplates[0].center;
  const [b1x, b1y] = plan.path.baseplates[1].center;
  const theta = Math.atan2(b1y - b0y, b1x - b0x);
  const h = plan.pearlRadius + 2;
  const dx = Math.sin(theta) * h;
  const dy = Math.cos(theta) * h;
  const cx = (b0x + b1x) / 2;
  const cy = (b0y + b1y) / 2;
  const result: Point[] = [];
  for (const to of [
    [cx - dx, cy + dy],
    [cx + dx, cy - dy],
  ] satisfies Point[]) {
    let first = true;
    for (const pos of plotLine([cx, cy], to)) {
      if (first) {
        first = false;
        if (result.length) {
          continue;
        }
      }
      const t = cavern.tiles.get(...pos);
      if (!t || t.isFluid) {
        break;
      }
      result.push(pos);
    }
  }
  return result;
}

const BASE: PartialArchitect<typeof METADATA> = {
  ...DefaultCaveArchitect,
  ...SEISMIC_BASE,
  placeErosion: (args) => placeErosion(25, 2, args),
  script: ({ cavern, plan, sh }) => {
    const v = sVars(plan);
    const eps = getEruptPoints(cavern, plan);
    const tripsForeshadow = 10;
    const trips = 20;

    return scriptFragment(
      `# P${plan.id}: Seismic (Eruption)`,
      sh.declareInt(v.tripCount, 0),
      ...eps.map(
        (pos) =>
          `when(enter:${transformPoint(cavern, pos)})[${v.tripCount}+=1]`,
      ),
      ...eps.map(
        (pos) =>
          `if(change:${transformPoint(cavern, pos)}:${Tile.LAVA.id})[${v.tripCount}=${trips + 1}]`,
      ),
      sh.trigger(
        `if(${v.tripCount}>=${tripsForeshadow})`,
        `wait:random(5)(20);`,
        `shake:1;`,
        `${gSeismic.showMessage}+=1;`,
      ),
      sh.trigger(
        `if(${v.tripCount}>=${trips})`,
        `wait:random(30)(150);`,
        `shake:2;`,
        `pan:${transformPoint(cavern, eps[0])};`,
        `wait:1;`,
        `shake:4;`,
        ...eps.map(
          (pos) =>
            `place:${transformPoint(cavern, pos)},${Tile.LAVA.id};` satisfies `${string};`,
        ),
        cavern.context.hasMonsters && `${v.doSpawn};`,
      ),
    );
  },
  monsterSpawnScript: (args) => {
    return monsterSpawnScript(args, {
      armEvent: sVars(args.plan).doSpawn,
      triggerOnFirstArmed: true,
    });
  },
};

const ERUPTION = [
  {
    name: "Seismic.Eruption",
    ...BASE,
    ...mkRough(
      { of: Rough.FLOOR, grow: 2 },
      { of: Rough.DIRT, width: 0, grow: 0.1 },
      {
        of: weightedSprinkle(
          { item: Rough.DIRT, bid: 0.25 },
          { item: Rough.LOOSE_ROCK, bid: 1 },
        ),
        grow: 1,
      },
      { of: Rough.MIX_LOOSE_HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ cavern, plan, plans }) =>
      !plan.fluid &&
      plan.hasErosion &&
      cavern.context.biome !== "ice" &&
      plan.path.baseplates.length === 2 &&
      !plan.intersects.some(
        (_, i) =>
          plans[i].fluid === Tile.WATER || plans[i].metadata?.tag === "seismic",
      ) &&
      1,
  },
] as const satisfies readonly Architect<typeof METADATA>[];

export default ERUPTION;
