import gulp from 'gulp';
import size from 'gulp-size';

const
  name = 'size',
  files = 'public/**';

/**
 * В консоле показывает размер гзип файлов
 */
export default () => {
  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(size({
        showFiles: true,
        gzip: true
      }))
  })
}
