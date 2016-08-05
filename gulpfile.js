var gulp          = require('gulp'),
  gulpLoadPlugins = require('gulp-load-plugins'),
  $               = gulpLoadPlugins(),
  argv            = require('yargs').argv,
  dotenv          = require('dotenv').config(),
  fileDestination     = process.env.FILE_DESTINATION || './dest';

fileSrc = ['js', 'htm', 'json', 'master', 'png', 'jpg', 'jpeg'].map(function (ext) {
  return './**/*.' + ext;
})

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
    
  gulp.src(fileSrc)
    .pipe(gulp.dest(fileDestination))
  console.log('Built Files to ' + fileDestination)
};

var emails = function() {
  return gulp.src('Emails/partials/*.nunjucks')
    .pipe($.plumber({
      errorHandler: $.notify.onError("<%= error.message %>")}))
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

gulp.task('build:scss', scss);
gulp.task('build:files', files);
gulp.task('build:emails', emails);

gulp.task('default', ['build:scss', 'build:files', 'build:emails'], function () {
  gulp.watch('**/*.scss', ['build:scss']);
  gulp.watch(fileSrc, ['build:files']);
  gulp.watch(['Emails/**/*.nunjucks', 'Emails/**/*.css'], ['build:emails']);
});
