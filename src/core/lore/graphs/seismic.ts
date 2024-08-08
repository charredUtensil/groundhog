import phraseGraph from "../builder";
import { State } from "../lore";

export const SEISMIC_FORESHADOW = phraseGraph<State>(
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
