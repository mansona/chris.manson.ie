---
title: The "Right Way" to Build the Ember Guides
image: /images/giammarco-boscaro-380903-unsplash.jpg
imageMeta:
  attribution: by Giammarco Boscaro
  attributionLink: https://unsplash.com/photos/OPzWvgL-upY
featured: true
meta_title: null
meta_description: null
authors:
  - chris
date: Mon May 31 2018 20:00:00 GMT+0100 (IST)
tags:
  - guides-app
  - ember
---

This blog kicks off the series of how we rebuilt the Ember Guides App from the ground up, but also goes into some of the motivations and thought processes that surrounded that project.

## Platonic Ideal

A lot of the time in our community we hear people talking about the Right Way™️ to do something, it's often a joke based on the idea that the answer to most questions in the tech world should be "it depends". Part of my personal development philosophy is that I believe that there is a _Right Way_ to build software and that we are all striving to find our way there.

To understand what I mean when I say the "Right Way" we have to dig into a little bit of philosophy and some of the origins of where I first heard about the concept of a _Perfect Abstract_. The first time I came across this concept was with the _Ideal Triangle_, which is usually attributed to Plato because of his work on the [Platonic Solids](https://en.wikipedia.org/wiki/Platonic_solid). You may not have heard of [Platonic form](https://en.wikipedia.org/wiki/Theory_of_forms) or [Platonic Realism](https://en.wikipedia.org/wiki/Platonic_realism), but they are fascinating ideas. I don't have enough background knowledge to give either of these topics justice but here is a reasonable explanation [taken from Wikipedia](https://en.wikipedia.org/wiki/Platonic_realism#Forms):

> Platonic form can be illustrated by contrasting a material triangle with an ideal triangle. The Platonic form is the ideal triangle — a figure with perfectly drawn lines whose angles add to 180 degrees. Any form of triangle that we experience will be an imperfect representation of the ideal triangle. Regardless of how precise your measuring and drawing tools you will never be able to recreate this perfect shape. Even drawn to the point where our senses cannot perceive a defect, in its essence the shape will still be imperfect; forever unable to match the ideal triangle.

When developing software, I like to keep this idea in mind. I try to imagine that there is a _Platonic Ideal_ way to develop something and that anything that we end up developing in the real world will never be able to match this _Perfect Abstract_ idea of the software. This gives me two main benefits: it allows me to try to come up with an answer to the question "what is the right way to approach this project" while also giving me the ability to accept the constraints of reality and build something that is Good Enough™️ for the needs of the client or the project. If we think that there is an _ideal_ way to achieve something it gives us a place to aim for

<div style="width:100%;height:0;padding-bottom:41%;position:relative;"><iframe src="https://giphy.com/embed/QFypAZbq5lz3i" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/disney-pixar-disneypixar-QFypAZbq5lz3i">via GIPHY</a></p>

My philosophy is to always keep this Platonic Ideal of the right way to build a piece of software in your head and make small steps towards it as best you can.

## Serendipity

Early in November last year I was in the process of writing the first documentation for a personal product ([Authmaker](https://authmaker.com)) and I decided to go for something that followed a similar structure to the Ember Guides. At the time I was running a company and had hired [Julia Donaldson](https://twitter.com/username_juliaD) to write the documentation because of her fantastic blog post [Ember.js, mentorship, and the confidence gap](https://medium.com/this-dot-labs/ember-mentorship-and-the-confidence-gap-8c0b93dc1ccd). Julia's first task was to check out whatever technology the Ember Guides were using because I assumed they were probably using something that was state of the art because of the quality of the Ember Guides.

After a few confused conversations back and forth we realised that this was very much **not** the case. The infrastructure that powered the Ember Guides had long been known to be a barrier to entry for new contributors, and there had been many conversations over the years on how it might be improved. I happened to join the Learning Team slack channel just when another one of these conversations was starting up again, and I jumped in to help.

With a lot of the innovations that were happening in Ember that would enable this project to be a form of static site, built straight from an Ember app, the trajectory of the project was decided upon very quickly. The Right Way™️ to build the replacement for the Ember Guides was for it to be an Ember app.

## The Details

I am going to go into the details of the whole project in a series of posts. This was an extensive project that took many months to eventually complete, so there is a lot to cover. I have listed my current plan of what I want to cover below. Please let us know if you have any requests, or if there is something about the build you are interested in seeing a deep-dive for! I will update this post with links as they are available, but you can subscribe for updates using the RSS feed at the top right of this page.

* Strict requirements - how we used Percy to change the entire infrastructure without it changing at all
* Starting to Build - using [pre-existing experiments](https://github.com/rtablada/broccoli-blog-api) to ultimately build broccoli-static-site-json
* The Build - the main process and the methodical work to get it working
* The Challenges - some of the issues we faced along the way
* Tech Highlights - prember, Fast Boot, Ember Data etc.
* The Launch - aka. The long tail - aka. the last mile
