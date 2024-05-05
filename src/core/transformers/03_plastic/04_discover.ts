import { Grid } from "../../common/grid";
import { DiscoveryZone, getDiscoveryZones } from "../../models/discovery_zone";
import { FinePlasticCavern } from "../02_tiles/03_fine";

export type DiscoveredCavern = FinePlasticCavern & {
  readonly discoveryZones: Grid<DiscoveryZone>;
};

export default function discover(cavern: FinePlasticCavern): DiscoveredCavern {
  const discoveryZones = getDiscoveryZones(cavern.tiles);
  cavern.openCaveFlags.forEach(
    (_, x, y) => (discoveryZones.get(x, y)!.openOnSpawn = true),
  );
  return { ...cavern, discoveryZones };
}
