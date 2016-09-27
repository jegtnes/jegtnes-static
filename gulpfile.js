var gulp = require('gulp');
var source = require('vinyl-source-stream');
var eventStream = require('event-stream');
var glob = require('glob');
var newer = require('gulp-newer');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var pump = require('pump');

var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var uncss = require('gulp-uncss');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var babelify = require('babelify');
var browserify = require('browserify');
var browserSync = require('browser-sync').create();
var htmlreplace = require('gulp-html-replace');

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
  return exec('node index.js', { maxBuffer: 1024 * 20000 }, function(err) {
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

gulp.task('htmlreplace', function(cb) {
  return gulp.src(config.outputFolder + '/**/*.html')
  .pipe(htmlreplace({
    css: '/assets/css/main.min.css',
    js: '/assets/js/main.min.js',
  }))
  .pipe(gulp.dest(config.outputFolder));
})

gulp.task('styles', function(cb) {
  return gulp.src(config.scssEntry)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.outputCssFolder))
    .pipe(browserSync.stream());
});

gulp.task('min-styles', function(cb) {
  return gulp.src(config.outputCssFolder + '/**/*.css')
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min'} ))
    .pipe(uncss({
      html: [config.outputFolder + '/**/*.html'],
      ignore: [
        /\.js\-.+/,
        /pre.*/,
        /code.*/,
        '.token',
        /\.token.+/,
      ]
    }))
    .pipe(gulp.dest(config.outputCssFolder))
});

gulp.task('min-scripts', function(cb) {
  return pump([
    gulp.src(config.outputJsFolder + '/**/*.js'),
    rename({ suffix: '.min' }),
    uglify(),
    gulp.dest(config.outputJsFolder)
  ])
});

gulp.task('min-html', function(cb) {
  return gulp.src(config.outputFolder + '/**/*.html')
    .pipe(htmlmin({
      collapseBooleanAttributes: true,
      collapseWhitespace: true,
      decodeEntities: true,
      removeAttributeQuotes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeEmptyElements: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      sortAttributes: true,
      sortClassName: true,
    }))
    .pipe(gulp.dest(config.outputFolder));
});

gulp.task('build', function(cb) {
  runSequence(
    'clean',
    ['metalsmith', 'images', 'scripts', 'fonts', 'styles'],
    'htmlreplace',
    ['min-styles', 'min-scripts', 'min-html']
  )
})

gulp.task('clean', function(cb) {
  return del([
    'dist'
  ]);
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
