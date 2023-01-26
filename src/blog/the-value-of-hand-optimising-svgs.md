---
title: The value of hand-optimising SVGs
date: 2023-01-26
layout: blog-post.njk
excerpt: "In which the author extols the virtue of taking a look at the markup of the SVGs you use"
---

SVGs have gone from being a fairly niche technology on the web to something you may come across fairly frequently, especially since the advent of higher-resolution screens, whether it's for icons or illustrations or anything else on your website that benefit from being vectorised.

But it's pretty common to consider them just another form of image and not take advantages of the unique aspect of SVGs and other vector formats: They are essentially just XML markup! You can edit them in your text editor! Sure, I'm a nerd, but I think that's pretty cool. Far smarter people have written far better articles on SVG than I have, such as [Sara Soueidan](https://www.sarasoueidan.com/blog/archive/), so I won't go into the details, but even if you only know the very basics of SVG, you may get something from this article.

## The starting point
So I was making a very simple illustration as part of a little hobby project to try to digitally recreate old London Underground signage, with the view of implementing some of it on my site later to add some more flavour to what is currently a pretty bland site. Here's what I was working with:

![A platform sign containing a Northern Line diagram. It's typeset in a humanist sans-serif font. It reads: "Northern Line, platforms 2 & 3 Northbound", followed by an illustration of an arrow striking through an early prototype of the London Underground roundel. Below reads the stations: Brent, Hendon Central, Colindale, Burnt Oak (Watling), Edgware, where one line terminates and another begins. This line goes: Edgware, Brockley Hill, Elstree South, Bushey Heath.](/assets/images/content-images/northern-line-diagram.jpg)

Now, most of this this looks recreatable by modern CSS without too much of an issue, except the arrow illustration (I'm sure you _could_ recreate that illustration in CSS too, but I'm no CSS artist). So my first step was to trace this in SVG using a vector illustration program. I used [Vectornator](https://www.vectornator.io/) even though I have more experience with Illustrator, as I'm not about to pay Adobe another £god-knows-how-much to use Illustrator a few times a year.

I considered tracing the image to save some time, but fundamentally, it's a simple illustration, consisting of a few rectangles for the shaft, a few circles for the bullseye target, and a pen-drawn shape for the head. That's easily drawn. These are the layers I ended up with:

![A list of layers: The original raster for reference, a layer containing six bits that comprise the fletch, and a rectangle for the rear shaft, three circles for the bullseye roundel, and a custom shape for the arrowhead](/assets/images/content-images/roundel-arrow-layers.jpg)

## The SVG illustration itself

After I finished the illustration and exported the SVG I noticed Vectornator exported a very unoptimised SVG by default, with things like layer names intact and repetitive and unnecessary properties. We can do better than that.

**Initial SVG file size: 4968 bytes**

As an example, here's a snippet of the rear section of the arrow with the fletch:

```svg

<g id="Rear-Arrow">
  <path d="M18.4085 44.667L192.395 44.667L192.395 57.167L18.4085 57.167L18.4085 44.667Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
  <path d="M61.4085 21.8363L75.8726 21.8363L95.544 44.0813L81.551 44.0813L61.4085 21.8363Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
  <path d="M40.4085 21.8363L54.8726 21.8363L74.544 44.0813L60.551 44.0813L40.4085 21.8363Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
  <path d="M18.4083 21.8373L32.8751 21.835L52.5467 44.0804L38.5511 44.0826L18.4083 21.8373Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
  <path d="M61.4085 80.0813L75.8726 80.0813L95.544 57.8363L81.551 57.8363L61.4085 80.0813Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
  <path d="M40.4085 80.0813L54.8726 80.0813L74.544 57.8363L60.551 57.8363L40.4085 80.0813Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
  <path d="M18.4083 80.0804L32.8751 80.0826L52.5467 57.8372L38.5511 57.835L18.4083 80.0804Z" fill="#000000" fill-rule="nonzero" opacity="1" stroke="#000000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="1"/>
</g>
```

If we consider that the default SVG fill value is `#000000`, the default `fill-rule` is `nonzero`, the default `stroke-linecap` is `butt` (teehee), the default `stroke-linejoin` is `miter`, those are all superflous, and even if we weren't, we could place these all on the parent `<g>` (sort of like an SVG `<div>`) and the children would inherit them. But nevermind that, we have tools like SVGO (and the excellent SVGOMG web interface) to automate this grunt work for us.

After running this through [SVGOMG](https://jakearchibald.github.io/svgomg/), having played with the options to ensure that the SVG doesn't lose any level of detail, we get the file size down to almost half of what it is, which is pretty impressive! Some of these optimisations I wouldn't have been able to think of myself off the top of my head. Let's take a look at the output in full:

```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" stroke-miterlimit="10" style="fill-rule:nonzero;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round" viewBox="0 0 400 100">
  <defs>
    <path id="a" d="M147.38 50.205C147.38 23.582 167.76 2 192.899 2c25.14 0 45.519 21.582 45.519 48.205 0 26.623-20.379 48.204-45.519 48.204-25.139 0-45.519-21.582-45.519-48.204Z"/>
    <path id="c" d="M150.75 50.205c0-24.577 18.916-44.5 42.25-44.5s42.25 19.923 42.25 44.5c0 24.576-18.916 44.5-42.25 44.5s-42.25-19.924-42.25-44.5Z"/>
    <path id="e" d="M160.88 50.205c0-18.615 14.336-33.705 32.019-33.705 17.684 0 32.019 15.09 32.019 33.705 0 18.614-14.335 33.704-32.019 33.704-17.683 0-32.019-15.09-32.019-33.704Z"/>
  </defs>
  <path d="M239.902 44.076s.973 2.294.635 7.169c-.119 1.706.05 4.408-.657 6.503l68.445.405s3.006.883 2.839 3.142c-.068.923.179 1.627-1.669 3.039l-7.303 2.637s-1.248 1.03-.985 2.028c.264.999 4.324 10.19 4.324 10.19s.824 1.561 3.163.846c2.338-.715 74.099-27.465 74.099-27.465l-72.966-30.007s-2.244-.727-3.054.796c-.35.656-2.75 5.626-4.451 9.216-.346.731-.33 1.601-.21 2.223l1.414.751 6.984 2.936s1.585 1.204 1.113 3.096c-.25 1.001-1.008 2.01-3.159 2.436l-68.562.06Z"/>
  <use xlink:href="#a" fill="#fff"/>
  <mask id="b" width="91.037" height="96.409" x="147.38" y="2" maskUnits="userSpaceOnUse">
    <path d="M147.38 2h91.037v96.409H147.38z"/>
    <use xlink:href="#a" fill="#fff" fill-rule="evenodd"/>
  </mask>
  <use xlink:href="#a" fill="none" stroke="#000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2.5" mask="url(#b)"/>
  <mask id="d" width="84.5" height="89" x="150.75" y="5.705" maskUnits="userSpaceOnUse">
    <path d="M150.75 5.705h84.5v89h-84.5z"/>
    <use xlink:href="#c" fill="#fff" fill-rule="evenodd"/>
  </mask>
  <use xlink:href="#c" fill="none" stroke="#c31f01" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="16" mask="url(#d)"/>
  <mask id="f" width="64.037" height="67.409" x="160.88" y="16.5" maskUnits="userSpaceOnUse">
    <path d="M160.88 16.5h64.037v67.409H160.88z"/>
    <use xlink:href="#e" fill="#fff" fill-rule="evenodd"/>
  </mask>
  <use xlink:href="#e" fill="none" stroke="#000" stroke-linecap="butt" stroke-linejoin="miter" stroke-width="2.5" mask="url(#f)"/>
  <g stroke="#000" stroke-linecap="butt" stroke-linejoin="miter">
    <path d="M18.409 44.667h173.986v12.5H18.408v-12.5ZM61.408 21.836h14.465l19.671 22.245H81.551L61.408 21.836ZM40.408 21.836h14.465l19.671 22.245H60.551L40.408 21.836ZM18.408 21.837l14.467-.002L52.547 44.08l-13.996.003-20.143-22.246ZM61.408 80.081h14.465l19.671-22.245H81.551L61.408 80.081ZM40.408 80.081h14.465l19.671-22.245H60.551L40.408 80.081ZM18.408 80.08l14.467.003 19.672-22.246-13.996-.002L18.408 80.08Z"/>
  </g>
</svg>
```

**SVGO-optimised file size: 2795 bytes**

The first thing you may notice is that some paths have been moved to `<defs>` and reused in several places as both masks and paths. Smart.

But the first thing that should clue an observant reader in is that we still see repeated definitions of things that just aren't necessary because they're the SVG default values (`stroke-linejoin="meter"` and friends). It's like including `div { margin: 0; }` in a CSS reset; it's just not necessary, divs have no margins by default.

## But we can do _even better_ than that

This isn't intended to be a full SVG reference book, so I won't go into all the remaining optimisations that could be done in great depths, but here's what I did:

- removed stroke linecap/linejoin/fill-rule properties, as they correspond to the SVG default
- removed unnecessary group for the rear arrow shaft/fletch (seen at the very bottom before the closing `</svg>`) (if you aren't going to use a `<g>` for anything, such as defining inherited styles, they're pretty pointless)
- `<def>` path `#a` is only used once for a fill and once for a mask, so I added `fill` to the element, removed the `<use>`, and the mask still works as intended
- The `<mask>` defs have a `<path>` inside them that is seemingly useless and does nothing, so these have been removed
- The `<svg>` root element has a lot of superfluous attributes, so most of them except `xmlns`, `xmlns:xlink`, and `viewBox` can be removed (and if you intend to only embed the SVG inside an HTML document and not serve it as a standalone image in an `<img>` or as a background image in CSS, you can also remove `xmlns` and `xmlns:xlink`).

After having done that, I was able to shave a further 500 bytes off of an already-preoptimised SVG, which, sure, is small in isolation, but every little bit helps, especially if you inline SVGs on your website instead of serve them as external images, where they could be cached.

## The final result

After all that, we get this gorgeous, tiny SVG:

<svg viewBox="0 0 400 100">
  <title>An illustration of an arrow striking through an early prototype of the London Underground roundel</title>
  <defs>
    <path id="a" fill="#fff" d="M147.38 50.205C147.38 23.582 167.76 2 192.899 2c25.14 0 45.519 21.582 45.519 48.205 0 26.623-20.379 48.204-45.519 48.204-25.139 0-45.519-21.582-45.519-48.204Z"/>
    <path id="c" d="M150.75 50.205c0-24.577 18.916-44.5 42.25-44.5s42.25 19.923 42.25 44.5c0 24.576-18.916 44.5-42.25 44.5s-42.25-19.924-42.25-44.5Z"/>
    <path id="e" d="M160.88 50.205c0-18.615 14.336-33.705 32.019-33.705 17.684 0 32.019 15.09 32.019 33.705 0 18.614-14.335 33.704-32.019 33.704-17.683 0-32.019-15.09-32.019-33.704Z"/>
  </defs>
  <path d="M239.902 44.076s.973 2.294.635 7.169c-.119 1.706.05 4.408-.657 6.503l68.445.405s3.006.883 2.839 3.142c-.068.923.179 1.627-1.669 3.039l-7.303 2.637s-1.248 1.03-.985 2.028c.264.999 4.324 10.19 4.324 10.19s.824 1.561 3.163.846c2.338-.715 74.099-27.465 74.099-27.465l-72.966-30.007s-2.244-.727-3.054.796c-.35.656-2.75 5.626-4.451 9.216-.346.731-.33 1.601-.21 2.223l1.414.751 6.984 2.936s1.585 1.204 1.113 3.096c-.25 1.001-1.008 2.01-3.159 2.436l-68.562.06Z"/>
  <mask id="b" width="91.037" height="96.409" x="147.38" y="2" maskUnits="userSpaceOnUse">
    <use xlink:href="#a"/>
  </mask>
  <use xlink:href="#a" fill="none" stroke="#000" stroke-width="2.5" mask="url(#b)"/>
  <mask id="d" width="84.5" height="89" x="150.75" y="5.705" maskUnits="userSpaceOnUse">
    <use xlink:href="#c" fill="#fff"/>
  </mask>
  <use xlink:href="#c" fill="none" stroke="#c31f01" stroke-width="16" mask="url(#d)"/>
  <mask id="f" width="64.037" height="67.409" x="160.88" y="16.5" maskUnits="userSpaceOnUse">
    <use xlink:href="#e" fill="#fff"/>
  </mask>
  <use xlink:href="#e" fill="none" stroke="#000" stroke-width="2.5" mask="url(#f)"/>
  <path stroke="#000" d="M18.409 44.667h173.986v12.5H18.408v-12.5ZM61.408 21.836h14.465l19.671 22.245H81.551L61.408 21.836ZM40.408 21.836h14.465l19.671 22.245H60.551L40.408 21.836ZM18.408 21.837l14.467-.002L52.547 44.08l-13.996.003-20.143-22.246ZM61.408 80.081h14.465l19.671-22.245H81.551L61.408 80.081ZM40.408 80.081h14.465l19.671-22.245H60.551L40.408 80.081ZM18.408 80.08l14.467.003 19.672-22.246-13.996-.002L18.408 80.08Z"/>
</svg>

```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 400 100">
  <defs>
    <path id="a" fill="#fff" d="M147.38 50.205C147.38 23.582 167.76 2 192.899 2c25.14 0 45.519 21.582 45.519 48.205 0 26.623-20.379 48.204-45.519 48.204-25.139 0-45.519-21.582-45.519-48.204Z"/>
    <path id="c" d="M150.75 50.205c0-24.577 18.916-44.5 42.25-44.5s42.25 19.923 42.25 44.5c0 24.576-18.916 44.5-42.25 44.5s-42.25-19.924-42.25-44.5Z"/>
    <path id="e" d="M160.88 50.205c0-18.615 14.336-33.705 32.019-33.705 17.684 0 32.019 15.09 32.019 33.705 0 18.614-14.335 33.704-32.019 33.704-17.683 0-32.019-15.09-32.019-33.704Z"/>
  </defs>
  <path d="M239.902 44.076s.973 2.294.635 7.169c-.119 1.706.05 4.408-.657 6.503l68.445.405s3.006.883 2.839 3.142c-.068.923.179 1.627-1.669 3.039l-7.303 2.637s-1.248 1.03-.985 2.028c.264.999 4.324 10.19 4.324 10.19s.824 1.561 3.163.846c2.338-.715 74.099-27.465 74.099-27.465l-72.966-30.007s-2.244-.727-3.054.796c-.35.656-2.75 5.626-4.451 9.216-.346.731-.33 1.601-.21 2.223l1.414.751 6.984 2.936s1.585 1.204 1.113 3.096c-.25 1.001-1.008 2.01-3.159 2.436l-68.562.06Z"/>
  <mask id="b" width="91.037" height="96.409" x="147.38" y="2" maskUnits="userSpaceOnUse">
    <use xlink:href="#a"/>
  </mask>
  <use xlink:href="#a" fill="none" stroke="#000" stroke-width="2.5" mask="url(#b)"/>
  <mask id="d" width="84.5" height="89" x="150.75" y="5.705" maskUnits="userSpaceOnUse">
    <use xlink:href="#c" fill="#fff"/>
  </mask>
  <use xlink:href="#c" fill="none" stroke="#c31f01" stroke-width="16" mask="url(#d)"/>
  <mask id="f" width="64.037" height="67.409" x="160.88" y="16.5" maskUnits="userSpaceOnUse">
    <use xlink:href="#e" fill="#fff"/>
  </mask>
  <use xlink:href="#e" fill="none" stroke="#000" stroke-width="2.5" mask="url(#f)"/>
  <path stroke="#000" d="M18.409 44.667h173.986v12.5H18.408v-12.5ZM61.408 21.836h14.465l19.671 22.245H81.551L61.408 21.836ZM40.408 21.836h14.465l19.671 22.245H60.551L40.408 21.836ZM18.408 21.837l14.467-.002L52.547 44.08l-13.996.003-20.143-22.246ZM61.408 80.081h14.465l19.671-22.245H81.551L61.408 80.081ZM40.408 80.081h14.465l19.671-22.245H60.551L40.408 80.081ZM18.408 80.08l14.467.003 19.672-22.246-13.996-.002L18.408 80.08Z"/>
</svg>
```

**Manual optimisation final file size: 2224 bytes**

## But what about gzip?

Okay, fair enough, every performance improvement should also be taking gzip into account to see if it's worthwhile. Gzip works better on repeated patterns, which would mean that the impact of unnecessary attributes such as `stroke-linecap` would be minimised, but despite that, we have made some savings.

Original: 1490 bytes
After SVGO: 1119 bytes
Manually optimised: 965 bytes

## But how do you do this if you're not an SVG expert?

I don't know, I'm not an SVG expert! Some of it is a basic knowledge of how SVG and vectors inherently work, but a lot of it is just honestly just trial and error. Grab yourself a text editor, an SVG file, and play around. Remove some things, move some things, see what breaks, see what doesn't! There's a nifty extension for VS Code, appropriately just called [SVG](https://marketplace.visualstudio.com/items?itemName=jock.svg&WT.mc_id=vscoderelease-medium-buhollan), which gives you an instant-update preview mode, and you can have this in a pane side-by-side with your SVG file, which is great for rapid iteration.

If nothing else, this is a great way to learn some of the ins and outs to become more familiar with SVG, which is useful when you actually do have to programmatically manipulate them, for example, if they're interactive graphics or animations.

As a final note: Remember to, if you directly inline SVGs into your HTML, use `<title>` as a root element inside the SVG, to describe the contents if they have any meaning and are not purely decorational. In my instance I would probably consider the example illustration here decorational, but it would depend on the context.

Thanks for reading, and may your SVGs be hundreds of bytes tinier from here on out. 🫡