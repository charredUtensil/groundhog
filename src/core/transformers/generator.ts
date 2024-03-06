import { CavernContext } from "../common";
import { Cavern } from "../models/cavern";
import partition from "./outlines/00_partition";
import discriminate from "./outlines/01_discriminate";
import triangulate from "./outlines/02_triangulate";
import span from "./outlines/03_span";
import bore from "./outlines/05_bore";
import clip from "./outlines/04_clip";

const STEPS = [
  partition,
  discriminate,
  triangulate,
  span,
  clip,
  bore,
]

export class CavernGenerator {
  private state: {
    index: number
    fn: (input: Cavern) => Cavern
    cavern: Cavern
  }

  constructor(context: CavernContext) {
    this.state = {
      index: 0,
      fn: STEPS[0] as (input: Cavern) => Cavern,
      cavern: {context},
    }
  }

  step() {
    const step = this.state.index + 1
    const cavern = this.state.fn(this.state.cavern)
    cavern.context.logger.info(cavern)
    console.log(cavern)
    this.state = {
      index: step,
      fn: STEPS[step] as (input: Cavern) => Cavern,
      cavern,
    }
  }
}