var gulp          = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $               = gulpLoadPlugins(),
  argv            = require('yargs').argv;

gulp.task('build:scss', function () {
  var dest = argv.out || './';
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
});

gulp.task('build:files', function () {
  var dest = argv.out || './';
  gulp.src('files/**/*')
    .pipe(gulp.dest(dest))
  console.log('Built Files to ' + dest)
})

gulp.task('default', ['build:scss', 'build:files'], function () {
  gulp.watch('**/*.scss', ['build:scss']);
  gulp.watch('files/**/*', ['build:files']);
});
