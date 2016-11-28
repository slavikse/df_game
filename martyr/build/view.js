import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import util from 'gulp-util';

const name = 'view';
const files = 'source/*.html';
const wFiles = 'source/**/*.html';
const there = 'public';
const production = process.env.NODE_ENV === 'production';
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
  .pipe(plumber({errorHandler: notify.onError(name)}))
  .pipe(include({prefix: '@'}))
  .pipe(production ? htmlmin(options) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.parallel(name));
}
