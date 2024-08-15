# Architects

This directory contains the definitions of individual architects, which are responsible for creating a plan and then implementing each step of it. New architects may be added here to add new, interesting set pieces. This documentation serves as a guide to make sure architects "play nicely" with eachother.

## Bidding

Architects must implement at least one of the `caveBid`, `hallBid`, or `spawnBid` methods, which return a number or a falsy value representing the "bid" to use this architect for a given plan. These methods must ensure the plan is suitable for the architect. Consider checking any of these which apply:

- The fluid type, and the fluid types of any intersecting plans.
- The distance from spawn.
- The biome.
- If the architect relies on the presence of monsters or slugs, that those are enabled.
- Whether the architect has been used in the level already.

## Priming & Metadata

Architects may assign metadata at their inception that can be used by later steps. Consider setting any special invariants that you'll need to read later. Any plan with metadata must also have a tag. This tag should be unique to each type of architect.

## Pearls & Rough

The pearl determines which tiles are considered part of any plan. This cannot be changed later, and architects should avoid changing any tile which is not part of its inner pearl (though some limited changes on the outer pearl are acceptable) - otherwise, there may be unintended side effects if another plan was expected to "own" a square.

The rough stage should lay out most of the shape of the plan, with the understanding that other intersecting plans may override the individual tiles in arbitrary ways. There will also be hollistic cleanup steps that occur later. Note that it is possible for plan tiles to intersect even if the plans themselves were not marked as intersecting earlier.

Halls are roughed out first, followed by caves. This way, the cave has better control over its area of influence.

For the vast majority of architects, the `mkRough` function in `utils/rough` should be sufficient to complete this step.

## Fine

In the fine stage, details are added that may affect tiles. However, since assumptions have already been made about which tiles are walls, floors, and fluids, avoid changing between these things. For example, it's OK to replace Loose Rock with an Energy Crystal Seam or floor with Power Path. It's not OK to replace Water with Hard Rock.

### Recharge Seams & Slug Holes

These should perform the task listed in the name.

### Buildings

This step is nominally for adding buildings but may also be used to set up other miscellaneous fixed position items such as open cave flags or the camera position, since those tend to be linked with buildings. Note the camera position must only be set once, and it should be the spawn cave that does this. When buildings are placed, the architect should also set the building's foundation - it will not happen automatically.

### Crystals & Ore

These steps should place the exact amount of Energy Crystals and Ore chosen for the plan in the Establish step. Resources may be placed within walls, on the floor, or by replacing walls with the appropriate Seam.

## Populate

In the populate stage, tiles cannot be modified.

...