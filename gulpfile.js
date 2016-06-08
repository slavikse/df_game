'use strict';

const gulp = require('gulp');

gulp.task('hello', (cb) => {
  console.log('Hello');

  cb();
});
