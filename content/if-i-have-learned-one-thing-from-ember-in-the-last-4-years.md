---
title: If I Have Learned One Thing From Ember in the Last 4 Years ...
image: /images/fish.jpg
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Sun Jan 20 2016 18:47:00 UTC
tags:
  - ember
---

> “One thing about which fish know exactly nothing is water, since they have no anti-environment which would enable them to perceive the element they live in.”

> ― *Marshall McLuhan, War & Peace in the Global Village (1968)*

I have been an Ember developer for over 4 Years, this January being the 4th anniversary of all early adopters' struggle with the pre-1.0 release schedule. Since that time I have grown with the community and found new and exciting ways to solve the same sorts of problems. I have talked before about how much I love the way the Ember community works, and I have always instilled the virtues of the framework given half the chance. In this wash of positivity it could be said that I am missing some of the finer points of *why* I feel ember is such a fantastic framework, until I have to look back at the code I have written in the past.

Over the past few days I have been working on upgrading Ember code for [Blooie](https://bloo.ie), most of it doesn't need too much work but every so often I come across a nugget of awfulness that makes my Ember Positivity Train™ come to a screeching halt. Here is an example:

```
...
    actions: {
        welcomeUser() {
            this.store.find('user', 'me').then((me) => {
                this.send('openModal', 'settings.welcome', {
                    controller: 'settings.welcome',
                    data: me
                });
            });
        }
    }
...
```

There is a lot wrong with this but the thing that grates at the part of me that likes nice programming is the imperative-*ness* of it. Over the last 4 years Ember has taught me to think mostly in a declarative way, yet I had not actually perceived this education. I am the fish programming in the water of the Ember Community. The thing that lets me see my education is looking at code that was written by a younger, less educated me.

> “I am the fish programming in the water of the Ember Community”

> ― *Chris Manson, Blog (2016)*

How would I do this differently now? Well first of all I would make use of the [Rule of Least Power](https://youtu.be/VY-r7Ac06ho?t=8m22s) and do a bunch of the work in handlebars:

```hbs
{{#if showWelcomeModal}}
  <div class="modal"></div>
{{/if}}
```

using this structure means that all we need the is either a computed property that gives us the value for `showWelcomeModal` or something like:

```
...
  application: Ember.inject.controller(),
  me: Ember.computed.alias('application.model'), //the 'me' user
  actions: {
      welcomeUser() {
        this.set('showWelcomeModal', true);
      }
  }
...
```

Hopefully you share my view that the latter version is better without having to see the [code for the openModal action handler](https://gist.github.com/mansona/f0158e17b913786c5533) **and** considering the fact that bubbling actions to the application route [may now be considered harmful](http://ember.land/episodes/18).

It is often good to take a step back from your day to day work and consider how far you have come, so that you can see how far you may yet go in the next 4 years.

---
*Edit:*

I hadn't expected to complete my refactor of the Blooie code I was working by the time I released this blog post, but fortunately I have! I can report that all in all the change in the way of implementing this modal has given me a net loss of 100 lines of code, not counting the roughly 100 lines of code that implements the old way of doing the modal component.
