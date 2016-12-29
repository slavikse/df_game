import gulp from 'gulp';
import zip from 'gulp-zip';

const name = 'zip';
const sourceFolder = 'source/**';
const publicFolder = 'public/**';
const there = 'zip';
const time = new Date().toLocaleString('ru');

gulp.task(name, () => {
  gulp.src(sourceFolder)
  .pipe(zip(`${time}_source.zip`))
  .pipe(gulp.dest(there));

  return gulp.src(publicFolder)
  .pipe(zip(`${time}_public.zip`))
  .pipe(gulp.dest(there));
});
