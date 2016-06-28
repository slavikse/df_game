import gulp from 'gulp';
import watch from '../utility/watch';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import util from 'gulp-util';

const
  name = 'image',
  files = 'source/**/image/*',
  there = 'public/image',
  production = process.env.NODE_ENV === 'production';

/**
 * Перемещает картинки
 * Сжимает на продакшн
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files, {since: gulp.lastRun(name)})
      .pipe(rename({dirname: ''}))
      .pipe(production ? imagemin({progressive: true}) : util.noop())
      .pipe(gulp.dest(there))
  })
}
