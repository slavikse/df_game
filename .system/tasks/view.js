import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rigger from 'gulp-rigger';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  name = 'view',
  files = [
    'source/*.html',
    '!source/_*'
  ],
  wFiles = [
    'source/**/*.html',
    '!source/**/{_*/**,_*}'
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
      .pipe(plumber({errorHandler: notify}))
      .pipe(rigger())
      .pipe(gulp.dest(there))
  })
}
