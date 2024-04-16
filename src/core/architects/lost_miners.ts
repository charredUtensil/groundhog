import { Point } from "../common/geometry";
import { Architect } from "../models/architect";
import { PlannedCavern } from "../models/cavern";
import { randomlyInTile } from "../models/position";
import { Tile } from "../models/tiles";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { Rough, RoughOyster } from "./utils/oyster";
import { mkVars, transformPoint } from "./utils/script";

type Metadata = {
  readonly lostMinersCount: number;
};

const g = mkVars("gFoundMiners", [
  "lostMinersCount",
  "onFoundAll",
  "messageFoundAll",
  "done",
]);

export function countLostMiners(cavern: PlannedCavern) {
  let lostMiners: number = 0;
  let lostMinerCaves: number = 0;
  cavern.plans.forEach((plan) => {
    const metadata = plan.metadata as Partial<Metadata> | undefined;
    if (metadata?.lostMinersCount) {
      lostMinerCaves++;
      lostMiners += metadata.lostMinersCount;
    }
  });
  return { lostMiners, lostMinerCaves };
}

const BASE: PartialArchitect<Metadata> = {
  ...DefaultCaveArchitect,
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const lostMinersCount = rng.betaInt({ a: 1, b: 2, min: 1, max: 5 });
    return { lostMinersCount };
  },
  placeEntities: ({ cavern, plan, tiles, miners, minerFactory }) => {
    const [x, y] = plan.innerPearl[0][0];
    tiles.set(x, y, Tile.FLOOR); // Ensure this tile is a floor tile just in case.
    const rng = cavern.dice.placeEntities(plan.id);
    for (let i = 0; i < plan.metadata.lostMinersCount; i++) {
      miners.push(minerFactory.create({ ...randomlyInTile({ x, y, rng }) }));
    }
  },
  objectives: ({cavern}) => {
    const {lostMiners, lostMinerCaves} = countLostMiners(cavern);
    const description = lostMiners === 1
      ? 'Find the lost Rock Raider'
      : lostMinerCaves === 1
        ? 'Find the cave with the lost Rock Radiers'
        : `Find ${lostMiners} lost Rock Raiders`
    return ({ 
      variables: [{ condition: `${g.done}>0`, description}],
      sufficient: true,
    });
  },
  scriptGlobals({ cavern }) {
    const lostMiners = countLostMiners(cavern);
    const message = "???";
    return `# Lost Miners Globals
int ${g.lostMinersCount}=${lostMiners}
int ${g.done}=0
string ${g.messageFoundAll}="${message}"
${g.onFoundAll}::;
msg:${g.messageFoundAll};
wait:3;
${g.done}=1;
`;
  },
  script({ cavern, plan }) {
    const lostMinersPoint = transformPoint(
      cavern,
      plan.innerPearl[0][0],
    );
    const message = "???";
    const v = mkVars(`p${plan.id}FoundMiners`, [
      "messageDiscover",
      "onDiscover",
      "onIncomplete",
    ]);
    return `# Found Lost Miners ${plan.id}
string ${v.messageDiscover}="${message}"
if(change:${lostMinersPoint})[${v.onDiscover}]
${v.onDiscover}::;
pan:${lostMinersPoint};
${g.lostMinersCount}=${g.lostMinersCount}-${plan.metadata.lostMinersCount};
((${g.lostMinersCount}>0))[${v.onIncomplete}][${g.onFoundAll}];

${v.onIncomplete}::;
msg:${v.messageDiscover};
`;
  },
};

// The L.M.S. Explorer's teleporters just seem to be real lousy in ice
// caverns for some reason.
const MULTIPLIERS = { rock: 1.0, ice: 1.4, lava: 0.7 } as const;

const LOST_MINERS: readonly Architect<Metadata>[] = [
  {
    name: "Lost Miners",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, shrink: 1, grow: 2 },
      { of: Rough.ALWAYS_LOOSE_ROCK, grow: 1 },
      { of: Rough.HARD_ROCK, grow: 0.5 },
    ),
    caveBid: ({ cavern, plans, plan }) =>
      !plan.fluid &&
      plan.pearlRadius >= 2 &&
      plan.pearlRadius < 10 &&
      plans.reduce((r, p) => r + ("architect" in p ? 0 : 1), 0) <= 3 &&
      MULTIPLIERS[cavern.context.biome],
  },
];

export default LOST_MINERS;
