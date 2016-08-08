var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    cleanCSS = require('gulp-clean-css'),
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
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css'))

        .pipe(connect.reload());
});

//js
gulp.task('javascript', function () {
    gulp.src(['private/js/vendors/md5.js', 'private/js/vendors/angular-1-12-16.min.js', 'private/js/vendors/angularRoute-1-2-1.min.js', 'private/js/app.js', 'private/js/service/factory.js', 'private/js/controller/home.js', 'private/js/controller/single.js'])
        .pipe($.plumber())
        .pipe($.concat('app.min.js'))
        .pipe($.uglify({
          mangle : false
        }))
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

//une fois déployé
gulp.task('default', ['connect', 'html', 'sass', 'javascript']);
