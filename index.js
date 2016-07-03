var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var helpers = require('metalsmith-register-helpers');
var feed = require('metalsmith-feed');

var handlebars = require('handlebars');

var config = require('./config');

Metalsmith(__dirname)
  .source('content')
  .use(collections({
    pages: {
      pattern: config.contentPages
    },
    blog: {
      pattern: config.contentPosts,
      sortBy: 'date',
      reverse: true
    },
    portfolio: {
      pattern: config.portfolioItems,
    }
  }))
  .use(markdown())
  .use(permalinks({
    linksets: [
      {
        match: { collection: 'blog' },
        pattern: 'blog/:title'
      },
      {
        match: { collection: 'portfolio' },
        pattern: 'portfolio/:title'
      },
      {
        match: { collection: 'pages' },
        pattern: ':title'
      },
    ]
  }))
  .use(feed({
    collection: 'blog',
    site_url: 'http://jegtnes.co.uk'
  }))
  .use(helpers({
    directory: "helpers"
  }))
  .use(layouts({
    "engine": "handlebars",
    "directory": config.layoutsFolder,
    "partials": config.partialsFolder
  }))
  .destination('./tmp-build')
  .build(function(err) {
    if(err) {
      console.log(err);
    }
  });
