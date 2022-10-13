---
title: Bristol Mediation
date: September 2013 – April 2014
excerpt: For a final year university module, my team helped a local charity design and build a tool to organise their volunteers.
tags: research, design, development, prototyping, open-source
layout: portfolio-item.hbs
priority: 4
---

# Bristol Mediation: Volunteer Availability Management

Bristol Mediation is a local charity based in Easton, Bristol, that attempts to solve neighbourhood and community disputes through mediation. Bristol Mediation have around 30-40 active volunteer mediators that receive training and assist in cases.

## The team

As part of my university module Consultancy Project, students from the Web Design course and the IT Management for Business course are assigned to teams to work with local charities to solve a real-world problem. For this project, I worked together with Tom Robinson, Rob Lydon, and Ben Cromack from IT Management for Business, as well as Peter Coates from Web Design.

## The problem

Bristol Mediation receives no centrally allocated funding and has only one full-time member of staff to deal with paperwork and administration. Due to an increasingly growing pressure on Bristol Mediation’s services, the amount of time that’s been spent on allocating and managing cases as well as assigning mediators has grown out of hand.

As a team, we studied the current workflow and processes of Bristol Mediation, working closely together with them to find the quickest wins to tackle so that more time could be spent on mediation and less on administrative work.

Following stakeholder interviews with Bristol Mediation administrators and volunteers, the largest inefficiency by far was getting an overview of the administrator availability. This was currently done by phoning each mediator individually every couple of weeks and writing down their availability on a paper-based filing system, pulling all of this paperwork out when assigning mediators to new cases; adding additional work for mediators and especially administrators.

## Previous attempts at solving the problem
Bristol Mediation had previously attempted to digitise the current workflow using both Google Calendars and Doodle polls, however, this did not work out for several reasons that were discovered during the stakeholder interviews.

Using Google Calendar for availability management turned out to be a square peg in a round hole. Most mediators who had attempted to use this solution complained complained about the number of steps that were required to simply enter their availability for a given day, from logging in, dismissing whatever notices Google deemed appropriate for that certain day, selecting the right weeks, sharing their calendars, and individually entering their own appointments, every day.

Most mediators were fairly happy with the way Doodle worked, but from an administration point of view, there were too many manual steps involved each week in setting new polls up to get availability. Additionally, neither solution easily highlighted which modes of transport the mediators' used, which is a key aspect of assigning mediators to cases.

## Our solution
The single most important takeaway we got from the user research is that people are generally not willing to get involved with new tools or workflows unless it brings an advantage to them. In this case, Google Calendar and Doodle caused more frustration than they solved for mediators and administrators alike.

This revealed that we needed a laser-sharp focus on making the system take up as little time as possible, making it easier for mediators to enter their availability and easier for administrators to view mediator availability so they can get back to work. To ensure that the requirement for ease of use was met, as well as all the stakeholder requirements from the Bristol Mediation, we developed interactive prototypes using web technologies.

I have lately come to favour developing interactive prototypes as a high-fidelity solution in an early stage of any project over producing several design artefacts like paper prototyping and high-fidelity mockups, often producing these after wireframes and occasionally style tiles. While the code produced by this often is far from perfect, it’s highly useful to be able to reuse large portions of your code from your prototype in production, with only a little help from your best friend, refactoring.

We prototyped the user-interface prototype in two stages: The mediator-facing side of the application and the administrative side of the application. These were tested with mediators and administrators respectively in order to get a feel for whether the interface was intuitive and satisfied the requirements we had drawn up in cooperation with Bristol Mediation.

![An animation of the availability system prototype. Availability slots are laid out in a table of hours from 9am-9pm over the course of 7 days. Clicking once turns the slot green, indicating your availability, and clicking twice turns it yellow, indicating you may be available.](/assets/images/content-images/bm.gif)

_Prototyping the availability system interactions_

These prototypes went through a few feedback-iteration cycles before starting the back-end development of the functionality. Based off the prototypes and stakeholder priorities, we refined the previously identified requirements and prioritised them using the MoSCoW method, and implementing them in order.

Because of the tight deadlines imposed by the university module in order to avoid scope creep and encouraging plenty of reflection towards the end of the module, there was not enough time to fully develop all of the features and functionality that was envisaged at the start of the project. However, I am certain that the large chunk of time we invested in making the availability tool user-friendly and efficient has been well worth it.

![A grid of the administrator's view of the mediators' availability. It's laid out like a calendar, with each hour of each day showing which mediators are available or potentially available, as well as the transport modes they use.](/assets/images/content-images/BM_availability_sample.png)

_An image of the admin's view of the system as it is being used, with mediator names swapped with names of some my favourite band members due to confidentiality and data protection reasons._

## Sustainability and future development
Because we did not manage to ship all of the functionality desired by Bristol Mediation before the final deadline, and as the university module prohibits us from any client contact after this, we developed a range of documentation to hand over to Bristol Mediation. This explained the current state of the system, the technical documentation expanding on everything from the main requirements to run the application plus all the tiny minutiae, recommended freelancers which would be able to help out with future modifications or additions to the system, as well as recommended approaches to take when implementing the features desired by Bristol Mediation that didn’t make it into the final deliverable.

## My part in the bigger puzzle
As a hybrid developer/designer, I was responsible for most of the front-end development and prototypes, had a say in the design process and the feedback sessions with mediators, and all of the back-end development. I was aided by Ben and Tom when working out the database design, and Peter assisted with the prototype and design stages.

They collectively took on several tedious admin tasks Bristol Mediation sorely needed, from tackling everything from switching hosting companies and email solutions to migration of their existing public-facing WordPress website. As well, they did a great job of tackling project management and client services. As the tired old adage said, I couldn’t have done it without them.
