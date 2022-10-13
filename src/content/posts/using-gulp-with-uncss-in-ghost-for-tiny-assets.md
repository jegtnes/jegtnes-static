---
title: Using UnCSS and Gulp in Ghost to create tiny assets
date: 2015-05-31
layout: blog-post.njk
excerpt: A tutorial on using UnCSS and Gulp with Ghost (or a similar dynamic blogging system) to drastically reduce the size of your assets.
---

Build tools have come a very long way in a very short time. I'm here to tell you how to use [gulp-uncss](https://github.com/ben-eb/gulp-uncss) and other minifying tools with a Ghost blog to dramatically reduce the file size of your CSS by quite a bit, especially if you're using a theme with all the bells and whistles and/or a large framework like Foundation or Bootstrap.

For the current incarnation of my Ghost theme, I use my long-term love interest [inuit.css](https://github.com/csswizardry/inuit.css). While it does not come with design built in, there's still a lot of CSS there I don't really use for something as fairly simple as a blog.

So, shall we get started?

## Prerequisites
You need to have installed:

- [node.js](http://nodejs.org/)
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

I assume you're working with a single concatenated CSS file. If you're not, you'll need to add `gulp-concat` to your workflow to produce one manageable CSS file by the end of it (this is great for performance reasons, too).

First off, find your nearest command line, and run `npm install --save-dev gulp gulp-sass gulp-uncss gulp-rename gulp-cssmin gulp-xml2js gulp-clean gulp-combine-media-queries`, which will add Gulp and a bunch of Node modules to your NPM dependencies. Add this Gulpfile.js to your theme directory to get started; and I'll walk through the next steps as we go along:

<pre><code data-syntaxhighlight class="language-javascript">var gulp = require('gulp');

var sass = require('gulp-sass'); // skip this if you're working with vanilla CSS
var rename = require('gulp-rename');
var cmq = require('gulp-combine-media-queries');
var uncss = require('gulp-uncss');
var download = require('download');
var cssmin = require('gulp-cssmin');
var clean = require('gulp-clean');
var xml2js = require('gulp-xml2js');

gulp.task('styles-build', function() {
     return gulp.src('scss/style.scss') // change this to the location of your (S)CSS file
     .pipe(sass()) // skip this if you're working with vanilla CSS
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'));
})

gulp.task('default', ['styles-build']);
</code></pre>

So for now, if you run the task this will do nothing but compile your CSS and rename your CSS file to style.min.css. File size: **93KB**.

## Combine media queries

This will especially be of use if you make use of Sass' nested media queries. It combines all the matching media queries scattered across the compiled CSS into one single media query block.

Pipe your assets through `gulp-combine-media-queries` below `rename`.

<code data-syntaxhighlight class="language-javascript">.pipe(cmq({ log: true }))</code>

File size: **91KB**. That's 2 whole KB shaved off!  As you may have guessed, combining media queries is only a tiny optimisation—especially as gzip takes care of repetition extremely well. However, as with any performance optimisation process, make sure it doesn't mess up anything. If you don't really have that many media queries, it may not be worth doing.

## UnCSS
This is the meat of the optimisation process. [UnCSS](https://github.com/giakki/uncss) is a wonderful tool that you feed an array of URIs. UnCSS visits these pages using Phantom.js, detects what styles you are and aren't using, and returns a CSS file without your unused declarations. We can tie this in easily with Gulp using the plugin gulp-uncss—the problem with dynamic sites is that you you have, well, dynamic content. How do you access this dynamic content to ensure that all parts of your site are being scanned for CSS rules being applied?

For Ghost, this can be done by tapping into the site's RSS feed, convert the post URIs to a JSON array, and hand it over to UnCSS.

### Download your site's RSS feed
We need the Node module `download` to do this.

<pre><code data-syntaxhighlight class="language-javascript">gulp.task('download-rss-feed', function(callback) {
  dl = download({
    url: 'http://yoursitehere.com/rss',
    name: 'rss.xml'
  }, './')

  dl.once('close', function() {
    callback();
  });
});
</code></pre>

This will synchronously download your site's RSS feed to your root directory, and indicates that the task is complete via a callback once the `download` module sends out the the `close` event emitter. This is important, as Gulp is asynchronous, and if we didn’t have this, the next step would attempt running before the file completed.

[Cameron Spear has some more information on Gulp synchronity](http://cameronspear.com/blog/handling-sync-tasks-with-gulp-js/), if you’re curious.

### Convert RSS feed to JSON
Now that we’ve got the RSS feed saved, we need to convert this to something that’s less of a giant pain to process in JavaScript. Turns out JSON is quite apt for this. Who’d have thought?

Fortunately for us, there’s an XML2JS Gulp module. Create a new task depending on the previous task, pipe this through XML2JS, rename it to something more suitable, and save it.

<pre><code data-syntaxhighlight class="language-javascript">gulp.task('create-sitemap', ['download-rss-feed'], function() {
    return gulp.src('./rss.xml')
    .pipe(xml2js())
    .pipe(rename('rss.json'))
    .pipe(gulp.dest('./'));
});
</code></pre>

### Convert JSON feed to JavaScript array

Now that we have the RSS feed in a lovely JSON format, we need to find the information we need from it. Fortunately, this is quite simple. Create another task depending on the previous one, again, and loop through this in plain JavaScript.

<pre><code data-syntaxhighlight class="language-javascript">gulp.task('find-site-files', ['create-sitemap'], function() {
  var json = require('./rss.json');
  json.rss.channel[0].item.forEach(function(value) {
    link = value.link[0]
    filesToUncss.push(link);
  })

return gulp.src(['rss.json', 'rss.xml'], {read: false})
    .pipe(clean());
</code></pre>

At the end, we delete the files we’ve created using the `clean` Gulp module.

Observant readers will once again notice that we have an unfamiliar variable called `filesToUncss`. This is a global variable I set in the Gulpfile earlier, which includes all of the static pages I have that don’t appear in the RSS feed. You’ll of course want to replace these pages with your own, if you have any. If not, it’s safe to leave the array blank.

<pre><code data-syntaxhighlight class=“language-javascript”>var filesToUncss = [
    'http://jegtnes.co.uk',
    'http://jegtnes.co.uk/portfolio',
    'http://jegtnes.co.uk/contact'
];
</code></pre>

As we’re pushing the RSS feed items to this variable, and we’ll be using this variable in `styles-build` that will call `find-site-files`, the variable value will persist, and all of our pages and posts will be covered by UnCSS. Nifty, eh?

### Use JavaScript array in UnCSS
And finally, this is where the magic happens. Now that we’re all set up, all you need to do is call UnCSS using our newly populated array below your `cmq` pipe.

<pre><code data-syntaxhighlight class=“language-javascript”>.pipe(uncss({
    html: filesToUncss
}))
</code></pre>

Depending on the size of your blog, this will take a while. You don’t want to do minify your CSS in development, so just integrate running this task into your build system before you deploy.

File size: **61KB**. This is still pretty huge, because about 90% of it is inuit.css comments, but a significant chunk of the CSS (30KB) has been stripped out. Now for the final optimisation.

## Minify
gulp-cssmin ensures that all unnecessary whitespace, comments, etc. will be thoroughly purged. We have a lot of it, so let's get started.

Add <code data-syntaxhighlight class="language-javascript">.pipe(cssmin())</code> after your UnCSS pipe.

Final file size: **6.8KB**, down from **93KB**. Not bad for something you can automate, fire, and forget, eh?

## Further reading
While UnCSS can reduce the size of your CSS drastically—there are many more performance optimisations you can tie in with Gulp, Grunt, or Broccoli, as detailed in [this post](http://yeoman.io/blog/performance-optimization.html) by Addy Osmani, which lists a range of excellent packages.

Into WordPress and Grunt instead? [Liam Gladdy has you covered](http://www.gladdy.co.uk/blog/2014/04/13/using-uncss-and-grunt-uncss-with-wordpress/) on using UnCSS.

## Final remarks

The final Gulpfile that I created in this post can be [found on Gist](https://gist.github.com/jegtnes/780e68e85b7ca8008079).

Does the way I organise my Gulpfile suck? Should some of these tasks be combined? Probably. Please tell me in the comments. :)
