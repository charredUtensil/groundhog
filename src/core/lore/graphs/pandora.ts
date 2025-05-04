import { Format, State } from "../lore";
import phraseGraph from "../utils/builder";

const PREFIX = ["Oh dear.", "Uh-oh!", "Oh no!", "Be careful."] as const;

export const DID_SPAWN_SEAM = phraseGraph<State, Format>(
  "Pandora - Did spawn monster from seam",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(...PREFIX, skip)
      .then(
        "Drilling that Energy Crystal Seam must have upset them.",
        "Try to avoid drilling those seams! The monsters here don't like it.",
      )
      .then(end);
  },
);

export const DID_SPAWN_ROGUE = phraseGraph<State, Format>(
  "Pandora - Did spawn rogue monster",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(...PREFIX, skip)
      .then(
        ({ format: { monsters } }) =>
          `Attacking the ${monsters} only upsets them!`,
        "It seems attacking them attracts more monsters.",
      )
      .then(end);
  },
);

export const DID_SPAWN_HOARD = phraseGraph<State, Format>(
  "Pandora - Did spawn hoard",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(...PREFIX, skip)
      .then("We've upset the horde.", "The monsters have started a feast. ")
      .then(end);
  },
);

export const WARN_APPROACHING_HOARD = phraseGraph<State, Format>(
  "Pandora - Approaching hoard",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then("This is it!", "You're getting very close.", skip)
      .then(
        ({ format: { monsters } }) =>
          `Make sure your Rock Raiders are armed and ready to take on those ` +
          `${monsters}.`,
        "This will be a tough fight once you breach those walls. Make sure " +
          "you are ready to defend those Energy Crystals!",
      )
      .then(end);
  },
);
