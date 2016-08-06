var project = {
  title : "Marvel SH",
  version : "1.0.0",
  description : "Test for VP"
};

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    connect = require('gulp-connect');

//html
gulp.task('html', function () {
    gulp.src('./**/*.html')
        .pipe(connect.reload());
});

//style
gulp.task('sass', function () {
    gulp.src('private/sass/**/*.scss')
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError))

        .pipe($.csscomb('private/sass/.csscomb.json'))

        .pipe(gulp.dest('public/css'))

        .pipe(connect.reload());
});

//js
gulp.task('javascript', function () {
    gulp.src('private/js/**/*.js')
        .pipe($.plumber())
        .pipe($.uglify())

        .pipe(gulp.dest('public/js/'))

        .pipe(connect.reload());
});


//connect & watch
gulp.task('connect', function() {
  connect.server({
    root: './',
    port: 9740,
    livereload: true
  });
});

gulp.task('watch', function () {
  gulp.watch(['./**/*.html'], ['html']);
  gulp.watch(['private/**/*.js'], ['javascript']);
  gulp.watch(['private/**/*.scss'], ['sass']);
});


//tâche par défaut
gulp.task('default', ['connect', 'html', 'sass', 'javascript', 'watch']);
