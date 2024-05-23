/* eslint-disable no-template-curly-in-string */

import { State } from "../lore";
import phraseGraph from "../builder";

const PREMISE = phraseGraph<State>(({ pg, state, start, end, cut, skip }) => {
  // Complete, fully-constructed premises in one line.
  start
    .then(
      "Our mining operations have been going smoothly, and we are ready to move on to the next cavern.",
      "There is nothing out of the ordinary to report today.",
      "Things have been quiet and I hope they should remain that way, Cadet!",
    )
    .then(end);

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

  const additionalHardship = (() => {
    const spawnHasErosion = state("spawnHasErosion").then(
      "we are dangerously close to a cavern full of lava",
      "we are concerned about nearby lava flows that could engulf this cavern",
      "you will need to keep an eye on the volcanic activity in this cavern to avoid being buried in lava",
    );

    const hasMonstersTexts = state("hasMonsters").then(
      "the tunnels here are full of large creatures that threaten our operations",
      "we are picking up signs of large creatures in the area",
      "this cavern is inhabited by nests of ${enemies}",
      "we have reason to believe there are dozens of ${enemies} just out of sight",
    );

    spawnHasErosion.then(", and").then(hasMonstersTexts);
    return pg(spawnHasErosion, hasMonstersTexts).then(".").then(end);
  })();

  // Weird case to explain: Find HQ, but the HQ is intact and there are no lost miners.
  // Blame Canada... or bureaucracy.
  greeting
    .then(state("findHq"))
    .then(skip, state("spawnHasErosion"))
    .then(skip, state('treasureCaveOne', 'treasureCaveMany'))
    .then(
      "A forward team has established Rock Raider HQ in the viscinity, but " +
      "we haven't had the means to use it yet.",
      "There should be a base near here primed and ready for our mining " +
      "operations, but our teleporters are unable to get a lock on it for " +
      "some reason.",
      "We've had our eyes on this region and were all set to mine here. " +
      "Unfortunately, the signed copy of Form 27b-6 went missing below a " +
      "desk and we aren't exactly sure where that base is.",
      state("hasMonsters").then(
        "We were all set to mine this cavern, but the team was scared off " +
        "by readings of ${enemies} in the area. They left in such a hurry " +
        "that they forgot to record where exactly the Rock Raider HQ is.",
        "There should be a base near here, but it's not showing up on our " +
        "scanners. We hope it hasn't been destroyed by ${enemies}, but to " +
        "be safe, we're sending you to a nearby cavern instead."
      ),
    )
    .then(end);

  // Maybe treasure, maybe spawn is HQ.
  greeting
    .then(
      pg("A recent scan", "Our most recent geological survey").then(
        "found",
        "has discovered",
        "has indicated",
      ),
      pg("We", "The scanners", "The scanners aboard the L.M.S. Explorer").then(
        "have found",
        "have located",
        "have discovered",
      ),
    )
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
    .then(
      pg(".").then(end),
      pg(
        ". \n\nHowever,",
        ". \n\nUnfortunately,",
        ". \n\nUnfortunately for us,",
        ". \n\nThe bad news?",
        ". Use caution!",
        ", but proceed with caution!\n\n",
        ", but this is no walk in the park.",
      ).then(additionalHardship),
      state("spawnIsHq")
        .then(
          ", and we have established our Rock Raider HQ.",
          ", and our HQ is ready to go!",
        )
        .then(
          pg(
            "\n\nHowever,",
            "\n\nUnfortunately,",
            "\n\nUnfortunately for us,",
            "\n\nThe bad news?",
            "Don't be fooled, though.",
            "I do ask that you be careful down there!",
          ).then(additionalHardship),
          end,
        ),
    );

  const negativeGreeting = pg(
    greeting,
    start
      .then(
        "Things have been going smoothly... until now!",
        "Bad news, Cadet!",
        "We need your help, Cadet.",
        "Oh, dear.",
      )
      .then("\n\n"),
  );

  const alsoAdditionalHardship = pg(
    "Also,",
    "If that wasn't hard enough,",
    "It gets worse:",
  ).then(additionalHardship);

  const findThem = pg(
    "we're counting on you to find them!",
    "we don't know how long they'll last out there.",
    state("hasMonsters").then(
      "we need to find them before the ${enemies} do.",
      "I hope they don't meet any of the ${enemies} roaming this cavern.",
    ),
  )
    .then(state("spawnHasErosion"), skip)
    .then(end);

  // maybe treasure, maybe find spawn or spawn is HQ, lost miners.
  negativeGreeting
    .then(state("treasureCaveOne", "treasureCaveMany"), skip)
    .then(
      skip,
      state("spawnIsHq", "findHq").then(
        "We have established our Rock Raider HQ, but",
        "We constructed our base and were ready to begin mining. " +
        "Unfortunately,",
      ),
    )
    .then(
      state("lostMinersOne").then(
        "a teleporter malfunction sent one of our Rock Raiders to a cavern " +
        "near here.",
        "the teleporter on the L.M.S. Explorer has been acting up again and " +
        "one of our Rock Raiders is trapped in an uncharted cavern.",
        "one of our Rock Raiders was accidentally sent to the wrong cavern!",
      ),
      state("lostMinersTogether").then(
        "a teleporter malfunction sent a group of our Rock Raiders to a " +
        "cavern near here.",
        "the teleporter on the L.M.S. Explorer has been acting up again and " +
        "a group of our Rock Raiders ended up in an uncharted cavern.",
      ),
      state("lostMinersApart").then(
        "a teleporter malfunction scattered ${lostMinersCount} of our Rock " +
        "Raiders throughout this cavern.",
        "the teleporters have failed again and ${lostMinerCavesCount} " +
        "groups of Rock Raiders are lost somewhere in this cavern.",
      ),
    )
    .then(
      pg(
        "Our engineers have assured us the teleporters have been repaired, " +
        "but",
        "While the teleporters are back in working order,",
      ).then(additionalHardship),
      alsoAdditionalHardship,
      findThem,
    );

  // HQ is ruin, maybe treasure, spawn is HQ or find HQ, maybe lost miners.
  negativeGreeting
    .then(state("hqIsRuin"))
    .then(state("treasureCaveOne", "treasureCaveMany"), skip)
    .then(
      "Recent seismic activity has damaged our Rock Raider HQ",
      "An earthquake in this area has caused several cave-ins and destroyed " +
      "part of our Rock Raider HQ",
      state("hasMonsters").then(
        "A horde of ${enemies} attacked our Rock Raider HQ",
        "Our Rock Raiders were caught unaware by a horde of ${enemies}",
      ),
    )
    .then(
      pg(", and")
        .then(
          state("lostMinersOne").then("one of our Rock Raiders is missing."),
          state("lostMinersTogether").then(
            "a group of Rock Raidiers are missing.",
            "a group of Rock Raidiers are trapped somewhere in the cavern.",
          ),
          state("lostMinersApart").then(
            "some of our Rock Raidiers are missing.",
            "our Rock Raiders are trapped throughout the cavern.",
          ),
        )
        .then(
          state("findHq").then(alsoAdditionalHardship, findThem),
          state("spawnIsHq").then(additionalHardship, findThem),
        ),
      pg(
        ". We were able to evacuate in time",
        ". All of our Rock Raiders made it out",
        ". We evacuated the cavern",
        ". Everyone evacuated safely",
      )
        .then(
          state("findHq").then(
            ", but this is as close as we can get for now.",
            ", but the teleporter seems to have been destroyed.",
            ", but we cannot risk teleporting in any closer.",
          ),
          state("spawnIsHq").then(
            ", but this is all that's left.",
            "and now we need to pick up the pieces and try again.",
          ),
        )
        .then(additionalHardship, end),
    );
});
export default PREMISE;
