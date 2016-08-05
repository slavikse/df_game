import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import stylus from 'gulp-stylus';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import util from 'gulp-util';
import watch from '../utility/watch';

const
  name = 'style',
  files = ['source/*.styl', '!source/_*.styl'],
  wFiles = 'source/**/*.styl',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

/**
 * Собирает стили
 * Префиксит и сжимает на продакшн
 */
gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(stylus())
  .pipe(production ? (
    autoprefixer(),
    csso()
  ) : util.noop())
  .pipe(gulp.dest(there));
});

if (!production) {
  watch(name, wFiles);
}
