import { State } from "../lore"
import phraseGraph from "../phrase_graph"

export const FOUND_HOARD = phraseGraph<State>(({ pg, state, start, end, cut, skip}) => {
  // Assume there is a collect_resources goal, and assume that goal requires
  // collecting crystals. This event will only be triggered if there are enough
  // crystals on the floor to complete the level.

  start.then(
    'Wow! This ought to do it!',
    'You\'ve found quite the haul here.',
    'Our intel was accurate. Look at all those Energy Crystals!',
  ).then(
      pg(
          'Now, transport these Energy Crystals back to your base.',
          'Bring this to your base to complete our mission!',
          'Get this back to your base.',
      ),
      state('treasureCaveMany').then(
          'With this, we have enough to complete our mission!',
          'Collect all the Energy Crystals you\'ve found and complete our mission!',
      ),
      state('hasMonsters').then(
          'I hope we can collect these without attracting too much attention.',
          'Be careful, Cadet! This is surely enough to attract those %(monster_type)s monsters.',
      )
  ).then().then(
    state('treasureCaveOne', 'treasureCaveMany'),
    skip,
  ).then().then(
    state('hasMonsters'),
    skip,
  ).then(end)
})