var gulp          = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $               = gulpLoadPlugins(),
  argv            = require('yargs').argv;

gulp.task('build:scss', function () {
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
    .pipe($.if(argv.m, $.cleanCss()))
    .pipe(gulp.dest('/Users/sam.garson/Dropbox/Apps/Nexudus\ Spaces/Nexudus\ Spaces/Soho Works\ -\ Shoreditch'));
});

gulp.task('default', ['build:scss'], function () {
  gulp.watch('**/*.scss', ['build:scss']);
});
