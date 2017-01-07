'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import error from './../utility/error';
import posthtml from 'gulp-posthtml';
import include from 'posthtml-include';
import htmlmin from 'gulp-htmlmin';
import util from 'gulp-util';

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

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(posthtml(plugins))
  .pipe(production ? htmlmin(options) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.series(name));
}
