---
title: Work with me
layout: page.njk
description: Hire Alex Jegtnes, a versatile freelance front-end developer with ten years of experience working for everything from small design studios to banks and newspapers.
eleventyComputed:
  twitterLabel1: Availability
  twitterData1: "{% availability global.availability, global.availabilityString, true %}"
  twitterLabel2: Proficiencies
  twitterData2: JavaScript, well-crafted HTML & CSS, accessibility, React, web performance
  intro: <p>Hi there! I'm Alex, an independent web development contractor based in London. I develop fast, accessible, and beautiful websites and web apps.</p>{% if global.availability %}<p><p>{% availability global.availability, global.availabilityString %}</p></p><p>I have ten years of experience working with clients ranging from startups and design studios to large corporations and banks. Read on to find out what I can bring to your organisation.</p>{% endif %}
---

## Quick summary

I’m an adept web developer, possessing a varied set of highly practical skills with a front-end focus. I’ve worked on every type of project, from rapid prototypes with tight feedback loops to complex projects lasting years. I have a good eye for design and I love collaborating with designers as early and as frequently as possible, because this tight feedback loop helps make better products more efficiently.

## My experience

<article class="flex-grid flex-grid--equal">
  <section class="flow">
    <h3 class="delta" id="expert-proficiency">Expert proficiency</h3>
    <ul>
      <li>HTML</li>
      <li>CSS/Sass</li>
      <li>JavaScript</li>
      <li>Accessibility</li>
      <li>Web performance</li>
    </ul>
  </section>
  <section class="flow">
    <h3 class="delta" id="good-competency">Solid competency</h3>
    <ul>
      <li>Design systems</li>
      <li>Storybook</li>
      <li><abbr title="JavaScript, APIs, Markup">JAMstack</abbr></li>
      <li>React</li>
      <li>Next.js</li>
      <li>Node.js</li>
      <li>GraphQL</li>
      <li>PHP</li>
      <li>WordPress</li>
    </ul>
  </section>
  <section class="flow">
    <h3 class="delta" id="basic-proficiency">Basic familarity</h3>
    <ul>
      <li>Serverless</li>
      <li>MySQL/PostgreSQL</li>
      <li>MongoDB</li>
      <li>Laravel</li>
      <li>Magento</li>
      <li>Ruby</li>
      <li>Rails</li>
      <li>Shopify</li>
    </ul>
  </section>
</article>

But I like to think I am a bit more than just a set of technologies. Here are some more reasons people have enjoyed working with me in the past:

## I'm a seasoned code archaeologist

My six years of contracting experience has given me exposure to a wide variety of codebases, and part and parcel of being a contractor is getting up to speed with these quickly.

Obviously, most developers want to work on a new greenfield project that [will be perfect this time](https://bonkersworld.net/building-software), the reality of software development is often{{symbols.emdash}}well, quite a bit messier{{symbols.emdash}}but I have grown to embrace that.

<blockquote>
  <p>Economist.com is under construction. Not unlike Britain’s Houses of Parliament, our current website just about does its job but is in danger of collapsing.</p>

  <a href="https://medium.com/severe-contest/why-were-starting-from-scratch-with-the-economist-s-new-website-62e390e385e6">Olivia Frost, The Economist</a>
</blockquote>

As a contractor via a small [OrangeJellyfish](https://www.orangejellyfish.com/) team supporting The Economist, I was brought in to, in their own words, keep it from collapsing, while a new internal team had the freedom to build a new site from scratch. After a couple of months, as the existing teams slowly transitioned to the rebuild, I was the only developer supporting the old website, triaging bugs, and working with the editors to accommodate seasonal and special one-off content{{symbols.emdash}}at the time, a very manual process. Since most of the internal knowledge of the old codebase had evaporated by the time I had joined, it was mostly up to me to piece it together to understand how it all worked.

I'm naturally an incredibly curious person, and I enjoy weaponising this curiosity in my job as a developer. From bisecting through ancient Git commits from years before the developers left, searching GitHub PRs and Slack discussions, perusing long-abandoned Confluence pages, or more brute-force approaches, there's something satisfying about piecing together a complex system and understanding how it works. A legacy code base with a few head-scratchers and a backlog of decisions that were, perhaps in hindsight, suboptimal, isn't a source of annoyance for me, it's a challenge that I relish.

## Accessibility 

I have several years of experience building accessible websites and web applications, getting involved earlier in the product process to discuss accessibility with designers and product-people up-front, and helping development teams upskill their accessibility knowledge.

Recently, at the [Economist Intelligence Unit](https://www.eiu.com), I was leading the accessibility efforts in the React web application they were building to replace their legacy site. I took the findings of an external accessibility audit, transformed them into a comprehensive Jira epic, organised the tickets in a way that would allow the management teams to have a much clearer picture of the progress made towards WCAG complicance, and letting the product teams prioritise their time.

This let us clearly separate the more straight-forward fixes that could be tackled as part of a sprint from the longer-term accessibility goals that would also require cross-disciplinary collaboration with external teams{{symbols.emdash}}such as the editorial and CMS teams{{symbols.emdash}}being required to format and mark up the editorial content, especially graphs and charts, in a more accessible manner.

Additionally, where the accessibility issues were partially or entirely as a result of third-party components, I audited the third-party components and advised on the best strategy for fixing them. Some resulted in upstream fixes, other components could be configured differently to alleviate the issues, and some were best served by being replaced either with an internal purpose-built solution or a different third-party component.

By the time my engagement finished, I had left the development and product teams in a much more robust state to tackle their existing accessibility issues, and through mentoring and knowledge-sharing, build more accessible products in the future.

## Web performance

We’ve all been there on dodgy train WiFi desperately trying to load a website we desperately need, but for the connection to drop halfway through and you end up sad. I just happen to have a long memory and a vendetta that fuels my continous healthy web performance zealotry.

From hand-optimising SVGs and tuning responsive images, to sweating over the build process and keeping third-party dependencies down where it's otherwise tempting to grab a library to just add this one small utility from it, everything I build is made with solid web performance principles in mind.

Speaking of responsive images, in the dark days when responsive images weren't natively supported in the majority of browsers, I was a contributor to and core team member of the responsive image polyfill [Picturefill](http://scottjehl.github.io/picturefill/), and when I was living in Bristol I co-organised the [Bristol Web Performance meetup](https://mobile.twitter.com/bristolwebperf).

## Let's make a nice website together?

If my skills sound relevant to anything you need help with, I'd love to hear from you and to discuss your next project.

<a class="btn" href="mailto:alex@jegtnes.com?subject=Contracting%20inquiry">Toss an email my way!</a>
