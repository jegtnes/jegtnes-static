var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

var config = require('./config');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: config.outputFolder
    }
  });
});
