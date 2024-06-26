This directory contains all of the individual steps to "transform" a cavern from a context object to a completed, serialized cavern. These steps are organized as follows:

- _Outline_: Determine the rough position of the playable area of the cavern.
  - _Partition_: Starting with a square, slice it into smaller baseplates.
  - _Discriminate_: Choose the largest baseplates to become caves.
  - _Triangulate_: Draw lines between the centers of the caves to create a mesh of triangles. These are ambiguous paths.
  - _Span_: Find the minimum spanning tree and mark these paths as spanning.
  - _Clip_: Remove some ambiguous paths that would not be fun to include.
  - _Bore_: Detour paths to baseplates they cross, in order to make them more interesting.
  - _Weave_: Choose some of the ambiguous paths to become halls.
- _Planning_: Create plans for the baseplates and paths that will determine how the space will be used.
  - _Negotiate_: Assign baseplates and paths to new plans.
  - _Measure_: Determine size information for the plans.
  - _Flood_: Choose which plans will have water, lava, and erosion.
  - _Establish_: Choose which plan will be the spawn, walk through adjacent plans, assign architects, and determine other information based on distance from spawn.
  - _Pearl_: Create pearls that effectively assign tiles to plans.
- _Masonry_: Choose which tiles to place.
  - _Foundation_: Determine which tiles are assigned to which plans.
  - _Rough_: A "rough draft" of the tile placement that only places floor, water, lava, dirt, loose, hard, and solid rock.
  - _Brace_: Find walls that would collapse immediately and add dirt so they don't.
  - _Grout_: Eliminate single-tile features that would otherwise look bad.
  - _Fine_: Add resources, buildings, and other tile types like seams, paths, and rubble.
  - _Annex_: Find any solid rock that can be collapsed by drilling adjacent walls. Mark this explicitly.
- _Plastic_: Place other things in the cavern that rely on the tile placement being finalized.
  - _Fence_: Determine the final bounds of the level.
  - _Discover_: Determine which tiles are open at start.
  - _Strataform_: Determine the rough height of some of the cavern tiles.
  - _Strataflux_: Determine the final height of all of the cavern tiles.
  - _Populate_: Add miners, vehicles, landslides, erosion, and creatures (but not monster spawns).
- _Ephemera_: Add everything else that doesn't necessarily have a position in the map.
  - _Adjure_: Determine the level objectives.
  - _Enscribe_: Write the level briefing and other text copy used throughout the level.
  - _Program_: Add any scripting to make the level work. This includes monster spawns.
  - _Serialize_: Convert the cavern to a text string that is the contents of the level file.
