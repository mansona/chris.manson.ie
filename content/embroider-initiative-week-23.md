---
title: Embroider Initiative Week 23
image:
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Fri Nov 10 2023 23:42:48 GMT+0000 (Greenwich Mean Time)
tags:
  - embroider-initiative
---

## Writing a summary blog post up until the start of November

At the time of writing this post I have finally published some of the previous weeks that I have been writing here on my my personal blog. The intention for these updates has been to give the ember community a way to follow along with the work that I have been doing but I always knew these posts wouldn’t have very much reach. These posts have also been somewhat personal in nature, focusing on the detail and not giving much of an overview of the bigger picture.

With that in mind my Engineering Manager Kevin TODO LINK and I planned to write a monthly summary of these weekly update blog posts on the Mainmatter blog. As it turns out I had more than a month’s worth of updates so the first update was likely to be a lot bigger and it was trying to give a sense of what the Embroider Initiative team have been working on for the past few months.

If we can secure more funding for the Initiative I will be continuing these posts here about my progress and we will be summarising them on the Mainmatter blog on a monthly basis

## Refactoring the embroider-implicit-modules to use import properly

Two weeks ago I talked about the fact that we’re trying to remove the need for the `node_modules/.embroider/rewritten_app` folder and we have started to virtualise some of the things that are needed from that folder. The work that myself and Andrey started last week is a slightly larger piece to dive in and figure out because we need to make changes to the resolver, but this week during office hours we decided to start some other small piece of work in the same vain, fixing the virtualisation of the `-embroider-implicit-modules.js` file

This is a much easier thing to update because the implementation is already virtualised in embroider. The difference is that we need to update it to use real imports instead of relying on `importSync` because they always get externalised by esbuild. 

That means we need to replace the generation that looks like this:

```
EXAMPLE
```

With something that looks like this

```
EXAMPLE
```

We quickly opened a pr TODO LINK and found for the most part that it was working, but we noticed that CI was failing in some strange ways. It turns out that the way that we had implemented `-embroider-implicit-modules.js` before allowed the evaluation of the modules to be lazy i.e. if you didn’t end up using any of the implicit modules in your app then they wouldn’t actually evaluate any of the code that was in module space. This meant that we started having some errors in CI because some modules that were never exercised in addons that made up the our test scenarios started failing because their code started failing. TODO clean up silly text here.

It’s worth noting that this didn’t represent a breakage in any Embroider code, this meant that there was latent code in these addons that would break in embroider if you ever tried to use it. Unfortunately this means that we must release this change in a new Major version of Embroider, so we have started planning how we are going to do that.

## Finishing allowAppImports PR 🎉

## Community addon maintenance to fix Embroider for an Initiative Backer

## helping to fix a pnpm workspace bug with an initiative Backer

- ember data peer dependency
- can't have both locally
- inject fixes it but lose live update
- 

