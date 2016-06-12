import gulp from 'gulp';
import concat from 'gulp-concat';
import lib from '../add_lib';
import watch from '../utility/watch';

const
  NAME = 'script_lib',
  THERE = 'public';

/**
 * Собирает библиотеки для скриптов
 */
export default () => {
  watch(NAME, lib.script);

  gulp.task(NAME, () => {
    return gulp.src(lib.script)
      .pipe(concat('lib.js'))
      .pipe(gulp.dest(THERE))
  })
}
