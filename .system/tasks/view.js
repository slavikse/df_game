import gulp from 'gulp';
import rigger from 'gulp-rigger';
import watch from '../utility/watch';

const
  NAME = 'view',
  FILES = [
    'source/*.html',
    '!source/_*'
  ],
  WATCH = [
    'source/**/*.html',
    '!source/**/{_*/**,_*}'
  ],
  THERE = 'public';

/**
 * Собирает разметку в 1 файл с помощью rigger
 * Syntax: //= path/file.html
 */
export default () => {
  watch(NAME, WATCH);

  gulp.task(NAME, () => {
    return gulp.src(FILES)
      .pipe(rigger())
      .pipe(gulp.dest(THERE))
  })
}
