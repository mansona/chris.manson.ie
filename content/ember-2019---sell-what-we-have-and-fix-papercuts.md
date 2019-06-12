---
title: Ember 2019 - Sell What We Have and Fix Papercuts
image: /images/denise-jans-683766-unsplash.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Sat Jun 08 2019 16:44:13 GMT+0100 (Irish Standard Time)
tags:
  - ember
  - new
---

This year will be bringing massive changes to the Ember landscape with the "release" of the upcoming Ember edition - Ember Octane. While I think Octane will be a good thing for the community, I hope this post will communicate a slightly different perspective on what I would like to see in the coming year.

## Sell what we have

For those who don't know already, [Ember Octane](https://emberjs.com/editions/octane) is a major new initiative that is mostly a result of last year's "Ember Call For Blog Posts". It introduces, in my opinion, quite a revolutionary idea on how to make large sweeping changes to a project that prides itself in backwards compatibility. As a result of the focus on Ember Octane there seems to be a renewed excitement in the Ember community, which is objectively a good thing and has been a boon to a lot of the community members that have committed to Ember for the long term.

Although I think that Ember Octane is objectively good for our community, I would urge that we have a sense of caution as we use Octane as a "selling point" to encourage new developers to try Ember.

In a previous life I was a startup founder. I don't often talk about my failed startup because it was a difficult period in my life, it is always hard to lose a company and especially so when you put more than 5 years of your life into it. I learned many things during that time, but one lesson stuck out amongst the rest:

> Only ever sell what you have, and not what's coming soon

There were many factors that lead to the downfall of my startup, but if I was asked to pick one thing it would be this: we got stuck in the vicious cycle of implementing features that we hoped would lead a single customer to buy our product, which ultimately didn't lead to them making the purchase. This meant that we were constantly selling a product that was "almost ready" and not focusing on what our vision was.

I feel like we might be at risk of making the same mistake with Ember right now.

Octane is a massive improvement to the development model for Ember and it will simplify a lot of things that need to be taught, but we have spent the last few months talking about Octane and "selling" Ember on features that are almost here.

For those new to the Ember community, you may not realise that we have done this at least once before. Do you remember the Routable Components incident? 4 Years ago, when we were moving to Ember 1.13 there was a lot of hype around the fact that we wouldn't need components anymore. It turned out that Routable Components weren't technically possible and controllers were in fact a good thing for a lot of use cases, but even to this day we sill have people saying "I will try Ember when Routable Components ship".

I don't actually think this will happen with Octane, it is mostly done and the planning around this process has been phenomenal amongst all of the core teams. It is however important that we don't make the same mistake and we should wait until after Octane is released to start promoting it to the wider community.

Let me say that again because it's so important: we shouldn't be using Octane to drive interest in Ember until the day **after** it is officially released. There has already been quite a lot of confusion and many questions like "I'm staring a new app, should I build it in Octane?". The Octane **preview** was announced as part of the EmberConf keynote but we have not done a good job communicating that this is essentially _canary_ software (less stable than beta) and it should **not** be used in production until it is released officially.

This confusion has been the result of a failure of communication, one that I am particularly responsible for. I am a member of the Ember Core Learning Team and I have been focusing on the website and documentation sites for almost 2 years now. I know I need to do better.

This doesn't mean that we can't drive interest in Ember right now, there are plenty of things that we are doing that are innovative and ahead of our time and we need to be selling them more than we do right now.

Remember, "sell" what we have.

## Fixing paper cuts - especially in ember-cli

While I think we should be selling what we have, I know that there are plenty of pain points that are discouraging us from wanting to shout too loudly about certain things in the Ember ecosystem.

I am a massive fan of broccoli and have been able to use it to build some pretty amazing things with [Empress](https://github.com/empress), a lot of which would have been impossible to build if I didn't have the concepts of Broccoli and the amazing work of ember-cli available to me. That being said the whole process was harder than it needed to be.

Broccoli is chronically under documented. [Oli Griffiths](https://twitter.com/oligriffiths) is doing an amazing job to improve that situation but one man won't be able to do this alone. Documentation is only the first step, we have a real opportunity to fight against the "webpack fatigue" that has building for years if we can just position broccoli as a sensible (and easy to understand) alternative. Documentation is necessary but not sufficient for this process.

When it comes to ember-cli there is quite a lot of cruft hanging around and inconsistent APIs that just make things confusing for addon authors that are trying to do anything slightly out of the ordinary. I don't know if this is just a product of the fact that it has grown organically over many years, or if it's because it has rarely done any deprecations and made breaking changes.

While working on Empress I came across a number of inconsistencies but a lot of them I have forgotten because I just wanted to get on with building my project and I didn't take notes or create issues. I roughly seem to remember that there are certain inconsistencies between `addPackagesToProject` and `addAddonsToProject` as part of the blueprint API but I can't exactly remember what the issue is 🤔 This situation isn't helped by the fact that there are now 3 separate websites that have ember-cli documentation that are varying levels out of date. [Jen Weber](https://twitter.com/jwwweber) has done some fantastic work to bring the new [Ember CLI Guides](https://cli.emberjs.com/release/) to life, but we still haven't shut down the old documentation site and it is still showing up in search results. We also still need to get the API docs for ember-cli into the Ember API Docs viewer.

If you have been following the Ember community recently you might have also heard the concept of Embroider that has touted as a great fix to how ember-cli works going forward. I am very worried about how this project is being considered as a "fix all" and is essentially a rewrite of a lot of internals. While a lot of what I hear about Embroider sounds amazing I am worried that we are banking on this one project fixing a lot of our woes. Right now there is no RFC, and while I am aware that the spec is available publicly I feel like there is too much momentum in the Ember community right now that would mean that the Embroider RFC will be accepted regardless of what is said in the process. It feels too big to fail.

I am also worried that a lot of the oxygen has been taken from the room on any general improvements to the ember-cli project because we have this new Embroider project looming on the horizon. All of my concerns about Embroider could be misguided, and with Ed Faulkner at the helm I am not worried in any way about the technical decisions or likelihood of the project being successful. I guess I would like the RFC to be accepted before we, as a community, are touting it as a fix-all solution.

## Ember Beginner Experience - Use the platform

Now I have a request that is a bit of a change of pace. I want us to do a better job of thinking about absolute beginners and how they might use Ember.

I have believed for a long time that Ember is a great platform for people that are interested in getting into development for the first time. Ember does a lot to help you get started very quickly and with a little bit of guidance you can be very productive very quickly. I had the pleasure of being a mentor at an "Emberginners" workshop run by my colleagues at [simplabs](https://simplabs.com) in Berlin last month. We taught 24 beginners, or near beginners, how to build web apps using Ember and I believe it was a massive success. We even ended up getting them to deploy their applications at the end of the main day of the workshop which was really great for the participants.

The issue that I had with the whole process is that we hit quite a few blockers with various machines when it came to following the [Installing Ember](https://guides.emberjs.com/release/getting-started/) documentation. The documentation recommends that you install Ember **globally**, which most of us in the Ember community will have done

```
npm install -g ember-cli
```

The issue with this is that we are all **already** developers, which means that we either have setup our permissions correctly for this to work or we will be able to debug any issues that arise.

You may be thinking that this is not something we can avoid, we need to get people to install ember-cli globally for them to make use of Ember Generators that are recommended throughout the documentation. This is no longer the case.

There are solutions that we can now use that are included in `npm@6`, which happens to be included by default in the oldest currently supported NodeJS version. For things like `ember new my-app` we can actually use `npm init ember-app my-app` which doesn't require ember-cli to be installed globally. It has the added benefit of always using the most up-to-date Ember version regardless of which version you may have installed on your machine.

Now that we have our Ember app generated using `npm init` we need some way to execute things like `ember serve` or `ember generate component super-button`. Firstly I think we should be recommending the use of `npm start` to start the app because the start script is available. When it comes to using the generator we could be making use of `npx`, which will look for binaries in the local node modules and execute them from there. So to use the generator we should recommend people use `npx ember-cli generate component super-button`

The eagle-eyed amongst you will notice that I changed `ember` in that generation command for `ember-cli`. This is because our `ember` command doesn't come from an npm package of the same name. This is something that I think we should be able to fix with a little bit of consideration, either we could make the `ember` package on npm a sort of alias to `ember-cli` or we could have it call out to ember-cli in much the same way that `create-ember-app` does (the thing that powers the `npm init ember-app` command).

## Blueprint Updates

Now that I have finished talking about the "community level" changes that I would like to see, I have one personal feature request that will make my work with Empress a lot easier and improve the experience of people using Empress.

[Kelly Selden](https://twitter.com/kellyselden) recently proposed an RFC called [Blueprint Updates](https://github.com/emberjs/rfcs/pull/477) that talks about ways to make things easier for ember-cli-update. I think that this is great but we should go a lot further with this proposal. I think we need to make it much easier to make custom blueprints that are essentially extensions of existing blueprints.

This is related to what I said earlier about ember-cli not being documented very well: there is currently no walkthrough documentation on how to create a custom app blueprint. I have a vague knowledge of how blueprints work because of some of the work that has been done in the Octane Preview, but the only think I know is that it is not very straightforward to "extend" an existing blueprint.

Right now in may of the Empress products we are making use of the "default addon blueprint" system to _change_ the Ember app as necessary to get started. For example here is the quick-start for empress-blog:

```bash
npm init ember-app super-blog

cd super-blog

# you can replace the template with the one you want to use
npx ember-cli install empress-blog empress-blog-casper-template
```

If i had built a blueprint for a new app this quick-start would be so much easier, and it wouldn't require people to accept the changes to files that they might not know much about.

We could theoretically update this quick-start to be as simple as:

```bash
npm init ember-app super-blog -b empress-blog-casper-template
```

or something similar.

The reason why we would need these blueprints to "extend" the default ember blueprint is to prevent the need for me to update the blueprint every time any changes to the upstream blueprint are made.

This in conjunction with Kelly Selden's proposed changes to ember-cli-update would mean that upgrading an empress-blog would be significantly simpler

## Conclusion

It is possible to read the first section of this blog post and think that I am against some of the change that is coming in the near future for the Ember community, and this is not my intention. I know that Ember is not the most popular framework and, while I don't believe that popularity is everything, I believe it is important for the community for us to grow.

Some of the changes that are coming will probably help us appeal to a wider install base, I just want us to be careful for us not to lose sight of what is great about Ember in the process. We have built an amazing tool and a fantastic community and yes we need to do better at encouraging others to try Ember but let's not forget that what we have built is pretty good! And maybe, with a bit of the right encouragement, we might be able to help people see the strengths that Ember has **now** and not tell them "it will be better tomorrow".
