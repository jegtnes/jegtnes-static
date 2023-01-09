---
title: New year, new site
date: 2022-01-09
layout: blog-post.njk
excerpt: This website now uses 11ty. Some thoughts on this.
---

To be honest, the fact of the matter is that at the end of the day, it is important to think outside of the box and avoid the overuse of cliches. It is what it is, but going forward, I will step up to the plate and push the envelope to put a pin in the concept of reducing cliches to increase shareholder value for Jegtnes Ltd.

…Anyways.

Hi. It's been a a while, hasn't it?

I was quite early to the whole "static site" thing, relatively speaking. The last time I rebuilt my personal website was in 2016, starting some time just after I was made redundant before kicking off my freelance career. The best option around then for <abbr title="Static Site Generator">SSG</abbr>s was Metalsmith.

I enjoyed working with it a fair amount, and it seemed very intuitive. I especially loved the chained plugins fundamentals—all source files are parsed into a standardised format and then manipulated serially by the plugins you chose to use. This was very intuitive and allowed you full control over the build process with ease.

## But then, life happened

After this, I was very busy with contracting work and had little dead time between contracts, then I moved [continents](https://twitter.com/jegtnes/status/968538948724195328), twice, [initially temporarily](https://twitter.com/jegtnes/status/1101817313958023168), found out I had [irreversible kidney failure](https://twitter.com/jegtnes/status/1151927283164360705), [started dialysis](https://twitter.com/jegtnes/status/1197879302458662912), stayed on dialysis for a year, mercifully [got a kidney transplant](https://twitter.com/jegtnes/status/1334374209431146496) on the 3rd December 2020, recovered quickly and uneventfully, went back to work not too long after, [decided that if I'm going to have a chronic illness for the rest of my life it's probably sensible to stay on the same continent as my friends and family](https://twitter.com/jegtnes/status/1422591069884145675), and was lucky enough to pretty much had a solid block of contracting work until last summer, all while still recovering from a transplant surgery and also coming to terms with lockdown, and the relative isolation of living in London where I didn't get a chance to build a solid social network before lockdowns happened, in the same way I had in Bristol before I moved to Canada (and back).

Reading back that last sentence, it really strikes me at just how much I have endured. Bugger me, what an eventful few years it's been! So that's why I haven't really updated my website for a while. 😅

<small>(Sidenote: If you live in London and read this and want to hang out, please get in touch! I'm painfully aware I have a lot of acquaintances here I haven't spoken to in ages, for, well, the above reasons, and I'd love to get back in touch in general)</small>

## Okay Alex, back to the website

So having finally had the time and wherewithal to update my site again six years after it was initially built, the usual dependency rot set in and I could not find a way to even get it to build on an M1 Mac.

Luckily, the static site discourse had been gaining real momentum and there was this cool new thing everyone loved to generate their static sites, [11ty](https://www.11ty.dev). It seemed popular and had great community support, so I gave it a go and this site is now running on 11ty!

It was generally very fun to work with, and as mentioned, there's obviously loads of great community resources and support, but for some reason I found myself struggling with adjusting to it at first. Quite honestly, having lived in React-land for so long, it was probably more of an adjustment issue than anything. Additionally, 11ty is _very_ fast, and if some ways of doing things need to be restricted in order for that to happen, that seems eminently reasonable!

I had initially planned to actually make a fun, creative design for this new site, having visited the New York and London Transport Museums this summer and been inspired by early 1900s transport signage/wayfinding. However, it's been years since I did something creative for myself, so I figured I'd just release a relatively plain website first, then gradually design it.

## Return of the indie web movement

I hope and aim for this iteration of my website to be a springboard to a more sustainably and continuously updated personal site. I'm excited that the pendulum is swinging back in the direction of independence, decentralisation, and federalisation.

There's obviously an [RSS feed](https://jegtnes.com/feed.xml), and I want to add microformats and webmentions and all that good shit.

One thing I have noticed about the broader 11ty hype cycle is that a lot of it seems tied in to Netlify, which is an impressive and incredibly well-executed product, deserving of all the plaudits it's getting, but I am a dinosaur and run my sites on my own <abbr title="Virtual Private Server">VPS</abbr>, because I like the control that affords me. I'll have to figure out what I reasonably can and can't achieve with a self-hosted static server.

But that's enough rambling. I have a website that is nice and easy to maintain, update, and write content for, and I am excited to do so over the coming months and years. ✨