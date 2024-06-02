/* eslint-disable no-template-curly-in-string */

import { FoundLostMinersState, State } from "../lore";
import phraseGraph from "../builder";

export const FOUND_HOARD = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    // Assume there is a collect_resources goal, and assume that goal requires
    // collecting crystals. This event will only be triggered if there are enough
    // crystals on the floor to complete the level.

    start
      .then(
        "Wow! This ought to do it!",
        "You've found quite the haul here.",
        "Our intel was accurate. Look at all those Energy Crystals!",
      )
      .then(
        pg(
          "Now, transport these Energy Crystals back to your base.",
          "Bring this to your base to complete our mission!",
          "Get this back to your base.",
        ),
        state("treasureCaveMany").then(
          "With this, we have enough to complete our mission!",
          "Collect all the Energy Crystals you've found and complete our mission!",
        ),
        state("hasMonsters").then(
          "I hope we can collect these without attracting too much attention.",
          "Be careful, Cadet! This is surely enough to attract those ${enemies}.",
        ),
      )
      .then(state("treasureCaveOne", "treasureCaveMany"), skip)
      .then(state("hasMonsters"), skip)
      .then(end);
  },
);

export const FOUND_HQ = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    const positive_greeting = start.then(
      "Our Rock Raider HQ is safe and sound!",
      "Way to go, Cadet!",
    );

    const neutral_greeting = start.then(
      "You found the Rock Raider HQ.",
      "There it is!",
    );

    const tail = pg(skip, state("resourceObjective")).then(end);

    pg(
      pg(positive_greeting, neutral_greeting).then(
        "Now, ",
        "Now you should be able to",
      ),
      neutral_greeting
        .then(
          state("hasMonsters").then(
            "Shore up the base defenses",
            "Now, get some Electric Fences up",
          ),
        )
        .then(
          ". We need this base secure if we're going to",
          ". Once the base is safe,",
          pg(
            "before the monsters find it too!",
            "and keep it safe from those ${enemies}!",
            "and hope those monsters don't cause any more damage!",
          )
            .then(
              skip,
              state("lostMinersOne", "lostMinersTogether", "lostMinersApart"),
            )
            .then(tail),
        ),
    ).then(
      pg(
        state("lostMinersOne").then("find the lost Rock Raider!"),
        state("lostMinersTogether", "lostMinersApart").then(
          "find those lost Rock Raiders!",
        ),
      ).then(tail),
      state("resourceObjective")
        .then("collect ${resourceGoal}.", "get those ${resourceGoalNamesOnly}.")
        .then(end),
    );
  },
);

export const FOUND_LOST_MINERS = phraseGraph<FoundLostMinersState>(
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        state("foundMinersOne").then(
          "Look! It's one of the lost Rock Radiers!",
          "You found a lost Rock Raider!",
          "You found one of the lost Rock Raiders!",
        ),
        state("foundMinersTogether").then(
          "Look at that! ${foundMinersCount} of the lost Rock Raiders are here, safely together.",
          "That's ${foundMinersCount} Rock Raiders found!",
          "You found ${foundMinersCount} of them here!",
        ),
      )
      .then(skip, "Keep going!", "Keep searching, Cadet.")
      .then("We need to find all ${lostMinersCount} before we can leave.")
      .then(end);
  },
);

export const FOUND_ALL_LOST_MINERS = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "And that makes ${lostMinersCount} Rock Raiders found!",
        "You found all ${lostMinersCount} Rock Raiders!",
        "That's all ${lostMinersCount} Rock Raiders found!",
        state("lostMinersOne").then(
          "Look! It's the lost Rock Raider!",
          "You found the missing Rock Raider!",
        ),
      )
      .then(
        skip,
        state("resourceObjective").then("Now, collect ${resourceGoal}."),
      )
      .then(end);
  },
);
