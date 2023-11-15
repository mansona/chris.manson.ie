---
title: Embroider Initiative Week 16
image: /images/barry-mcgee-JVQvoqmD7fM-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Tue Sep 19 2023 22:15:34 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week is quite an exciting one, consisting of a significant push into the `@embroider/vite` implementation and a better default experience for users generating a new Ember app with the `--embroider` flag.

## Ember and Vite - the new roadmap

There has been a lot of progress in the last months when it comes to RFC development that gets us closer to supporting Vite with Ember (you can see the "Standards" section [in our roadmap](https://github.com/orgs/embroider-build/projects/1/views/1)) but this last week during my pairing session with Ed we sat down and mapped out the next few steps to get us to a Vite build that we would want people to test out and give feedback on. We put together [a quick todo list](https://github.com/mansona/ember-vite-app#todo-to-make-this-mainstream) on a demo project README that once all the items are done we will feel comfortable creating a custom blueprint for people to start trying out.

In the meantime we're going to keep plugging away at some of the smaller parts of the Vite story, and in my pairing sessions with [Andrey (lolmaus)](https://github.com/lolmaus) we are going to dive into the [bug that is preventing Vite's dependency optimisation from being able to use the Embroider resolver correctly](https://github.com/mansona/ember-vite-app/pull/1). 

## Embroider optimised with the `--embroider` flag

Right now when you generate a new ember app with the embroider flag `ember new my-super-app --embroider` it generates a "full compat" app for you. This essentially means that none of the [embroider optimisation flags](https://github.com/embroider-build/embroider#options) are passed to the build for you. 

While it's true that more existing apps will work with a "full compat" mode, we have reached a point where it makes sense for **newly generated apps** to start with a high water mark so that developers don't accidentally or unconsciously add functionality that won't work in a fully optimised Embroider application. If you want to turn off any of the optimisation flags, you can, but it would be a deliberate choice as you needed to add a specific dependency or functionality to your app.


I have opened a [PR to switch the functionality](https://github.com/ember-cli/ember-cli/pull/10370) that has been approved by the tooling team but is blocked by the ember-cli CI right now. The issue is that some of the slow test suites rely on a custom package caching mechanism that copies a `node_modules` folder around, and since embroider v3.2.0 we have a custom `node_modules/.embroider` folder where we put your rewritten apps and depencencies that doesn't work well with the ember-cli CI.

I attempted to [update the CI to use `pnpm` instead of a package cache](https://github.com/ember-cli/ember-cli/pull/10382) but that had a significant slowdown that isn't acceptable for an already long-running CI. In the Tooling Team meeting this week we discussed alternative solutions, such as porting the slow ember-cli tests to use [scenario-tester](https://github.com/embroider-build/scenario-tester) but the simpler solution might be to expose a way for you to influence where the `.embroider` folder is put on the file system, so in cases like this CI we could put it somewhere in `/tmp/` and not need to refactor the package cache system in the CI.

This week I have less time to work on Embroider since I'm travelling to [EmberFest](https://emberfest.eu/) but we'll see if I can make any progress in Airports or between talks!

--- 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).