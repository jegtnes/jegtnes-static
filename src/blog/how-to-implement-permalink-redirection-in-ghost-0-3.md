---
title: How to implement permalink redirection in Ghost 0.3
date: 2013-08-28
layout: blog-post.njk
excerpt: "If you're using Ghost 0.3 and want some form of permalink redirection, I explain how, as this isn't a core part of the platform yet."
---
Update: For a better solution in Ghost 0.4.x, see my [other post](/blog/how-to-implement-permalink-redirection-in-ghost-0-4).

**Before I begin: A brief warning (here be dragons):**

The solution detailed here is horrendously hacky, and requires you to modify core Ghost files. I understand this is _A Bad Thing_ ™.

But do you know what is even less cool than editing core files? URIs that change.

>  A cool URI is one which does not change.

—[Tim Berners-Lee](http://www.w3.org/Provider/Style/URI.html)

There will be no need for this hack later, as the Ghost team are [working on redirects](https://ghost.org/forum/using-ghost/97-feature-request-routes-js-or-redirect-rules-of-somekind), but for the early adopters, this one's for you. As you're modifying core, make sure to save this snippet somewhere so that you can insert it back in after you upgrade Ghost—which *will* remove this hack.

I aim to update this post once this technique is no longer required.

Now, let's get started.

In the process of converting the previous iteration of this site from Anchor to Ghost—with a brief half-finished version existing in WordPress before Ghost was publicly released and I decided to jump ship, migrating all of the previous blog content was a fairly easy job. However, in Anchor and WordPress, my blog posts had a /blog/ virtual subdirectory, and as of the time of writing, there is no built-in solution or plugin available for modifying permalinks. Editing the slug of the post trying to add in /blog/ understandably stripped the slashes out—so my lovely link to e.g. [http://jegtnes.com/blog/adjustments-not-resolutions](http://jegtnes.com/blog/adjustments-not-resolutions) was broken as a result. Not cool!

My lovely host, [WebFaction](http://webfaction.com), recently launched an installer for Node.js and Ghost, making the process of getting Ghost installed much easier—however, the WebFaction Ghost install runs on the [shared front-end Nginx server with zero configuration options](http://community.webfaction.com/questions/11830/graceful-301-redirect-using-shared-nginx-instance?page=1#11832), which would be the easiest solution for URI redirection.

_(If you, unlike me, have access to your nginx configuration files, URI redirects should probably take place in there instead.)_

Not wanting to create an Apache web server to redirect approximately 10 URLs on the Nginx Ghost installation, and there understandably being scarce documentation and few blog posts about Ghost during this early stage of development, I couldn't find any existing solutions to this myself. Plugins aren't in place yet, and as previously mentioned, the Ghost team are working on a routing solution, but this is not in place yet.

Until then, I wanted to migrate my blog to Ghost for a clean slate sooner rather than later.

Knowing little JavaScript, no NodeJS whatsoever, and barely having heard of Express before digging into the source code of Ghost, this was the perfect opportunity to get down and dirty.

![](/assets/images/content-images/Screen_Shot_2013_10_24_at_17_47_42.png)

_A small piece of Ghost's redirection rules. What does all of this mean? I have no idea, really. But that's okay. Figuring it out is half the fun!_

It turns out most of Ghost's URL handling action happens in /core/server.js. Not knowing where to start, I copied a few lines that dealt with the redirection using regular expressions and changed a couple of words around, and hey presto—armed with just a little bit of regex knowledge, I made the redirect work!

```js
server.get(/^\/(blog\/?).*/, function redirect(req, res) {
    res.redirect(301, req.url.substr(5));
});
```

I put this snippet in server.js at line 372, below the block `// ### Frontend routes`. This felt like the natural place to put it, as it doesn't deal with admin routing or core functionality.

What the above piece of code does is match any request to the site that starts with /blog in the request URI, and redirects them to the exact same URI, except with the first 5 characters stripped off (/blog). If your permalinks are structured differently you'll need a different regex, and a different redirect function, but this should be adaptable to some WordPress permalinks, except the ones that include dates, tags, and categories.

If there is a better or more elegant solution to this problem than hacking core files, please let me know. Like I said earlier, I'm perfectly aware of how dirty this is…

Now if you'll excuse me, I need to go take a shower.
