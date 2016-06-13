import gulp from 'gulp';
import rename from 'gulp-rename';
import watch from '../utility/watch';

const
  name = 'image',
  files = [
    'source/**/image/*',
    '!source/**/{_*/**,_*}'
  ],
  there = 'public/image';

/**
 * Перемещает картинки
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
