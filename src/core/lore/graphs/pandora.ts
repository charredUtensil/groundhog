import { Format, State } from "../lore";
import phraseGraph from "../utils/builder";

export const DID_SPAWN_SEAM = phraseGraph<State, Format>(
  "Pandora - Did spawn monster from seam",
  ({ pg, state, start, end, cut, skip }) => {
    start.then('Oh dear.', skip).then(
      "Drilling that Energy Crystal Seam must have upset them.",
      "Try to avoid drilling those seams! The monsters here don't like it.",
    ).then(end);
  }
);

export const DID_SPAWN_ROGUE = phraseGraph<State, Format>(
  "Pandora - Did spawn rogue monster",
  ({ pg, state, start, end, cut, skip }) => {
    start.then('Oh dear.', skip).then(
      ({format: {monsters}}) => `Attacking the ${monsters} only upsets them!`
    ).then(end);
  }
);

export const DID_SPAWN_HOARD = phraseGraph<State, Format>(
  "Pandora - Did spawn hoard",
  ({ pg, state, start, end, cut, skip }) => {
    start.then('Oh dear.', skip).then(
      "We've upset the hoard."
    ).then(end);
  }
);

export const WARN_APPROACHING_HOARD = phraseGraph<State, Format>(
  "Pandora - Approaching hoard",
  ({ pg, state, start, end, cut, skip }) => {
    start.then('This is it!', "You're getting very close.", skip).then(
      ({format: {monsters}}) =>
      `Make sure your Rock Raiders are armed and ready to take on those ${monsters}.`
    ).then(end);
  }
);