import gulp from 'gulp';
import lib from '../add_lib';
import watch from '../utility/watch';

const
  name = 'lazy_lib',
  there = 'public/lazy/lib';

/**
 * Собирает библиотеки для ленивой загрузки
 */
export default () => {
  watch(name, lib.lazy);

  gulp.task(name, () => {
    return gulp.src(lib.lazy, {
      since: gulp.lastRun(name)
    }).pipe(gulp.dest(there))
  })
}
