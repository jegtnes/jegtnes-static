var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var copy = require('metalsmith-copy');

var handlebars = require('handlebars');

Metalsmith(__dirname)
  .source('content')
  .use(markdown())
  .use(collections({
    pages: {
      pattern: 'pages/*.md'
    },
    posts: {
      pattern: 'posts/**/*.md'
    }
  }))
  .use(permalinks({
    linksets: [
      {
        match: { collection: 'posts' },
        pattern: 'blog/:title'
      },
      {
        match: { collection: 'pages' },
        pattern: ':title'
      },
    ]
  }))
  .use(layouts({
    "engine": "handlebars",
    "directory": "templates/layouts",
    "partials": "templates/partials",
    "default": "home.hbs"
  }))
  .use(copy({
    pattern: 'pages/*.md',
    directory: './',
    move: true
  }))
  .destination('./dist')
  .build(function(err) {
    if(err) {
      console.log(err);
    }
  });
