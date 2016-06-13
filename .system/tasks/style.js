import gulp from 'gulp';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import media from 'postcss-media-minmax';
import nesting from 'postcss-nesting';
import concat from 'gulp-concat';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  name = 'style',
  files = [
    'source/main.css',
    'source/**/*.css',
    '!source/**/{lib/**,lazy/**,_*/**,_*}'
  ],
  there = 'public';

/**
 * Собираем стили
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(postcss([
        media,
        nesting
      ]))
      .pipe(concat('main.css'))
      .pipe(gulp.dest(there))
  })
}

/* Syntax:
 * @media (500px <= width <= 1200px)
 * nesting: a & b
 * */

/*TODO
 var autoprefixer = require('autoprefixer');
 var cssnano = require('cssnano');
 */
