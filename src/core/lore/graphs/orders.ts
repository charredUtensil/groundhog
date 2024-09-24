/* eslint-disable no-template-curly-in-string */

import { State } from "../lore";
import phraseGraph from "../builder";

const ORDERS = phraseGraph<State>(
  "Briefing - Orders",
  ({ pg, state, start, end, cut, skip }) => {
  const collect_resources = pg(
    "collect ${resourceGoal}.",
    "continue our mining operation by collecting ${resourceGoal}.",
  );

  const we_need = pg(
    "we need ${resourceGoal}.",
    "you need to collect ${resourceGoal}.",
  );

  const tail = pg(
    skip,
    "Best of luck!",
    "Good luck out there!",
    "We're counting on you!",
  ).then(end);

  start
    .then(
      state("hasMonsters")
        .then(skip, state("hasSlugs"))
        .then(
          "defend the Rock Radier HQ",
          "build up your defenses",
          "arm your Rock Raiders",
        )
        .then("and"),
      state("hasSlugs")
        .then("defend the Rock Radier HQ", "arm your Rock Raiders")
        .then("and"),
      pg(
        skip,
        state("spawnIsHq")
          .then(state("hqIsRuin", "spawnHasErosion"))
          .then("move to a safer cavern,", "find a more suitable location,"),
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
            pg("resume mining operations and")
              .then(collect_resources)
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
              state("hqIsRuin").then(
                ", salvage what's left",
                ", repair it",
                ", get it back in working order",
              ),
            ),
        )
        .then(
          "and",
          "and use it to",
          ", and when you are ready,",
          pg(
            state("hasMonsters").then(state("hasSlugs"), skip),
            state("hasSlugs"),
          )
            .then("and keep it safe.", "and make sure it is heavily defended.")
            .then("Then,", we_need.then(cut)),
        ),
    )
    .then(
      skip,
      collect_resources.then(cut),
      state("buildAndPowerGcOne")
        .then("construct a Geological Center in the marked cavern")
        .then(
          pg(", upgrade it to Level 5, and keep it powered on.").then(
            end,
            pg("Finally, ").then(collect_resources).then(cut),
            pg("Then,"),
          ),
        ),
      state("buildAndPowerGcMultiple")
        .then(
          "construct a Geological Center in each of the marked caverns",
          "build a Geological Center in each of the ${buildAndPowerGcCount} marked caverns",
        )
        .then(
          pg(
            ", upgrade them to Level 5, and keep them powered on.",
            "and upgrade them all to Level 5. They must all be powered at the same time for the scans to work properly.",
          ).then(
            end,
            pg("Finally,").then(collect_resources).then(cut),
            pg("Then,"),
          ),
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
        .then(".", state("hasMonsters").then("before the ${enemies} do!"))
        .then(
          tail,
          pg(
            "Once you've found them,",
            "With them safe,",
            "When they are safe,",
          ).then(we_need, collect_resources),
        ),
    );

  pg(we_need, collect_resources).then(state("resourceObjective")).then(tail);
});

export default ORDERS;
