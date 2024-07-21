import { Biome } from "../common";
import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { EntityPosition, serializePosition } from "./position";

export class CreatureTemplate {
  readonly id: string;
  readonly name: string;
  readonly inspectAbbrev: string;
  constructor(id: string, name: string, inspectAbbrev: string) {
    this.id = id;
    this.name = name;
    this.inspectAbbrev = inspectAbbrev;
  }
}

export const ROCK_MONSTER = new CreatureTemplate("CreatureRockMonster_C", "Rock Monster", "Rm");
export const ICE_MONSTER = new CreatureTemplate("CreatureIceMonster_C", "Ice Monster", "Im");
export const LAVA_MONSTER = new CreatureTemplate("CreatureLavaMonster_C", "Lava Monster", "Lm");
export const SLIMY_SLUG = new CreatureTemplate("CreatureSlimySlug_C", "Slimy Slug", "Sg");
export const SMALL_SPIDER = new CreatureTemplate("CreatureSmallSpider_C", "Small Spider", "Sr");
export const BAT = new CreatureTemplate("CreatureBat_C", "Bat", "Bt");

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

export function serializeCreature(
  creature: Creature,
  offset: Point,
  heightMap: Grid<number>,
) {
  return `${creature.template.id}
${serializePosition(creature, offset, heightMap, 0, "entity")}
ID=${creature.id.toFixed()}${creature.sleep ? ",Sleep=true" : ""}`;
}
