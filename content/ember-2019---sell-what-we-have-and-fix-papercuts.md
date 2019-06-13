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

This year will be bringing massive changes to the Ember landscape with the "release" of the upcoming Ember edition - Ember Octane. Along the way, I think we need to concentrate on three areas:

1. Selling what we have
2. Fixing paper cuts
3. Polishing up command line tools

## Sell what we have

One the hardest lessons I learned as a startup founder was "Only ever sell what you have, and not what's coming soon." My startup got stuck in the vicious cycle of implementing features that we hoped would lead a customer to buy our product, which ultimately didn't lead to them making the purchase. We were constantly selling a product that was "almost ready" and not focusing on what our vision was. I don't talk about this much because these were very painful lessons, which I spent five years of my life on.

I feel like we might be at risk of making the same mistake with Ember right now.

For those who don't know already, [Ember Octane](https://emberjs.com/editions/octane) is a major new initiative that is mostly a result of last year's "Ember Call For Blog Posts". It introduces, in my opinion, quite a revolutionary idea on how to make large sweeping changes to a project that prides itself in backwards compatibility. As a result of the focus on Ember Octane there seems to be a renewed excitement in the Ember community, which is objectively a good thing and has been a boon to a lot of the community members that have committed to Ember for the long term. Octane is currently in a pre-release, preview period.

Although I think that Ember Octane is a net positive, I would urge that we have a sense of caution. We shouldn't be using Octane to drive interest in Ember until the day **after** it is officially released. There has already been quite a lot of confusion and many questions like "I'm starting a new app, should I build it in Octane?". That's not good, and indicates a failure to communicate what the preview is intended for.

As a member of the Ember Core Learning Team, I have been focusing on the website and documentation sites for almost 2 years now, and so that outcome is something I feel responsible for. There things that I wish I had done better, but here's what I think we can do today as an organisation to "sell" what we have and improve our communication around Octane:

- Improve the [Editions](https://emberjs.com/editions/) and [Octane](https://emberjs.com/editions/octane) so that they fully communicate what Octane is
- Go back through the [Roadmap RFC](https://github.com/emberjs/rfcs/pull/364) that introduces the idea of Editions and make sure that the major points are communicated on the website
- Make it more explicit that Octane is just a backwards-compatible regular release that will only change new apps unless you explicitly opt-in

## Fixing paper cuts - especially in ember-cli

At the same time as selling what we have, we should also work on the things that we don't feel good about shouting from the rooftops: the Broccoli experience, addon author resources, and ambiguity around Embroider.

I am a massive fan of Broccoli and I have been able to use it to build some pretty amazing things like [Empress](https://github.com/empress)! That being said, the whole process was harder than it needed to be. [Broccoli](https://broccoli.build/) is chronically under documented. We have a real opportunity to position Broccoli as a webpack alternative, but that can only happen if the documentation is available and easy to understand. Documentation is necessary but not sufficient for this process. [Oli Griffiths](https://twitter.com/oligriffiths) is doing an amazing job to improve that situation but one person won't be able to do this alone. The community and core team need to invest in this area.

When it comes to ember-cli, there is quite a lot of cruft hanging around and inconsistent APIs that just make things confusing for addon authors that are trying to do anything slightly out of the ordinary. I don't know if this is just a product of the fact that it has grown organically over many years, or if it's because it has rarely done any deprecations and made breaking changes. While working on Empress I came across a number of inconsistencies. I've forgotten some of the details, but `addPackagesToProject` and `addAddonsToProject` come to mind.

Here are a few steps we can take to address CLI issues:

- Poll addon authors to help identify the areas of greatest need, and make a concerted effort to fix them.
- There are now 3 separate websites that have ember-cli documentation that are varying levels out of date, and we need to fix that. [Jen Weber](https://twitter.com/jwwweber) has done some fantastic work to bring the new [Ember CLI Guides](https://cli.emberjs.com/release/) to life, but we still haven't shut down the old documentation site and it is still showing up in search results.
- We need to get the API docs for ember-cli into the Ember API Docs viewer
- Embroider needs an RFC (read on for more details)

Embroider is a promising project, but the RFC is overdue. If you have been following the Ember community recently, you might have heard Embroider touted as a great fix to how ember-cli works going forward. I am very worried about how this project is being considered as a "fix all", that we are banking on this one project fixing a most of our woes. Meanwhile, lots of time, energy, and enthusiasm is spent on something that hasn't passed formal review yet. With so much momentum already in place, would that mean that the Embroider RFC will be accepted regardless of what is said in the process? It feels too big to fail. Are we stealing oxygen from the room that should be spent on ember-cli instead, at this point in time?

All of my concerns about Embroider could be misguided, and with Ed Faulkner at the helm I am not worried in any way about the technical decisions or likelihood of the project being successful. I guess I would like the RFC to be accepted before we broadcast it and deflect efforts away from ember-cli itself.

## Ember Beginner Experience - Use the platform

Now I have a request that is a bit of a change of pace. I want us to do a better job of thinking about absolute beginners and how they might use Ember.

I have believed for a long time that Ember is a great platform for people that are interested in getting into development for the first time. I had the pleasure of being a mentor at an "Emberginners" workshop run by my colleagues at [simplabs](https://simplabs.com) in Berlin last month. We taught 24 beginners, or near beginners, how to build web apps using Ember and I believe it was a massive success. Participants even deployed their applications at the end of the main day of the workshop!

However, we hit quite a few blockers with various machines when it came to following the [Installing Ember](https://guides.emberjs.com/release/getting-started/) documentation. The documentation recommends that you install Ember **globally**, which most of us in the Ember community will have done

```
npm install -g ember-cli
```

The issue with this is that we are all **already** developers, which means that we either have setup our permissions correctly for this to work or we will be able to debug any issues that arise. But these new learners had problems.

Luckily, you don't have to install ember-cli globally to generate an app, but few people know this. We need to popularise this new (better) way to help people get up and running.

In `npm@6`, we can actually use `npm init ember-app my-app` which doesn't require ember-cli to be installed globally. It has the added benefit of always using the most up-to-date Ember version regardless of which version you may have installed on your machine.

Now that we have our Ember app generated using `npm init` we need some way to execute things like `ember serve` or `ember generate component super-button`. Firstly I think we should be recommending the use of `npm start` to start the app because the start script is available. When it comes to using the generator we could be making use of `npx`, which will look for binaries in the local node modules and execute them from there. So to use the generator we should recommend people use `npx ember-cli generate component super-button`

The eagle-eyed amongst you will notice that I changed `ember` in that generation command for `ember-cli`. This is because our `ember` command doesn't come from an npm package of the same name. This is something that I think we should be able to fix with a little bit of consideration, either we could make the `ember` package on npm a sort of alias to `ember-cli` or we could have it call out to ember-cli in much the same way that `create-ember-app` does (the thing that powers the `npm init ember-app` command).

These changes would take a coordinated effort from the CLI and Learning Team, but they seem achievable in the next year!

## Blueprint Updates

Now that I have finished talking about the "community level" changes that I would like to see, I have one personal feature request that will make my work with Empress a lot easier and improve the experience of people using Empress.

[Kelly Selden](https://twitter.com/kellyselden) recently proposed an RFC called [Blueprint Updates](https://github.com/emberjs/rfcs/pull/477) that talks about ways to make things easier for ember-cli-update. I think that this is great but we should go a lot further with this proposal. I think we need to make it much easier to make custom blueprints that are essentially extensions of existing blueprints.

This is related to what I said earlier about ember-cli not being documented very well: there is currently no walkthrough documentation on how to create a custom app blueprint.

Right now in many of the Empress products we are making use of the "default addon blueprint" system to _change_ the Ember app as necessary to get started. For example here is the quick-start for empress-blog:

```bash
npm init ember-app super-blog

cd super-blog

# you can replace the template with the one you want to use
npx ember-cli install empress-blog empress-blog-casper-template
```

If I had built a blueprint for a new app, this quick-start would be so much easier, and it wouldn't require people to accept the changes to files that they might not know much about.

We could theoretically update this quick-start to be as simple as:

```bash
npm init ember-app super-blog -b empress-blog-casper-template
```

or something similar.

The reason why we would need these blueprints to "extend" the default ember blueprint is to prevent the need for me to update the blueprint every time any changes to the upstream blueprint are made.

This in conjunction with Kelly Selden's proposed changes to ember-cli-update would mean that upgrading an empress-blog would be significantly simpler

## Conclusion

It is possible to read parts of this blog post and think that I am against some of the change that is coming in the near future for the Ember community, and this is not my intention. I believe it is important for Ember to grow and change, but also that we need to be making moves carefully.

Some of the changes that are coming will probably help us appeal to a wider install base, and in that journey, we need to make sure we remember what is great about Ember already. We have built an amazing tool and a fantastic community and yes we need to do better at encouraging others to try Ember but let's not forget that what we have built is pretty good!

Maybe, with a bit of the right encouragement, we might be able to help people see the strengths that Ember has **now** and not tell them "it will be better tomorrow".

> If you have any questions or comments about this post please feel free to [chat with me on Twitter](https://twitter.com/real_ate)
