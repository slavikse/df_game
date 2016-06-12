import gulp from 'gulp';
import watch from '../utility/watch';

const
  NAME = 'service_client',
  FILES = ['source/{robots.txt,sitemap.xml,favicon.png}'],
  THERE = 'public';

/**
 * Перемещает сервисные файлы
 */
export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, () => {
    return gulp.src(FILES, {
      since: gulp.lastRun(NAME)
    }).pipe(gulp.dest(THERE))
  })
}
