import phraseGraph from "../utils/builder";
import { PgArgs } from "../utils/base";
import { Format, State } from "../lore";
import { bothOrSpell, spellNumber } from "../utils/numbers";
import { listOfAny } from "../utils/list";

function objectives<StateT extends State, FormatT extends Format>({
  pg,
  state,
}: Pick<PgArgs<StateT, FormatT>, "pg" | "state">) {
  return listOfAny(
    { pg },
    pg(
      state("buildAndPowerGcOne").then("build the Geological Center"),
      state("buildAndPowerGcMultiple").then(
        ({ format: { buildAndPowerGcCount } }) =>
          `build ${spellNumber(buildAndPowerGcCount)} Geological Centers`,
      ),
    ),
    pg(
      state("buildAndPowerSsOne").then("build the Support Station"),
      state("buildAndPowerSsMultiple").then(
        ({ format: { buildAndPowerSsCount } }) =>
          `build ${spellNumber(buildAndPowerSsCount)} Support Stations`,
      ),
    ),
    pg(
      state("lostMinersOne").then("find the lost Rock Raider"),
      state("lostMinersTogether", "lostMinersApart").then(
        "find the lost Rock Raiders",
        ({ format: { lostMiners } }) =>
          `find ${bothOrSpell(lostMiners, (s) => `all ${s}`)} lost Rock Raiders`,
      ),
    ),
    state("resourceObjective").then(
      ({ format: { resourceGoal } }) => `collect all ${resourceGoal}`,
      ({ format: { resourceGoal } }) => `get the ${resourceGoal} we needed`,
    ),
  );
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

export const SUCCESS = phraseGraph<
  State & { readonly commend: boolean },
  Format
>("Conclusion - Success", ({ pg, state, start, end, cut, skip }) => {
  const head = (() => {
    const commend = state("commend").then("Wow!", ...COMMENDATIONS);
    const hasMonsters = state("hasMonsters").then(
      ({ format: { enemies } }) => `Those ${enemies} were no match for you!`,
      ({ format: { enemies } }) =>
        `You had nothing to fear from those ${enemies}!`,
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
        state("hasMonsters", "spawnHasErosion", "anchorIsGasLeak").then(
          despiteTheOdds,
        ),
      );
  })();
  const coda = pg();
  head
    .then("you")
    .then(
      pg("managed to", "were able to")
        .then(objectives({ pg, state }))
        .then(
          ".",
          state("hasMonsters").then(
            ({ format: { enemies } }) => `despite that horde of ${enemies}!`,
          ),
        ),
      listOfAny(
        { pg },
        state("findHq").then("found the base"),
        state("hqIsRuin").then(
          "repaired the Rock Raider HQ",
          "restored our mining operations",
        ),
        state("buildAndPowerGcOne").then(
          "constructed the Geological Center",
          "built the Geological Center where we needed it",
        ),
        state("buildAndPowerGcMultiple").then(
          ({ format: { buildAndPowerGcCount } }) =>
            `built ${buildAndPowerGcCount === 2 ? "both" : spellNumber(buildAndPowerGcCount)} Geological Centers`,
        ),
        state("buildAndPowerSsOne").then(
          "constructed the Support Station",
          "built the Support Station where we needed it",
        ),
        state("buildAndPowerSsMultiple").then(
          ({ format: { buildAndPowerSsCount } }) =>
            `built ${buildAndPowerSsCount === 2 ? "both" : spellNumber(buildAndPowerSsCount)} Support Stations`,
        ),
        pg(
          state("lostMinersOne").then(
            "found the lost Rock Raider",
            "located the lost Rock Raider",
          ),
          state("lostMinersTogether", "lostMinersApart").then(
            "found the lost Rock Raiders",
            "located the lost Rock Raiders",
            ({ format: { lostMiners } }) =>
              `found ${lostMiners === 2 ? "both" : `all ${spellNumber(lostMiners)}`} Rock Raiders`,
          ),
        ).then(
          skip,
          pg(
            ", safe and sound.",
            state("resourceObjective").then(
              ({ format: { resourceGoal } }) =>
                `. You even collected ${resourceGoal}!`,
              ({ format: { resourceGoal } }) =>
                `. Collecting ${resourceGoal} was no small feat either!`,
            ),
          )
            .then(coda)
            .then(cut),
        ),
        state("resourceObjective").then(
          ({ format: { resourceGoal } }) => `collected ${resourceGoal}`,
          ({ format: { resourceGoal } }) => `collected all ${resourceGoal}`,
          ({ format: { resourceGoal } }) => `got all ${resourceGoal}`,
        ),
      )
        .then(".")
        .then(coda),
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

  head
    .then(
      pg(
        state("buildAndPowerGcOne").then(
          "That Geological Center you built will be very useful to decide " +
            "where we can mine next.",
        ),
        state("buildAndPowerGcMultiple").then(
          "Those Geological Centers you built are already helping us far " +
            "beyond the reaches of this cavern.",
        ),
      ).then(
        skip,
        "We already have a promising lead!",
        ({ format: { buildAndPowerGcCount } }) => `\
With ${buildAndPowerGcCount === 1 ? "this" : "these"} built, we can safely \
make our way further into the planet.`,
      ),
    )
    .then(skip, state("hasMonsters"))
    .then(coda);
});

export const FAILURE = phraseGraph<State, Format>(
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
