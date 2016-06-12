import gulp from 'gulp';
import lib from '../add_lib';
import watch from '../utility/watch';

const
  NAME = 'lazy_lib',
  THERE = 'public/lazy/lib';

/**
 * Собирает библиотеки для ленивой загрузки
 */
export default () => {
  watch(NAME, lib.lazy);

  gulp.task(NAME, () => {
    return gulp.src(lib.lazy, {
      since: gulp.lastRun(NAME)
    })
      .pipe(gulp.dest(THERE))
  })
}
