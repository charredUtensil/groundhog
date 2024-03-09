import { Cavern } from "../models/cavern";

export type Loggable = Cavern

export type Logger = {
  //verbose(it: Loggable): void
  //debug(it: Loggable): void
  info(it: Loggable): void;
  //warn(it: Loggable): void
  //error(it: Loggable): void
};
