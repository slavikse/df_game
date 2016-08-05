import gulp from 'gulp';
import watch from '../utility/watch';

const
  name = 'service',
  files = 'source/{robots.txt,sitemap.xml}',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

/**
 * Перемещает сервисные файлы
 */
gulp.task(name, () => {
  return gulp.src(files, {since: gulp.lastRun(name)})
  .pipe(gulp.dest(there));
});

if (!production) {
  watch(name, files);
}
