import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import include from 'gulp-include';
import htmlmin from 'gulp-htmlmin';
import watch from '../utility/watch';

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
 * Собирает разметку
 * Сжимает на продакшн
 */
gulp.task(name, () => {
  return gulp.src(files)
    .pipe(plumber({errorHandler: notify}))
    .pipe(include())
    .pipe(htmlmin(options))
    .pipe(gulp.dest(there));
});

watch(name, wFiles);
