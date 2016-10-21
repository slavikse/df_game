import gulp from 'gulp';
import changed from 'gulp-changed';
import fontmin from 'gulp-fontmin';
import util from 'gulp-util';

const
  name = 'font',
  files = 'source/font/*',
  there = 'public/font',
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(changed(there))
  .pipe(production ? fontmin() : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}
