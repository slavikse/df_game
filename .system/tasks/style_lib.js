import gulp from 'gulp';
import concat from 'gulp-concat';
import lib from '../add_lib';
import watch from '../utility/watch';

const
  NAME = 'style_lib',
  THERE = 'public';

/**
 * Собирает библиотеки для стилей
 */
export default () => {
  watch(NAME, lib.style);

  gulp.task(NAME, () => {
    return gulp.src(lib.style)
      .pipe(concat('lib.css'))
      .pipe(gulp.dest(THERE))
  })
}
