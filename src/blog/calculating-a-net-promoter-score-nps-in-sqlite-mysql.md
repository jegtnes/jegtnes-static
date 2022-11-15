---
title: Calculating a Net Promoter Score (NPS) in SQLite, PostgreSQL, and MySQL
date: 2015-12-08
layout: blog-post.njk
excerpt: "How to calculate a Net Promoter Score in one query using your favourite SQL-based DBMS."
---

At my job, when we need to gather data or get feedback in survey format, we normally use external survey tools like SurveyMonkey for a reason: They're well-built, well-tested, and they come with everything you need to get the job done. However, for this current project we lacked the clearance to use external tools in time, so I had to build a home-grown survey.

Like many others, we rely on [Net Promoter Scores](https://www.netpromoter.com/know/) to get a more accurate overview of customer satisfaction, and we needed it for this survey as well, so I set out a way to calculate it.

For those uninitated, you ask the user to rank "How likely are you to recommend FooOnTheBar.io to your friends or family?" on a scale of 0 to 10. If this sounds familiar, you've likely been asked to answer this a few times yourself.

Instead of just calculating an average score, it's a bit more involved, to reflect the bias that people rate things more highly than they actually feel about it.

1) Discard people who are considered "neutral" by their rating: 7-8s.
2) Count the amount of people who are considered "promoters": 9 and 10
3) Subtract the amount of people who are considered detractors: 0 through 6.
4) Divide this amount by the total amount of people who took the survey
5) Multiply this sum by 100

You will end up with a score ranging from -100 to 100, where any positive number is generally considered good, and you're doing exceptionally well if you're above 50.

Since I'm lazy, I initially wanted to toss a few separate queries at this problem and calculate it server-side, but I figured this was a good opportunity to practice some more advanced queries than <code data-syntaxhighlight class="language-sql">SELECT * FROM table WHERE foo = bar;</code>.

After some tinkering, this is where I arrived at:

<h2 id="finalquery">Final query</h2>

<pre><code data-syntaxhighlight class="language-sql">SELECT CAST(((
  SUM(CASE WHEN recommendRating BETWEEN 9 AND 10 THEN 1 ELSE 0 END) * 1.0 -
  SUM(CASE WHEN recommendRating BETWEEN 0 AND 6 THEN 1 ELSE 0 END)
  ) / COUNT(*) * 100) AS int) NPS FROM exitSurvey
WHERE recommendRating IS NOT NULL
</code></pre>

**P.S. Using MySQL?** This query works as is with SQLite and PostgreSQL. If you're using MySQL, change `int` on the second to last line to `signed`. Thanks for nothing, MySQL.

## Explanation
Whoa, there are a lot of things going on here! I haven't seen as many nested brackets since… I last wrote JavaScript. Let's disassemble this line-by-line and see what's going on.

Quick caveat: This assumes you have a single column in a table somewhere where you store a survey question result between 0 to 10. This doesn't account for alternate database schematics.

### Line 1:
<pre><code data-syntaxhighlight class="language-sql">SELECT CAST(((
</code></pre>

This sets us up to cast the value of the calculation inside to a certain type (in this case an integer, you can see it on the last line). We do this because we need to deal with floated values later on for an accurate average.

### Line 2:

<pre><code data-syntaxhighlight class="language-sql">SUM(CASE WHEN recommendRating BETWEEN 9 AND 10 THEN 1 ELSE 0 END) * 1.0 -
</code></pre>
`CASE WHEN` in SQL is something I haven't seen until I researched solutions for this problem. What happens here is:

1) Sum up everything inside the brackets
2) the calculation inside the brackets searches for all the values in the `recommendRating` column
3) if the rating is between 9 and 10 (a 'promoter') add a 1 to the cumulative count
4) otherwise, don't add anything
5) Multiply the sum by 1.0 to cast the integer value to a float
6) Subtract the next value to come afterwards (the next line)

### Line 3

<pre><code data-syntaxhighlight class="language-sql">SUM(CASE WHEN recommendRating BETWEEN 0 AND 6 THEN 1 ELSE 0 END)
</code></pre>
This is mostly identical to the line above, except this time we're counting the dectractors (0-6) to subtract from the promoters above. You don't need to cast this to a float, as doing math with a float and integer will cast the result to a float, too.

### Line 4

<pre><code data-syntaxhighlight class="language-sql">) / COUNT(*) * 100) AS integer) NPS FROM exitSurvey
</code></pre>
This is a bit unreadable thanks to the multiple nested brackets necessary to make it work, but I'll try to explain.

<code data-syntaxhighlight class="language-sql">) / COUNT(*) * 100)</code> divides the result of the previous calculation (line 2 minus line 3) by the total amount of rows in the table, and multiplies it by 100.

<code data-syntaxhighlight class="language-sql">AS int)</code> carries on from line 1. We need to cast our floated calculations to an integer as NPSs don't use decimals.

<code data-syntaxhighlight class="language-sql">NPS</code> names the column. This can be whatever you prefer.

<code data-syntaxhighlight class="language-sql">FROM exitSurvey</code> is the table name you're selecting this whole thing from.

## Line 5
<code data-syntaxhighlight class="language-sql">WHERE recommendRating IS NOT NULL</code> makes sure that in the event that answering the NPS question is optional, you don't select additional rows to count which don't include an answer to the NPS question. If this is mandatory in your survey, you can remove this.

## Conclusion
And that's it! I love it when you think something's probably not feasible but it comes together in the end. This has been tested in SQLite 3, PostgreSQL 9.3, and MySQL 5.6 (with the caveat that you need to swap `AS int` with `AS signed` in mySQL, as mentioned above).
