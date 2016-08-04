import gulp from 'gulp';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import util from 'gulp-util';
import watch from '../utility/watch';

const
  name = 'image',
  files = 'source/**/image/*',
  there = 'public/image',
  production = process.env.NODE_ENV === 'production';

/**
 * Перемещает изображения
 * Сжимает на продакшн
 */
gulp.task(name, () => {
  return gulp.src(files, {since: gulp.lastRun(name)})
  .pipe(rename({dirname: ''}))
  .pipe(production ? imagemin({progressive: true}) : util.noop())
  .pipe(gulp.dest(there));
});

watch(name, files);
