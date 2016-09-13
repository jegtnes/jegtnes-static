var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var eventStream = require('event-stream');
var newer = require('gulp-newer');
var browserSync = require('browser-sync').create();

var exec = require('child_process').exec;

var config = require('./config');

gulp.task('serve', ['metalsmith', 'images', 'styles', 'scripts', 'fonts'], function() {
  browserSync.init({
    server: {
      baseDir: config.outputFolder
    },
    open: false
  });

  gulp.watch([config.content, config.templates, config.helpers], ['metalsmith', browserSync.reload]);
  gulp.watch([config.assetsImages], ['images'], browserSync.reload());
  gulp.watch([config.scssFolder], ['styles']);
  gulp.watch([config.jsFolder], ['scripts']);
});

gulp.task('metalsmith', function(cb) {
  exec('node index.js', { maxBuffer: 1024 * 20000 }, function(err) {
    if (err) {
      console.error(err);
      cb(err);
    }
    else {
      exec('cp -R tmp-build/* dist', function(err) {
        if (err) {
          cb(err)
        } else {
          cb(false);
        }
      })
    }
  })
});

gulp.task('styles', function(cb) {
  return gulp.src(config.scssEntry)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.outputCssFolder))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function(cb) {
  return gulp.src(config.fontsFolder)
    .pipe(newer(config.outputFontsFolder))
    .pipe(gulp.dest(config.outputFontsFolder))
});

// This one's got a bit of a weird approach, but it works
// heavily inspired / lifted from:
// https://fettblog.eu/gulp-browserify-multiple-bundles/
gulp.task('scripts', function(cb) {
  glob(config.jsEntries, (err, files) => {
    if (err) cb(err);

    var streams = files.map((entry) => {
      return browserify(entry)
      .transform(babelify, {presets: ['es2015']})
      .bundle()
      .pipe(source(entry))
      .pipe(gulp.dest(config.outputFolder));
    });

    eventStream.merge(streams).on('end', cb)
  })
});

gulp.task('images', function(cb) {
  return gulp.src(config.assetsImages)
  .pipe(newer(config.outputImagesFolder))
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{
      cleanupIDs: false,
      removeUselessDefs: false,
    }]
  }))
  .pipe(gulp.dest(config.outputImagesFolder));
});
