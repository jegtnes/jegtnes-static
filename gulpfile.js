var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var newer = require('gulp-newer');
var browserSync = require('browser-sync').create();

var exec = require('child_process').exec;

var config = require('./config');

gulp.task('serve', ['metalsmith', 'images', 'styles', 'scripts'], function() {
  browserSync.init({
    server: {
      baseDir: config.outputFolder
    },
    open: false
  });

  gulp.watch([config.content, config.templates, config.helpers], ['metalsmith', browserSync.reload]);
  gulp.watch([config.assetsImages], ['images'], browserSync.reload());
  gulp.watch([config.scssFolder], ['styles']);
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
  return gulp.src(config.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.outputCssFolder))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function(cb) {
  return gulp.src(config.jsEntry)
  	.pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(sourcemaps.write('.'))
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
