---
title: Embroider Initiative Week 20
image: /images/ving-n-kQstq1lf0UE-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Wed Oct 18 2023 09:58:04 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week saw a lot of success in my pairing sessions for the Embroider Initiative backers, some good progress on the Embroider Vite experiment, and a significant improvement for anyone using ember-cli-deprecation-workflow.

## Working on fixing ember-cli-deprecation-workflow

Last week, while pairing with one of the Embroider Initiative backers, we noticed they are blocked from turning on the `staticEmberSource` flag in embroider because they are using ember-cli-deprecation-workflow. This is a vital addon for some companies, but unfortunately it relies on some older build tricks that aren't compatible with embroider, so my colleague Andrey and I started planning to upgrade it during our pairing sessions and by the end of the week Andrey had opened two PRs to make progress: One to [update the ember version used by the CI](https://github.com/mixonic/ember-cli-deprecation-workflow/pull/158) and another to [upgrade the system to use imports instead of relying on vendor files](https://github.com/mixonic/ember-cli-deprecation-workflow/pull/159). These changes might take a while to merge but will unblock anyone wanting to use ember-cli-deprecation-workflow with embroider. 

## Upgrading an Embroider Initiative backer's app to Embroider

One of our Embroider Initiative backers has three main apps, and one is already on an (almost) fully static build of embroider. The other two apps had various blockers preventing them from upgrading them. Embroider has reached a level of stability where we expect it to work for most apps, so we decided to try upgrading the smaller app. We managed to fix the main blocker, which was that [ember-service-worker](https://github.com/DockYard/ember-service-worker) does not support Embroider at all because it relies on the `postProcessTree()` hook from ember-cli. We used [inspiration from prember](https://github.com/ef4/prember#using-prember-with-embroider) and provided a way to manually process the output of the ember build for ember-service-worker to do its thing. We patched the dependency locally but also [opened a PR](https://github.com/DockYard/ember-service-worker/pull/230) with the changes to help the rest of the community that might be blocked by this same issue.

## Finalising the Resolver refactor

After last week's Vite experimentation we identified a refactor to the embroider resolver that would help Vite and esbuild discover dependencies better. That work concluded this week and means that the internal structure of the `.embroider/rewritten-packages` now follows a much more sensible structure that follows Node resolution rules. This way the assumptions made by Vite and esbuild are much more likely to hold true for Ember apps.

## Helping to fix tests for an Embroider Initiative backer

One of the first things you should do in your upgrade to Embroider is to run your CI suite with Embroider enabled to check if anything is broken. It turns out that in real applications that use a lot of addons, there are many things that "just worked" before Embroider, either by accident or with under-specified behaviours. Unfortunately there is no one-size-fits-all solution to fixing these errors after upgrading to embroider, and every issue you encounter needs to be tackled one-by-one. On the other hand, sometimes a large number of the problems you are facing are caused by a single addon being used across the app, and updating or patching that one addon to work with embroider can make significant progress all across your test suite. This week we were fortunate to find one of these types of errors and halved the number of test buckets that were failing for the Embroider Initiative backer.

## Debugging issues with severe slowdowns in recent ember-cli versions on windows

While working on the watch-mode tests two weeks ago we noticed that the release version of ember-cli has a massive slowdown compared to older versions for those tests. On Linux it does have the slowdown but it's not the worst because the tests run a lot faster in general. For Windows it is a lot more noticeable and adds a significant delay to the overall test suite. I ran my debugging techniques on a Windows build but unfortunately the majority of the slowdown seems to be in a single "function call" called `ntdll.dll` and we don't get any insight as to what is actually slower. I've decided not to spend too much time on this but if anyone reading this has an idea what might be slowing things down or how to get some insight into why `ntdll.dll` is slow then please reach out. 

— 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).