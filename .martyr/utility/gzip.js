import gulp from 'gulp';
import size from 'gulp-size';

const
  name = 'gzip',
  files = 'public/**';

/**
 * В консоле показывает размер gzip всех файлов
 */
gulp.task(name, () => {
  return gulp.src(files)
    .pipe(size({
      showFiles: true,
      gzip: true
    }));
});
