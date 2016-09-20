import gulp from 'gulp';
import zip from 'gulp-zip';

const
  name = 'zip',
  folder = 'public/**',
  there = 'zip',
  time = new Date().toLocaleString('ru');

gulp.task(name, () => {
  return gulp.src(folder)
  .pipe(zip(`${time}.zip`))
  .pipe(gulp.dest(there))
});
