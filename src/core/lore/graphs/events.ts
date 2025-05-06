import { Creature } from "../../models/creature";
import { Vehicle } from "../../models/vehicle";
import { Format, FoundLostMinersState, State } from "../lore";
import phraseGraph from "../utils/builder";
import { bothOrSpell, spellNumber } from "../utils/numbers";

export const FOUND_HOARD = phraseGraph<State, Format>(
  "Found Crystal Hoard",
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
          ({ format: { enemies } }) => `\
Be careful, Cadet! This is surely enough to attract those ${enemies}.`,
        ),
      )
      .then(state("treasureCaveOne", "treasureCaveMany"), skip)
      .then(state("hasMonsters"), skip)
      .then(end);
  },
);

export const FOUND_HQ = phraseGraph<State, Format>(
  "Found HQ",
  ({ pg, state, start, end, cut, skip }) => {
    const positive_greeting = start.then(
      "Our Rock Raider HQ is safe and sound!",
      "Way to go, Cadet!",
    );

    const neutral_greeting = start.then(
      "You found the Rock Raider HQ.",
      "There it is!",
      state("reachHq"),
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
            ({ format: { enemies } }) =>
              `and keep it safe from those ${enemies}!`,
            "and hope those monsters don't cause any more damage!",
          )
            .then(
              skip,
              state("lostMinersOne", "lostMinersTogether", "lostMinersApart"),
            )
            .then(tail),
        ),
    )
      .then(
        skip,
        pg(
          state("buildAndPowerGcOne").then("build that Geological Center"),
          state("buildAndPowerGcMultiple").then("build the Geological Centers"),
          state("buildAndPowerSsOne").then("build that Support Station"),
          state("buildAndPowerSsMultiple").then("build the Support Station"),
        ).then(pg("and"), pg("!").then(tail)),
      )
      .then(
        pg(
          state("lostMinersOne").then("find the lost Rock Raider!"),
          state("lostMinersTogether", "lostMinersApart").then(
            "find those lost Rock Raiders!",
          ),
        ).then(tail),
        state("resourceObjective")
          .then(
            ({ format: { resourceGoal } }) => `collect ${resourceGoal}.`,
            ({ format: { resourceGoalNamesOnly } }) =>
              `get those ${resourceGoalNamesOnly}.`,
          )
          .then(end),
      );
  },
);

export const FOUND_LM_BREADCRUMB = phraseGraph<
  State,
  Format & { vehicle: Vehicle }
>(
  "Found Vehicle left by Lost Miners",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        ({ format: { vehicle } }) => `Look! A ${vehicle.template.name}!`,
        ({ format: { vehicle } }) =>
          `You found a missing ${vehicle.template.name}!`,
        "Hmm. That doesn't belong there.",
      )
      .then(
        "They must be nearby.",
        "They must have passed this way.",
        "They should be close.",
        "You must be getting warmer.",
      )
      .then(end);
  },
);

export const FOUND_LOST_MINERS = phraseGraph<
  FoundLostMinersState,
  Format & { foundMiners: number }
>("Found Lost Miners", ({ pg, state, start, end, cut, skip }) => {
  start
    .then(
      state("foundMinersOne").then(
        "Look! It's one of the lost Rock Radiers!",
        "You found a lost Rock Raider!",
        "You found one of the lost Rock Raiders!",
      ),
      state("foundMinersTogether").then(
        ({ format: { foundMiners } }) => `\
Look at that! ${spellNumber(foundMiners)} of the lost Rock Raiders are here, \
safely together.`,
        ({ format: { foundMiners } }) => `\
That's ${spellNumber(foundMiners)} Rock Raiders found!`,
        ({ format: { foundMiners } }) => `\
You found ${spellNumber(foundMiners)} of them here!`,
      ),
    )
    .then(skip, "Keep going!", "Keep searching, Cadet.")
    .then(
      ({ format: { lostMiners } }) => `\
We need to find ${bothOrSpell(lostMiners, (s) => `all ${s}`)} before we can leave.`,
    )
    .then(end);
});

export const FOUND_ALL_LOST_MINERS = phraseGraph<State, Format>(
  "Found All Lost Miners",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        ({ format: { lostMiners } }) =>
          `And that makes ${spellNumber(lostMiners)} Rock Raiders found!`,
        ({ format: { lostMiners } }) =>
          `You found ${bothOrSpell(lostMiners, (s) => `all ${s}`)} Rock Raiders!`,
        ({ format: { lostMiners } }) =>
          `That's all ${bothOrSpell(lostMiners, (s) => `all ${s}`)} Rock Raiders found!`,
        state("lostMinersOne").then(
          "Look! It's the lost Rock Raider!",
          "You found the missing Rock Raider!",
        ),
        state("lostMinersTogether").then(
          ({ format: { lostMiners } }) => `\
${bothOrSpell(lostMiners, (s) => `the ${s}`)} Rock Raiders are right here, safe and sound!`,
          ({ format: { lostMiners } }) =>
            `You found ${bothOrSpell(lostMiners, (s) => `all ${s}`)} Rock Raiders!`,
          "That's all of the missing Rock Raiders found!",
        ),
      )
      .then(
        skip,
        state("resourceObjective").then(
          ({ format: { resourceGoal } }) => `Now, collect ${resourceGoal}.`,
        ),
      )
      .then(end);
  },
);

export const NOMADS_SETTLED = phraseGraph<State, Format>(
  "Nomads have settled",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then("This seems like as good a place as any.", "Well done, Cadet.")
      .then(
        state("lostMinersOne")
          .then(skip, state("resourceObjective"))
          .then("Now, go find that lost Rock Raider!"),
        state("lostMinersTogether", "lostMinersApart")
          .then(skip, state("resourceObjective"))
          .then("Now, go find those lost Rock Raiders!"),
        state("resourceObjective").then(
          ({ format: { resourceGoal } }) => `Now, collect ${resourceGoal}.`,
          ({ format: { resourceGoalNamesOnly } }) =>
            `Those ${resourceGoalNamesOnly} are as good as ours!`,
        ),
      )
      .then(skip, state("hasMonsters"))
      .then(end);

    start
      .then("With your base constructed, you should now have no problem")
      .then(
        state("lostMinersOne")
          .then(skip, state("resourceObjective"))
          .then("finding that lost Rock Raider!"),
        state("lostMinersTogether", "lostMinersApart")
          .then(skip, state("resourceObjective"))
          .then("finding those lost Rock Raiders!"),
        state("resourceObjective").then(
          ({ format: { resourceGoal } }) => `collecting ${resourceGoal}!`,
        ),
      )
      .then(
        skip,
        state("hasMonsters").then(
          skip,
          ({ format: { enemies } }) => `\
Don't forget to build plenty of Electric Fences in case those ${enemies} come.`,
          ({ format: { enemies } }) =>
            `Just keep an eye out for those ${enemies}.`,
        ),
      )
      .then(end);

    start
      .then(
        pg("With your Support Station built, you can move on to building").then(
          state("buildAndPowerGcOne").then(
            "that Geological Center! Be sure to place it in the cavern marked " +
              "with an arrow.",
          ),
          state("buildAndPowerGcMultiple").then("those Geological Centers!"),
        ),
        // Can't have Support Station objective with nomads yet.
        state("buildAndPowerSsOne", "buildAndPowerSsMultiple").then("FAIL!!"),
      )
      .then(skip, state("resourceObjective"))
      .then(
        skip,
        state("lostMinersOne", "lostMinersTogether", "lostMinersApart"),
      )
      .then(skip, state("hasMonsters"))
      .then(end);
  },
);

export const FOUND_SLUG_NEST = phraseGraph<State, Format>(
  "Found Slimy Slug Nest",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "I don't like the look of this.",
        "Look at that!",
        "Oh, dear.",
        "This could be a problem!",
      )
      .then(
        "It must be a nest of Slimy Slugs!",
        "We need to keep these Slimy Slugs at bay.",
      )
      .then(end);
  },
);

export const FAILURE_BASE_DESTROYED = phraseGraph<State, Format>(
  "Base Destroyed - Mission Failure",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "With your base destroyed,",
        "Oh no! The Rock Raider HQ is in ruins, and",
      )
      .then(
        "I don't think you can complete our mission.",
        "that doesn't bode well for our mission.",
      )
      .then(
        "I'm pulling you out.",
        "We're teleporting everyone out.",
        "I'm ordering you to evacuate immedately!",
      )
      .then(end);
  },
);

export const BOSS_ENEMY_DEFEATED = phraseGraph<
  State,
  Format & { enemy: Creature }
>("Boss Enemy Defeated", ({ pg, state, start, end, cut, skip }) => {
  start
    .then(
      "Good work!",
      ({ format: { enemy } }) =>
        `Your Rock Raiders made short work of that ${enemy.template.name}.`,
      "That's a relief!",
      "I was worried for a minute there.",
    )
    .then(end);
});

export const BLACKOUT_START = phraseGraph<State, Format>(
  "Blackout Start",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Hmmm -", "Oh no!", "This isn't good.")
      .then(
        "the magnetic shifts are interfering with our Power Station.",
        "the anomaly disabled our Power Station.",
        "our Energy Crystals aren't able to power our HQ right now.",
      )
      .then(end);
  },
);

export const BLACKOUT_END = phraseGraph<State, Format>(
  "Blackout End",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "The power is back, but it's hard to tell how long it will last.",
        "The anomaly has disappeared for now.",
      )
      .then(
        skip,
        "The Canteen doesn't need power, so you might want to build one as " +
          "a backup.",
        state("hasAirLimit").then(
          "I suggest you build additional Support Stations to keep the " +
            "cavern breathable.",
        ),
      )
      .then(end);
  },
);

export const MOB_FARM_NO_LONGER_BLOCKING = phraseGraph<State, Format>(
  "Mob Farm no longer blocking",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(
        "With so many Energy Crystals removed, you should now have no " +
          "issues teleporting in the other vehicles.",
      )
      .then(
        skip,
        state("lostMinersOne").then(
          "Use them to find that missing Rock Raider!",
        ),
        state("lostMinersTogether", "lostMinersApart").then(
          "Use them to find those missing Rock Raiders!",
        ),
      )
      .then(end);
  },
);

export const GAS_LEAK_NO_AIR = phraseGraph<State, Format>(
  "Gas Leak - All Support Stations offline",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Careful there!", "Oh no!", "This isn't good.")
      .then(
        "Without even one Support Station online, this cavern will be " +
          "uninhabitable very quickly.",
      )
      .then("Fix it NOW or we will need to abort!")
      .then(end);
  },
);

export const GAS_LEAK_INSUFF_AIR = phraseGraph<State, Format>(
  "Gas Leak - Support Stations Insufficient",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Careful there!", "Oh no!", "This isn't good.")
      .then(
        "Our Support Stations can't keep up and this cavern will be " +
          "uninhabitable very quickly.",
      )
      .then("Fix it NOW or we will need to abort!")
      .then(end);
  },
);
