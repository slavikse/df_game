import gulp from 'gulp';
import rigger from 'gulp-rigger';
import watch from '../utility/watch';

const
  name = 'view',
  files = [
    'source/*.html',
    '!source/_*'
  ],
  wFiles = [
    'source/**/*.html',
    '!source/**/{_*/**,_*,server/**}'
  ],
  there = 'public';

/**
 * Собирает разметку в 1 файл с помощью rigger
 * Syntax: //= path/file.html
 */
export default () => {
  watch(name, wFiles);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(rigger())
      .pipe(gulp.dest(there))
  })
}
