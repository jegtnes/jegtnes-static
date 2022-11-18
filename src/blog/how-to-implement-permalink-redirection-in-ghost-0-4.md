---
title: Migrating your current permalink structure to Ghost 0.4
date: 2014-05-01
layout: blog-post.njk
excerpt: "If you're using Ghost 0.4 and want some form of permalink redirection, it's now a lot easier and less hacky than with 0.3."
---

Migrating your old blog over to shiny new Ghost? Have a permalink structure that is unlike Ghost's? Did all your blog posts have a URL with a subfolder of something like /blog/? Unable to edit your nginx config? Any existing links to any of your blog posts *will* be broken. And cool URIs don't change.

I have [blogged earlier](/blog/how-to-implement-permalink-redirection-in-ghost-0-3/) about the fact that Ghost doesn't yet support permalink redirection natively. I recently upgraded this blog to Ghost 0.4.2 and it seems to still be the case, but there's progress being done—according to issue [2116 on GitHub](https://github.com/TryGhost/Ghost/issues/2116). Basically: You are able to change the permalink structure, but there's no UI for this as it stands.

If you're currently migrating your blog from another content service provider to Ghost, you have 2 options right now:

1) If you don't mind changing your links structure permanently to Ghost's default structure of <code class="language-js">blog.com/slug</code>, and you have no access to your Nginx config to implement redirection there, you can follow the same advice as my [last post](/how-to-implement-permalink-redirection-in-ghost-0-3/), and implement your own redirection pattern. The file structure has changed quite dramatically since Ghost 0.3 (for the better!), so the best place to put this seems to be in /core/server/routes/frontend.js. You can put this anywhere in the file you want. you want, as long as it's before <code class="language-js">server.get('*', frontend.single);</code>.

**Warning: This is super hacky. Don't edit core files unless you need to. Here be dragons etc.**

2) (Recommended) Retain your links structure. Find your SQLite database and change the <code class="language-">permalinks</code> key in the <code class="language-">settings</code> table (which should be under <code class="language-">/content/data/ghost.db</code>), like such:

![](/assets/images/content-images/Screen_Shot_2014_05_01_at_11_09_04.png)

To do this you need a SQLite editor. If you're on OS X, [MesaSQLite](http://mesasqlite.en.softonic.com/mac/download) is a tiny bit neckbeardy, but it's free and does the job. For Windows and Linux, there's a list of available applications at [AlternativeTo](http://alternativeto.net/tag/sqlite/).

The default permalinks structure is <code class="language-">/:slug:/</code>. I changed this to <code class="language-">/blog/:slug:/</code>. Remember to save your database and restart your Ghost instance, and your new permalinks structure should be working.

I hope this has been useful to someone—and hopefully, Ghost 0.5 should expose the links structure configuration in the UI, so we can stop hacking and get back to blogging!
