import { DiceBox } from "../common";
import { FluidType, Tile } from "../models/tiles";
import { AdjuredCavern } from "../transformers/02_plastic/05_adjure";
import { GenerateResult } from "./builder";
import ORDERS from "./graphs/orders";
import PREMISE from "./graphs/premise";

export type State = {
  readonly floodedWithWater: boolean;
  readonly floodedWithLava: boolean;
  readonly lostMinersOne: boolean;
  readonly lostMinersTogether: boolean;
  readonly lostMinersApart: boolean;
  readonly resourceObjective: boolean;
  readonly hasMonsters: boolean;
  readonly spawnHasErosion: boolean;
  readonly spawnIsHq: boolean;
  readonly findHq: boolean;
  readonly hqIsRuin: boolean;
  readonly treasureCaveOne: boolean;
  readonly treasureCaveMany: boolean;
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
  readonly state: State;
  private _premise: GenerateResult<State> | undefined;
  private _orders: GenerateResult<State> | undefined;
  constructor(cavern: AdjuredCavern) {
    const fluidType = floodedWith(cavern);
    const lostMiners: number = 0;
    const lostMinerCaves: number = 0;
    this.state = {
      floodedWithWater: fluidType === Tile.WATER,
      floodedWithLava: fluidType === Tile.LAVA,
      lostMinersOne: lostMiners === 1,
      lostMinersTogether: lostMiners > 1 && lostMinerCaves === 1,
      lostMinersApart: lostMinerCaves > 1,
      resourceObjective: true,
      hasMonsters: false,
      spawnHasErosion: false,
      spawnIsHq: false,
      findHq: false,
      hqIsRuin: false,
      treasureCaveOne: false,
      treasureCaveMany: false,
    };
  }

  generate(dice: DiceBox) {
    this._premise = PREMISE.generate(dice.lore(1), this.state)
    this._orders = ORDERS.generate(dice.lore(2), this.state)
  }

  get results() {
    return {
      premise: this._premise,
      orders: this._orders,
    }
  }
}
