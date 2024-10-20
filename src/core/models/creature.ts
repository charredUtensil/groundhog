import { Biome } from "../common";
import { Point } from "../common/geometry";
import { Grid } from "../common/grid";
import { EntityPosition, serializePosition } from "./position";

export class CreatureTemplate {
  readonly id: string;
  readonly name: string;
  readonly inspectAbbrev: string;
  readonly zOffset: number;
  constructor(
    id: string,
    name: string,
    inspectAbbrev: string,
    zOffset: number,
  ) {
    this.id = id;
    this.name = name;
    this.inspectAbbrev = inspectAbbrev;
    this.zOffset = zOffset;
  }
}

export const ROCK_MONSTER = new CreatureTemplate(
  "CreatureRockMonster_C",
  "Rock Monster",
  "Rm",
  138.15,
);
export const ICE_MONSTER = new CreatureTemplate(
  "CreatureIceMonster_C",
  "Ice Monster",
  "Im",
  138.15,
);
export const LAVA_MONSTER = new CreatureTemplate(
  "CreatureLavaMonster_C",
  "Lava Monster",
  "Lm",
  138.15,
);
export const SLIMY_SLUG = new CreatureTemplate(
  "CreatureSlimySlug_C",
  "Slimy Slug",
  "Sg",
  62.15,
);
export const SMALL_SPIDER = new CreatureTemplate(
  "CreatureSmallSpider_C",
  "Small Spider",
  "Sr",
  32.15,
);
export const BAT = new CreatureTemplate("CreatureBat_C", "Bat", "Bt", 27.15);

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
  readonly planId: number;
  readonly template: CreatureTemplate;
  readonly sleep: boolean;
};

export class CreatureFactory {
  private id: number = 0;
  create(
    args: EntityPosition & {
      planId: number;
      template: CreatureTemplate;
      sleep?: boolean;
    },
  ): Creature {
    return { sleep: false, ...args, id: this.id++ };
  }
}

export function serializeCreature(
  creature: Creature,
  tileOffset: Point,
  heightMap: Grid<number>,
) {
  return `${creature.template.id}
${serializePosition({
  position: creature,
  tileOffset,
  heightMap,
  entityOffset: { z: creature.template.zOffset },
})}
ID=${creature.id.toFixed()}${creature.sleep ? ",Sleep=true" : ""}`;
}
