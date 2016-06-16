import gulp from 'gulp';
import watch from '../utility/watch';
import util from 'gulp-util';
import imagemin from 'gulp-imagemin';

const
  production = process.env.NODE_ENV === 'production',
  name = 'service',
  files = ['source/{robots.txt,sitemap.xml,favicon.png}'],
  there = 'public';

/**
 * Перемещает сервисные файлы
 * Сжимает иконку на продакшн
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files, {
      since: gulp.lastRun(name)
    }).pipe(production ? imagemin({progressive: true}) : util.noop()) // favicon
      .pipe(gulp.dest(there))
  })
}
