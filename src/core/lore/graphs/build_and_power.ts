/* eslint-disable no-template-curly-in-string */

import phraseGraph from "../builder";
import { State } from "../lore";

export const BUILD_POWER_GC_FIRST = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "We're getting those readings already!",
        "That first scans are coming in now.",
      )
      .then(
        "Just ${remainingCount} to go!",
        "Now just build ${remainingCount} more.",
        "${remainingCount} more like that and we're good to go!",
      )
      .then(end);
  },
);
export const BUILD_POWER_GC_PENULTIMATE = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    start.then("Just one more!").then(end);
  },
);
export const BUILD_POWER_GC_LAST = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    start.then("Well done!").then(end);
  },
);
