---
title: Embroider Initiative Week 13
image: /images/wynand-van-poortvliet-4AmyOdXZAQc-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Wed Aug 29 2023 13:34:15 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week I have been working on ember-cli-update to make sure that it will work with the v2 addon blueprint and allow people to keep up with the great progress that has been made in recent weeks. As a prerequisite I have had to fix the ember-cli-update CI which has been quite challenging. I have also been working with an Initiative backer to figure out what is causing a slowdown with their embroider build


## Fixing the ember-cli-update CI

ember-cli-update is a great asset to the Ember community, and it's a vital tool during the push for Embroider and encouraging people to use the new v2 addon blueprint because a lot of the recent changes aren't just about updating a dependency version but instead you need to update config at the same time.

The issue with trying to work on changing anything in ember-cli-update is that CI has been broken since July of last year, and you can't have any confidence that fixing one bug isn't introducing a new one. Getting CI to start passing was quite a challenge because this project does a lot of interaction with the npm apis to discover versions, and something must have changed on the npm side that prevented ember-cli-update from doing its work.

The solution to fixing CI was ultimately updating a dependency boilerplate-update to use [pacote](https://www.npmjs.com/package/pacote) to interact with the npm API. Once the upstream dependency was updated I only needed to [add a few tweaks to ember-cli-update](https://github.com/ember-cli/ember-cli-update/pull/1243) to get CI to finally pass and free myself up to actually work on the main problem that I wanted to.

## Fixing ember-cli-update for the v2 addon blueprint

For anyone who doesn't know how ember-cli-update works, it generates a diff between the version of the blueprint that you generated your app or addon with and the version that you want to update to. Under the hood this means that ember-cli-update will generate a pristine new version of your app/addon at the version that you are on (you can see how it gets this information by checking out your `config/ember-cli-update.json` file if you generate a new ember app) and then generates a new pristine copy of the version you are updating to, generates a git diff between those versions, and then applies that diff to your current app.

The reason I'm giving this background on how ember-cli-update works under the hood is because the thing that was preventing us from using it for v2 addon blueprints was the generation of the pristine "from" and "to" versions of the blueprint. There was a custom code-path in ember-cli-update that looked to be working around some bugs in Node 8 and those workarounds were causing it to fail. My [fix for custom blueprints](https://github.com/ember-cli/ember-cli-update/pull/1240) was mostly to remove these workarounds so that it would start working again

There are still a few blockers before this can get released but I will be working on those over the coming weeks.

## Embroider Build Slowdown

As part of the Embroider initiative, tier 3 backers have a 2-hour pairing session with me where we dive into their specific problems. This time has been particularly useful this week because we were able to identify some potential causes for a 10x slowdown in build times between Embroider v3.1 and v3.2. These slowdowns haven't been affecting everyone so it's been hard to track down the issues but having the time to pair with our initiative partners and dive into these problems has been invaluable in tracking down potential causes

--- 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).
