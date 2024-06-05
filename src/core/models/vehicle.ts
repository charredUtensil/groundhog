import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { EntityPosition, serializePosition } from "./position";

// prettier-ignore
const TEMPLATES = {
  HOVER_SCOUT:           {id: "VehicleHoverScout_C",          inspectAbbrev: "HoSc", frame: 'small', kind: 'land', crystals:  1},
  SMALL_DIGGER:          {id: "VehicleSmallDigger_C",         inspectAbbrev: "SmDi", frame: 'small', kind: 'land', crystals:  1},
  SMALL_TRANSPORT_TRUCK: {id: "VehicleSmallTransportTruck_C", inspectAbbrev: "SmTT", frame: 'small', kind: 'land', crystals:  2},
  RAPID_RIDER:           {id: "VehicleRapidRider_C",          inspectAbbrev: "RaRr", frame: 'small', kind: 'sea',  crystals:  2},
  SMLC:                  {id: "VehicleSMLC_C",                inspectAbbrev: "SMLC", frame: 'small', kind: 'land', crystals:  3},
  TUNNEL_SCOUT:          {id: "VehicleTunnelScout_C",         inspectAbbrev: "TuSc", frame: 'small', kind: 'air',  crystals:  3},
  LOADER_DOZER:          {id: "VehicleLoaderDozer_C",         inspectAbbrev: "LoDz", frame: 'large', kind: 'land', crystals:  5},
  GRANITE_GRINDER:       {id: "VehicleGraniteGrinder_C",      inspectAbbrev: "GrGr", frame: 'large', kind: 'land', crystals:  5},
  CARGO_CARRIER:         {id: "VehicleCargoCarrier_C",        inspectAbbrev: "CaCa", frame: 'large', kind: 'sea',  crystals:  5},
  LMLC:                  {id: "VehicleLMLC_C",                inspectAbbrev: "LMLC", frame: 'large', kind: 'land', crystals:  8},
  CHROME_CRUSHER:        {id: "VehicleChromeCrusher_C",       inspectAbbrev: "CrCr", frame: 'large', kind: 'land', crystals:  8},
  TUNNEL_TRANSPORT:      {id: "VehicleTunnelTransport_C",     inspectAbbrev: "TuTr", frame: 'large', kind: 'air',  crystals: 10},
} as const

export const VehicleTemplate = TEMPLATES;
export type VehicleTemplate = (typeof TEMPLATES)[keyof typeof TEMPLATES]; // eslint-disable-line @typescript-eslint/no-redeclare

export type Vehicle = EntityPosition & {
  readonly id: number;
  readonly template: VehicleTemplate;
};

export class VehicleFactory {
  private id: number = 0;
  create(args: EntityPosition & { template: VehicleTemplate }): Vehicle {
    return { ...args, id: this.id++ };
  }
}

export function serializeVehicle(
  vehicle: Vehicle,
  offset: Point,
  heightMap: Grid<number>,
) {
  const pos = serializePosition(vehicle, offset, heightMap, 0, "entity");
  return `${vehicle.template.id},${pos},ID=${vehicle.id.toFixed()}`;
}
