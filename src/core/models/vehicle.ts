import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { Loadout } from "./miner";
import { EntityPosition, serializePosition } from "./position";

type Upgrade =
  | "UpEngine"
  | "UpDrill"
  | "UpAddDrill"
  | "UpCargoHold"
  | "UpScanner"
  | "UpLaser"
  | "UpAddNav";

const JOBS = {
  land: "JobDriver",
  air: "JobPilot",
  sea: "JobSailor",
} as const satisfies { [K: string]: Loadout };

export class VehicleTemplate {
  readonly id: string;
  readonly name: string;
  readonly inspectAbbrev: string;
  readonly frame: "small" | "large";
  readonly kind: "land" | "sea" | "air";
  readonly crystals: number;
  readonly upgrades: readonly Upgrade[];
  readonly zOffset: number;
  constructor(
    id: string,
    name: string,
    inspectAbbrev: string,
    frame: "small" | "large",
    kind: "land" | "sea" | "air",
    crystals: number,
    upgrades: readonly Upgrade[],
    zOffset: number,
  ) {
    this.id = id;
    this.name = name;
    this.inspectAbbrev = inspectAbbrev;
    this.frame = frame;
    this.kind = kind;
    this.crystals = crystals;
    this.upgrades = upgrades;
    this.zOffset = zOffset;
  }

  get job() {
    return JOBS[this.kind];
  }
}

export const HOVER_SCOUT = new VehicleTemplate(
  "VehicleHoverScout_C",
  "Hover Scout",
  "HoSc",
  "small",
  "land",
  1,
  ["UpEngine"],
  0.99,
);
export const SMALL_DIGGER = new VehicleTemplate(
  "VehicleSmallDigger_C",
  "Small Digger",
  "SmDi",
  "small",
  "land",
  1,
  ["UpEngine", "UpDrill"],
  -0.004,
);
export const SMALL_TRANSPORT_TRUCK = new VehicleTemplate(
  "VehicleSmallTransportTruck_C",
  "Small Transport Truck",
  "SmTT",
  "small",
  "land",
  2,
  ["UpEngine", "UpCargoHold"],
  0.971,
);
export const RAPID_RIDER = new VehicleTemplate(
  "VehicleRapidRider_C",
  "Rapid Rider",
  "RaRr",
  "small",
  "sea",
  2,
  ["UpAddDrill", "UpCargoHold"],
  0.978,
);
export const SMLC = new VehicleTemplate(
  "VehicleSMLC_C",
  "Small Mobile Laser Cutter",
  "SMLC",
  "small",
  "land",
  3,
  ["UpEngine", "UpLaser"],
  0.388,
);
export const TUNNEL_SCOUT = new VehicleTemplate(
  "VehicleTunnelScout_C",
  "Tunnel Scout",
  "TuSc",
  "small",
  "air",
  3,
  ["UpAddDrill"],
  -0.012,
);
export const LOADER_DOZER = new VehicleTemplate(
  "VehicleLoaderDozer_C",
  "Loader Dozer",
  "LoDz",
  "large",
  "land",
  5,
  ["UpEngine"],
  0.773,
);
export const GRANITE_GRINDER = new VehicleTemplate(
  "VehicleGraniteGrinder_C",
  "Granite Grinder",
  "GrGr",
  "large",
  "land",
  5,
  ["UpEngine", "UpDrill"],
  -0.553,
);
export const CARGO_CARRIER = new VehicleTemplate(
  "VehicleCargoCarrier_C",
  "Cargo Carrier",
  "CaCa",
  "large",
  "sea",
  5,
  ["UpAddNav"],
  0.978,
);
export const LMLC = new VehicleTemplate(
  "VehicleLMLC_C",
  "Large Mobile Laser Cutter",
  "LMLC",
  "large",
  "land",
  8,
  ["UpEngine", "UpLaser", "UpAddNav"],
  0.036,
);
export const CHROME_CRUSHER = new VehicleTemplate(
  "VehicleChromeCrusher_C",
  "Chrome Crusher",
  "CrCr",
  "large",
  "land",
  8,
  ["UpEngine", "UpDrill", "UpLaser", "UpScanner"],
  -0.346,
);
export const TUNNEL_TRANSPORT = new VehicleTemplate(
  "VehicleTunnelTransport_C",
  "Tunnel Transport",
  "TuTr",
  "large",
  "air",
  10,
  [],
  -0.012,
);

export const ALL_VEHICLES = [
  HOVER_SCOUT,
  SMALL_DIGGER,
  SMALL_TRANSPORT_TRUCK,
  RAPID_RIDER,
  SMLC,
  TUNNEL_SCOUT,
  LOADER_DOZER,
  GRANITE_GRINDER,
  CARGO_CARRIER,
  LMLC,
  CHROME_CRUSHER,
  TUNNEL_TRANSPORT,
] as const;

export type Vehicle = EntityPosition & {
  readonly id: number;
  readonly planId: number;
  readonly template: VehicleTemplate;
  readonly essential: boolean;
  readonly driverId: number | null;
  readonly upgrades: Upgrade[];
};

export class VehicleFactory {
  private id: number = 0;
  create<T extends VehicleTemplate>(
    args: EntityPosition & {
      planId: number;
      template: T;
      upgrades?: T["upgrades"][number][];
    } & Partial<Pick<Vehicle, "essential" | "driverId">>,
  ): Vehicle {
    return {
      essential: false,
      driverId: null,
      upgrades: [],
      ...args,
      id: this.id++,
    };
  }
}

export function serializeVehicle(
  vehicle: Vehicle,
  tileOffset: Point,
  heightMap: Grid<number>,
) {
  return [
    vehicle.template.id,
    serializePosition({
      position: vehicle,
      tileOffset,
      heightMap,
      entityOffset: { z: vehicle.template.zOffset },
    }),
    vehicle.upgrades.length &&
      `upgrades=${vehicle.upgrades.map((u) => `${u}/`).join("")}`,
    vehicle.driverId !== null && `driver=${vehicle.driverId.toFixed()}`,
    vehicle.essential && "Essential=true",
    `ID=${vehicle.id.toFixed()}`,
  ]
    .filter((n) => n)
    .join(",");
}
