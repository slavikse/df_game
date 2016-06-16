import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import media from 'postcss-media-minmax';
import csso from 'gulp-csso';
import autoprefixer from 'gulp-autoprefixer';
import size from 'gulp-size';

const
  production = process.env.NODE_ENV === 'production',
  name = 'style',
  files = ['source/*.css'],
  there = 'public';

/**
 * Собираем стили с postcss
 * Сжимает на продакшн
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(production ? util.noop() : sourcemaps.init())
      .pipe(postcss([
        atImport,
        nested,
        media
      ]))
      .pipe(production ? autoprefixer({
        browsers: ['last 20 versions']
      }) : util.noop())
      .pipe(production ? csso() : sourcemaps.write())
      .pipe(gulp.dest(there))
      .pipe(production ? size({
        title: name,
        gzip: true
      }) : util.noop())
  })
}
