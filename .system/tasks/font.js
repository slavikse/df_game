import gulp from 'gulp';
import rename from 'gulp-rename';
import watch from '../utility/watch';

const
  NAME = 'font',
  FILES = [
    'source/**/font/*',
    '!source/**/{_*/**,_*}'
  ],
  THERE = 'public/font';

/**
 * Перемещает все шрифты
 */
export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, () => {
    return gulp.src(FILES, {
      since: gulp.lastRun(NAME)
    })
      .pipe(rename({dirname: ''}))
      .pipe(gulp.dest(THERE))
  })
}
