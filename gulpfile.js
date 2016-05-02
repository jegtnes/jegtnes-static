var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

var exec = require('child_process').exec;

var config = require('./config');

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: config.outputFolder
    },
    open: false
  });

  gulp.watch([config.content, config.templates], ['metalsmith', browserSync.reload]);
});

gulp.task('metalsmith', function(cb) {
  exec('node index.js', function(err) {
    if (err) {
      console.error(err);
      cb(err);
    }
    else {
      cb(false);
    }
  })
});
