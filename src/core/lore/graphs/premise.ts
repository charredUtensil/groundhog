import { State } from "../lore";
import phraseGraph from "../phrase_graph";

const PREMISE = phraseGraph<State>(({ pg, state, start, end, cut, skip }) => {
  const greeting = start.then(
    pg(
      "Are you ready for the next mission?",
      "Welcome back, Cadet.",
      "I hope you're prepared for this one, Cadet.",
      "Up and at 'em, Cadet!",
      "Cadet, are you up for some more action?",
      state("floodedWithWater").then(
        "Are you ready to set sail?",
        "I hope you packed your lifejacket, Cadet.",
      ),
      state("floodedWithLava").then(
        "I hope you're not afraid of a little heat!",
        "You'd better keep your cool with this one!",
      ),
    ).then("\n\n"),
    skip,
  );

  const negativeGreeting = start
    .then(
      "Things have been going smoothly... until now!",
      "Bad news, Cadet!",
      "We need your help, Cadet.",
    )
    .then("\n\n");

  const weFoundACave = pg()
    .then(
      pg(
        "A recent scan",
        "The Hognose scanner",
        "The Hognose scanner aboard the L.M.S. Explorer",
      ).then("found", "has discovered", "has indicated"),
      pg("We", "The scanners", "The scanners aboard the L.M.S. Explorer").then(
        "have found",
        "have located",
        "have discovered",
      ),
    )
    .then()
    .then(
      state("treasureCaveOne").then(
        "a large Energy Crystal signature near here",
        "a nearby cave with an abundance of Energy Crystals",
      ),
      state("treasureCaveMany").then(
        "large deposits of Energy Crystals in this cavern",
        "a cave system with an abundance of Energy Crystals",
      ),
      "another cavern where we can continue our mining operations",
    )
    .then();

  const forcedToEvac = pg(
    ", when an increase in seismic activity forced us to evacuate.",
    ", but we were forced to evacuate when the cavern started to collapse.",
  );

  const cavernCollapsed = pg(
    ", when the cavern collapsed.",
    "before a massive cave-in occurred.",
  );

  const baseDestroyedByMonsters = state("hasMonsters").then(
    ", when their base was attacked by %(monster_type)s monsters.",
    ", but an unexpected horde of %(monster_type)s attacked and destroyed much of their base.",
  );

  const no_one_hurt_but_base_destroyed = pg(forcedToEvac, cavernCollapsed)
    .then("No one was hurt", "Everyone made it out")
    .then(skip, cut.then(baseDestroyedByMonsters).then("No one was hurt"))
    .then(", but")
    .then(
      state("spawnIsHq").then(
        "our base is in ruins",
        "this is all that's left",
        "our Rock Raider HQ has taken heavy damage",
      ),
      state("findHq").then("we presume our Rock Radier HQ has been destroyed"),
    );

  const they_are_trapped = pg().then(
    state("lostMinersTogether", "lostMinersApart").then(
      "Now they are trapped",
      "A few of our Rock Raiders are still trapped nearby",
    ),
    state("lostMinersOne").then(
      "One Rock Raider is missing",
      "Everyone else was able to teleport back to the L.M.S. Explorer",
      "but one of our Rock Raiders is still missing",
    ),
  );

  const miners_were_exploring_then_lost = pg(
    "A team of Rock Radiers was",
    "Some of our Rock Raiders were",
  )
    .then(
      state("treasureCaveOne").then(
        "searching for a nearby cavern with an abundance of Energy Crystals",
      ),
      pg(state("treasureCaveMany"), skip).then(
        "exploring this cavern",
        "conducting mining operations here",
      ),
    )
    .then(
      forcedToEvac
        .then("\n\nUnfortunately,", "\n\n")
        .then(
          state("lostMinersTogether", "lostMinersApart").then(
            "some of them are still trapped within the cavern",
            "the teleporters have been acting up again and some of them have been left behind",
          ),
          state("lostMinersOne").then(
            "one of them is still trapped within the cavern",
            "one is still unaccounted for",
          ),
        )
        .then(state("spawnIsHq"))
        .then(state("hqIsRuin")),
      cavernCollapsed
        .then(they_are_trapped)
        .then(", and")
        .then("we presume our Rock Radier HQ has been destroyed")
        .then(state("findHq")),
      pg()
        .then(state("lostMinersTogether", "lostMinersApart"))
        .then(
          ", but we have not been able to contact them for some time now",
          "and were buried by a recent cave-in",
        )
        .then(),
      baseDestroyedByMonsters.then(cut),
    )
    .then();

  const teleporter_malfunction = pg()
    .then(
      state("lostMinersOne").then(
        "A teleporter malfunction sent one of our Rock Raiders to a cavern near here",
        "The teleporter on the L.M.S. Explorer has been acting up again and one of our Rock Raiders is trapped in an uncharted cavern",
        "One of our Rock Raiders was accidentally sent to the wrong cavern",
      ),
      state("lostMinersTogether").then(
        "A teleporter malfunction sent a group of our Rock Raiders to a cavern near here",
        "The teleporter on the L.M.S. Explorer has been acting up again and a group of our Rock Raiders ended up in an uncharted cavern",
      ),
    )
    .then();

  const however = pg(
    ". \n\nHowever,",
    ". \n\nUnfortunately,",
    ". \n\nUnfortunately for us,",
    ". \n\nThe bad news?",
    ". Use caution!",
    ", but proceed with caution!\n\n",
    ", but this is no walk in the park.",
  );

  const find_them = pg()
    .then(
      "we're counting on you to find them!",
      "we don't know how long they'll last out there.",
      state("hasMonsters").then(
        "we need to find them before the %(monster_type)s monsters do.",
        "I hope they don't meet any of the %(monster_type)s monsters roaming this cavern.",
      ),
    )
    .then(state("spawnHasErosion"), skip)
    .then();

  const hq_destroyed = pg(
    "Recent seismic activity has damaged our Rock Raider HQ",
    "An earthquake in this area has caused several cave-ins and destroyed part of our Rock Raider HQ",
  );

  const hq_destroyed_but_evacuated = hq_destroyed
    .then(
      ". We were able to evacuate in time",
      ". All of our Rock Raiders made it out",
      ". We evacuated the cavern",
      ". Everyone evacuated safely",
    )
    .then(
      state("findHq").then(
        ", but this is as close as we can get for now",
        ", but the teleporter seems to have been destroyed",
      ),
      state("spawnIsHq")
        .then(state("hqIsRuin"))
        .then(
          ", but this is all that's left",
          "and the geology seems to be stable again",
        ),
    );

  const hq_destroyed_and_miners_lost = hq_destroyed
    .then(", and")
    .then(
      state("lostMinersOne").then("one of our Rock Raiders is missing"),
      state("lostMinersTogether").then(
        "a group of Rock Raidiers are missing",
        "a group of Rock Raidiers are trapped somewhere in the cavern",
      ),
      state("lostMinersApart").then(
        "some of our Rock Raidiers are missing",
        "our Rock Raiders are trapped throughout the cavern",
      ),
    )
    .then(state("findHq", "spawnIsHq"))
    .then();

  const reassurance = pg("Don't get discouraged.", "Don't worry!").then(
    "I'm sure you will be able to meet this challenge head-on!",
    "This is well within the capabilities of someone with your skillset.",
    "You've triumphed over tough challenges before!",
    "You've beaten worse odds before!",
  );

  const spawn_has_erosion = state("spawnHasErosion").then(
    "we are dangerously close to a cavern full of lava",
    "we are concerned about nearby lava flows that could engulf this cavern",
    "you will need to keep an eye on the volcanic activity in this cavern to avoid being buried in lava",
  );

  const has_monsters_texts = [
    "the tunnels here are full of large creatures that threaten our operations",
    "we are picking up signs of large creatures in the area",
    "this cavern is inhabited by nests of %(monster_type)s monsters",
    "we have reason to believe there are dozens of %(monster_type)s monsters just out of sight",
  ];

  const has_monsters = state("hasMonsters").then(...has_monsters_texts);
  const and_has_monsters = state("hasMonsters")
    .then(", and")
    .then(...has_monsters_texts);

  start
    .then(
      "Our mining operations have been going smoothly, and we are ready to move on to the next cavern.",
      "There is nothing out of the ordinary to report today.",
      "Things have been quiet and I hope they should remain that way, Cadet!",
    )
    .then(end);

  greeting.then(weFoundACave).then(pg(".").then(end), however);

  pg(greeting, negativeGreeting)
    .then()
    .then(
      hq_destroyed,
      teleporter_malfunction,
      miners_were_exploring_then_lost,
    );

  pg(
    pg(miners_were_exploring_then_lost, teleporter_malfunction)
      .then(".")
      .then(find_them),
  );

  they_are_trapped.then(", and", ".").then(find_them);

  find_them.then(reassurance, end);

  const empty_hq_destroyed = pg(
    hq_destroyed_but_evacuated,
    no_one_hurt_but_base_destroyed,
  )
    .then(".")
    .then(end, skip);

  const hardship_and = pg(
    empty_hq_destroyed,
    pg(
      miners_were_exploring_then_lost,
      hq_destroyed_and_miners_lost,
      teleporter_malfunction,
    ).then(". Also,", ". If that wasn't hard enough,", ". It gets worse:"),
  );

  pg(however, hardship_and).then().then(spawn_has_erosion, has_monsters);
  spawn_has_erosion.then(and_has_monsters);

  pg(hq_destroyed_and_miners_lost, and_has_monsters)
    .then(".")
    .then(reassurance, end);
  pg(spawn_has_erosion, has_monsters).then(".").then(end);

  reassurance.then(end);
});
export default PREMISE;
