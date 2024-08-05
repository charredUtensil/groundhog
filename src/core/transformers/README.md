This directory contains all of the individual steps to "transform" a cavern from a context object to a completed, serialized cavern. Each step builds on the previous, and is meant to perform a single concrete task. These steps are organized into different "phases" as follows:

1. _Outlines_: Determine the rough position of the playable area of the cavern. The result of this phase is a graph of baseplates (non-overlapping regions of 2D space) connected by paths. This phase is loosely based on [AAdonaac's dungeon generation algorithm](https://www.gamedeveloper.com/programming/procedural-dungeon-generation-algorithm) with some modifications to make a more organic result.
   1. _Partition_: Starting with a square, slice it repeatedly into smaller rectangles, trimming off some edges at each step. The remaining rectangles become "baseplates" that later steps will build on.
   1. _Discriminate_: Choose the largest baseplates to become caves.
   1. _Triangulate_: Draw lines between the centers of the caves to create a mesh of triangles. These lines are now ambiguous paths.
   1. _Span_: Find the minimum spanning tree of paths and mark these paths as spanning. These will become halls.
   1. _Clip_: Remove some ambiguous paths that would be boring to include.
   1. _Bore_: Paths so far have been straight lines connecting caves. Add some detours where these paths intersect thus-far-unused baseplates to include them.
   1. _Weave_: Choose some of the ambiguous paths to become auxilliary halls.
1. _Planning_: Create "plans" for the baseplates and paths that will determine how the space will be used, but don't actually place anything in the map yet.
   1. _Negotiate_: Assign baseplates and paths to new plans. Some paths connecting two adjacent baseplates will become caves. All remaining paths become halls and all remaining baseplates become caves.
   1. _Measure_: Determine size information for the plans.
   1. _Flood_: Choose which plans will have water, lava, and erosion.
   1. _Establish_: Choose which plan will be the spawn, walk through adjacent plans, assign architects, and determine other information based on distance from spawn.
   1. _Pearl_: Create "pearls" that determine exactly where plans will go. This is the step that ensures the caves and halls will be more "natural" shapes.
1. _Masonry_: Place tiles and a few other related things in the map. After this phase, tiles may not be modified
   1. _Foundation_: Determine which tiles are assigned to which plans.
   1. _Rough_: All plans perform a "rough draft" of their own tile placement. This step only places floor, water, lava, dirt, loose, hard, and solid rock. Tiles may be overwritten multiple times.
   1. _Brace_: Find walls that would collapse immediately and add dirt so they don't.
   1. _Grout_: Eliminate single-tile features that would otherwise look bad, such as single unconnected tiles of water or lava or single-tile undiscovered caverns.
   1. _Fine_: All plans add resources, buildings, and other tile types like seams, paths, and rubble. Tiles may be overritten, but plans should avoid significant changes like replacing walls with non-walls.
   1. _Annex_: Find any solid rock that can be collapsed by drilling adjacent walls. Mark these tiles as in-play.
1. _Plastic_: Place other things in the map that rely on the tile placement being finalized.
   1. _Fence_: Determine the final bounds of the map.
   1. _Discover_: Break the map into contiguous regions of non-wall tiles. Determine which of these are open at start.
   1. _Strataform_: Plans determine a discrete "target height" for their tiles.
   1. _Strataflux_: Determine the final height of all tile corners within the map bounds, smoothing out the target height map determined earlier.
   1. _Populate_: Plans add miners, vehicles, landslides, erosion, and creatures (but not monster spawns).
1. _Ephemera_: Add everything else that doesn't necessarily have a position within the map.
   1. _Aerate_: Estimate the total playtime required before the player will have a working Support Station and use this to determine how much oxygen the level should have.
   1. _Adjure_: Determine the level objectives. This is done late in the transformation so those objectives can match reality. For example, it's possible to generate lost miners and have them discovered at map start, meaning they should not be used as an objective.
   1. _Enscribe_: Write the level name, briefing, success, and failure messages. This also creates a Lore object which is used to produce additional text strings during scripting.
   1. _Program_: Plans add any scripts they need. This includes monster and slug spawns, along with some level objectives that are triggered by scripts.
   1. _Serialize_: Convert the cavern to a text string, which is the final contents of the level.dat file.
