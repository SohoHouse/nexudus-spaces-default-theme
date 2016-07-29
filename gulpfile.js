var gulp          = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $               = gulpLoadPlugins(),
  argv            = require('yargs').argv,
  dotenv          = require('dotenv').config(),
  fileDestination     = process.env.FILE_DESTINATION || './dest';

var scss = function () {
  gulp.src('css.scss')
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
    .pipe(gulp.dest(fileDestination));
  console.log('Built CSS to ' + fileDestination)
};

var files = function () {
    
  gulp.src('files/**/*')
    .pipe(gulp.dest(fileDestination))
  console.log('Built Files to ' + fileDestination)
};

var emails = function() {
  return gulp.src('emails/partials/*.nunjucks')
    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>")}))
    .pipe($.nunjucksRender({
      path: ['emails/layouts']
    }))
    .pipe($.inlineSource())
    .pipe($.inlineCss({
      removeStyleTags: false,
      preserveMediaQueries: true,
      applyStyleTags: false
    }))
    .pipe(gulp.dest('emails'))
};

gulp.task('build:scss', scss);
gulp.task('build:files', files);
gulp.task('build:emails', emails);

gulp.task('default', ['build:scss', 'build:files', 'build:emails'], function () {
  gulp.watch('**/*.scss', ['build:scss']);
  gulp.watch('files/**/*', ['build:files']);
  gulp.watch(['emails/**/*.nunjucks', 'emails/**/*.css'], ['build:emails']);
});
