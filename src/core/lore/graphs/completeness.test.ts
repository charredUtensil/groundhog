import ALL_GRAPHS from ".";
import phraseGraph, { PhraseGraph } from "../builder";
import { FoundLostMinersState, State } from "../lore";

type CombinedState = State & FoundLostMinersState & { readonly commend: true };

function expectCompletion(actual: PhraseGraph<any>) {
  const keep: { [key: string]: true } = { start: true, end: true };
  actual.states.forEach((s) => (keep[s] = true));
  const expected = phraseGraph<CombinedState>(
    "Expected",
    ({ pg, state, start, end, cut, skip }) => {
      // Only define states if they exist in actual
      function st(...args: Parameters<typeof state>) {
        const presentArgs = args.filter((arg) => keep[arg]);
        if (!presentArgs.length) {
          return skip;
        } else if (presentArgs.length < args.length) {
          return pg(skip, state(...presentArgs));
        }
        return state(...presentArgs);
      }

      // Set up nodes representing possible objectives.
      const resourceObjective = st("resourceObjective").then(end);
      const lostMinersAndOrResourceObjective = st(
        "lostMinersOne",
        "lostMinersTogether",
        "lostMinersApart",
      ).then(end, resourceObjective);
      const buildPowerGcAndOrLostMinersAndOrResourceObjective = st(
        "buildAndPowerGcOne",
        "buildAndPowerGcMultiple",
      ).then(end, lostMinersAndOrResourceObjective);

      start
        // These can happen regardless of what the anchor is.
        .then(st("rockBiome", "iceBiome", "lavaBiome"))
        .then(skip, st("floodedWithLava", "floodedWithWater"))
        .then(skip, st("hasMonsters"))
        .then(skip, st("hasSlugs"))
        .then(skip, st("hasAirLimit"))
        .then(skip, st("spawnHasErosion"))
        .then(skip, st("treasureCaveOne", "treasureCaveMany"))
        .then(skip, st("hasGiantCave"))
        .then(st("commend"))
        .then(st("foundMinersOne", "foundMinersTogether"))
        // Break down the lore based on possible anchors.
        .then(
          // FCHQ and Mob Farm: buildpower objectives are not available.
          pg(
            st("spawnIsHq").then(st("hqIsFixedComplete")),
            st("spawnIsMobFarm"),
          ).then(lostMinersAndOrResourceObjective),
          // Spawn is HQ: Normal objectives.
          pg(st("spawnIsHq").then(skip, st("hqIsRuin"))).then(
            buildPowerGcAndOrLostMinersAndOrResourceObjective,
          ),
          // Everything else: Normal objectives + maybe find HQ.
          pg(
            skip,
            st("spawnIsNomadOne", "spawnIsNomadsTogether", "spawnIsBlackout"),
          )
            .then(skip, st("findHq").then(skip, st("hqIsRuin")))
            .then(buildPowerGcAndOrLostMinersAndOrResourceObjective),
        );
    },
  );
  expect(actual.states).toEqual(expected.states);

  const actualReachable = actual.phrases[0].reachableStates;
  const missing: string[] = Object.keys(
    expected.phrases[0].reachableStates,
  ).filter((s) => !(s in actualReachable));
  // Actual can sometimes contain states that are impossible, so it's ok if
  // there are reachable states in actual not in expected.
  expect(missing).toEqual([]);
}

describe(`Graph is complete`, () => {
  ALL_GRAPHS.forEach((pg) => {
    test(`for ${pg.name}`, () => {
      expectCompletion(pg);
    });
  });
});
