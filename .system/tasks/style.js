import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import media from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  name = 'style',
  files = ['source/*.css'],
  there = 'public';

/**
 * Собираем стили с postcss
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(sourcemaps.init()) // только для dev
      .pipe(postcss([
        atImport,
        nested,
        media,
        autoprefixer({ // только prod
          browsers: ['last 20 versions']
        })
      ]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(there))
  })
}

/* Syntax:
 * @media (500px <= width <= 1200px)
 * nested: a & b
 * */

/*TODO
  gulp-csso
*/