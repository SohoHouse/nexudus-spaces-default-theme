var gulp          = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $               = gulpLoadPlugins(),
  argv            = require('yargs').argv,
  dotenv          = require('dotenv').config(),
  fileDestinations= process.env.FILE_DESTINATION.split(',') || ['./dest'];

fileSrc = ['./**/*.js', './**/*.css', './**/*.htm', './**/*.json', './**/*.master', './**/*.png', './**/*.jpg', './**/*.jpeg', '!node_modules/**/*', '!package.json', '!gulpfile.js', '!data.json']

var scss = function () {
  return gulp.src('css.scss')
    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>")}))
    .pipe($.sass({
      sourceComments: 'normal'
    }))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe($.if(argv.production, $.cleanCss()))
};

var files = function () {
  return gulp.src(fileSrc)
};

var emails = function() {
  return gulp.src('Emails/partials/*.nunjucks')
    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>")}))
    .pipe($.data(function () {
      return require('./data.json')
    }))
    .pipe($.nunjucksRender({
      path: ['Emails/layouts']
    }))
    .pipe($.inlineSource())
    .pipe($.inlineCss({
      removeStyleTags: false,
      preserveMediaQueries: true,
      applyStyleTags: false
    }))
    .pipe(gulp.dest('Emails'))
};

gulp.task('build:scss', function () {
  var stream = scss();
  fileDestinations.forEach(function(dest) {
    stream.pipe(gulp.dest(dest));
    console.log('Built CSS to ' + dest)
  })
});

gulp.task('build:files', function () {
  var stream = files();
  fileDestinations.forEach(function(dest) {
    stream.pipe(gulp.dest(dest));
    console.log('Built Files to ' + dest)
  })
});

gulp.task('build:emails', emails);


gulp.task('default', ['build:scss', 'build:files', 'build:emails'], function () {
  gulp.watch('**/*.scss', { interval: 750 }, ['build:scss']);
  gulp.watch(fileSrc, { interval: 750 }, ['build:files']);
  gulp.watch(['Emails/**/*.nunjucks', 'Emails/**/*.css'], { interval: 750 }, ['build:emails']);
});
