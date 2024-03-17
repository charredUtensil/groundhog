import { FluidType, Tile } from "../models/tiles";
import { AdjuredCavern } from "../transformers/02_plastic/05_adjure";
import PREMISE from "./graphs/premise";

export type State = {
  start: boolean;
  end: boolean;
  floodedWithWater: boolean;
  floodedWithLava: boolean;
  lostMinersOne: boolean;
  lostMinersTogether: boolean;
  lostMinersApart: boolean;
  hasResources: boolean;
  hasMonsters: boolean;
  spawnHasErosion: boolean;
  spawnIsHq: boolean;
  findHq: boolean;
  hqIsRuin: boolean;
  treasureCaveOne: boolean;
  treasureCaveMany: boolean;
};

function floodedWith(cavern: AdjuredCavern): FluidType {
  let lava = 0;
  let water = 0;
  for (const plan of cavern.plans) {
    if (plan.fluid === Tile.LAVA) {
      lava++;
    } else if (plan.fluid === Tile.WATER) {
      water++;
    }
  }
  if (lava / cavern.plans.length > 0.4) {
    return Tile.LAVA;
  }
  if (water / cavern.plans.length > 0.4) {
    return Tile.WATER;
  }
  return null;
}

export class Lore {
  private state: State;
  constructor(cavern: AdjuredCavern) {
    const fluidType = floodedWith(cavern);
    const lostMiners: number = 0;
    const lostMinerCaves: number = 0;
    this.state = {
      start: true,
      end: true,
      floodedWithWater: fluidType == Tile.WATER,
      floodedWithLava: fluidType == Tile.LAVA,
      lostMinersOne: lostMiners === 1,
      lostMinersTogether: lostMiners > 1 && lostMinerCaves === 1,
      lostMinersApart: lostMinerCaves > 1,
      hasResources: true,
      hasMonsters: false,
      spawnHasErosion: false,
      spawnIsHq: false,
      findHq: false,
      hqIsRuin: false,
      treasureCaveOne: false,
      treasureCaveMany: false,
    };
  }

  briefing() {
    return PREMISE;
  }
}
