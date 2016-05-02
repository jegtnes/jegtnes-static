var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');

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
        match: { collection: 'pages' },
        pattern: ':title'
      },
    ]
  }))
  .use(layouts({
    "engine": "handlebars",
    "directory": config.layoutsFolder,
    "partials": config.partialsFolder
  }))
  .destination('./dist')
  .build(function(err) {
    if(err) {
      console.log(err);
    }
  });
