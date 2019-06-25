---
title: The True Power of JSON:API - Have Someone Else Do It
image: /images/katherine-mccormack-42649-unsplash.jpg
imageMeta:
  attribution: by Katherine McCormack
  attributionLink: https://unsplash.com/photos/qLf2da3A6KE
featured: true
meta_title: null
meta_description: null
author: chris
date: Thu Apr 15 2018 17:05:18 GMT+0100 (IST)
tags:
  - ember
  - authmaker
---

This post is going to try to show the true power of using a standard way to define your APIs and how to use JSON:API as an "anti-bikeshedding weapon". I will start with a bit of the theory, trying to explore why this is a good idea in the first place and then I will show you our solution for building standard JSON:API servers in a very short amount of time.

## The Theory

It's best to start off with a definition of what JSON:API is:

> JSON API is a specification for how a client should request resources for fetching or modification, and how a server should respond to those requests.

> JSON API is designed to minimise both the number of requests and the amount of data transmitted between clients and servers. This efficiency is achieved without compromising readability, flexibility, or discoverability.

A lot of my understanding of the _why_ of JSON:API comes from a video of a talk given by Steve Klabnik at API Days Paris. I have embedded the video below because I **highly recommend** you watch the whole thing to understand why this is such an important topic.

<p>
  <div class="videoWrapper">
  <iframe width="420" height="236" src="https://www.youtube.com/embed/Foi54om6oGQ?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
  <em>Steve Klabnik speaking about JSON:API at APIDays Paris</em>
</p>

It's difficult to distil this video down because there are so many important things that Steve says throughout the discussion and a lot of the value in what he is saying is the way that he puts these things in context.

> when you create unique, individual, snowflake, bespoke, hipster models of communication […]
> they’re not useful because only a few people know about them

> when you want to communicate with people, you want to communicate with as many as possible

I particularly liked the part in the video where Steve mentions the specific challenges that software consultancies face when working with clients that have bespoke designed APIs

> If you work for a consultancy and you’re building APIs for your clients on a regular basis:
> sometimes [it feels] very much like groundhog day, you’re doing the same thing over and over and
> over again. So if you’re building APIs over and over and over again, you know that that’s just a
> new fresh chance to argue over HTTP semantics with your entire team for a couple of weeks.

> I make choices that make you do more work, you make choices that make them do more work [...] it
> all goes around, and we just bill our hours

An antidote to this whole process is for us to decide up-front that we are going to use one of the standard definitions of an API and for us to focus our time and energy on building applications and services for our clients.

> When you have a web page that describes the HTTP semantics and the structure of your JSON, you
> can’t waste 2 weeks of development time arguing about if you should use camelCase or underscores
> in your identifiers, or whether or not you should be name-spacing your model data, or whether or
> not posting this URL should or should not create whatever

<p>
  <img width="100%" style="margin-bottom: 0" src="/images/BalintErdi-DataLoadingPatterns.jpg"></img>
  <em>Balint Erdi speaking at <a href="https://www.youtube.com/watch?v=kPxiiAGMSzE">EmberConf 2107</a></em>
</p>

One of the other important points that I think has not been mentioned enough in the wider JSON:API discussion is that you are not supposed to work with JSON:API serialisation directly.

> The point is not that I want each of you to go and re-implement the specification. I want one of
> you to be the sacrificial lamb to re-implement the specification, and then everyone else can just
> use the fruits of their labour.

When it comes to [EmberJS](https://emberjs.com) we can directly talk to any JSON:API server implementation without any configuration on the client side. One of the issues is that there are not enough JSON:API compliant servers out there, and that's what we're hopefully going to change in the next section.

## The Practice

The goal of this post is to get you up and running with a fully functional JSON:API backend in less than five minutes (depending on your network speed for npm install). There will be a few things to install, but by the end of this you will have a production-ready system ready to deploy. Let's get started!

### Setup a database

You will need a [MongoDB](https://www.mongodb.com) database before we get started. There are many reasons why we based this system on MongoDB, but I will save that discussion for another blog post. I used to recommend that people go to [mLab](https://mlab.com/) to get their database because they provide a free online sandbox databases, but now MongoDB themselves have come out with a product called [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) which is quite good and I use myself.

You will need to create a database and create a user with write permissions to that database. Both mLab and MongoDB have comprehensive documentation on how to do this process.

### Install NodeJS

This backend runs on NodeJS, and we recommend that you use the latest LTS version 10.x when developing your backend. You can download node for your system directly from the [NodeJS website](https://nodejs.org).

### Install Yeoman and the generator

[Yeoman](http://yeoman.io/) is a tool for easily generating project scaffolding. To check if you have Yeoman already installed, run `yo --version` on the command line, otherwise install it globally via npm:

```
npm install -g yo
```

Next, we need to install the Yeoman generator we will use to scaffold our backend. It is the same generator we use to start building [Authmaker](https://authmaker.com) compatible backends, but we will not be using any of the Authmaker services for this quick introduction so we can remove/ignore anything that is Authmaker specific.

```
npm install -g @authmaker/generator-express
```

### Generate your backend app

Next step is to generate your backend

```
mkdir my-app-backend
cd my-app-backend
yo @authmaker/express
```

The generator will prompt you for a database connection string, most of which will be provided by mLab or MongoDB Atlas in their web interface. You will need to make sure the username and password are correct (Remember that the username and password are for the database user you created, not your **personal** mLab or MongoDB Atlas credentials). This information will be added to a non-git-tracked file `settings/secure.json` and you should make sure that you never commit this file.

The generator will also create two example files for reference, `models/example.js` (a model) and `server/routes/v1/example.js` (a route). You can use these for reference and eventually delete them.

### Define your schema

One of the reasons we are using MongoDB in this setup is because we want to be able to define our **models** using [Mongoose](http://mongoosejs.com/index.html). This will allow us to define how we want to interact with our database while also providing just enough information for us to auto-generate a full CRUD (Create, Retrieve, Update and Delete) system for our API.

Let's say we are working on a blog and need to perform CRUD actions on posts. In the `models` folder, create `post.js` and define the schema for the **post** model as shown below. You can use the generated file `models/example.js` for formatting reference and rename it to `post.js` to get started.

```javascript
// models/post.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  body: String,
  created: Date,
});

module.exports = schema;
module.exports.modelName = 'Post';
```

### Create your routes

The package that will ultimately generate the JSON:API compliant routes for you is
[express-autoroute-json](https://github.com/stonecircle/express-autoroute-json). It has already been installed by the project generator so you don't need to install it again. Instead of defining the direct behaviour of your API, you interact with `express-autoroute-json` using declarative configuration blocks `find`, `create`, `update`, and `delete` that define the specific business-logic of your API.

By including the block `find: {}` in your route file, `express-autoroute-json` will generate fully functioning 'Find All' and 'Find By Id' endpoints for accessing your database - no configuration needed.

Using the `server/routes/v1/example.js` file as a guide, create a new file to define the routes for the `post` model we created in the previous step:

```javascript
// server/routes/v1/post.js
const autorouteJson = require('express-autoroute-json');
const { models } = require('../../../models');

module.exports.autoroute = autorouteJson({
  model: models.post,

  // default CRUD
  find: {},
  create: {},
  update: {},
  delete: {},
});
```

The above example is the most basic implementation of route creation with `express-autoroute-json`. Upon starting your backend application, it will automatically generate dedicated routes for all CRUD actions on posts. Making a GET request to `/posts` or `/posts/1` will now return the appropriate data from your database.

Additionally, you can limit your route definitions to certain request types.
`express-autoroute-json` will only generate the route types that you explicitly define. To completely forbid a particular request type, such as DELETE, simply omit the entire block `delete: {}` from your route file.

## Conclusion

I have been working very hard to distil the essence of EmberJS' "[zero configuration productivity](https://emberjs.com)" into `express-autoroute-json` so that you can start being productive very quickly. I have worked on this platform for over four years, and it is currently powering some reasonably large APIs in production right now.

I wanted to leave this post on something that Steve Klabnik said in his talk that resonates with everything that I'm trying to achieve with [Authmaker](https://authmaker.com) and in many of the other open source projects I'm working on:

> Stop building super custom APIs! Check out one of the custom formats that we’ve all been
> developing, pick one and just use it. Build shared tooling to stop wasting everyone’s time and
> let’s build cool stuff to do neat things.
