import { State } from "../lore";
import phraseGraph from "../builder";

const ORDERS = phraseGraph<State>(({ pg, state, start, end, cut, skip }) => {

  const collect_resources = pg(
    "collect ${resourceGoal}",
    "continue our mining operation by collecting ${resourceGoal}",
  );

  const we_need = pg(
    "we need ${resourceGoal}",
    "you need to collect ${resourceGoal}",
  );

  const tail = pg(
    skip,
    "Best of luck!",
    "Good luck out there!",
    "We're counting on you!",
  ).then(end);

  start
    .then(
      skip,
      state("spawnHasErosion").then(
        "get your Rock Raiders to safety,",
        "make sure your Rock Raiders are safe,",
      ),
      state("spawnIsHq")
        .then(state("hqIsRuin", "spawnHasErosion"))
        .then(
          "move to a safer cavern,",
          "find a more suitable location,",
        ),
      state("hasMonsters").then(
        "defend the Rock Radier HQ,",
        "build up your defenses,",
        "arm your Rock Raiders,",
      )
    )
    .then(
      "build the Rock Raider HQ",
      "build up your base",
      state("spawnIsHq")
        .then(state("hqIsRuin"))
        .then(
          "clean up this mess",
          "get the Rock Raider HQ back in operation"),
      state("findHq").then(
        "reach the Rock Raider HQ",
        "locate the base",
      )
    )
    .then(
      "and",
      "and use it to",
      ", and when you are ready,",
      state("hasMonsters").then(
        "and keep it safe.",
        "and make sure it is heavily defended.",
      ).then(
        "Then",
        we_need.then(cut)
      ),
    )
    .then(
      collect_resources,
      pg(
        "continue mining operations.",
        "explore the cavern.",
        "resume our mining operation.",
        "search the cavern.",
      ).then(we_need).then(cut),
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
            "before the ${enemies} do!",
          )
        )
        .then(
          tail,
          pg(
            "Once you've found them,",
            "With them safe",
            "When they are safe,"
          ).then(we_need, collect_resources)
        ),
    )
  
  pg(we_need, collect_resources).then(state('resourceObjective')).then(tail)
});

export default ORDERS;
