import { Cavern } from "../core/models/cavern";

declare global {
  interface Window {
    cavern?: Cavern;
  }
}
