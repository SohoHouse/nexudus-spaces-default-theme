var gulp          = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $               = gulpLoadPlugins(),
  argv            = require('yargs').argv,
  DEFAULT_OUT     = './dest';

var scss = function () {
  var dest = argv.out || DEFAULT_OUT;
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
    .pipe(gulp.dest(dest));
  console.log('Built CSS to ' + dest)
};

var files = function () {
  var dest = argv.out || DEFAULT_OUT;
    
  gulp.src('files/**/*')
    .pipe(gulp.dest(dest))
  console.log('Built Files to ' + dest)
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

gulp.task('default', ['build:emails'], function () {
  var dest = argv.out
  if (dest) {
    scss();
    files();
    gulp.watch('**/*.scss', ['build:scss']);
    gulp.watch('files/**/*', ['build:files']);
  }
  gulp.watch(['emails/**/*.nunjucks', 'emails/**/*.css'], ['build:emails']);
});
