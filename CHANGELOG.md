# Changelog

## 0.10.14 - The Performance Update

- Bugs Fixed
  - Fix #78, which is actually two issues
    - FCHQ crashing when it can't place a Docks
    - Gas Leak failing to place a Power Station because the spot it would fit in is already taken by other buildings
- Editor Changes
  - Tune down the color of the hazard stripe so as to make it less eye-bleeding
- Gameplay Changes
  - This will rearrange virtually all "hq" caves, but should not affect what buildings they contain
- Refactors, Tooling, Testing
  - Migrate from `react-scripts` to `vite`
    - This should end all the annoying security warnings from dependabot even though they don't actually matter.
    - `yarn start` -> `yarn dev`, now starts on 5173
    - `yarn build && yarn preview` starts prod-like server on port 4173
  - Index lore states with `Set<bigint>` instead of an object of string keys
    - In testing, this reduces lore computation from 10s (!) to 2s on app start and marginally speeds up lore `generate()`
    - Also move this work from instantiation to the first `generate()` call, which makes the app appear to load faster even if the time to first generation is the same.
  - Improved error messages
  - Codify `placeRubbleInstead` better
  - Architects now have more control over building placement
    - Crash-on-fail is now presented as individual buildings being "required", so HQs can be OK with a missing Upgrade Station but crash if missing a Tool Store
  - Update to ESLint 9
    - Clean up some discovered errors
    - Switch from `new Array()` to `Array.from()` throughout.
  - Grid now uses integer keys, which saves some performance. Ditto EdgeMap (from `strataflux`)
    - This means caverns cannot possibly be created with bounds beyond 16,383 in any direction. IMO this isn't a problem for many reasons.
  - Algorithmic complexity improvements in `strataflux` I never bothered fixing after the prototype.

## 0.10.13

- Bugs Fixed
  - Fix #67
    - Lost HQ caverns, when they are discovered on spawn, generate a "reach HQ" objective instead.
    - Objectives now have tags, for simpler reference by scripts.
  - Fix an issue with Pandora caverns where invalid objectives like build+power were being generated.
  - Fix #76
- Refactors, Tooling, Testing
  - Add a script that generates caverns sequentially looking for errors.

## 0.10.12 - The Pandora Update

- Gameplay Changes
  - Adds Pandora Mode as described in #64.
- Refactors, Tooling, Testing
  - Refactor creature spawners (again)
  - Add Mermaid diagrams for lore graphs, which are auto-generated on presubmit.
  - Lore die enum moved to prng library

## 0.10.11 - The Gas Leak Update

- Bugs Fixed
  - #56
- Editor Changes
  - **Anchor gravity**: Encourages the anchor to be closer to the center.
  - **Anchor whimsy**: Multiplies the chance of a non-standard gameplay experience.
  - **Plan whimsy**: Multiplies the chance of caves where things happen.
  - New sliders use an exponential scale.
  - Show the current step in the progress bar.
  - About page includes special thanks credits.
- Gameplay Changes
  - Add some delay to erosion if the tile borders lava and is discovered at level start, which increases especially for eruption caves.
  - New architects
    - #59
      - Landslide rubble now called "waste" rubble, which is a mining term for material that contains no ore.
      - Tiles can have scripts
      - Use hardness throughout instead of tile equality
    - Gas Leak
      - Limits air to 500
    - #60
      - Only appears if anchor is gas leak
      - Creates a lava island that *should* have enough space for PP+TS+PS+SS
      - No erosion on center island
- Refactors, Tooling, Testing
  - Lore uses functions instead of raw substitution, which allows for more advanced plurals.
  - Arbitrary lore parameters have type checking
  - Break lore tests into multiple files so fewer are run after lore changes.
  - Erosion "mask" is generated before discovery that determines where erosion will be placed.
  - Anchors can crash if critical buildings fail to place.

## 0.10.10

- Bugs Fixed
  - Fix crash by properly handling the case where an if and a when trigger use the same condition.
  - Fix error message displayed on load, which is caused by the level loader parsing the comments.
  - Fix presubmit
- Refactors, Tooling, Testing
  - Migrate tests so other tests can use goldens.
  - Add tests for script builder.

## 0.10.9 - Blackout & Mob Farm

- Bugs Fixed
  - Redo the way brace functions to resolve #8.
  - Fix a bug where two different triggers are registered with identical conditions - only one of the two is actually fired.
- Editor Changes
  - Script preview now shows the location of the plan if the line contains what looks like a variable name that starts with `p\d+`
- Gameplay Changes:
  - Lost Miners caves can now have an SMLC as a breadcrumb vehicle.
  - Slightly alter the way boss battle caves are revealed in order to explicitly avoid opening more than one discovery zone in the same tick and triggering the tearing bug in MM.
  - Adds two new anchor caverns:
    - **Blackout**: A random event occurs that turns the lights off and removes the player's access to their collected Energy Crystals for up to two minutes.
    - **Mob Farm**: The player spawns adjacent to an island with a pile of ~200 Energy Crystals but can't use any vehicles that would let them actually be collected. Instead, the player must wait for monsters to eat the crystals, then kill them on shore.
      - The gameplay here is _very_ different from the usual MM level, playing more like Tower Defense than an RTS.
      - The fun is entirely contingent on the fact that the AI pathfinding for Monsters explicitly avoids crossing Electric Fences.
      - This doesn't make sense for Rock Monsters since they can't cross any terrain the miners can't, and Lava Monsters' resistance to laser weapons makes it a significantly harder challenge requiring more delicate balance - so this is only available for Ice caverns right now.
      - The player spawns with a LMLC that has an upgraded laser. This is intended as a hint for how the level works.
      - Includes a hint on how to use control groups, since they are effectively mandatory in this level.
      - It is easier than usual for a player to soft-lock this gamemode. If they blindly drill every single wall available, there's nowhere for the monsters to spawn. This is more of an issue for some of the caverns I generated than others.
- Refactors, Tooling, Testing
  - Refactor creature spawners (again) to allow automatic retriggering.
  - Refactor the way all scripts work
    - ScriptHelper -> ScriptBuilder
    - Architect script methods just call the builder instead of returning anything.
    - This does unfortunately mean removing all comments from the end product - but these have been getting less and less meaningful over time.
    - This also makes it harder for end users to modify the level scripts. However, there's no evidence the community was ever going to do this so this isn't a major loss.
  - The level comment now includes only the initial context rather than the full context.

## 0.10.8 - New Seismics

- Gameplay Changes
  - Add new context settings
    - globalHostilesCooldown, which when enabled prevents two different creature spawners from firing within that many seconds.
    - globalHostilesCap, which when enabled prevents creature spawners from firing if this would cause there to be more than that many creatures.
  - Add two new caves with seismic events
    - **Eruption**: A line of lava appears across the cave
    - **Boss Battle**: An inaccessible cave opens, revealing a 400%-scaled monster
  - Reduce frequency of existing fissure halls, which are now called "Secret Tunnel"
  - Many spawn caves now spawn monsters.
  - Monsters (mostly) don't spawn for nomad spawns until the HQ is found or a Tool Store is built, in order to encourage exploration.
- Refactors, Tooling, Testing
  - Centralize lore for seismic events
  - Clean up formatting of architect stats tool
  - Add scale parameter for entities
  - `placeBuildings` and `placeEntities` can update metadata for a plan.
  - Landslides and erosion are now added _after_ placing entities.
  - Creature spawners can gate spawns on whether the player has enough Support Stations to provide air to their miners (or if the air limit is disabled).

## 0.10.7

- Bugs Fixed
  - Erosion and landslides haven't been working properly. At most one erosion tile was generated on the entire map due to a malformed serialization.

## 0.10.6

- Refactors, Tooling, Testing
  - Add context value that sets a global monster timeout
  - Add script value indicating whether the player has won
  - Add helper function for anonymous event chains that have one trigger
  - Clean up some mutexes

## 0.10.5 - Build and Power

- Gameplay Changes
  - Add new buildandpower architects.
    - Update lore to mention buildandpower objective.
- Refactors, Tooling, Testing
  - Refactor lore strings used in scripts to be explicitly called where they are used, removing the code from lore itself.
  - Improve algorithmic complexity of lore completeless tests. Without this, they take >40 seconds to run with the new graphs.
  - Modify some scripts to have proper semaphore logic

## 0.10.4

- Refactors, Tooling, Testing
  - Update & Refactor scripts

## 0.10.3 - New HQs

- Gameplay Changes
  - Add new Fixed Complete HQ spawn, which disables all buildings in exchange for starting with a complete base.
  - Add new island HQ spawn with a free Docks and Mining Laser.
- Refactors, Tooling, Testing
  - Add limited modding support - "spawn" cave is now the "anchor" cave and is not necessarily expected to be where the player starts. After choosing the anchor cave but before any other caves are chosen, the anchor gets to modify the cavern in any way. I will probably add other extra steps for closing as well.
  - Rename all architects to be more clearly segmented.

## 0.10.2

- Gameplay Changes
  - Discovery zones can be "claimed" by scripts

## 0.10.1

- Bugs Fixed
  - Yes
- Gameplay Changes
  - Caverns have "friendly" names\
- Editor Changes
  - Yes

## 0.10.0

- Gameplay Changes
  - Cumulative cavern generation tweaks I've been holding back to avoid breaking existing caverns.
    - Generate much less Hard Rock, and do so in smaller and more reasonable chunks.
    - Halls with auxiliary paths can become "loopback" halls that can only be opened by excavating both sides
    - "Fissure" halls that tear open automatically some time after being sufficiently disturbed
    - Tweak cavern distribution

