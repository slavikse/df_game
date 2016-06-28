import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rigger from 'gulp-rigger';
import htmlmin from 'gulp-htmlmin';

const
  name = 'view',
  files = 'source/*.html',
  wFiles = 'source/**/*.html',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

let options = {};
if (production) {
  options = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    preventAttributesEscaping: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true, // remove default attr
    removeEmptyAttributes: true,
    sortAttributes: true,
    sortClassName: true
  }
}

/**
 * Собирает разметку c rigger
 * Сжимает на продакшн
 */
export default () => {
  watch(name, wFiles);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(rigger())
      .pipe(htmlmin(options))
      .pipe(gulp.dest(there))
  })
}
