import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
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
  'land': "JobDriver",
  'air': "JobPilot",
  'sea': "JobSailor",
} as const;

export class VehicleTemplate {
  readonly id: string;
  readonly inspectAbbrev: string;
  readonly frame: 'small' | 'large';
  readonly kind: 'land' | 'sea' | 'air';
  readonly crystals: number;
  readonly upgrades: readonly Upgrade[];
  constructor (
    id: string,
    inspectAbbrev: string,
    frame: 'small' | 'large',
    kind: 'land' | 'sea' | 'air',
    crystals: number,
    upgrades: readonly Upgrade[],
  ) {
    this.id = id;
    this.inspectAbbrev = inspectAbbrev;
    this.frame = frame;
    this.kind = kind;
    this.crystals = crystals;
    this.upgrades = upgrades;
  }

  get job() {
    return JOBS[this.kind]
  }
}

export const HOVER_SCOUT = new VehicleTemplate(
  "VehicleHoverScout_C",
  "HoSc",
  'small',
  'land',  1, ["UpEngine"]);
export const SMALL_DIGGER = new VehicleTemplate(
  "VehicleSmallDigger_C",
  "SmDi",
  'small',
  'land',  1, ["UpEngine", "UpDrill"]);
export const SMALL_TRANSPORT_TRUCK = new VehicleTemplate(
  "VehicleSmallTransportTruck_C",
  "SmTT",
  'small',
  'land',  2, ["UpEngine", "UpCargoHold"]);
export const RAPID_RIDER = new VehicleTemplate(
  "VehicleRapidRider_C",
  "RaRr",
  'small',
  'sea',   2, ["UpAddDrill", "UpCargoHold"]);
export const SMLC = new VehicleTemplate(
  "VehicleSMLC_C",
  "SMLC",
  'small',
  'land',  3, ["UpEngine", "UpLaser"]);
export const TUNNEL_SCOUT = new VehicleTemplate(
  "VehicleTunnelScout_C",
  "TuSc",
  'small',
  'air',   3, ["UpAddDrill"]);
export const LOADER_DOZER = new VehicleTemplate(
  "VehicleLoaderDozer_C",
  "LoDz",
  'large',
  'land',  5, ["UpEngine"]);
export const GRANITE_GRINDER = new VehicleTemplate(
  "VehicleGraniteGrinder_C",
  "GrGr",
  'large',
  'land',  5, ["UpEngine", "UpDrill"]);
export const CARGO_CARRIER = new VehicleTemplate(
  "VehicleCargoCarrier_C",
  "CaCa",
  'large',
  'sea',   5, ["UpAddNav"]);
export const LMLC = new VehicleTemplate(
  "VehicleLMLC_C",
  "LMLC",
  'large',
  'land',  8, ["UpEngine", "UpLaser", "UpAddNav"]);
export const CHROME_CRUSHER = new VehicleTemplate(
  "VehicleChromeCrusher_C",
  "CrCr",
  'large',
  'land',  8, ["UpEngine", "UpDrill", "UpLaser", "UpScanner"]);
export const TUNNEL_TRANSPORT = new VehicleTemplate(
  "VehicleTunnelTransport_C",
  "TuTr",
  'large',
  'air',  10, []);

export type Vehicle = EntityPosition & {
  readonly id: number;
  readonly template: VehicleTemplate;
  readonly essential: boolean;
  readonly driverId: number | null;
  readonly upgrades: Upgrade[];
};

export class VehicleFactory {
  private id: number = 0;
  create<T extends VehicleTemplate>(
    args: EntityPosition & {
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
  offset: Point,
  heightMap: Grid<number>,
) {
  return [
    vehicle.template.id,
    serializePosition(vehicle, offset, heightMap, 0, "entity"),
    vehicle.upgrades.map((u) => `${u}/`).join(""),
    vehicle.driverId !== null && `driver=${vehicle.driverId.toFixed()}`,
    vehicle.essential && "Essential=true",
    `ID=${vehicle.id.toFixed()}`,
  ]
    .filter((n) => n)
    .join(",");
}
