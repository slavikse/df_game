import gulp from 'gulp';
import watch from '../utility/watch';

const
  name = 'service',
  files = 'source/{robots.txt,sitemap.xml}',
  there = 'public';

/**
 * Перемещает сервисные файлы
 */
gulp.task(name, () => {
  return gulp.src(files, {since: gulp.lastRun(name)})
    .pipe(gulp.dest(there));
});

watch(name, files);
