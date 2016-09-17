import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import util from 'gulp-util';
import watch from '../utility/watch';

/**
 * 1. Spaces collapsing between display:inline
 * 2. Remove default attr
 */
const
  name = 'view',
  files = 'source/*.html',
  wFiles = 'source/**/*.html',
  there = 'public',
  production = process.env.NODE_ENV === 'production',
  options = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true, /* 1 */
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    preventAttributesEscaping: true,
    removeRedundantAttributes: true, /* 2 */
    sortAttributes: true,
    sortClassName: true
  };

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(include({prefix: '@'}))
  .pipe(production ? htmlmin(options) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  watch(name, wFiles);
}
