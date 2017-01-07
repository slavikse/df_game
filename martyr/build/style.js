'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const error = require('./../utility/error');
const postcss = require('gulp-postcss');
const atImport = require('postcss-import');
const willChange = require('postcss-will-change'); // fallback will-change
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const flexbugs = require('postcss-flexbugs-fixes');

const name = 'style';
const files = 'source/*.css';
const wFiles = '{source,temp}/**/*.css'; // temp: стили для спрайта
const there = 'public';
const production = process.env.NODE_ENV === 'production';
const options = [atImport({path: ['source']})];
const browsers = [
  'ie >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4'
];

if (production) {
  options.push(
    willChange,
    autoprefixer({browsers: browsers}),
    csso,
    flexbugs
  )
}

gulp.task(name, function() {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(postcss(options))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.series(name));
}
