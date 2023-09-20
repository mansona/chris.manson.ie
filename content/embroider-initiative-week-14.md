---
title: Embroider Initiative Week 14
image: /images/conor-luddy-vuCUMpCPXZU-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Tue Sep 12 2023 12:11:39 GMT+0100 (Irish Standard Time)
tags:
---

This week I made good progress on the ember-auto-import work that allows you to use Webpack to import files from inside your Ember app, I made some progress on my work to move scenario-tester to ESM, and there was also some Vite experimentation with Ember Addons. 

## Progress on ember-auto-import

My work on ember-auto-import happens primarly during my pairing sessions with Ed Faulkner on Thursdays, and the main focus of this work is knowledge-sharing and to help improve the [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor) in Embroider and related projects. This week we made progress on adding support for relativeImports that cross the configured `allowAppImports` boundary. These sorts of changes are small in terms of "lines changed", but they can be exceedingly complicated to ensure they are working correctly. One of the challenges we are solving is that, when you import something using AMD (the classic way to access things in an Ember app) that re-exports something imported from Webpack, you want the exported module to be **exactly the same** in both cases. This means that there is no duplication in your bundles, but it also means that uses of `instanceof` will result in the expected behaviour. You can see an example of how this can go wrong in [this bug report on the ember-auto-import repo](https://github.com/embroider-build/ember-auto-import/issues/503), and you can keep track of my progress if you [follow the Pull Request that I'm working on with Ed](https://github.com/embroider-build/ember-auto-import/pull/587)

## Moving scenario-tester to ESM

[Scenario tester](https://github.com/embroider-build/scenario-tester) is a testing tool that we make use of a lot when testing embroider and ember-auto-import. It allows us to generate many scenarios with different combinations of dependencies. I have recently tried to use it outside of Embroider, or more specifically outside of a Typescript project, and it doesn't currently work in a CJS environment. [I started the effort to move the Typescript build to output an ESM-compatible build](https://github.com/embroider-build/scenario-tester/pull/18) so it can be consumed directly in ESM without a build step. The only remaining thing to do is test if it will work in Embroider before merging and releasing the new version.

## Vite experimentation

Some Embroider Initiative backers and Ember Core Tooling Team members have been experimenting with running their apps with the experimental vite build setup. The Vite plugin is nowhere near being ready for the general public but we are at the point where we can start experimenting and seeing where the parts that need to be improved might be. 

In the experimental vite build in the embroider repo we have [configured vite to ignore Ember Addons as part of it's optimisation step](https://github.com/embroider-build/embroider/blob/main/tests/vite-app/vite.config.mts#L26-L28) but that leads to [issues where CJS dependencies of Ember addons aren't converted to ESM correctly](https://github.com/embroider-build/embroider/issues/1583) (which is required for all dependencies in vite). After some experimentation, we have discovered that we shouldn't be ignoring all Ember addons, but instead, we should be ignoring only `@embroider/macros` for now. In the Ember Core Tooling Team meeting, we discussed that ignoring all addons was a temporary measure to get the build to pass at first and we should probably provide a more embroider-specific include/exclude configuration that can be derived from your application.

--- 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).

