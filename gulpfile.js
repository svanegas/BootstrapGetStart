//IMPORT THE REQUIRED LIBS
var gulp        = require('gulp');
var server      = require('gulp-express');
var less        = require('gulp-less');
var inject      = require('gulp-inject');
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
  gulp.src(path.join(config.app, '/index.html'))
    .pipe(wiredep())
    .pipe(gulp.dest(config.app));
});

var injectCustom = function() {
  var sources = gulp.src([
    path.join('!' + config.app, '/bower_components/**/*'),
    path.join(config.app, '/**/*.js')
  ], { read: false });
  return inject(sources, { relative: true });
};
/*
 * Injects both vendor and customs scripts and styles into the index.html file.
 * Leaves the output file in the '.tmp' folder.
 */
gulp.task('inject', ['less'], function () {
  return gulp.src(path.join(config.app, '/index.html'))
    .pipe(injectCustom())
    .pipe(gulp.dest(path.join(config.app)));
});

gulp.task('less', function () {
  return gulp.src([
    path.join(config.app, 'styles/less/**/*.less'),
    path.join('!' + config.app, '/bower_components/**/*')
  ])
    .pipe(less())
    .pipe(gulp.dest(path.join(config.app, '/styles/css')));
});

var lessAndReload = function(event) {
  runSequence('less', function() {
    server.notify(event);
  });
};

gulp.task('watch', function () {
  gulp.watch(['./app/**/*.html'], server.notify);
  gulp.watch(['./app/scripts/**/*.js'], server.notify);
  gulp.watch(['./app/styles/**/*.less'], lessAndReload);
  gulp.watch(['./server/**/*.js'], server.notify);
});

gulp.task('server', function () {
  server.run(['server/app.js']);

});

gulp.task('default', [
  'inject',
  'server',
  'wiredep',
  'watch'
]);
