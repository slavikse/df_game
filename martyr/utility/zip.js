import gulp from 'gulp';
import zip from 'gulp-zip';

const name = 'zip';
const sourceFolder = 'source/**';
const publicFolder = 'public/**';
const there = 'zip';
const time = new Date().toLocaleString('ru');

gulp.task(name, () => {
  gulp.src(sourceFolder)
  .pipe(zip(`source_${time}.zip`))
  .pipe(gulp.dest(there));

  return gulp.src(publicFolder)
  .pipe(zip(`public_${time}.zip`))
  .pipe(gulp.dest(there));
});
