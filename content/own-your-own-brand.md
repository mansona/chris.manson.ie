---
title: Own Your Own Brand
image:
imageMeta:
  attribution:
  attributionLink:
featured: true
authors:
  - chris
date: Tue Nov 02 2021 21:41:23 GMT+0000 (Greenwich Mean Time)
tags:
---

This week I was having a conversation with a friend who was wondering where they should setup their new blog. I had some of advice that I shared with them and I thought it was a good enough that I should probably share it here too.

This advice is a series of easy rules to follow, and it ends in a recommendation. Everything that I’m saying here is my opinion, I’m not getting paid to say any of this, and if you happen to disagree with any of it please make sure to let me know what I got wrong on my [twitter account](https://twitter.com/real_ate).

## Don’t pay for anything until you’re successful

Simply put, you should use a system that is free for your new blog until you are successful enough to start thinking about buying a custom domain or use a premium platform. The definition of success will be different for everyone; you might be looking to monetise your blog, you might be using it for “reach”, or to break into your specific industry in some way. Whatever your definition of success is, make sure you quantify it and make sure that your threshold isn’t set too low e.g. you shouldn’t be spending €20 a year for a custom domain if there are only 10 people reading your blog on a regular basis, set the threshold closer to 100 or 1000 pageviews a month.

## Use a free platform

In English the word _free_ actually confounds two very different meanings. You can either use the latin-root equivalents of Libre or Gratis to explain the concept, but there are also two commonly used phrases that are used to explain the difference: “Free as in freedom” and “Free as in free beer”.

On the freedom side, the key message of this post is that you should own your own brand so you should not be using a commercial platform where you are essentially the product. For example Medium is designed to allow you to blog very quickly, but you are mostly contributing to their brand if you blog there. There have also been some recent issues where content producers weren’t aware that their content was being hidden behind a paywall, which is just not great for your brand or your readers.

[Dev.to](https://dev.to/) is a great site that is open source so it is actually in the category of “Free as in Freedom”, but you will still be contributing to their brand if you blog on that site. If you want to have your posts on Dev.to so that you can contribute to the community there, then you can duplicate the post on Dev.to. If you duplicate your posts anywhere you shoud mention at the top or the bottom that it’s a cross-post and make sure that you set the `canonical_url` link back to **your** website. You’ll understand more about what I mean by a canonical link after reading the [SEO] section below, but the short version is: if the site you want to cross-post to doesn’t allow you to set the canonical link back to your site then it will **actively harm your brand to duplicate the content**.

On the “free as in free beer” side, this is just an extension of the last point “Don’t pay anything until you are successful”. There are enough platforms out there where you can host your blog for free for a very long time as you are becoming more and more successful.

## Use a free platform but only if they allow you to redirect

I tend to point people towards [Netlify](https://netlify.com) when I am recommending a place for them to host their sites or blogs. This is not only because they have a generous free tier, and if you exceed their free tier you’re probably getting successful enough that you would be happy to pay! I also tend to recommend Netlify because they allow you to setup redirects properly. Most people aren’t aware of why this is a good thing but I’ll explain below in the [SEO](#seo) section

When you setup your blog on Netlify you will be able to use a free sub domain that they provide you like `yourawesomeapp.netlify.app`. If you then get more serious about your blog and want to upgrade to yourawesomeapp.com then you can add your new domain name to your Netlify website without too much trouble, but you will also be able to redirect anyone that lands on your old website to the new one with a proper 301 HTTP redirect. This is incredibly important for SEO but it’s also quite useful if someone has subscribed to your site using RSS, they won’t suddenly lose access to your new posts

## SEO

I am not going to pretend to be an expert at SEO, but I would call myself an enthusiast. I have done a lot of research on the subject, mainly to find ways to improve the SEO of the [Ember Webisite](https://emberjs.com), and have a rough understanding of the the broad strokes of what is important.

One thing that you will come across when you look into SEO is the importance of “back links”. The internet is a network of sites all linking to each other and it’s hard for Goole to know what sites to put at the top of a search result, and they need to come up with a plan to decide how to order results. Simplifying things _a lot_, all search engines work on a system of “authority” where by if you are linked to by a site that has a very high authority (like the New York Times) and the link text has a term that is relevant to the search that the user is doing then it’s pretty likely that you are an authoritative source on this subject. And maybe you aren’t linked-to by the **most** authoratitive sites, but instead there is a chain of links that eventually link to your site, this can still help your Search Engine Rankings .

Exactly how the algorithm weights these links is a closely guarded secret so people sometimes referr to this amorphous SEO contribution via links as “SEO Juice”, which I felt a bit uncomfortable using when talking to my friend about this subject. I instead called it “SEO Points” and will for ever more be using that term instead.

In summary, inbound links to your site are good and you don’t want to cut off all your inbound links when you move your site to a custom domain.

### Canonical Links

Now that you understand everything about inbound links I can explain what a canonical link is a bit more. As I mentioned brieful before, one thing that you need to be careful of when posting content on the web is to not have **duplicate content** anywhere. Search engines are always fighting against tactics that speople come up with to be spammy or game the system, and duplicate content is one of those cases.

If you ever want to have 2 copies of a blog post on the internet you need to give the
