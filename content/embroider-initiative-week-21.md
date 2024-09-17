---
title: Embroider Initiative Week 21
image: /images/conor-luddy-ABzfm88qTH4-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Wed Oct 25 2023 10:00:19 GMT+0100 (Irish Standard Time)
tags:
  - embroider-initiative
---

This week saw a lot of progress towards the Vite implementation with some interesting internal Embroider refactors and reaching the end of the Vite and esbuild plugin experiment (for now). I also helped an Initiative Backer to find and fix a difficult module-scope bug in their app.

## Making app files use the new resolving system

Last week I mentioned that we were finalising the resolver refactor in Embroider that used a new internal structure for inter-package resolutions and this work was very successful and progressed the Ember Vite experiment quite significantly. However, it wasn't enough to just use this new structure for addon packages, we also needed to use a similar structure with your app's files. We were able to use a lot of our learnings from the previous refactor to speed this work up, so much so that we have an [almost complete PR](https://github.com/embroider-build/embroider/pull/1648) that is blocked by a single feature.  

The blocker is a small conceptually, but a somewhat complex feature to implement. The issue we are trying to solve is that we need the Embroider resolver to modify imports in and out of application files and addon files and because of that it has a robust package cache that keeps tracks of all the things that have been or need to be rewritten. As part of the rewriting of the imports we need to give Webpack (and Vite) enough information to find the desired file import. Simplifying the process a bit in the interest of brevity, this usually ends up needing to tell Webpack (and Vite) information about a specific import using an **external package path**. For example, if we need to get access to the file `src/components/face.js` from the addon `best-components` the import line might need to look like this `import FaceComponent from best-components/src/components/face.js`. Most of the time this translation is somewhat simple, but it becomes a lot more difficult when you take the [package.json exports](https://nodejs.org/api/packages.html#exports) functionality into account.

To continue with our example above, if we know the file on disk that we want Webpack (or Vite) to resolve (and we tend to know the exact file because of how Embroider works internally) and we have the following exports block in the `package.json` of the `best-components` package: 

```json
{
  "exports": {
    "./components/*": "./src/components/*.js"
  }
}
```

then we would need to make sure the import line looks like this `import FaceComponent from best-components/components/face`. You can see more examples and follow along with the work that my Colleague Andrey is doing on this feature with [this pull request](https://github.com/embroider-build/embroider/pull/1652). The PR currently only holds a bunch of test cases that we need to make sure work for the initial version of the package.


## Debugging a module-scope issue with an Initiative backer

One of the Embroider Initiative tier-three backers has recently been working on converting their main application to Embroider. I mentioned in last week's update that they have had some significant progress in getting their tests to work, but they were being hit by a strange issue where their highcharts-generated graphs were missing the first label in the x-axis of their charts. 

After debugging the issue for our 2-hour pairing session we discovered that the issue was **caused** by the fact that the x-axis was actually off by 8 hours, which would cause the first label to fall of the end of the scale. This was happening because the timezone of the app in tests was set to GMT-8 and we were running the tests in Ireland which was exactly 8 hours out of sync.

After a lot of digging we noticed that highcharts checks for the presence of `window.moment` and uses this for any time-zone related maths if it exists, this allows you to have a chance to setup window.moment to use `moment-timezone` and correctly configure it if you wanted to. With the move to embroider we no-longer accidentially set `window.moment` to the correct instance of `moment-timzone` as a side-effect of the build system so highcharts wasn't finding the right instance during its initialisation.

It turns out that highcharts [provides a config option](https://api.highcharts.com/highcharts/time.moment) `time.moment` to cover this exact case and as soon as set that correctly in the charts base class that the application was using then the x-axis started behaving again.

## Updating pnpm for the embroider monorepo

As part of an effort to remove Volta from the Embroider monorepo (see the next update) we noticed that our pnpm version was pinned to `8.6.7`. This usually wouldn't be a massive problem to update but pnpm released a massive change in the [_minor_ version `8.7.0`](https://github.com/pnpm/pnpm/releases/tag/v8.7.0). You can see more discussion about this topic on the [issue that originally reported it](https://github.com/pnpm/pnpm/issues/6463), but I'll give a quick summary of it here below.

If you define a dependency in your `package.json` with the carat symbol like this `^3.0.1` and installed your dependencies without a lock file you would generally expect your package manager to pick the **highest available version of that dependency** at the time of installation, so if there was a version `3.3.5` of your dependency out it would pick that version. Between `pnpm@8.0.0` and `pnpm@8.7.0` the behaviour of this type of resolution was set to `lowest-direct` by default, so as long as the dependency still statisfied your overall dependency tree when you set the version to `^3.0.1` in your `package.json` then that would be the exact version you would get installed.

This violated the expectation of a lot of people when they wanted to test their CI against "floating dependencies" so that we could check that newer versions of our dependency graph didn't break things for people. When I opened my [PR to update the pnpm version in our CI](https://github.com/embroider-build/embroider/pull/1649) I had to follow it up with a number of commits that fixed things that broke because of newer depenencies in our dependecy tree. It turns out that the only "errors" we had were related to TypeScript types so that's why nobody had notified us of something being broken that our CI didn't catch, but it was probably a matter of time that something would have popped up.

## Removing volta for the embroider monorepo

The Embroider CI is made up of a [`scenario-tester`](https://github.com/embroider-build/scenario-tester) based system that spins up over 200 jobs for every PR that we open. While it can be frustrating for any team/project when CI is being flaky, it can be a significant slowdown for us when CI breaks and we have to wait for the slowest Windows test to finish before we can restart failed jobs.

We noticed that the [volta GitHub action](https://github.com/volta-cli/action) would regularly fall over because it was trying to extract a cached binary to a network attached drive location. In our weekly meetings we decided that we wanted to remove volta to make our CI more stable, but we didn't want to get rid of the benefits that we got from volta pinning the node version that we use when developing locally. Volta was also being used by some of our test scenarios to make sure that those packages had wider Node support than the rest of the monorepo.

You can see more discussion about the issues in the [PR that I opened to remove volta](https://github.com/embroider-build/embroider/pull/1594), and you can see from the changes in that PR that we opted to use [pnpm's built-in Node version management](https://pnpm.io/npmrc#use-node-version) by setting the `use-node-version` value in the `.npmrc` file. While this doesn't allow us to also pin the pnpm version using a similar config file it gave us just enough of the functionality that we needed to finally remove Volta from CI.

## Significant progress with Vite and esbuild

After last week's resolver refactor and this week's work to make app files use the new resolver pattern we had a solved all the known issues that were holding back the Ember Vite app expeiement. Testing the new resolving system revealed that the preprocessing step that Vite offloads to esbuild is able to discover a large majority of the dependencies that the app is using and is able to adequately process the dependencies of addons (which is something that wasn't working effectively before these resolver refactors). 

Even though we have made significant progress, we are not yet able to get even a simple example Ember app to build with Vite. The issue we have been coming across is that there are parts of Ember that must only be included a single time in the build. For example `@glimmer/validator` is pre-packaged in the `ember-source` package, and in a classic build and a standard Embroider build there is no possible way for that pseudo-dependency to be included in the application twice. With Vite and esbuild essentially having entirely different bundling steps that both can follow chains of import statements we have been getting `@glimmer/validator` included multiple times because the pre-processing step with esbuild with include it in dependency code and any code that has been effectively "externalised" by Vite will import it as a real module in the frontend. To prevent this from happening we need to make sure that 100% of the apps dependencies that might come across `@glimmer/validator` are discoverable correctly by esbuild.

Up until now we have been improving the Embroider resolver and the esbuild plugin to "teach" esbuild as much as we could about the structure of an Ember app, but we have reached the end of that particular line of experimentation. In my pairing session with Ed Falkner this week we discussed the next set of steps that we need to do to continue making progress and the plan essentially boils down to "stop rewriting the Ember app". 

Right now when you do an Embroider build you will see that there is a `.embroider` folder in your `node_modules` that contains a `rewritten_packages` folder and a `rewritten_app` folder. A lot of the work of Embroider is in rewriting addons that your app is using and also updating imports that are going from your app to the rewritten addons in the `rewritten_packages` folder, this is a totally legitimate architecture and we can see that our recent experimentation with the Embroider resolver has allowed Vite and esbuild to fully follow what is going on with these rewritten packages. The bit that is currently confusing Vite and esbuild is the fact that we also rewrite your app into `rewritten_app` with some light modifications that are required for the whole application to function. We need to move any functionality that is implemented in the creation of the `rewritten_app` stage to something that is implemented in virtual imports in the Embroider resolver which will allow Vite and esbuild to follow more of the dependency graph in your application and pre-process more of the dependencies that could ultimately rely on `@glimmer/validator`.

We have a plan and we're going to start implementing the first feature of it next week. 

— 

This post is part of the [Embroider Initiative Updates](/embroider-initiative-updates).