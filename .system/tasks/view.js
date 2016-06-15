import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rigger from 'gulp-rigger';
import util from 'gulp-util';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';

const
  production = process.env.NODE_ENV === 'production',
  name = 'view',
  files = [
    'source/*.html',
    '!source/_*'
  ],
  wFiles = [
    'source/**/*.html',
    '!source/**/{_*/**,_*}'
  ],
  there = 'public';

/**
 * Собирает разметку в 1 файл с помощью rigger
 * Syntax: //= path/file.html
 * Сжимает на продакшн
 */
export default () => {
  watch(name, wFiles);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(rigger())
      .pipe(production ? htmlmin({
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        preventAttributesEscaping: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true, // remove default attr
        removeEmptyAttributes: true,
        sortAttributes: true,
        sortClassName: true
      }) : util.noop())
      .pipe(gulp.dest(there))
      .pipe(production ? size({
        title: name,
        gzip: true
      }) : util.noop())
  })
}
