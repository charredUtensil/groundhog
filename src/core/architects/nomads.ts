import { Architect } from "../models/architect";
import { DefaultCaveArchitect, PartialArchitect } from "./default";
import { Rough, RoughOyster } from "./utils/oyster";
import { intersectsOnly } from "./utils/intersects";
import { getPlaceRechargeSeams } from "./utils/resources";
import { atCenterOfTile, randomlyInTile } from "../models/position";
import { pickPoint } from "./utils/placement";
import { escapeString, eventChain, mkVars, scriptFragment } from "./utils/script";
import { SUPPORT_STATION } from "../models/building";

type Metadata = {
  readonly minersCount: number
}

const g = mkVars("gNomads", [
  "messageBuiltToolStore",
  "onBuiltToolStore",
])

const BASE: PartialArchitect<Metadata> & {isNomads: true} = {
  ...DefaultCaveArchitect,
  crystals: () => 5,
  prime: ({ cavern, plan }) => {
    const rng = cavern.dice.prime(plan.id);
    const minersCount = rng.betaInt({a: 1, b: 3, min: 1, max: 4})
    return {minersCount};
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
  },
  scriptGlobals({ cavern }) {
    if (cavern.plans.some(plan => (plan.architect as any).isHq)) {
      return undefined;
    }

    const msg = escapeString(
      cavern.lore.generateNomadsSettled(cavern.dice).text);

    return scriptFragment(
      '# Nomads Globals',
      `string ${g.messageBuiltToolStore}="${msg}"`,
      eventChain(
        g.onBuiltToolStore,
        `msg:${g.messageBuiltToolStore};`,
      ),
      `if(${SUPPORT_STATION.id}.new)[${g.onBuiltToolStore}]`,
    );
  },
  isNomads: true,
};

const NOMAD_SPAWN: readonly Architect<unknown>[] = [
  {
    name: "Nomad Spawn",
    ...BASE,
    ...new RoughOyster(
      { of: Rough.ALWAYS_FLOOR, width: 2, grow: 2 },
      { of: Rough.AT_MOST_LOOSE_ROCK, grow: 1 },
      { of: Rough.AT_MOST_HARD_ROCK },
    ),
    spawnBid: ({ cavern, plan }) =>
      !plan.fluid &&
      plan.pearlRadius > 0 &&
      intersectsOnly(cavern.plans, plan, null) &&
      0.1,
  },
];
export default NOMAD_SPAWN;