import gulp from 'gulp';
import rename from 'gulp-rename';
import watch from '../utility/watch';

const
  NAME = 'image',
  FILES = [
    'source/**/image/*',
    '!source/**/{_*/**,_*,server/**}'
  ],
  THERE = 'public/image';

/**
 * Перемещает картинки
 */
export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, () => {
    return gulp.src(FILES, {
      since: gulp.lastRun(NAME)
    }).pipe(rename({dirname: ''}))
      .pipe(gulp.dest(THERE))
  })
}
