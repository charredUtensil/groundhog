import { Biome } from "../common";
import { Point } from "../common/geometry";
import { EntityPosition, serializePosition } from "./position";

class CreatureTemplate {
  readonly id: string;
  constructor(id: string) {
    this.id = id;
  }
}

export const ROCK_MONSTER = new CreatureTemplate("CreatureRockMonster_C");
export const ICE_MONSTER = new CreatureTemplate("CreatureIceMonster_C");
export const LAVA_MONSTER = new CreatureTemplate("CreatureLavaMonster_C");
export const SLIMY_SLUG = new CreatureTemplate("CreatureSlimySlug_C");
export const SMALL_SPIDER = new CreatureTemplate("CreatureSmallSpider_C");
export const BAT = new CreatureTemplate("CreatureBat_C");

export function monsterForBiome(biome: Biome): CreatureTemplate {
  switch (biome) {
    case "rock":
      return ROCK_MONSTER;
    case "ice":
      return ICE_MONSTER;
    case "lava":
      return LAVA_MONSTER;
  }
}

export type Creature = EntityPosition & {
  readonly id: number;
  readonly template: CreatureTemplate;
  readonly sleep: boolean;
};

export class CreatureFactory {
  private id: number = 0;
  create(
    args: EntityPosition & { template: CreatureTemplate; sleep?: boolean },
  ): Creature {
    return { sleep: false, ...args, id: this.id++ };
  }
}

export function serializeCreature(creature: Creature, offset: Point) {
  return `${creature.template.id}
${serializePosition(creature, offset, Math.PI / 2)}
ID=${creature.id.toFixed()}${creature.sleep ? ",Sleep=true" : ""}`;
}
