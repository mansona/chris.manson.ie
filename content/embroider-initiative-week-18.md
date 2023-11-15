---
title: Embroider Initiative Week 18
image: /images/chan-hyuk-moon-B0eewq7EbVY-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Mon Oct 02 2023 13:58:16 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week has been a very busy one: finalising some work that has been in progress for a long while, working to help make Embroider more stable and easier to test, and moving forward on the Vite and esbuild integration experimentation.

## Pairing on Vite and esbuild

I [mentioned in my last update](/embroider-initiative-week-17) that I have been pairing with my colleague [Andrey Mikhaylov](https://github.com/lolmaus) to add Embroider support to esbuild. This week we were able to successfully build our test app by forcing esbuild to _externalise_ all calls to modules that Embroider should be in charge of. This means that instead of esbuild trying to bundle things and essentially inline all Ember dependencies it would fall back to the vite server and "ask" for any of the dependencies it comes across, which is closer to what the dependencies are expecting to happen anyway.

Our next steps are to test this vite implementation against some existing apps that already have all of the Embroider optimisation flags turned on. This will give us more of an insight if this is the only change that needs to happen to get a vite build working. There will still be plenty of work to make this easier to consume and probably some work on making it more performant but it's a great start and some very exciting progress.


## Finalise auto release of content-tag

[content-tag](https://github.com/embroider-build/content-tag) is a project that is maintained by the Ember Core Tooling Team and is designed to be a pre-processor for GJS files. There has been a lot of bugfixes recently that needed to be released, and we want to make sure that we have a very predictable release process so that we can be sure that the WASM aspect of the package builds correctly. I had [previously setup a github action that would release](https://github.com/embroider-build/content-tag/pull/8) when a tag was pushed to the repo but we hadn't been able to test that process because I didn't have permissions to setup the required environment variables. This week I [merged a few PRs](https://github.com/embroider-build/content-tag/pulls?q=is%3Apr+author%3Amansona+merged%3A2023-10-01..2023-10-03) that finalised the GitHub release process and tested it out with the [release of v1.1.1](https://github.com/embroider-build/content-tag/releases/tag/v1.1.1). This release should hopefully remove the last blockers to make `content-tag` [the main implementation for `<template>` tags in the ecosystem](https://github.com/ember-template-imports/ember-template-imports/pull/187).


## Testing out our recent Vite work with an Initiative backer

Since our pairing session on Monday we have been looking for a non-trivial app to test our Vite changes and esbuild plugin against. We had this opportunity on Monday during our pairing session with one of our Embroider Initiative backers, and then we had another opportunity to test it with an Ember Core Tooling Team member during our Embroider Office Hours on Tuesday this week. 

While I was quietly hopeful that things would Just Work™️ with the changes that we made, there did seem to be a bug in the esbuild pre-optimise step that caused some addon dependencies to not be properly converted from CJS to esm. We [created a minimal reproduction](https://github.com/mansona/ember-vite-app/pull/2) of the issue by installing and testing `ember-intl` and we will need to dig a bit deeper into esbuild to figure out why it's not optimising dependencies properly.

This week I used my pairing session with Ed Falkner to dive a bit deeper into this problem and [we started an experiment](https://github.com/embroider-build/embroider/pull/1627) to see if we could change the internal structure of our `rewritten-packages` to see if that would help esbuild discover more of the dependencies that it should optimise for us. There is still a lot of work here to even get the experiment working but we spent a large amount of time stepping through the code of esbuild as it was discovering dependencies and we're pretty sure that this is the cause of our problems.


## Solving a problem for apps with node_modules in a symbolic link

One of our initiative backers has identified a problem because their Embroider build was behaving differently on CI compared to running the exact same build locally. We tracked it down to the fact that their CI was configured to create a symbolic link to an existing `node_modules` folder rather than running a new `npm install` for every job. It turns out that this is the same reason that the CI was failing for [my pull request to make Embroider optimised the default](https://github.com/ember-cli/ember-cli/pull/10370) when you run `ember new --embroider`. I have identified the cause of the issue inside Embroider, have [opened a PR that fixes it](https://github.com/embroider-build/embroider/pull/1622), the PR has been merged, and the fix has been released.


## Providing watch-mode tests for embroider

Recently [Godfrey Chan](https://github.com/chancancode) has been discovering some places in Embroider and our Webpack plugin that were causing [crashes when certain files were added or deleted](https://github.com/embroider-build/embroider/issues/1619). He has already come up with a [fix for some of the cases](https://github.com/embroider-build/embroider/pull/1620) but it showed a blind spot in our testing infrastructure that meant we weren't testing "watch mode" in Embroider. [Preston Sego](https://github.com/NullVoxPopuli) and I paired this week trying to add some [basic watch mode tests](https://github.com/embroider-build/embroider/pull/1624) that would show the problem and prove that the fix actually fixed the problem we were facing, but we were hit by some strange quirks that prevented our watch-mode tests from ever exiting properly on the Windows CI job. I spent most of my [weekly streaming session on Twitch](https://www.twitch.tv/real_ate) trying to [figure out the solution](https://github.com/embroider-build/embroider/pull/1624/files#diff-adeba5225992c6c7545d60355bcb082048a61ff39fdb2d9f5aa0d2c585e8d896R55-R62) but we finally got the PR merged and we are now ready to start adding more expansive watch-mode tests now. 

## Merging the change to `ember-cli` for the  `--embroider` flag

In a previous update I explained that I had been working on updating the blueprint for new Ember apps so that when you use the `--embroider` flag it [uses Embroider optimised by default](/embroider-initiative-week-16#embroideroptimisedwiththeembroiderflag). This has been a challenging PR to get merged because of problems in ember-cli's CI and the recent EOL of Node 16. I'm happy to say that this week I finally [got the PR merged](https://github.com/ember-cli/ember-cli/pull/10370) 🎉 This means that because of the Ember release train we are going to have this new functionality in ember-cli v5.5. 

--- 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).