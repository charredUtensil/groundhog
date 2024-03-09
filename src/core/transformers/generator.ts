import { CavernContext } from "../common";
import { Cavern } from "../models/cavern";
import { OUTLINE_STEPS } from "./00_outlines";
import { PLANNING_STEPS } from "./01_planning";

const STEPS = [...OUTLINE_STEPS, ...PLANNING_STEPS];

export class CavernGenerator {
  private state: {
    index: number;
    fn: (input: Cavern) => Cavern;
    cavern: Cavern;
  };

  constructor(context: CavernContext) {
    this.state = {
      index: 0,
      fn: STEPS[0] as (input: Cavern) => Cavern,
      cavern: { context },
    };
  }

  step() {
    const step = this.state.index + 1;
    const cavern = this.state.fn(this.state.cavern);
    cavern.context.logger.info(cavern);
    console.log(cavern);
    this.state = {
      index: step,
      fn: STEPS[step] as (input: Cavern) => Cavern,
      cavern,
    };
  }
}
