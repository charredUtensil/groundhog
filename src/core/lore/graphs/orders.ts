import { State } from "../lore";
import phraseGraph from "../builder";

const ORDERS = phraseGraph<State>(({ pg, state, start, end, cut, skip }) => {
  const build_hq = pg("build the Rock Raider HQ", "build up your base");

  const and_defend_it = state("hasMonsters").then(
    "and keep it safe",
    "and make sure it is heavily defended",
  );

  const get_to_safety = state("spawnHasErosion").then(
    "get your Rock Raiders to safety",
    "make sure your Rock Raiders are safe",
  );

  const move_hq = state("spawnIsHq")
    .then(state("hqIsRuin"))
    .then(state("spawnHasErosion"))
    .then("move to a safer cavern", "find a more suitable location");

  const find_lost_miners = pg("find", "locate", "search the cavern for")
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
    .then();

  const before_monsters_do = state("hasMonsters").then(
    "before the ${enemies} do!",
  );

  const defend = pg(
    start.then("defend the Rock Radier HQ"),
    pg("build up your defenses", "arm your Rock Raiders"),
  ).then(state("hasMonsters"));

  const repair_hq = state("spawnIsHq")
    .then(state("hqIsRuin"))
    .then("clean up this mess", "get the Rock Raider HQ back in operation");

  const find_hq = state("findHq").then(
    "reach the Rock Raider HQ",
    "locate the base",
  );

  const and_use_it_to = pg("and use it to");

  const asap = pg("as soon as possible", "as soon as you can");

  const collect_resources = pg(
    "collect ${resourceGoal}",
    "continue our mining operation by collecting ${resourceGoal}",
  );

  const continue_mining = pg(
    "continue mining operations",
    "explore the cavern",
    "resume our mining operation",
    "search the cavern",
  );

  const we_need_resources = pg(
    "we need ${resourceGoal}",
    "you need to collect ${resourceGoal}",
  );

  const sendoff = pg(
    "Best of luck!",
    "Good luck out there!",
    "We're counting on you!",
  );

  const tail = pg().then(sendoff, skip).then(end);

  const and_endgame = pg();
  const endgame = pg();

  start.then(
    build_hq,
    get_to_safety,
    move_hq,
    find_lost_miners,
    repair_hq,
    find_hq,
    defend,
  );

  pg(build_hq, defend).then(and_endgame);
  const asap_and_endgame = pg().then(asap, skip).then(and_endgame);
  pg(repair_hq, find_hq).then(asap_and_endgame);
  pg(get_to_safety, move_hq)
    .then()
    .then(pg(",").then(defend), asap_and_endgame);
  get_to_safety.then(",").then(build_hq, find_hq);

  pg(build_hq, repair_hq, find_hq).then(and_defend_it);
  find_hq.then(and_use_it_to).then(endgame);

  pg(and_defend_it, endgame.then(continue_mining))
    .then(".")
    .then(we_need_resources);
  and_endgame.then("and").then(endgame);
  endgame.then(find_lost_miners, collect_resources);
  find_lost_miners
    .then(before_monsters_do, ".")
    .then()
    .then(
      tail,
      pg(
        "Once you've found them,",
        "With them safe,",
        "When they are safe,",
      ).then(collect_resources, we_need_resources),
    );
  pg(collect_resources, we_need_resources)
    .then(state("resourceObjective"))
    .then(".")
    .then(tail);
});

export default ORDERS;
