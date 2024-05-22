import { Grid } from "../../common/grid";
import { DiscoveryZone, getDiscoveryZones } from "../../models/discovery_zone";
import { FencedCavern } from "./00_fence";

export type DiscoveredCavern = FencedCavern & {
  readonly discoveryZones: Grid<DiscoveryZone>;
};

export default function discover(cavern: FencedCavern): DiscoveredCavern {
  const discoveryZones = getDiscoveryZones(cavern.tiles);
  cavern.openCaveFlags.forEach(
    (_, x, y) => (discoveryZones.get(x, y)!.openOnSpawn = true),
  );
  return { ...cavern, discoveryZones };
}
