This directory contains all of the individual steps to "transform" a cavern from a context object to a completed, serialized cavern. Each step builds on the previous, and is meant to perform a single concrete task. These steps are organized into different "phases" as follows:

# I. Outlines

Determine the rough position of the playable area of the cavern. The result of this phase is a graph of _baseplates_ (non-overlapping regions of 2D space) connected by paths. This phase is loosely based on [AAdonaac's dungeon generation algorithm](https://www.gamedeveloper.com/programming/procedural-dungeon-generation-algorithm) with some modifications to produce a more organic-looking result.

1. _Partition_: Starting with a square, slice it repeatedly into smaller rectangles, trimming off some edges at each step. The remaining rectangles become "baseplates" that later steps will build on.
1. _Discriminate_: Choose the largest baseplates to become caves.
1. _Triangulate_: Draw lines between the centers of the caves to create a complete mesh of triangles. These lines are now ambiguous paths.
1. _Span_: Find the minimum spanning tree of paths and mark these paths as _spanning_.
1. _Clip_: Remove some ambiguous paths that would produce "boring" level designs, like perfectly straight hallways that connect two corners of the map.
1. _Bore_: Paths so far have been straight lines connecting caves. Add some detours where these paths intersect thus-far-unused baseplates. This makes the paths somewhat winding.
1. _Weave_: Mark some of the ambiguous paths as _auxiliary_.

# II. Planning

Create "plans" for the baseplates and paths that will determine how the space will be used, but don't actually place anything in the map yet.

1. _Negotiate_: Assign baseplates and paths to "plans". Some paths connecting two adjacent (touching) baseplates will become caves. All remaining spanning and auxiliary paths become halls and all remaining baseplates become caves.
1. _Measure_: Compute size information for the plans.
1. _Flood_: Choose which plans will have water, lava, and erosion.
1. _Anchor_: Choose which plan will be the _anchor_ and assign an architect to it. This architect will have signfigicant control over the rest of level generation and is generally the place where the player spawns.
1. _Mod_: The anchor architect has a chance to modify the cavern before any further generation occurs. Most commonly, this involves tweaking context parameters such as crystal / ore density.
1. _Establish_: Perform a breadth-first search of all plans, starting with the anchor. Assign architects and and determine other information based on the number of "hops" from the anchor.
1. _Pearl_: Create "pearls" that determine exactly where plans will go. This is the step that ensures the caves and halls will have more "natural" looking shapes.

# III. Masonry

Place tiles and a few other related things in the map. After this phase, tiles may not be modified.

1. _Foundation_: Create lookup tables identifying which tiles are assigned to which plans.
1. _Rough_: All plans perform a "rough draft" of their own tile placement. This step may only place floor, water, lava, dirt, loose, hard, and solid rock. Tiles may be overwritten multiple times. Plans go in order, so caves are able to fully overwrite halls they intersect.
1. _Brace_: Find walls that would collapse immediately in this state and add dirt so they don't.
1. _Grout_: Fill single-tile "holes" that would otherwise look bad, such as single unconnected tiles of water or lava or single-tile undiscovered caverns.
1. _Sand_: Downgrade single-tile spots of hard rock to loose rock.
1. _Fine_: All plans add resources, buildings, and any tile types like seams, paths, and rubble. Tiles may be overritten, but plans should avoid significant changes like replacing walls with non-walls.
1. _Annex_: Untouched tiles will become solid rock and are considered not to be "in play". Find any such tiles that can be collapsed by drilling adjacent walls. Mark these tiles as solid rock to identify them as "in play".
1. _Closer_: The anchor architect has a final chance to modify tiles.

# IV. Plastic

Place other things in the map that rely on the tile placement being finalized.

1. _Fence_: Determine the final bounds of the map.
1. _Discover_: Break the map into contiguous regions of non-wall tiles. Determine which of these are open at start. When "a new cavern has been discovered", these regions are what is revealed.
1. _Magmatize_: Decide where erosion is allowed to be.
1. _Strataform_: Cave plans determine a discrete height for each of their tiles. These are averaged together on a per-tile basis. The result is the _target_ height for each tile.
1. _Strataflux_: Determine the final height of all tile _corners_ within the map bounds, smoothing out the target height map determined earlier. Plans and tile types define additional constraints.
1. _Populate_: Plans add miners, vehicles, landslides, erosion, and creatures (but not monster spawns as those are handled through scripting).

# V. Ephemera

Add everything else that doesn't necessarily have a position within the map.

1. _Aerate_: Estimate the total playtime required before the player will have a working Support Station and use this to determine how much oxygen the level should have.
1. _Adjure_: Determine the level objectives. This is done late in the transformation so those objectives can match ground truth. For example, it's possible to generate "lost" miners that end up discovered at map start, meaning they should not be used as an objective.
1. _Enscribe_: Write the level name, briefing, success, and failure messages. This also creates a Lore object which is used to produce additional text strings during scripting.
1. _Preprogram_: Perform some steps that need to be completed before writing scripts:
   1. Each plan bids for the right to perform a "cutscene" when a region is discovered.
   1. The anchor decides if it wants to have a hold over monster spawns.
1. _Program_: Write all scripts, including:
   1. Any scripts specific to plans.
   1. Monster and slug spawns.
   1. Level objectives that are triggered by scripts.
1. _Serialize_: Convert the cavern to a text string which is the final content of the level.dat file.
