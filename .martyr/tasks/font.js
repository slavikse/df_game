import gulp from 'gulp';
import rename from 'gulp-rename';
import fontmin from 'gulp-fontmin';
import util from 'gulp-util';
import watch from '../utility/watch';

const
  name = 'font',
  files = 'source/**/font/*',
  there = 'public/font',
  production = process.env.NODE_ENV === 'production';

/**
 * Перемещает все шрифты
 * Сжимает на продакшн
 */
gulp.task(name, () => {
  return gulp.src(files, {since: gulp.lastRun(name)})
    .pipe(rename({dirname: ''}))
    .pipe(production ? fontmin() : util.noop())
    .pipe(gulp.dest(there));
});

watch(name, files);
