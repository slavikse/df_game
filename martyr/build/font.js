import gulp from 'gulp';
import changed from 'gulp-changed';

const name = 'font';
const files = 'source/helper/font/*';
const there = 'public/font';
const production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(changed(there))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
