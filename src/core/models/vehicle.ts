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

// prettier-ignore
const TEMPLATES = {
  HOVER_SCOUT:           {id: "VehicleHoverScout_C",          inspectAbbrev: "HoSc", frame: 'small', kind: 'land', crystals:  1, upgrades: ["UpEngine"]},
  SMALL_DIGGER:          {id: "VehicleSmallDigger_C",         inspectAbbrev: "SmDi", frame: 'small', kind: 'land', crystals:  1, upgrades: ["UpEngine", "UpDrill"]},
  SMALL_TRANSPORT_TRUCK: {id: "VehicleSmallTransportTruck_C", inspectAbbrev: "SmTT", frame: 'small', kind: 'land', crystals:  2, upgrades: ["UpEngine", "UpCargoHold"]},
  RAPID_RIDER:           {id: "VehicleRapidRider_C",          inspectAbbrev: "RaRr", frame: 'small', kind: 'sea',  crystals:  2, upgrades: ["UpAddDrill", "UpCargoHold"]},
  SMLC:                  {id: "VehicleSMLC_C",                inspectAbbrev: "SMLC", frame: 'small', kind: 'land', crystals:  3, upgrades: ["UpEngine", "UpLaser"]},
  TUNNEL_SCOUT:          {id: "VehicleTunnelScout_C",         inspectAbbrev: "TuSc", frame: 'small', kind: 'air',  crystals:  3, upgrades: ["UpAddDrill"]},
  LOADER_DOZER:          {id: "VehicleLoaderDozer_C",         inspectAbbrev: "LoDz", frame: 'large', kind: 'land', crystals:  5, upgrades: ["UpEngine"]},
  GRANITE_GRINDER:       {id: "VehicleGraniteGrinder_C",      inspectAbbrev: "GrGr", frame: 'large', kind: 'land', crystals:  5, upgrades: ["UpEngine", "UpDrill"]},
  CARGO_CARRIER:         {id: "VehicleCargoCarrier_C",        inspectAbbrev: "CaCa", frame: 'large', kind: 'sea',  crystals:  5, upgrades: ["UpAddNav"]},
  LMLC:                  {id: "VehicleLMLC_C",                inspectAbbrev: "LMLC", frame: 'large', kind: 'land', crystals:  8, upgrades: ["UpEngine", "UpLaser", "UpAddNav"]},
  CHROME_CRUSHER:        {id: "VehicleChromeCrusher_C",       inspectAbbrev: "CrCr", frame: 'large', kind: 'land', crystals:  8, upgrades: ["UpEngine", "UpDrill", "UpLaser", "UpScanner"]},
  TUNNEL_TRANSPORT:      {id: "VehicleTunnelTransport_C",     inspectAbbrev: "TuTr", frame: 'large', kind: 'air',  crystals: 10, upgrades: []},
} as const satisfies {[K: string]: {
  id: string;
  inspectAbbrev: string;
  frame: 'small' | 'large';
  kind: 'land' | 'sea' | 'air';
  crystals: number;
  upgrades: Upgrade[];
}};

export const VehicleTemplate = TEMPLATES;
export type AnyVehicleTemplate = (typeof TEMPLATES)[keyof typeof TEMPLATES];

export type Vehicle = EntityPosition & {
  readonly id: number;
  readonly template: AnyVehicleTemplate;
  readonly essential: boolean;
  readonly driverId: number | null;
  readonly upgrades: Upgrade[];
};

export class VehicleFactory {
  private id: number = 0;
  create<T extends AnyVehicleTemplate>(
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
