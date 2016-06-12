import gulp from 'gulp';
import concat from 'gulp-concat';
import lib from '../add_lib';
import watch from '../utility/watch';

const
  name = 'script_lib',
  there = 'public';

/**
 * Собирает библиотеки для скриптов
 */
export default () => {
  watch(name, lib.script);

  gulp.task(name, () => {
    return gulp.src(lib.script)
      .pipe(concat('lib.js'))
      .pipe(gulp.dest(there))
  })
}
