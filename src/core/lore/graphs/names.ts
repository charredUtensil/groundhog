import phraseGraph from "../utils/builder";
import { Format, State } from "../lore";

export const NAME = phraseGraph<State, Format>(
  "Mission Name",
  ({ pg, state, start, end, cut, skip }) => {
    function f({
      rock,
      ice,
      lava,
      mid,
      last,
    }: {
      rock?: string[];
      ice?: string[];
      lava?: string[];
      mid?: string[];
      last: string[];
    }) {
      start
        .then(
          rock ? state("rockBiome").then(...rock) : cut,
          ice ? state("iceBiome").then(...ice) : cut,
          lava ? state("lavaBiome").then(...lava) : cut,
        )
        .then(skip, ...(mid || []))
        .then(...last)
        .then(end);
    }

    f({
      rock: ["Amethyst", "Andesite", "Anthracite", "Argillite"],
      ice: ["Arctic", "Avalanche"],
      lava: ["Asbestos", "Ashen"],
      last: ["Abyss", "Action", "Alley", "Attack"],
    });

    f({
      rock: ["Basalt", "Basanite", "Bauxite", "Boulder", "Breccia", "Bullion"],
      ice: ["Blizzard"],
      last: ["Balance", "Blitz", "Breach", "Break", "Bonanza", "Burrow"],
    });

    f({
      rock: ["Chalk", "Claystone", "Core", "Crystal"],
      ice: ["Chilly", "Cold"],
      lava: ["Caldera", "Cinder"],
      last: [
        "Calamity",
        "Caper",
        "Cavern",
        "Chaos",
        "Conflict",
        "Conundrum",
        "Cruise",
      ],
    });

    f({
      rock: ["Diamond", "Diorite", "Dolomite", "Dunite"],
      ice: ["Dichoric", "Drift"],
      last: ["Depths", "Dash", "Descent", "Despair", "Drive"],
    });

    f({
      rock: ["Emerald", "Evaporite"],
      lava: ["Ember"],
      last: ["Enigma", "Eruption", "Excavation", "Express"],
    });

    f({
      rock: ["Fault Line", "Final", "Fissure", "Flint"],
      ice: ["Frostbite", "Frosty"],
      last: ["Folly", "Frenzy", "Fury"],
    });

    f({
      rock: [
        "Garnet",
        "Giga Granite",
        "Gneiss",
        "Granite",
        "Gritstone",
        "Gypsum",
      ],
      ice: ["Giga Glacier", "Glacial", "Glacier"],
      last: ["Gauntlet", "Getaway"],
    });

    f({
      ice: ["Iceberg", "Icicle"],
      lava: ["Igneous", "Infernal"],
      last: ["Impact", "Incursion", "Inset", "Intrusion"],
    });

    f({
      rock: ["Lapis Lazuli", "Laterite", "Lignite", "Limestone", "Lithosphere"],
      lava: ["Lava", "Lava Lake", "Lithic"],
      last: ["Labyrinth", "Lair", "Lure"],
    });

    f({
      rock: ["Marble", "Metamorphic", "Mineral", "Mudstone"],
      ice: ["Mammoth"],
      lava: ["Mafic", "Magma", "Mantle", "Molten"],
      mid: ["Mine", "Moon"],
      last: ["Mayhem", "Maze", "Meltdown", "Menace", "Mishap"],
    });

    f({
      ice: ["Ice Planet", "Permafrost", "Polar"],
      lava: ["Pumice", "Pyroclastic", "Pyrolite"],
      last: ["Passage", "Peril", "Pit", "Plunge", "Puzzle"],
    });

    f({
      rock: [
        "Sandstone",
        "Schist",
        "Sedimentary",
        "Seismic",
        "Shale",
        "Silica",
        "Silt",
        "Slate",
        "Stalactite",
      ],
      ice: ["Snowdrift", "Sub-Zero"],
      mid: ["Shaft"],
      last: ["Scramble", "Shock", "Showdown", "Slide"],
    });

    f({
      rock: ["Tuff", "Turbidite", "Twilight"],
      ice: ["Taiga", "Titanic", "Tundra"],
      mid: ["Tunnel"],
      last: ["Tempest", "Terror", "Trouble"],
    });
  },
);

// All of these suffixes are terrible references to sequels, releases,
// re-releases, version numbers, taglines, or just random jokes.
export const OVERRIDE_SUFFIXES = [
  "2000",
  "3000",
  "Ablated",
  "Actual Final Version 2",
  "And Beyond",
  "As Seen On PC",
  "Boosted",
  "Chief's Version",
  "Chrome Edition",
  "Denali",
  "Diamond Version",
  "Director's Cut",
  "Emerald Version",
  "Enhanced",
  "Episode One",
  "Episode Two",
  "Extended",
  "Extremely Fungible Edition",
  "Forever",
  "Founders Edition",
  "Gold Version",
  "Green Crystal Version",
  "HD",
  "HD 1.5 Remix",
  "Inspired by True Events",
  "Into Darkness",
  "Limited Edition",
  "Millenium Edition",
  "New",
  "Now With Flavor",
  "Onyx Version",
  "Original Level, Do Not Steal",
  "Pioneers Edition",
  "Planet U Remix",
  "Platinum Version",
  "Power Brick Edition",
  "Premium",
  "Rebirthed",
  "Reborn",
  "Recoded",
  "Rectified",
  "Recycled",
  "Redux",
  "Rehashed",
  "Reimagined",
  "Reloaded",
  "Remixed",
  "Resurrection",
  "Retooled",
  "Revenant",
  "Revolutions",
  "Ruby Version",
  "Sapphire Version",
  "Shadow Operation",
  "Silver Version",
  "Slug Armor Edition",
  "Special Edition",
  "The Beginning",
  "Unhinged",
  "Unglued",
  "Ungrounded",
  "Unleaded",
  "Unleashed",
  "Unlocked",
  "Unobtaininum Version",
  "Unplugged",
  "Unsanctioned",
  "Unstable",
  "Unverified",
  "Uranium Version",
  "XP",
  "Xtreme Edition",
  "Y2K Compliant Edition",
  "Y2K Edition",
];
