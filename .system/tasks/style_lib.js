import gulp from 'gulp';
import concat from 'gulp-concat';
import lib from '../add_lib';
import watch from '../utility/watch';

const
  name = 'style_lib',
  there = 'public';

/**
 * Собирает библиотеки для стилей
 */
export default () => {
  watch(name, lib.style);

  gulp.task(name, () => {
    return gulp.src(lib.style)
      .pipe(concat('lib.css'))
      .pipe(gulp.dest(there))
  })
}
