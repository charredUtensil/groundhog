import phraseGraph from "../builder";
import { State } from "../lore";

export const NAME = phraseGraph<State>(
  ({ pg, state, start, end, cut, skip }) => {
    function f({rock, ice, lava, mid, last}: {rock: string[], ice?: string[], lava?: string[], mid?: string[], last: string[]}) {
      const a = start.then();
      const c = pg(...last).then(skip, state('iceBiome', 'lavaBiome')).then(end);
      const b = mid ? pg(skip, ...mid).then(c) : c;
      a.then(...rock).then(b);
      if (ice) {
        a.then(state('iceBiome')).then(...ice).then(b);
      }
      if (lava) {
        a.then(state('lavaBiome')).then(...lava).then(b);
      }
    }

    f({
      rock: [
        'Andesite',
        'Anthracite',
        'Argillite',
      ],
      ice: [
        'Arctic',
        'Avalanche',
      ],
      lava: [
        'Asbestos',
      ],
      last: [
        'Abyss',
        'Action',
        'Alley',
        'Attack',
      ],
    });

    f({
      rock: [
        'Basalt',
        'Basanite',
        'Bauxite',
        'Boulder',
        'Breccia',
        'Bullion',
      ],
      ice: [
        'Blizzard',
      ],
      last: [
        'Balance',
        'Blitz',
        'Breach',
        'Break',
        'Bonanza',
        'Burrow',
      ],
    });

    f({
      rock: [
        'Chalk',
        'Claystone',
        'Core',
        'Crystal',
      ],
      lava: [
        'Caldera',
        'Cinder',
      ],
      last: [
        'Calamity',
        'Caper',
        'Cavern',
        'Chaos',
        'Conflict',
        'Conundrum',
      ],
    });

    f({
      rock: [
        'Diamond',
        'Diorite',
        'Dolomite',
        'Dunite',
      ],
      ice: [
        'Drift',
      ],
      last: [
        'Depths',
        'Dash',
        'Descent',
        'Despair',
        'Drive',
      ],
    });

    f({
      rock: [
        'Emerald',
        'Essexite',
        'Evaporite',
      ],
      lava: [
        'Ember',
      ],
      last: [
        'Enigma',
        'Eruption',
        'Excavation',
      ],
    });

    f({
      rock: [
        'Fault Line',
        'Fissure',
        'Flint',
      ],
      ice: [
        'Frostbite',
      ],
      last: [
        'Folly',
        'Frenzy',
        'Fury',
      ],
    });

    f({
      rock: [
        'Gneiss',
        'Granite',
        'Gritstone',
        'Gypsum',
      ],
      ice: [
        'Glacier',
      ],
      last: [
        'Gauntlet',
        'Getaway',
      ],
    });

    f({
      rock: [
        'Lapis Lazuli',
        'Laterite',
        'Lignite',
        'Limestone',
      ],
      lava: [
        'Lava',
        'Lava Lake',
      ],
      last: [
        'Labyrinth',
        'Lair',
        'Loop',
        'Lure',
      ],
    });

    f({
      rock: [
        'Marble',
        'Metamorphic',
        'Mineral',
        'Mudstone',
      ],
      ice: [
        'Mammoth',
      ],
      lava: [
        'Magma',
        'Mantle',
        'Molten',
      ],
      mid: [
        'Mine',
        'Moon',
      ],
      last: [
        'Mayhem',
        'Maze',
        'Meltdown',
        'Menace',
        'Mishap',
      ],
    });

    f({
      rock: [
        'Phosphorite',
        'Pumice',
      ],
      ice: [
        'Permafrost',
        'Polar',
      ],
      lava: [
        'Pyroclastic',
        'Pyrolite',
      ],
      last: [
        'Passage',
        'Peril',
        'Pit',
        'Plunge',
        'Puzzle',
      ],
    });

    f({
      rock: [
        'Sandstone',
        'Schist',
        'Sedimentary',
        'Shale',
        'Silica',
        'Silt',
        'Slate',
        'Stalactite',
      ],
      ice: [
        'Snowdrift',
        'Subzero',
      ],
      mid: [
        'Shaft',
      ],
      last: [
        'Scramble',
        'Shock',
        'Showdown',
        'Slide',
      ],
    });

    f({
      rock: [
        'Tuff',
        'Turbidite',
        'Twilight',
      ],
      ice: [
        'Titanic',
        'Tundra',
      ],
      last: [
        'Tempest',
        'Terror',
        'Trouble',
        'Tunnel',
      ],
    });
  },
);