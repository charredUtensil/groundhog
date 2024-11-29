import phraseGraph from "../utils/builder";
import { Format, State } from "../lore";

export const SEISMIC_FORESHADOW = phraseGraph<State, Format>(
  "Foreshadow Seismic Event",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then("I don't like the look of this.", "This could be a problem.", skip)
      .then(
        "Our scanners are picking up seismic activity in the area.",
        "We're detecting an increase in geological activity nearby.",
      )
      .then(
        "Be careful down there!",
        "Keep an eye out for anything unusual.",
        "Stay sharp and keep your Rock Raiders safe.",
      )
      .then(end);
  },
);

export const SEISMIC_FORESHADOW_AGAIN = phraseGraph<State, Format>(
  "Foreshadow Seismic Event (Again)",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "The seismic scanners are lighting up again.",
        "We're detecting another big shift.",
        "We're picking up more activity now.",
      )
      .then(
        "Anything could be happening down there.",
        "Exercise extreme caution!",
        "Prepare yourself, Cadet!",
        "You must protect your Rock Radiers.",
        skip,
      )
      .then(end);
  },
);
