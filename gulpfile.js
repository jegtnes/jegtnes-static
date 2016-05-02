var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var browserSync = require('browser-sync').create();

var exec = require('child_process').exec;

var config = require('./config');

gulp.task('serve', ['images', 'metalsmith'], function() {
  browserSync.init({
    server: {
      baseDir: config.outputFolder
    },
    open: false
  });

  gulp.watch([config.content, config.templates], ['metalsmith', browserSync.reload]);
  gulp.watch([config.assetsImages], ['images'], browserSync.reload());
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

gulp.task('images', function(cb) {
  return gulp.src(config.assetsImages)
  .pipe(newer(config.outputImagesFolder))
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}]
  }))
  .pipe(gulp.dest(config.outputImagesFolder));
});
