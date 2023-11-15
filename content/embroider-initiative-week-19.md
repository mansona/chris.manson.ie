---
title: Embroider Initiative Week 19
image: /images/magdalena-smolnicka-gBMmLzK5tuw-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Mon Oct 16 2023 22:15:38 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week has a slightly shorter update. I was away for some of the week and spent most of my time working on Embroider on the same Vite and esbuild experiment I've been mentioning for the past few weeks. The good news is that things are starting to take shape. 

## Providing a general update to current and potential Embroider Initiative backers

As of the time of writing this update, I haven't published any of these Embroider Initiative weekly updates. There is a weekly meeting where any Tier 2 or higher Initiative backers are happy to attend. Since not everyone can attend every week, we sent everyone a written update on some of the progress over the last few months. This update will also be helpful in communicating the progress that we have made to new potential backers so we can hopefully keep the Embroider Initiative going for a bit longer.

## Digging deeper into the Vite and esbuild experiment

There is a log of experimentation going on with the Vite and esbuild work at the moment, it's tough to give many updates on the work since it is very experimental but we have identified a potential refactor to the Embroider Resolver that would simplify things for esbuild as it's trying to identify dependencies to optimise. We're testing out that resolver refactor and hopefully we will have more to report next week.

## Simplifying some dependencies in the community

While experimenting with the Vite build with one of our Embroider Initiative backers we kept coming across the fact that `miragejs` was using `lodash.assign` and esbuild couldn't convert that to ESM for us. When the Vite and esbuild work we have been doing is finished there will be nothing wrong with using `lodash.assign` as a dependency. We are at the point in the wider community where it would be better to start using ESM dependencies if possible.

--- 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).