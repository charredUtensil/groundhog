import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { EntityPosition, serializePosition } from "./position";

export type Unique =
  | "OFFICER"
  | "Axle"
  | "Bandit"
  | "Chief"
  | "Docs"
  | "Jet"
  | "Sparks";

export type Loadout =
  | "Drill"
  | "JobExplosivesExpert"
  | "JobDriver"
  | "JobPilot"
  | "JobEngineer"
  | "JobGeologist"
  | "JobSailor";

export type Miner = EntityPosition & {
  readonly id: number;
  readonly planId: number;
  readonly essential: boolean;
  readonly level: 1 | 2 | 3 | 4 | 5;
  readonly loadout: readonly Loadout[];
  readonly unique: Unique | null;
};

export class MinerFactory {
  private id: number = 0;
  create(
    args: EntityPosition & { planId: number } & Partial<
        Pick<Miner, "essential" | "level" | "loadout" | "unique">
      >,
  ): Miner {
    return {
      essential: false,
      level: 1,
      loadout: ["Drill"],
      unique: null,
      ...args,
      id: this.id++,
    };
  }
}

const ENTITY_OFFSET = {
  z: 52.15,
} as const satisfies Partial<EntityPosition>;

export function serializeMiner(
  miner: Miner,
  tileOffset: Point,
  heightMap: Grid<number>,
) {
  return [
    `ID=${miner.id.toFixed()}${miner.unique ? `/${miner.unique}` : ""}`,
    serializePosition({
      position: miner,
      tileOffset,
      heightMap,
      entityOffset: ENTITY_OFFSET,
    }),
    [
      ...miner.loadout,
      ...Array.from({ length: miner.level - 1 }, () => "Level"),
    ]
      .map((l) => `${l}/`)
      .join(""),
    miner.essential && "Essential=true",
  ]
    .filter((n) => n)
    .join(",");
}
