import { DiceBox, inferContextDefaults } from "../common";
import { BaseCavern } from "../models/cavern";

export default function init(
  cavern: Pick<BaseCavern, "initialContext">,
): BaseCavern {
  const context = inferContextDefaults(cavern.initialContext);
  const dice = new DiceBox(context.seed);
  return { ...cavern, context, dice };
}
