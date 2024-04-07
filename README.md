[groundHog](https://en.wikipedia.org/wiki/Groundhog_Day_(film))
is a procedural map generator for
[Manic Miners](https://manicminers.baraklava.com/)

# Running

For most people, just use the web application
[hosted on GitHub Pages](https://charredutensil.github.io/groundhog/).

If you have a clever idea for getting the files from the Downloads folder
to the Manic Miners level folder, please let me know.

To run locally, run `yarn install` and `yarn start`, which will launch the
React application at `localhost:3000`. My dev machine is Linux so I have
no idea if this works on Windows.

# Testing

Run Jest tests with `npx yarn test`. Some of the tests are "goldens" that
test what a cavern serializes to. These can be automatically updated by
running `UPDATE_GOLDENS=1 npx yarn test`.

# Deploying

Deploy the current revision to GitHub Pages with
`npx yarn deploy -m 'deploy message'`. I eventually plan to migrate this
to a GitHub Action. 

# Contributing

I am on the Manic Miners discord. Ping me if you're interested in contributing
and I can offer advice and/or suggestions.

# FAQ

## Why?

Rock Raiders is a rather unique game from 1999. It plays kind of like an RTS,
but with a heavy focus on economy and logistics. I enjoyed it tremendously as
a kid and I'm enjoying Baraklava's remake now. I've also always been fascinated
by algorithmically generated content. Many RTS games have some kind of random
map generator. I dabbled with scripting one in Age of Empires 2 a very long
time ago, but didn't get far. I've also loved every game I played that came
with a level editor, from
[Logic Quest 3D](https://www.youtube.com/watch?v=605CeYpos1U&list=PL7A1EE48A7DD84B65&ab_channel=maxmouse713)
to [Portal](https://www.moddb.com/mods/gamma-energy).

After playing with the level editor in Manic Miners a few times, I realized I
had a few interesting ideas for set pieces but not what to do with the rest of
the cavern - and now here we are.

## Which AI does this use?

All of the caverns are procedurally generated using an approach that
would have been feasible back in 1999. Procedural generation means there are a
series of specific rules that determine where everything in the level gets
placed, and while there is some randomness within those rules, the rules
themselves are hand-crafted.

A modern "AI" would be somewhat unhelpful in this situation. There aren't
nearly enough Manic Miners levels in existence to train the AI on what makes a
level *winnable*, and the system requirements would far exceed Manic Miners
itself, even on max graphics settings.

I have been using Gemini to do some limited code generation for tests and for
translating modules from [Hognose](https://github.com/charredUtensil/hognose).

## Can I use this as a template to build my custom Manic Miners level on?

Sure! I'd appreciate it if you included a link to this GitHub page.

## Can groundHog make a level that...

Add an issue and maybe! Generally speaking, the kind of things that would be
easier to add would be caves with specific things in them - like

## Can I tweak the level generation?

Sure! I'm hoping to eventually add parameters for everything in the
CavernContext object to the UI, but you can tweak these locally.

## Can you give me some cool seeds to play?

Not yet. As of this writing I haven't actually tested that any of the levels
load in Manic Miners.

## Were any of these Qs actually FA'ed?

No.