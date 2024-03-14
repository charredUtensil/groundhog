import { BaseCavern } from "../models/cavern";
import { OUTLINE_TF } from "./00_outlines";
import { PLANNING_TF } from "./01_planning";
import { PLASTIC_TF } from "./02_plastic";

const CAVERN_TF = OUTLINE_TF.then(PLANNING_TF).then(PLASTIC_TF);

export class CavernGenerator {
  private state;
  constructor(cavern: BaseCavern) {
    this.state = CAVERN_TF.first(cavern);
  }

  get isDone() {
    return !this.state.next
  }

  step() {
    if (this.state.next) {
      const { result, next } = this.state.next();
      result.context.logger.info(result);
      console.log(result);
      this.state = { result, next };
    }
  }
}
