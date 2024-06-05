import { Architect } from "../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { Rough, RoughOyster } from "./utils/oyster";
import { intersectsAny, intersectsOnly, isDeadEnd } from "./utils/intersects";
import { getPlaceRechargeSeams, sprinkleOre } from "./utils/resources";
import { atCenterOfTile, randomlyInTile } from "../models/position";
import { pickPoint } from "./utils/placement";
import { escapeString, eventChain, mkVars, scriptFragment } from "./utils/script";
import { SUPPORT_STATION } from "../models/building";
import { Tile } from "../models/tiles";
import { VehicleTemplate } from "../models/vehicle";

type Metadata = {
  readonly minersCount: number,
  readonly vehicles: VehicleTemplate[],
}

const g = mkVars("gNomads", [
  "messageBuiltBase",
  "onBuiltBase",
])

const BASE: PartialArchitect<Metadata> & {isNomads: true} = {
  ...DefaultCaveArchitect,
  crystals: () => 5,
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const minersCount = rng.betaInt({a: 1, b: 3, min: 1, max: 4})
    const vehicles: VehicleTemplate[] = [];
    return {minersCount, vehicles};
  },
  placeRechargeSeam: getPlaceRechargeSeams(1),
  placeBuildings: ({plan, tiles, openCaveFlags}) => {
    openCaveFlags.set(...pickPoint(plan, (x, y) => {
      const t = tiles.get(x, y);
      return !!t && !t.isWall;
    })!, true);
  },
  placeEntities: ({
    cavern,
    plan,
    miners,
    minerFactory,
    vehicles,
    vehicleFactory,
    setCameraPosition,
  }) => {
    const rng = cavern.dice.placeEntities(plan.id);
    const [x, y] = pickPoint(plan, (x, y) => {
      const t = cavern.tiles.get(x, y);
      return !!t && !t.isWall && !t.isFluid;
    })!;
    const aimedAt = plan.path.baseplates[0].center;
    setCameraPosition({
      ...atCenterOfTile({x, y, aimedAt}),
      pitch: Math.PI / 4,
    });
    for (let i = 0; i < plan.metadata.minersCount; i++) {
      miners.push(minerFactory.create(randomlyInTile({x, y, rng})));
    }
    vehicles.push(...plan.metadata.vehicles.map(
      template => {
        if (template.kind === 'sea') {
          const p = pickPoint(plan, (x, y) => cavern.tiles.get(x, y) === Tile.WATER);
          if (!p) {
            throw new Error(`Failed to place sea vehicle in plan ${plan.id}`);
          }
          return vehicleFactory.create({
            ...randomlyInTile({ x: p[0], y: p[1], rng }), template
          });
        }
        return vehicleFactory.create({
          ...randomlyInTile({ x, y, rng }), template
        });
      }
    ));
  },
  scriptGlobals({ cavern }) {
    if (cavern.plans.some(plan => (plan.architect as any).isHq)) {
      return undefined;
    }

    const msg = escapeString(
      cavern.lore.generateNomadsSettled(cavern.dice).text);

    return scriptFragment(
      '# Nomads Globals',
      `string ${g.messageBuiltBase}="${msg}"`,
      eventChain(
        g.onBuiltBase,
        `msg:${g.messageBuiltBase};`,
      ),
      `if(${SUPPORT_STATION.id}.new)[${g.onBuiltBase}]`,
    );
  },
  isNomads: true,
};

const NOMAD_SPAWN: readonly Architect<Metadata>[] = [
  {
    name: "Nomad Spawn",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    crystals: ({plan}) => Math.max(plan.crystalRichness * plan.perimeter, 5),
    ore: ({plan}) => Math.max(plan.oreRichness * plan.perimeter, 10),
    placeOre: (args) => {
      return sprinkleOre(1, args);
    },
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      intersectsOnly(cavern.plans, plan, null) &&
      (isDeadEnd(plan) ? 1 : 0.1),
  },
  {
    name: "Nomad Spawn Peninsula",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, grow: 2 },
      { of: Rough.BRIDGE_ON_WATER, width: 2, grow: 0.5 },
      { of: Rough.FLOOR },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    prime: () => ({minersCount: 1, vehicles: [VehicleTemplate.RAPID_RIDER]}),
    spawnBid: ({ cavern, plan }) =>
      plan.fluid === Tile.WATER &&
      plan.pearlRadius > 4 &&
      intersectsAny(cavern.plans, plan, null) &&
      0.5,
  },
  {
    name: "Nomad Spawn Lava Peninsula",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, grow: 2 },
      { of: Rough.BRIDGE_ON_LAVA, width: 2, grow: 0.5 },
      { of: Rough.FLOOR },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    prime: () => ({minersCount: 1, vehicles: [VehicleTemplate.TUNNEL_SCOUT]}),
    spawnBid: ({ cavern, plan }) =>
      plan.fluid === Tile.LAVA &&
      plan.pearlRadius > 4 &&
      intersectsAny(cavern.plans, plan, null) &&
      0.5,
  },
];
export default NOMAD_SPAWN;