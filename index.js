var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var browserSync = require('metalsmith-browser-sync');

var handlebars = require('handlebars');

Metalsmith(__dirname)
  .source('content')
  .use(browserSync({
    server: "./dist",
    files: [
      "content/**/*.md",
      "templates/**/*.hbs"
    ]
  }))
  .use(collections({
    pages: {
      pattern: './*.md'
    },
    posts: {
      pattern: 'posts/*.md'
    }
  }))
  .use(markdown())
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
    "partials": "templates/partials"
  }))
  .destination('./dist')
  .build(function(err) {
    if(err) {
      console.log(err);
    }
  });
