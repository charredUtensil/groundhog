import { PseudorandomStream } from "../common";
import { Cardinal8, Point, radsToDegrees } from "../common/geometry";
import { Grid } from "../common/grid";

type EntityPositionArgs = {
  x: number;
  y: number;
  scale?: number;
} & ({ aimedAt: Point } | { facing: Cardinal8 } | { yaw: number } | object);

function getYaw(args: EntityPositionArgs): number | undefined {
  if ("aimedAt" in args) {
    return Math.atan2(args.aimedAt[1] - args.y, args.aimedAt[0] - args.x);
  }
  if ("facing" in args) {
    return Math.atan2(args.facing[1], args.facing[0]);
  }
  if ("yaw" in args) {
    return args.yaw;
  }
  return undefined;
}

const ENTITY_TILE_SCALE = 300;

export type EntityPosition = {
  readonly x: number;
  readonly y: number;
  readonly z: number;
  readonly pitch: number;
  readonly yaw: number;
  readonly roll: number;
  readonly scaleX: number;
  readonly scaleY: number;
  readonly scaleZ: number;
};

const POSITION_DEFAULTS = {
  z: 0,
  pitch: 0,
  yaw: 0,
  roll: 0,
  scaleX: 1,
  scaleY: 1,
  scaleZ: 1,
} as const;

export function position(
  args: EntityPositionArgs & Partial<EntityPosition>,
): EntityPosition {
  return {
    x: args.x,
    y: args.y,
    z: args.z ?? POSITION_DEFAULTS.z,
    pitch: args.pitch ?? POSITION_DEFAULTS.pitch,
    yaw: getYaw(args) ?? POSITION_DEFAULTS.yaw,
    roll: args.roll ?? POSITION_DEFAULTS.roll,
    scaleX: args.scaleX ?? args.scale ?? POSITION_DEFAULTS.scaleX,
    scaleY: args.scaleY ?? args.scale ?? POSITION_DEFAULTS.scaleY,
    scaleZ: args.scaleZ ?? args.scale ?? POSITION_DEFAULTS.scaleZ,
  };
}

export const atCenterOfTile: (args: EntityPositionArgs) => EntityPosition = (
  args,
) => position({ ...args, x: args.x + 0.5, y: args.y + 0.5 });

export function randomlyInTile(
  args: EntityPositionArgs & { rng: PseudorandomStream },
): EntityPosition {
  const x = args.rng.uniform({}) + args.x;
  const y = args.rng.uniform({}) + args.y;
  const yaw = getYaw(args) ?? args.rng.uniform({ min: -Math.PI, max: Math.PI });
  const scale = args.scale;
  return position({ x, y, yaw, scale });
}

function zFloorForBuilding(
  unused_x: number,
  unused_y: number,
  nw: number,
  ne: number,
  sw: number,
  se: number,
): number {
  return (Math.max(nw, ne, sw, se) + Math.min(nw, ne, sw, se)) / 2;
}

function zFloorForEntity(
  x: number,
  y: number,
  nw: number,
  ne: number,
  sw: number,
  se: number,
): number {
  // Manic Miners always clips tiles into two triangles this way.
  if (y <= 1 - x) {
    // First triangle (nw, ne, sw)
    const wx = (ne - nw) * x;
    const wy = (sw - nw) * y;
    return nw + wx + wy;
  } else {
    // Second triangle (se, ne, sw)
    const wx = (sw - se) * (x - 1);
    const wy = (ne - se) * (y - 1);
    return se + wx + wy;
  }
}

function floorZ(
  x: number,
  y: number,
  heightMap: Grid<number>,
  method: "entity" | "building",
): number {
  const tileX = Math.floor(x);
  const tileY = Math.floor(y);
  const fn = { entity: zFloorForEntity, building: zFloorForBuilding }[method];
  return fn(
    x - tileX,
    y - tileY,
    heightMap.get(tileX, tileY)!,
    heightMap.get(tileX + 1, tileY)!,
    heightMap.get(tileX, tileY + 1)!,
    heightMap.get(tileX + 1, tileY + 1)!,
  );
}

export function serializePosition({
  position,
  tileOffset: [tx, ty],
  heightMap,
  entityOffset,
  floorMethod = "entity",
}: {
  position: EntityPosition;
  tileOffset: Point;
  heightMap: Grid<number>;
  entityOffset?: Partial<EntityPosition>;
  floorMethod?: "entity" | "building";
}): string {
  const { scaleX, scaleY, scaleZ } = position;
  const x = (position.x + tx) * ENTITY_TILE_SCALE + (entityOffset?.x ?? 0);
  const y = (position.y + ty) * ENTITY_TILE_SCALE + (entityOffset?.y ?? 0);
  const z =
    position.z * ENTITY_TILE_SCALE +
    (entityOffset?.z ?? 0) +
    floorZ(position.x, position.y, heightMap, floorMethod);
  const pitch = radsToDegrees(position.pitch + (entityOffset?.pitch ?? 0));
  const yaw = radsToDegrees(position.yaw + (entityOffset?.yaw ?? 0));
  const roll = radsToDegrees(position.roll + (entityOffset?.roll ?? 0));
  return (
    `Translation: X=${x.toFixed(3)} Y=${y.toFixed(3)} Z=${z.toFixed(3)} ` +
    `Rotation: P=${pitch.toFixed(6)} Y=${yaw.toFixed(6)} R=${roll.toFixed(6)} ` +
    `Scale X=${scaleX.toFixed(3)} Y=${scaleY.toFixed(3)} Z=${scaleZ.toFixed(3)}`
  );
}
