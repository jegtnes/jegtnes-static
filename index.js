var Metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');

Metalsmith(__dirname)
  .use(markdown())
  .use(layouts({
    "engine": "handlebars",
    "default": "home.hbs"
  }))
  .destination('./dist')
  .build(function(err) {
    if(err) {
      console.log(err);
    }
  });
