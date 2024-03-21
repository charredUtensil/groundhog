import { Point } from "../common/geometry";
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
  readonly essential: boolean;
  readonly level: 1 | 2 | 3 | 4 | 5;
  readonly loadout: readonly Loadout[];
  readonly unique: Unique | null;
};

export class MinerFactory {
  private id: number = 0;
  create(args: EntityPosition & Partial<Omit<Miner, "id">>): Miner {
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

export function serializeMiner(miner: Miner, offset: Point) {
  return `ID=${miner.id.toFixed()}\
${miner.unique ? `/${miner.unique}` : ""},\
${serializePosition(miner, offset, Math.PI / 2)},\
${miner.loadout.map((l) => `${l}/`).join()}\
${"Level/".repeat(miner.level)}\
${miner.essential ? ",Essential=true" : ""}`;
}