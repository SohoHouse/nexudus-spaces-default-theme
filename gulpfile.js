var gulp            = require('gulp'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    $               = gulpLoadPlugins(),
    argv            = require('yargs').argv;

gulp.task('build:sass', function () {
    gulp.src('css.sass')
        .pipe($.plumber({
            errorHandler: $.notify.onError("<%= error.message %>")}))
        .pipe($.sass())
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe($.if(argv.m, $.cleanCss()))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build:sass'], function () {
  gulp.watch('**/*.sass', ['build:sass']);
});
