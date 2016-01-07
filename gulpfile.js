//IMPORT THE REQUIRED LIBS
var gulp = require('gulp');
var path = require('path');
var server = require('gulp-express');

//DEFINE GLOBAL PATHS
 
gulp.task('watch', function () {
  gulp.watch(['./app/*.html'], server.notify);
  gulp.watch(['./app/*.js'], server.notify);
  gulp.watch(['./app/*.css'], server.notify);
  gulp.watch(['./server/**/*.js'], server.notify);
});

gulp.task('server', function () {
    server.run(['server/app.js']);
 
});

gulp.task('default', [
  'server',
  'watch'
]);

