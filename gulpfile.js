//IMPORT THE REQUIRED LIBS
var gulp = require('gulp');
var path = require('path');
var server = require('gulp-express');
var wiredep = require('wiredep').stream;

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
  'wiredep',
  'watch'
]);

