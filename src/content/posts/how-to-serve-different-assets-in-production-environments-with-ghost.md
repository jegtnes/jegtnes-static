---
title: How to serve different assets in production environments with Ghost
date: 2014-05-01
layout: blog-post.njk
excerpt: "On implementing Handlebars helpers in Ghost and using them to serve different assets locally and in production."
---

Serving minified, compressed, and concatenated assets (CSS and JavaScript) is considered a good practice; it saves you bandwidth and ensures your users can load your site as quickly as possible. However, this can be impractical for debugging locally, so most environments enable the serving of different assets to different environments.

After wrangling source maps for a while with gulp-sass and ultimately failing, I attempted to serve different assets in Ghost, and after two hours of yak shaving, I have arrived at a solution. Like most things I seem to blog about regarding Ghost these days, it involves editing core files, which is a huge hack. This time it's only index.js, so we've got that going for us, which is nice.

This solution involves:
1) Creating a custom Handlebars helper
2) Registering this helper in index.js
3) Using this helper in your Handlebars views to serve up different assets.

Many thanks to [fox1t](https://ghost.org/fox1t/) on the Ghost forums for helping me figure this out.

(If you just want something to copy/paste, skip on to the end where I've provided all the code.)

## Handlebars helper
Here we need to register a new Handlebar helper and export this, so Node can require the file.

First off, you need to require `express-hbs` to be able to register a helper, and requiring `config` in order to grab the URL for your development environment.

```js
var hbs = require('express-hbs');
var config = require('config');
```

Then we need to create a function to register the helper:
```js
registerHelper = function (){
  hbs.registerHelper("isLocal", function(url) {
    return url === config.development.url
  });
}
```

This creates a helper called isLocal which accepts one parameter, `url`, which returns true if your development URL is the same as the parameter you're passing to it in the view.

Then we need to register this module:
```js
module.exports = registerHelper;
```
And that's the helper all done with. Save it to your root directory. Call it whatever you want, I'm not your mum. I called it `handlebarsHelpers.js`.

## Registering the helper
Now open up your index.js file and cringe at the fact you're about to edit a core file. Require the newly created helper at the start of the file like you'd require anything else in Node:
```js
var hbs_helpers = require('./handlebarsHelpers');
```

And call it after you've called Ghost:

```js
hbs_helpers();
```
Restart your Node application and this should all work.

## Using the helper

In the view where you're currently serving your assets, typically `default.hbs`, you have access to your new Handlebars helper.

Hopefully you remembered we need a parameter for this, which is going to be the Ghost-provided `@blog.url`. This will give you the full URL for the environment you're in.

Here's how you use it:

{% raw %}
```handlebars
{{#if (isLocal @blog.url)}}
  {{! Local, unminifed }}
  <link rel="stylesheet" href="{{asset 'css/style.css'}}" type="text/css" media="all" />
{{else}}
  {{! Production, minified }}
  <link rel="stylesheet" href="{{asset 'css/style.min.css'}}" type="text/css" media="all" />
{{/if}}
```
{% endraw %}

…aaand that's it! Here's to minified assets everywhere.


<h2>All The Code</h2>

<h3>handlebarsHelpers.js</h3>

```js
var hbs = require('express-hbs');
var config = require('config');
registerHelper = function (){
  hbs.registerHelper("isLocal", function(url) {
    return url === config.development.url
  });
}

module.exports = registerHelper;
```

### Modified index.js
```js
// # Ghost bootloader
// Orchestrates the loading of Ghost
// When run from command line.

var ghost = require('./core'),
    hbs_helpers = require('./handlebarsHelpers'),
    errors = require('./core/server/errorHandling');

ghost().otherwise(function (err) {
    errors.logErrorAndExit(err, err.context, err.help);
});

hbs_helpers();
```

### Usage in Handlebars template
{% raw %}
```handlebars
{{#if (isLocal @blog.url)}}
  {{! Put your local, unminifed assets here }}
{{else}}
  {{! Put your hyper-optimised, minified assets here }}
{{/if}}
```
{% endraw %}
