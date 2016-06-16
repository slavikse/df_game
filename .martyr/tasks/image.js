import gulp from 'gulp';
import watch from '../utility/watch';
import rename from 'gulp-rename';
import util from 'gulp-util';
import imagemin from 'gulp-imagemin';
import size from 'gulp-size';

const
  production = process.env.NODE_ENV === 'production',
  name = 'image',
  files = ['source/**/image/*'],
  there = 'public/image';

/**
 * Перемещает картинки
 * Сжимает на продакшн
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files, {
      since: gulp.lastRun(name)
    }).pipe(rename({dirname: ''}))
      .pipe(production ? imagemin({progressive: true}) : util.noop())
      .pipe(gulp.dest(there))
      .pipe(production ? size({title: name, gzip: true}) : util.noop())
  })
}
