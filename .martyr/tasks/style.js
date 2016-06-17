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
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';
import size from 'gulp-size';

const
  name = 'style',
  files = ['source/*.css'],
  there = 'public',
  production = process.env.NODE_ENV === 'production';

let options = [
  atImport,
  nested,
  media
];

if (production) {
  options.push(
    autoprefixer({
      browsers: ['last 40 versions']
    }),
    csso
  )
}

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
      .pipe(postcss(options))
      .pipe(production ? util.noop() : sourcemaps.write())
      .pipe(gulp.dest(there))
      .pipe(production ? size({title: name, gzip: true}) : util.noop())
  })
}
