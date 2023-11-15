---
title: Embroider Initiative Week 17
image: /images/yves-alarie-Nc0BZAOF-10-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Thu Sep 28 2023 15:53:54 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week we figured out the things that were slowing down builds for some people, we merged a number of new performance improvements, and I released ember-cli-update that now finally has support for the v2 addon blueprint. Myself and Andrey also had a great pairing session where we did some digging into the issues with Vite and esbuild.

## Figuring out slow builds

One of the [Embroider Initiative](https://mainmatter.com/embroider-initiative/) backers was having a significant slowdown in their build times when moving from Embroider v3.1 to v3.2. There was a major change in the internal architecture of Embroider between these versions so it was a bit tough to try and track down the exact cause of the slowdown.

I have been working with them to produce flamecharts for their Embroider builds to get an insight into what was causing their specific slowdown and those flamecharts were pointing at a particular part of Embroider Package Cache not working exactly as we intended it to. Ed Faulkner managed to pinpoint the problem (while we were discussing it in the "hallway track" of [EmberFest](https://emberfest.eu) last week) and [opened a pull-request with the fix](https://github.com/embroider-build/embroider/pull/1609). This managed to bring the Initiative Backer's build down from around 10 minutes to less than 2 minutes 🎉 

By sheer chance this week we also had several other [minor performance improvements](https://github.com/embroider-build/embroider/pulls?q=is%3Apr+author%3Araycohen+merged%3A2023-09-25..2023-09-29) submitted by [raycohen](https://github.com/raycohen) that will all add up to make your Embroider builds faster than they have ever been. We have [already released this version](https://github.com/embroider-build/embroider/releases/tag/v4.1.1-addon-dev) so by the time you are reading this you can upgrade to the latest and make use of the performance improvements today.

## Releasing ember-cli-update

I have mentioned in previous weeks that I have been working to get a new release of [ember-cli-update](https://github.com/ember-cli/ember-cli-update) that fixes support for updating any Ember Addon that was generated with the [v2 addon blueprint](https://github.com/embroider-build/addon-blueprint). This is very important because a lot of the improvements that have been made recently have been to the config, and if you're just updating dependencies you won't get all of these good improvements.

I finally [released a version this week](https://github.com/ember-cli/ember-cli-update/releases/tag/v2.0.0) that has support for the v2 addon blueprint, and followed it up with [another release](https://github.com/ember-cli/ember-cli-update/releases/tag/v2.0.1) that fixed a small bug that some people might face. This release is a big deal for the wider Ember community, especially as we are encouraging people to migrate their existing v1 addons to v2 addons. This brings an important DX functionality that we have come to expect in our community to the new v2 addon blueprint.

## Pairing on Vite and esbuild

Part of the goal of the Embroider Initiative is to improve the [Bus Factor](https://en.wikipedia.org/wiki/Bus_factor) so that more people are aware of how Embroider works. I have been pairing with [Ed Faulkner](https://github.com/ef4/) in somewhat of an apprenticeship model, where we spend half a day a week diving deep into the harder parts of Embroider and related projects. This week I have been passing on the apprenticeship model and pairing with my colleague [Andrey Mikhaylov](https://github.com/lolmaus) on an issue that is preventing Vite from working properly with dependencies that need to be managed by Embroider. We [have taken over work that Ed had already started](https://github.com/embroider-build/embroider/pull/1614) that aims to teach esbuild (the tool that Vite uses to discover dependencies deeper in the dependency tree) about Embroider-managed virtual packages. This is being tested against a [minimal reproduction](https://github.com/mansona/ember-vite-app/pull/1) that shows the problems Vite has with loading packages from the Ember ecosystem.

This is highly experimental work and is quite far from having any kind of implementation people could use, but it is an exciting culmination of all the hard work that has been happening in the core of Embroider over the past months to allow us to even attempt this. Hopefully in my next few weekly updates I will have more exciting news about this progress.

--- 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).


