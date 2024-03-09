import { Architect } from "../models/architect";
import { DefaultCaveArchitect } from "./defaults";

export const SimpleSpawn: Architect = {
  ...DefaultCaveArchitect,
  crystals: (plan) => 5,
};
