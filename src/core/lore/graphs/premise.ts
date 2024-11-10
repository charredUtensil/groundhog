/* eslint-disable no-template-curly-in-string */

import { State } from "../lore";
import phraseGraph from "../builder";

const PREMISE = phraseGraph<State>(
  "Briefing - Premise",
  ({ pg, state, start, end, cut, skip }) => {
    // Complete, fully-constructed premises in one line.
    start
      .then(
        "Our mining operations have been going smoothly, and we are ready to " +
          "move on to the next cavern.",
        "There is nothing out of the ordinary to report today.",
        "Things have been quiet and I hope they should remain that way, Cadet!",
      )
      .then(end);

    const greeting = start
      .then(
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
      )
      .then(pg(), state("hasGiantCave"));

    const additionalHardship = (() => {
      const spawnHasErosion = state("spawnHasErosion").then(
        "we are dangerously close to a cavern full of lava",
        "we are concerned about nearby lava flows that could engulf this " +
          "cavern",
        "you will need to keep an eye on the volcanic activity in this " +
          "cavern to avoid being buried in lava",
      );

      const blackout = state("spawnIsBlackout").then(
        "the unusual magnetic properties of the rock here might interfere " +
          "with our equipment",
        "there are unusual magnetic readings in this cavern and we're " +
          "concerned about the effects that might have on our equipment",
      );

      const hasMonstersTexts = pg(
        state("hasMonsters").then(skip, state("hasSlugs")),
        state("hasSlugs"),
      ).then(
        "the tunnels here are full of large creatures that threaten our operations",
        "we are picking up signs of large creatures in the area",
        "this cavern is inhabited by nests of ${enemies}",
        "we have reason to believe there are dozens of ${enemies} just out of sight",
      );

      const hqIsFixedComplete = state("hqIsFixedComplete")
        // Buildandpower objectives shouldn't be possible, so trigger a failure
        // when it gets serialized.
        .then(
          state("buildAndPowerGcOne", "buildAndPowerGcMultiple").then("FAIL!!"),
          skip,
        )
        .then(
          "the teleporters are operating in a low-power mode, so",
          "our engineers tell me that",
        )
        .then(
          "you will not be able to construct any more buildings.",
          "you must make do with the buildings that are already constructed.",
        );

      pg(spawnHasErosion, blackout.then(skip, state("spawnHasErosion")))
        .then(", and")
        .then(hasMonstersTexts);
      return pg(
        blackout,
        spawnHasErosion,
        hasMonstersTexts,
        hqIsFixedComplete.then(end),
      )
        .then(".")
        .then(end, hqIsFixedComplete);
    })();

    // Weird case to explain: Find HQ, but the HQ is intact and there are no lost miners.
    // Blame Canada... or bureaucracy.
    greeting
      .then(state("findHq"))
      .then(skip, state("spawnHasErosion"))
      .then(skip, state("treasureCaveOne", "treasureCaveMany"))
      .then(skip, state("spawnIsNomadOne", "spawnIsNomadsTogether"))
      .then(skip, state("buildAndPowerGcOne", "buildAndPowerGcMultiple"))
      .then(
        "A forward team has established Rock Raider HQ in the viscinity, but " +
          "we haven't had the means to use it yet.",
        "There should be a base near here primed and ready for our mining " +
          "operations, but our teleporters are unable to get a lock on it for " +
          "some reason.",
        "We've had our eyes on this region and were all set to mine here. " +
          "Unfortunately, the signed copy of Form 27b-6 went missing below a " +
          "desk, we forgot about it, and now we aren't exactly sure where that " +
          "base is.",
        state("hasMonsters")
          .then(skip, state("hasSlugs"))
          .then(
            "We were all set to mine this cavern, but the team was scared off " +
              "by readings of ${enemies} in the area. They left in such a hurry " +
              "that they forgot to record where exactly the Rock Raider HQ is.",
            "There should be a base near here, but it's not showing up on our " +
              "scanners. We hope it hasn't been destroyed by ${enemies}, but to " +
              "be safe, we're sending you to a nearby cavern instead.",
          ),
        state("hasSlugs").then(
          "We were all set to mine this cavern, but the team was scared off " +
            "by a Slimy Slug that suddenly appeared in the middle of our HQ. " +
            "They even left without recording their location properly.",
          "There should be a base near here, but it's not showing up on our " +
            "scanners. Some interference from ${enemies} must have shut off " +
            "its location beacon! To be safe, we're sending you to a nearby " +
            "cavern instead.",
        ),
      )
      .then(end);

    greeting
      .then(
        // Need to build Geological Centers in specific places. Blame "interference"
        pg(state("buildAndPowerGcOne", "buildAndPowerGcMultiple"))
          .then(skip, state("treasureCaveOne", "treasureCaveMany"))
          .then(skip, "We're sending you to a cavern deep within the planet.")
          .then(
            "Our long-range scanners",
            "The scanners up on the L.M.S. Explorer",
          )
          .then(
            "are unable to penetrate the geology in this area and we need some " +
              "way to amplify them.",
            "have been unreliable at this depth and we'd like to understand the " +
              "area better.",
          )
          .then(skip, "That's where you come in -")
          .then("We need a team to scan the area"),
        // Maybe treasure, maybe spawn is HQ.
        pg(
          pg("A recent scan", "Our most recent geological survey").then(
            "found",
            "has discovered",
            "has indicated",
          ),
          pg(
            "We",
            "The scanners",
            "The scanners aboard the L.M.S. Explorer",
          ).then("have found", "have located", "have discovered"),
        ).then(
          state("treasureCaveOne").then(
            "a large Energy Crystal signature near here",
            "a nearby cave with an abundance of Energy Crystals",
          ),
          state("treasureCaveMany").then(
            "large deposits of Energy Crystals in this cavern",
            "a cave system with an abundance of Energy Crystals",
          ),
          state("hasGiantCave").then(
            'a nearby cavern approximately the size of "yes"',
          ),
          "another cavern where we can continue our mining operations",
        ),
        state("spawnIsBlackout")
          .then(
            "We found a cavern with unusual geomagnetic properties. We believe " +
              "it will have plenty of Energy Crystals",
            "We're sending you to a cavern deep within the planet where we've " +
              "been picking up unusual magnetic readings",
          )
          .then(skip, state("treasureCaveOne", "treasureCaveMany")),
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
        pg(
          state("spawnIsNomadOne").then(
            ". Your mission is to find a suitable location for our Rock Raider " +
              "HQ.",
          ),
          state("spawnIsNomadsTogether").then(
            ". We haven't yet chosen where to establish our base, so I'm " +
              "leaving that decision to you.",
            ", and I've picked this team to decide where to build our HQ.",
          ),
        )
          .then(
            skip,
            pg(
              state("hasMonsters").then(skip, state("hasSlugs")),
              state("hasSlugs"),
            ).then(
              "\n\nBe on the lookout for ${enemies}, especially once you start " +
                "construction.",
              "Use caution! There may be ${enemies} afoot and I don't want you " +
                "taking any unnecessary risk.",
            ),
          )
          .then(skip, state("spawnHasErosion"))
          .then(end),
      );

    // TODO: need lore state and copy for blackout?

    greeting
      .then(state("spawnIsMobFarm"))
      .then(
        "We discovered this incredible cave with the abundance of Energy " +
          "Crystals you now see before you.",
        "As you can see, we have located a cave with an absurd number of " +
          "Energy Crystals.",
      )
      .then(
        "We meant to teleport you onto that island, but something is " +
          "interfering with the signal.",
        "That many Energy Crystals in one place seems to be interfering with " +
          "our teleporters.",
      )
      .then(
        "We are extremely limited in what vehicles we can send down to you, " +
          "so you'll have to get the crystals some other way.",
      )
      .then(skip, state("hasMonsters"))
      .then(skip, state("hasSlugs"))
      .then(skip, state("spawnHasErosion"))
      .then(skip, state("treasureCaveOne", "treasureCaveMany"))
      .then(
        skip,
        pg("\n\nThere's one more thing - ")
          .then(skip, "you aren't the first to arrive here.")
          .then(
            state("lostMinersApart").then(
              "Some of our Rock Raiders were scattered a bit further away from " +
                "the island. By our readings, they seem to be in separate caverns " +
                "nearby",
            ),
            state("lostMinersTogether")
              .then(
                "We already sent a team down here, but they failed to check in",
              )
              .then(skip, ". We believe they are stranded in a nearby cavern"),
            state("lostMinersOne").then(
              "One of our Rock Raiders was teleported to another cavern " +
                "somewhere near here",
              "One of our Rock Raiders didn't come down with the group. They " +
                "should be somewhere nearby",
            ),
          )
          .then(
            "and we're counting on you to rescue them!",
            ". I know I can count on you to reach them.",
            ".",
          ),
      )
      .then(end);

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
    );

    const findTheOthers = pg(
      "we're counting on you to find the others!",
      state("hasMonsters").then(
        "you need to find the others before the ${enemies} do.",
      ),
    );

    pg(findThem, findTheOthers)
      .then(state("spawnHasErosion"), skip)
      .then(state("hasSlugs"), skip)
      .then(
        end,
        state("buildAndPowerGcOne", "buildAndPowerGcMultiple").then(
          "\n\nWhile you're down there, we need you to extend the range of our scanners.",
        ),
      )
      .then(end);

    // A teleporter accident caused lost miners or nomad spawn.
    // Maybe treasure, maybe find spawn or spawn is HQ.
    negativeGreeting
      .then(state("treasureCaveOne", "treasureCaveMany"), skip)
      .then(
        skip,
        state("spawnIsHq", "findHq").then(
          "We established our Rock Raider HQ, but",
          "We constructed our base and were ready to begin mining. " +
            "Unfortunately,",
        ),
      )
      .then(
        state("spawnIsNomadOne").then(
          "a teleporter malfunction sent this Rock Raider to an uncharted cavern.",
          "the teleporter on the L.M.S. Explorer has been acting up again and " +
            "one of our Rock Raiders is trapped in an uncharted cavern.",
          "one of our Rock Raiders was accidentally sent to the wrong cavern!",
        ),
        state("spawnIsNomadsTogether").then(
          "a teleporter malfunction sent a group of our Rock Raiders to an " +
            "uncharted cavern.",
          "the teleporter on the L.M.S. Explorer has been acting up again and " +
            "a group of our Rock Raiders ended up in an uncharted cavern.",
        ),
        pg(
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
        ).then(skip, findThem.then(cut)),
        state("spawnIsNomadOne", "spawnIsNomadsTogether")
          .then(state("lostMinersOne", "lostMinersTogether", "lostMinersApart"))
          .then(
            "a teleporter malfunction left our Rock Raiders scattered throughout " +
              "this cavern.",
          )
          .then(skip, findTheOthers.then(cut)),
      )
      .then(
        state("hqIsFixedComplete")
          .then(
            "While the teleporters have been repaired, they are operating in " +
              "a low-power mode and cannot send down any buildings.",
            "We cannot risk running the teleporters at full power, so you will " +
              "have to make do with the buildings that are already there.",
          )
          .then(alsoAdditionalHardship),
        pg(
          "Our engineers have assured us the teleporters have been repaired, " +
            "but",
          "While the teleporters are back in working order,",
        ).then(additionalHardship),
        alsoAdditionalHardship,
      );

    // Earthquakes or raids destroyed HQ.
    // HQ is ruin, maybe treasure, spawn is HQ or find HQ, maybe lost miners.
    negativeGreeting
      .then(state("hqIsRuin"))
      .then(state("treasureCaveOne", "treasureCaveMany"), skip)
      .then(state("buildAndPowerGcOne", "buildAndPowerGcMultiple"), skip)
      .then(state("hasSlugs"), skip)
      .then(
        "Recent seismic activity has damaged our Rock Raider HQ",
        "An earthquake in this area has caused several cave-ins and destroyed " +
          "part of our Rock Raider HQ",
        state("hasMonsters").then(
          "A horde of ${enemies} attacked our Rock Raider HQ",
        ),
      )
      .then(
        pg(", and")
          .then(skip, state("spawnIsHq", "findHq"))
          .then(
            pg(
              state("lostMinersOne").then(
                "one of our Rock Raiders is missing.",
              ),
              state("lostMinersTogether").then(
                "a group of Rock Raidiers are missing.",
                "a group of Rock Raidiers are trapped somewhere in the cavern.",
              ),
              state("lostMinersApart").then(
                "some of our Rock Raidiers are missing.",
                "our Rock Raiders are trapped throughout the cavern.",
              ),
            ).then(skip, findThem.then(cut)),
            state("spawnIsNomadOne", "spawnIsNomadsTogether")
              .then(
                state("lostMinersOne", "lostMinersTogether", "lostMinersApart"),
              )
              .then(
                "our Rock Raiders have been scattered throughout this cavern.",
              )
              .then(skip, findTheOthers.then(cut)),
          )
          .then(alsoAdditionalHardship, additionalHardship),
        pg(
          ". We were able to evacuate in time",
          ". All of our Rock Raiders made it out",
          ". We evacuated the cavern",
          ". Everyone evacuated safely",
        )
          .then(
            state("findHq").then(
              ", but this is as close as we can get for now.",
              ", but without the homing beacon we don't want to risk " +
                "teleporting anyone directly inside.",
              state("spawnIsNomadOne").then(
                ", but we can't get you any closer than this.",
                ", but we cannot risk teleporting you in any closer than this.",
                ", and we want you to return to the base and salvage what's " +
                  "left of it.",
              ),
              state("spawnIsNomadsTogether").then(
                ", and you'll be leading the salvage team.",
                ", and this is the team that will restore our operations.",
              ),
            ),
            state("spawnIsHq").then(
              ", but this is all that's left.",
              "and now we need to pick up the pieces and try again.",
            ),
          )
          .then(additionalHardship, end),
      );

    // A joke from early in development of Hognose, here as an easter egg.
    start
      .then(state("hasGiantCave"))
      .then(
        "We've got news for you, Rock Raider! Our geological scanners have " +
          'discovered a nearby cave approximately the size of "yes".',
      )
      .then(skip, state("hasMonsters"))
      .then(skip, state("hasSlugs"))
      .then(skip, state("spawnHasErosion"))
      .then(skip, state("treasureCaveOne", "treasureCaveMany"))
      .then(skip, state("spawnIsNomadOne", "spawnIsNomadsTogether"))
      .then(skip, state("buildAndPowerGcOne", "buildAndPowerGcMultiple"))
      .then(end);
  },
);
export default PREMISE;
