import { PseudorandomStream } from "../common";
import { Cardinal8, Point, radsToDegrees } from "../common/geometry";

type EntityPositionArgs = {
  x: number;
  y: number;
} & ({ aimedAt: Point } | { facing: Cardinal8 } | { yaw: number } | {});

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

const ENTITY_SCALE = 300;

export type EntityPosition = {
  readonly x: number;
  readonly y: number;
  // readonly z: number
  // readonly pitch: number
  readonly yaw: number;
  // readonly roll: number
  // readonly scaleX: number
  // readonly scaleY: number
  // readonly scaleZ: number
};

export function atCenterOfTile(args: EntityPositionArgs): EntityPosition {
  const x = args.x + 0.5;
  const y = args.y + 0.5;
  const yaw = getYaw(args) ?? 0;
  return { x, y, yaw };
}

export function randomlyInTile(
  args: EntityPositionArgs & { rng: PseudorandomStream },
): EntityPosition {
  const x = args.rng.uniform({}) + args.x;
  const y = args.rng.uniform({}) + args.y;
  const yaw = getYaw(args) ?? args.rng.uniform({ min: -Math.PI, max: Math.PI });
  return { x, y, yaw };
}

export function serializePosition(
  position: EntityPosition,
  [ox, oy]: Point,
  yawOffset?: number,
): string {
  const x = (position.x + ox) * ENTITY_SCALE;
  const y = (position.y + oy) * ENTITY_SCALE;
  const yaw = radsToDegrees(position.yaw + (yawOffset ?? 0));
  return (
    `Translation: X=${x.toFixed(3)} Y=${y.toFixed(3)} Z=0.000 ` +
    `Rotation: P=0.000000 Y=${yaw.toFixed(6)} R=0.000000 ` +
    "Scale X=1.000 Y=1.000 Z=1.000"
  );
}