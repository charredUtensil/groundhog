import { Format, State } from "../lore";
import { TextFn } from "../utils/base";
import phraseGraph from "../utils/builder";
import { listJoiner } from "../utils/list";

const ORDERS = phraseGraph<State, Format>(
  "Briefing - Orders",
  ({ pg, state, start, end, cut, skip }) => {
    const collectResources = pg(
      ({ format: { resourceGoal } }) => `collect ${resourceGoal}.`,
      ({ format: { resourceGoal } }) =>
        `continue our mining operation by collecting ${resourceGoal}.`,
    );

    const weNeed = pg(
      ({ format: { resourceGoal } }) => `we need ${resourceGoal}.`,
      ({ format: { resourceGoal } }) => `you need to collect ${resourceGoal}.`,
    );

    const tail = pg(
      "Best of luck!",
      "Good luck out there!",
      "We're counting on you!",
    ).then(end);

    const tailOptional = pg(tail, end);

    const joiner: TextFn<Format> = listJoiner();

    start
      .then(
        state("hasMonsters")
          .then(skip, state("hasSlugs"))
          .then(
            "defend the Rock Radier HQ",
            "build up your defenses",
            "arm your Rock Raiders",
          )
          .then(joiner),
        state("hasSlugs")
          .then("defend the Rock Radier HQ", "arm your Rock Raiders")
          .then(joiner),
        pg(
          skip,
          state("nomadsOne", "nomadsMany"),
          state("spawnIsHq")
            .then(state("hqIsRuin", "spawnHasErosion"))
            .then("move to a safer cavern", "find a more suitable location")
            .then(joiner),
        )
          .then(
            "build the Rock Raider HQ",
            "build up your base",
            state("spawnHasErosion").then(
              "get your Rock Raiders to safety",
              "make sure your Rock Raiders are safe",
            ),
            state("spawnIsHq").then(
              "send some Rock Raiders down to this base",
              pg("resume our mining operations")
                .then(joiner)
                .then(collectResources)
                .then(cut),
              state("hqIsRuin").then(
                "clean up this mess",
                "get the Rock Raider HQ back in operation",
              ),
              state("hqIsFixedComplete")
                .then(skip, state("spawnHasErosion"))
                .then(
                  "keep this base in good working order",
                  "maintain what you do have here",
                ),
            ),
            state("findHq")
              .then(skip, state("spawnHasErosion"))
              .then("reach the Rock Raider HQ", "locate the base")
              .then(
                skip,
                state("hqIsRuin")
                  .then(joiner)
                  .then(
                    "salvage what's left",
                    "repair it",
                    "get it back in working order",
                  ),
              ),
            state("reachHq")
              .then(skip, state("spawnHasErosion"))
              .then("reach the Rock Raider HQ")
              .then(
                skip,
                state("hqIsRuin")
                  .then(joiner)
                  .then(
                    "salvage what's left",
                    "repair it",
                    "get it back in working order",
                  ),
              ),
          )
          .then(
            skip,
            pg(joiner)
              .then(
                state("hasMonsters").then(state("hasSlugs"), skip),
                state("hasSlugs"),
              )
              .then("keep it safe", "make sure it is heavily defended"),
          )
          .then(
            ". Use it to",
            ". When you're ready,",
            ". You must",
            pg(". Then,").then(weNeed).then(cut),
          ),
      )
      .then(
        skip,
        collectResources.then(cut),
        pg(
          state("buildAndPowerGcOne").then(
            "construct a Geological Center in the marked cavern, upgrade " +
              "it to Level 5, and keep it powered on.",
          ),
          state("buildAndPowerGcMultiple")
            .then(
              ({ format: { buildAndPowerGcCount } }) => `\
build a Geological Center in ${buildAndPowerGcCount === 2 ? "both" : "each"} of the marked caverns`,
            )
            .then(
              ", upgrade them to Level 5, and keep them powered on.",
              "and upgrade them all to Level 5. They must all be powered at the same time for the scans to work properly.",
            ),
          state("buildAndPowerSsOne").then(
            "construct a Support Station in the marked cavern and find some" +
              "way to power it.",
            "go to the island we've chosen and build a Support Station " +
              "there. It will need power, so build a Power Station too.",
          ),
          state("buildAndPowerSsMultiple")
            .then(
              ({ format: { buildAndPowerSsCount } }) => `\
build a Support Station in ${buildAndPowerSsCount === 2 ? "both" : "each"} of the marked caverns`,
            )
            .then(
              ", and keep them powered on. We think this will mitigate the gas.",
            ),
        ).then(
          tail,
          pg("Finally,").then(collectResources).then(cut),
          pg("Then,"),
        ),
      )
      .then(
        pg("find", "locate", "search the cavern for")
          .then(
            state("lostMinersOne")
              .then("the", "that")
              .then("lost Rock Raider", "missing Rock Raider"),
            state("lostMinersTogether")
              .then("the", "that")
              .then(
                "cavern with the lost Rock Raiders",
                "missing group of Rock Raiders",
              ),
            state("lostMinersApart")
              .then("the", "those")
              .then("lost Rock Raiders", "missing Rock Raiders"),
          )
          .then(
            ".",
            state("hasMonsters").then(
              ({ format: { enemies } }) => `before the ${enemies} do!`,
            ),
          )
          .then(
            tailOptional,
            pg(
              "Once you've found them,",
              "With them safe,",
              "When they are safe,",
            ).then(weNeed, collectResources),
          ),
      );

    pg(weNeed, collectResources)
      .then(state("resourceObjective"))
      .then(tailOptional);
  },
);

export default ORDERS;
