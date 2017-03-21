---
title: Default browser stylesheet font properties
date: 2017-03-21
layout: blog-post.hbs
excerpt: "A list of all the default font styles in the browser stylesheet to take into consideration when setting up typographic styles for a new project. Save yourself from the tyranny of accidental faux-italics today!"
---

Most web fonts these days are packaged to not make use of the `font-weight` and `font-style` properties, but a different font file for every weight and style. As a result, I often forget to apply the appropriate styling to certain lesser-used elements and end up being metaphorically spat in the face by a faux-bold element. Ew.

> Wait, there's a "`<var>`" element?

– me, every god damned new project

So, for more my reference than anyone else's, here are all the default browser stylesheet font properties that you might want to take into consideration when setting up your typography (sans font sizes, because who keeps the default browser font sizes anyhow?). Of course, you might want to override these, too—headlines don't necessarily need to be bold, but hey, I'm not your dad. Do what you like!

## Default bold elements
- `b`
- `h1` through `h6`
- `strong`
- `th`

## Default italic elements
- `address`
- `cite`
- `dfn`
- `em`
- `i`
- `var`

## Default monospace elements
- `code`
- `kbd`
- `pre`
- `samp`