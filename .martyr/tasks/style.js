import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import media from 'postcss-media-minmax';
import csso from 'postcss-csso';
import autoprefixer from 'autoprefixer';

const
  name = 'style',
  files = 'source/*.css',
  wFiles = 'source/**/*.css',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

let options = [
  atImport,
  nested,
  media
];

if (production) {
  options.push(
    autoprefixer({browsers: ['last 40 versions']}),
    csso
  )
}

/**
 * Собирает стили с postcss
 * Префиксит и сжимает на продакшн
 */
export default () => {
  watch(name, wFiles);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(postcss(options))
      .pipe(gulp.dest(there))
  })
}
