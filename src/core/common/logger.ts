import { Cavern } from "../models/cavern";

export type Logger = {
  //verbose(it: Loggable): void
  //debug(it: Loggable): void
  info(it: Cavern): void;
  //warn(it: Loggable): void
  //error(it: Loggable): void
};
