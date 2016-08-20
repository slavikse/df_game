import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import watch from '../utility/watch';

/**
 * 1. Spaces collapsing between display:inline
 * 2. Use direct Unicode characters whenever possible
 * 3. На случай если будут инлайн стили или скрипты
 * 4. Remove default attr
 */
const
  name = 'view',
  files = 'source/*.html',
  wFiles = 'source/**/*.html',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

let options = {};

if (production) {
  options = {
    collapseBooleanAttributes: true,
    collapseInlineTagWhitespace: true, /* 1 */
    collapseWhitespace: true,
    decodeEntities: true, /* 2 */
    minifyCSS: true, /* 3 */
    minifyJS: true, /* 3 */
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    preventAttributesEscaping: true,
    removeRedundantAttributes: true, /* 4 */
    sortAttributes: true,
    sortClassName: true
  }
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(include({prefix: '@'}))
  .pipe(htmlmin(options))
  .pipe(gulp.dest(there))
});

if (!production) {
  watch(name, wFiles);
}
