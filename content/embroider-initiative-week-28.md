---
title: Embroider Initiative Week 28
image:
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Fri Dec 15 2023 10:48:11 GMT+0000 (Greenwich Mean Time)
tags:
---

## Figuring out a solution to the multiple `@glimmer/validator` issue

- can only be included once
- issues with Vite and esbuild cause it to be included twice
- if we use Hot Module Reloading we could load it twice
- we should have it not die on loading twice
- 

## unblocking ember-cli-deprecation-workflow



## Fixing Vite implementation in Embroider monorepo

- backporting some changes in my test repo

## setup release-plan for the embroider stable branch

- add functionality to release-plan to do this