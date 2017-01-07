'use strict';

const gulp = require('gulp');
const size = require('gulp-size');

const name = 'gzip';
const files = 'public/**';

gulp.task(name, function() {
  return gulp.src(files)
  .pipe(size({
    showFiles: true,
    gzip: true
  }))
});
