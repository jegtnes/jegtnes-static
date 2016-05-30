var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
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

gulp.task('scripts', function(cb) {
  var bundleStream = browserify(config.jsEntry)
    .transform(babelify, {presets: ['es2015']})
    .bundle();

  return bundleStream
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.outputJsFolder));
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
