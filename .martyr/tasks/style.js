import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import media from 'postcss-media-minmax';
import flexbugs from 'postcss-flexbugs-fixes';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import watch from '../utility/watch';

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
    flexbugs,
    autoprefixer({browsers: ['last 40 versions']}),
    csso
  )
}

/**
 * Собирает стили
 * Префиксит и сжимает на продакшн
 */
gulp.task(name, () => {
  return gulp.src(files)
    .pipe(plumber({errorHandler: notify}))
    .pipe(postcss(options))
    .pipe(gulp.dest(there));
});

watch(name, wFiles);
