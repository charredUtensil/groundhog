import phraseGraph, { _forTests, PhraseGraph } from "../utils/builder";
import { FoundLostMinersState, State } from "../lore";
import ALL_GRAPHS from ".";

const { maskToStates } = _forTests;

type CombinedState = State & FoundLostMinersState & { readonly commend: true };

export function expectCompletion(actual: PhraseGraph<any, any>) {
  const keep: { [key: string]: true } = { start: true, end: true };
  actual.states.forEach((s) => (keep[s] = true));
  const expected = phraseGraph<CombinedState, any>(
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
      const lostMinersAndOrResourceObjective = pg(
        st("lostMinersOne", "lostMinersTogether", "lostMinersApart").then(
          end,
          resourceObjective,
        ),
        resourceObjective,
      );
      const buildPowerGcAndOrLostMinersAndOrResourceObjective = pg(
        st("buildAndPowerGcOne", "buildAndPowerGcMultiple").then(
          end,
          lostMinersAndOrResourceObjective,
        ),
        lostMinersAndOrResourceObjective,
      );
      const buildPowerSsAndOrLostMinersAndOrResourceObjective = pg(
        st("buildAndPowerSsOne", "buildAndPowerSsMultiple").then(
          end,
          lostMinersAndOrResourceObjective,
        ),
        lostMinersAndOrResourceObjective,
      );

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
          pg(
            st("spawnIsHq").then(st("hqIsFixedComplete")),
            st("anchorIsMobFarm"),
          ).then(lostMinersAndOrResourceObjective),
          st("spawnIsHq")
            .then(st("anchorIsGasLeak"))
            .then(
              buildPowerSsAndOrLostMinersAndOrResourceObjective,
              buildPowerGcAndOrLostMinersAndOrResourceObjective,
            ),
          pg(st("spawnIsHq").then(skip, st("hqIsRuin"))).then(
            buildPowerGcAndOrLostMinersAndOrResourceObjective,
          ),
          pg(st("anchorIsPandora"))
            .then(skip, st("findHq", "reachHq").then(skip, st("hqIsRuin")))
            .then(lostMinersAndOrResourceObjective),
          pg(
            skip,
            st(
              "anchorIsBlackout",
              "anchorIsOreWaste",
              "nomadsOne",
              "nomadsMany",
            ),
          )
            .then(skip, st("findHq", "reachHq").then(skip, st("hqIsRuin")))
            .then(buildPowerGcAndOrLostMinersAndOrResourceObjective),
        );
    },
  );
  // Expect states to match and be in the same order, which is necessary for
  // the bitmasking.
  expect(actual.states).toEqual(expected.states);
  actual.cacheReachableStates();
  expected.cacheReachableStates();

  const actualReachable = actual.phrases[0].reachableStates;
  const missing: bigint[] = [];
  // Actual can sometimes contain states that are impossible, so it's ok if
  // there are reachable states in actual not in expected.
  expected.phrases[0].reachableStates.forEach((s) => {
    if (!actualReachable.has(s)) {
      missing.push(s);
    }
  });
  if (missing.length > 0) {
    const min = missing.reduce((n, r) => (n < r ? n : r), missing[0]);
    throw new Error(
      `Missing ${missing.length} states, including "${maskToStates(min, expected.states)}"`,
    );
  }
}

export default function testCompleteness(module: Record<string, unknown>) {
  Object.values(module).forEach((pg) => {
    if (!(pg instanceof PhraseGraph)) {
      return;
    }
    describe(pg.name, () => {
      it("is present in ALL_GRAPHS", () => {
        // Need to use object.is here because the equality comparison takes a
        // very long time.
        expect(ALL_GRAPHS.filter((apg) => Object.is(apg, pg)).length).toBe(1);
      });

      it("is complete", () => {
        expectCompletion(pg);
      });
    });
  });
}
