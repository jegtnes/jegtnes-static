var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var collections = require('metalsmith-collections');

var handlebars = require('handlebars');

Metalsmith(__dirname)
  .source('content')
  .use(markdown())
  .use(layouts({
    "engine": "handlebars",
    "directory": "templates/layouts",
    "partials": "templates/partials",
    "default": "home.hbs"
  }))
  .destination('./dist')
  .build(function(err) {
    if(err) {
      console.log(err);
    }
  });
