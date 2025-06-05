[groundHog](https://en.wikipedia.org/wiki/Groundhog_Day_(film))
is a procedural map generator for
[Manic Miners](https://manicminers.baraklava.com/)

For most people, just use the web application
[hosted on GitHub Pages](https://charredutensil.github.io/groundhog/).

# Development

## Running

If you have a clever idea for getting the files from the Downloads folder
to the Manic Miners level folder, please let me know.

To run locally, run `yarn install` and `yarn dev`, which will launch the
React application at `localhost:5173`. I use Linux for my dev machine and have
no desire to test this setup on Windows, so your results may vary.

## Testing

Run Jest tests with `yarn test`.

Some of the tests are "goldens" that test what a cavern serializes to. These
can be automatically updated by running `yarn update-goldens`. If a golden
is updated beyond the trivial, it may be a good idea to test them in game.

`yarn find-failures` is a utility that will build many caverns sequentially
to find any that fail. It's not particularly useful for regression testing
since it takes a _very long time_.

## Deploying

groundHog should deploy automatically when the main branch is updated via a
[GitHub action](https://github.com/charredUtensil/groundhog/actions/workflows/release.yml)
as long as all tests are passing.

## Contributing

I am on the Manic Miners Discord. Ping me if you're interested in contributing
and I can offer advice and/or suggestions. PRs are welcomed. Please run
`yarn presubmit` on your PR and commit any changes before submitting it.

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
themselves are hand-crafted. GroundHog makes no calls at runtime to ChatGPT
_et al_.

A modern "AI" would be somewhat unhelpful in this situation. There aren't
nearly enough Manic Miners levels in existence to train the AI on what makes a
level *winnable*, and the system requirements would far exceed Manic Miners
itself, even on max graphics settings - or cost money per level generated.

A significant portion of this codebase (about 15%) is dedicated to writing copy
for level briefings and random events throughout. This is the one case where
generative AI would probably be much easier and potentially yield better
results - but I'm stubborn.

I have been using Gemini to do some limited code generation (mostly for tests)
and for translating Python code from
[Hognose](https://github.com/charredUtensil/hognose).

## How does it work?

See the documentation [here](./src/core/transformers) for an overview of the
step-by-step procedure.

## Can I use this as a template to build my custom Manic Miners level on?

Sure! I'd appreciate it if you included a link to this GitHub page, at least
within the level comments.

## Can groundHog make a level that...

Add an issue and maybe! Generally speaking, the kind of things that would be
easier to add would be caves with specific things in them. Whole-cavern
overhauls are also possible, but will require significant amounts of testing
before they are released.

## Can I tweak the level generation?

Yes! Just click "Advanced" and you have a few dozen parameters to change.
Some should be fairly self-explanatory while others... aren't. Please note
that changing these settings, especially at the extreme edges, is likely to
cause errors at this time.

The sliders provided are in roughly the order that they are used. Generally
speaking, I would recommend tweaking them in order from top to bottom as
changes near the start of the process are likely to affect the end of it in
major and unpredictable ways.

See [code comments](./src/core/common/context.ts)
for explanations of what these values do.

## Can you give me some cool seeds to play?

Not yet. And I'm probably going to break level generation a few times before
this project hits a 1.0 release.

## Were any of these Qs actually FA'ed?

[No.](https://www.youtube.com/watch?v=UUlcFEDkhsE)