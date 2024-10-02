/* eslint-disable no-template-curly-in-string */

import phraseGraph, { PgArgs } from "../builder";
import { State } from "../lore";

function objectives<T extends State>({
  pg,
  state,
}: Pick<PgArgs<T>, "pg" | "state">) {
  const end = pg();

  const buildGcs = pg(
    state("buildAndPowerGcOne").then("build the Geological Center"),
    state("buildAndPowerGcMultiple").then(
      "build ${buildAndPowerGcCount} Geological Centers",
    ),
  );

  const findLostMiners1 = pg(
    state("lostMinersOne").then("find the lost Rock Raider"),
    state("lostMinersTogether", "lostMinersApart").then(
      "find the lost Rock Raiders",
    ),
  );

  const findLostMiners2 = pg(
    state("lostMinersOne").then("find the lost Rock Raider"),
    state("lostMinersTogether", "lostMinersApart").then(
      "find the lost Rock Raiders",
    ),
  );

  const getResources = state("resourceObjective").then(
    "collect all ${resourceGoal}",
    "get the ${resourceGoal} we needed",
  );

  buildGcs.then(",").then(findLostMiners1);
  buildGcs.then("and").then(findLostMiners2).then(end);
  pg(buildGcs, findLostMiners1).then("and").then(getResources);
  return pg(buildGcs, findLostMiners1, getResources).then(end);
}

const COMMENDATIONS = [
  "Well done!",
  "Good work!",
  "Outstanding!",
  "I knew you could do it, Cadet!",
  "You're very good at this, Cadet!",
  "Your efforts have been outstanding!",
  "We were right to count on you, Cadet!",
] as const;

export const SUCCESS = phraseGraph<State & { readonly commend: boolean }>(
  "Conclusion - Success",
  ({ pg, state, start, end, cut, skip }) => {
    (() => {
      const commend = state("commend").then("Wow!", ...COMMENDATIONS);
      const hasMonsters = state("hasMonsters").then(
        "Those ${enemies} were no match for you!",
        "You had nothing to fear from those ${enemies}!",
      );
      const despiteTheOdds = pg(
        "Despite the odds,",
        "In the face of danger,",
        "Even with the odds against you,",
      );
      hasMonsters.then(despiteTheOdds);
      return start
        .then(skip, commend, hasMonsters)
        .then(
          skip,
          state("hasMonsters", "spawnHasErosion").then(despiteTheOdds),
        );
    })()
      .then("you")
      .then(
        pg("managed to", "were able to")
          .then(objectives({ pg, state }))
          .then(
            ".",
            state("hasMonsters").then("despite that horde of ${enemies}!"),
          ),
        (() => {
          const foundTheBase = state("findHq").then("found the base");
          const hqIsRuin = state("hqIsRuin").then(
            "repaired the Rock Raider HQ",
            "restored our mining operations",
          );
          foundTheBase.then(hqIsRuin);
          const coda = pg();
          return pg()
            .then(foundTheBase, hqIsRuin)
            .then(
              skip,
              state("buildAndPowerGcOne").then(
                ", constructed the Geological Center",
                pg("and built the Geological Center where we needed it.")
                  .then(coda)
                  .then(cut),
              ),
              state("buildAndPowerGcMultiple").then(
                ", built ${buildAndPowerGcCount} Geological Centers",
                pg("and built ${buildAndPowerGcCount} Geological Centers.")
                  .then(coda)
                  .then(cut),
              ),
            )
            .then("and")
            .then(
              pg(
                state("lostMinersOne").then(
                  "found the lost Rock Raider",
                  "located the lost Rock Raider",
                ),
                state("lostMinersTogether", "lostMinersApart").then(
                  "found the lost Rock Raiders",
                  "located the lost Rock Raiders",
                ),
              ).then(
                ", safe and sound.",
                "before anything could happen to them.",
                state("resourceObjective").then(
                  ". You even collected ${resourceGoal}!",
                  "- and salvaged the operation with those ${resourceGoal}.",
                  ". Collecting ${resourceGoal} was no small feat either!",
                ),
              ),
              state("resourceObjective").then(
                "collected ${resourceGoal}.",
                "collected all ${resourceGoal}.",
                "got all ${resourceGoal}.",
              ),
            )
            .then(coda);
        })(),
      )
      .then("\n\n")
      .then(
        skip,
        state("commend").then(
          "Keep up the good work, Cadet!",
          "You make this look rather easy, Cadet!",
          ...COMMENDATIONS,
        ),
      )
      .then("Mission Complete!")
      .then(skip, state("hasMonsters"))
      .then(skip, state("spawnHasErosion"))
      .then(end);
  },
);

export const FAILURE = phraseGraph<State>(
  "Conclusion - Mission Failed",
  ({ pg, state, start, end, cut, skip }) => {
    start
      .then(skip, "Oh, dear.", "Bad luck!")
      .then(
        "You didn't",
        "You couldn't",
        "You were unable to",
        "We were counting on you to",
      )
      .then(objectives({ pg, state }))
      .then(".")
      .then(
        skip,
        "You must succeed, Cadet!",
        pg(skip, "Chin up, Cadet!").then("You'll do better next time."),
      )
      .then("\n\nMission Failed!")
      .then(end);
  },
);
