---
title: Project Brunel
date: September 2013 – April 2014
excerpt: My final year uni project. I designed and implemented an algorithm for finding better journeys for medium-to-long-distance train travel in the form of a web application. I took into account a variety of factors related to journey pleasantness, instead of focusing on a single metric like price, which all current train booking services do.
tags: research, design, development, prototyping, open-source
layout: portfolio-item.hbs
priority: 1
---

# Project Brunel

_PSA: This case study is a couple of years old. I wasn't able to keep the project online due to its reliance on screenscraping National Rail, which changed their markup too frequently for this to be viable and maintainable post-university. I'm still proud of it, and you [can check out the source on GitHub](https://github.com/jegtnes/dmp)._

My final year university project allowed me to research and develop practically anything as long as it was related to technology.

Having friends scattered all across the UK as well as family and friends all over Scandinavia—I travel a lot. As a result, I’ve spent an unholy amount of time researching the cheapest train journeys in existence that aren’t an utter pain in the arse. This is vastly more difficult in the UK than anywhere else, thanks to the wonders of a privatised railway system with more than 20 different train operating companies.

The journeys are often long distance, and comprise multiple travel options. Do I go from Bristol to Brighton via Paddington and Victoria and get there the fastest, do I change at Reading and Gatwick to avoid London, or do I get the slower direct train without having to change?

Being partially inspired by what Hipmunk has done for flights, I wanted to improve the train journey planning experience in the UK. This project was twofold: Researching British train users’ travelling preferences in order to create a meaningful journey ranking algorithm, and implementing this.

In a way, the algorithm was the easier part. I spoke to train users candidly, conducted informal and semi-formal interviews, and distributed a survey to gather additional data. Based upon this, the following key data points were statistically significant enough to include in a ranking algorithm:

1) Price
2) Journey time
3) Number of changes
4) The availability of a first class ticket that is less than or equal to 125% of the equivalent second class journey price
5) Train operating company reliability
6) Train operating company customer satisfaction
7) The ability to avoid going through London

In order to meet the assignment deadline and to ensure focus, the only factors presently included in the algorithm are price, journey time, and number of changes.

![A screenshot of Project Brunel search results from Bristol Temple Meads to Aberdeen. The results are ranked from 1-10, with the cheapest journey first, and is also direct; the second result is the second cheapest one of the results, and one of the fastest. The last result has three changes and is one of the most expensive journeys.](/assets/images/content-images/Screen-Shot-2014-06-05-at-09-01-21.png)

_A sample of the results returned when searching for a long-distance journey. Naturally, price mostly takes precedence here, but the amount of changes also factor in quite heavily in places._

Another challenging aspect of this project was finding a suitable data source to use. Unfortunately, I couldn’t find a free and open data source for journey planning—all APIs were at the time proprietary. It seems like National Rail is planning to make Darwin free, a bit too late.

Against my better judgment I decided to use screenscraping to get the required data, as the service was merely a proof of concept. As the data I needed was only easily exposed when using JavaScript, I settled on using a custom casper.js task to scrape the initial data, then trigger the AJAX content load. As this was naturally slower than the alternatives, I spent a large amount of time optimising the performance of the screen scraping by blacklisting all of the non-essential assets. Eliminating all third-party tracking libraries, most JavaScript, and all CSS, the time taken to scrape 10 journeys went from over 10 seconds to a more tolerable 3 on average.

Ultimately, I think this idea still has a good potential, though presently slightly let down by the long scraping times as well as the inherent unreliability and fragility that comes with scraping. I plan to switch Project Brunel over to National Rail’s Darwin when this becomes publicly available.
