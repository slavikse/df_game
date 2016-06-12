import gulp from 'gulp';
import rename from 'gulp-rename';
import watch from '../utility/watch';

const
  name = 'font',
  files = [
    'source/**/font/*',
    '!source/**/{_*/**,_*,server/**}'
  ],
  there = 'public/font';

/**
 * Перемещает все шрифты
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files, {
      since: gulp.lastRun(name)
    }).pipe(rename({dirname: ''}))
      .pipe(gulp.dest(there))
  })
}
