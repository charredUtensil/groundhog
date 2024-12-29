import phraseGraph from "../utils/builder";
import { Format, State } from "../lore";
import { spellNumber } from "../utils/numbers";

export const BUILD_POWER_GC_FIRST = phraseGraph<
  State,
  Format & { remainingCount: number }
>(
  "Build and Power First Geological Center",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "We're getting those readings already!",
        "The first scans are coming in now.",
      )
      .then(
        ({ format: { remainingCount } }) =>
          `Just ${spellNumber(remainingCount)} to go!`,
        ({ format: { remainingCount } }) =>
          `Now just build ${spellNumber(remainingCount)} more.`,
        ({ format: { remainingCount } }) =>
          `${spellNumber(remainingCount)} more like that and we're good to go!`,
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
export const BUILD_POWER_GC_PENULTIMATE = phraseGraph<State, Format>(
  "Build and Power Penultimate Geological Center",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Good work!", "Well done!")
      .then("Just one more to go!")
      .then(end);
  },
);
export const BUILD_POWER_GC_LAST = phraseGraph<State, Format>(
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

export const BUILD_POWER_SS_FIRST = phraseGraph<
  State,
  Format & { remainingCount: number }
>(
  "Build and Power First Support Station",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "It's cleaning up the air already.",
        "The air feels cleaner already.",
      )
      .then(
        ({ format: { remainingCount } }) =>
          `Just ${spellNumber(remainingCount)} to go!`,
        ({ format: { remainingCount } }) =>
          `Now just build ${spellNumber(remainingCount)} more.`,
        ({ format: { remainingCount } }) =>
          `${spellNumber(remainingCount)} more like that and we're good to go!`,
      )
      .then(skip, state("hasMonsters").then("Be sure to keep it defended."))
      .then(end);
  },
);
export const BUILD_POWER_SS_PENULTIMATE = phraseGraph<State, Format>(
  "Build and Power Penultimate Support Station",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Good work!", "Well done!")
      .then("Just one more to go!", "We only need one more.")
      .then(end);
  },
);
export const BUILD_POWER_SS_LAST = phraseGraph<State, Format>(
  "Build and Power Last Support Station",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Well done!", "Outstanding!")
      .then("This should handle the atmosphere.")
      .then(end);
  },
);
