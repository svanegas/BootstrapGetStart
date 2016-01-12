//IMPORT THE REQUIRED LIBS
var gulp        = require('gulp');
var server      = require('gulp-express');
var less        = require('gulp-less');
var path        = require('path');
var runSequence = require('run-sequence');
var wiredep     = require('wiredep').stream;

//DEFINE GLOBAL PATHS
var config = {
  app: 'app',
  dist: 'dist'
};

//Inject the bower.json dependencies in index.html file
gulp.task('wiredep', function () {
  gulp.src( path.join(config.app, '/index.html'))
    .pipe(wiredep(
      //Wiredepp special configuration
    )).pipe(gulp.dest(config.app));
});

gulp.task('less', function () {
  return gulp.src([
    path.join(config.app, '**/*.less'),
    path.join('!' + config.app, '/bower_components/**/*')
  ])
    .pipe(less())
    .pipe(gulp.dest(config.app));
});

var lessAndReload = function(event) {
  runSequence('less', function() {
    server.notify(event);
  });
}

gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], server.notify);
  gulp.watch(['./app/*.js'], server.notify);
  gulp.watch(['./app/*.less'], lessAndReload);
  gulp.watch(['./server/**/*.js'], server.notify);
});

gulp.task('server', function () {
    server.run(['server/app.js']);

});

gulp.task('default', [
  'server',
  'wiredep',
  'watch'
]);
