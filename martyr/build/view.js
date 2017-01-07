'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const error = require('./../utility/error');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const htmlmin = require('gulp-htmlmin');
const util = require('gulp-util');

const name = 'view';
const files = 'source/*.html';
const wFiles = 'source/**/*.html';
const there = 'public';
const production = process.env.NODE_ENV === 'production';
const plugins = [include({root: 'source'})];
const options = {
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true, // spaces collapsing between display:inline
  collapseWhitespace: true, // убирает пробел между inline элементами
  minifyCSS: true,
  minifyJS: true,
  removeAttributeQuotes: true,
  removeComments: true,
  removeEmptyAttributes: true,
  preventAttributesEscaping: true,
  removeRedundantAttributes: true, // remove default attr
  sortAttributes: true,
  sortClassName: true
};

gulp.task(name, function() {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(posthtml(plugins))
  .pipe(production ? htmlmin(options) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.series(name));
}
