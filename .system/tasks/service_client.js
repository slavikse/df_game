import gulp from 'gulp';
import watch from '../utility/watch';

const
  name = 'service_client',
  files = ['source/{robots.txt,sitemap.xml,favicon.png}'],
  there = 'public';

/**
 * Перемещает сервисные файлы
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files, {
      since: gulp.lastRun(name)
    }).pipe(gulp.dest(there))
  })
}
