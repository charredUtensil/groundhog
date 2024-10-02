/* eslint-disable no-template-curly-in-string */

import phraseGraph from "../builder";
import { State } from "../lore";

export const BUILD_POWER_GC_FIRST = phraseGraph<State>(
  "Build and Power First Geological Center",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "We're getting those readings already!",
        "The first scans are coming in now.",
      )
      .then(
        "Just ${remainingCount} to go!",
        "Now just build ${remainingCount} more.",
        "${remainingCount} more like that and we're good to go!",
      )
      .then(
        skip,
        state("hasMonsters").then(
          skip,
          "Be sure to keep it defended.",
          "You may want to build some Electric Fences around it.",
        ),
      )
      .then(end);
  },
);
export const BUILD_POWER_GC_PENULTIMATE = phraseGraph<State>(
  "Build and Power Penultimate Geological Center",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Good work!", "Well done!")
      .then("Just one more to go!")
      .then(end);
  },
);
export const BUILD_POWER_GC_LAST = phraseGraph<State>(
  "Build and Power Last Geological Center",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Well done!", "Outstanding!")
      .then(
        "We're getting all the data we need now.",
        "Our geologists will review these scans immediately.",
      )
      .then(end);
  },
);
