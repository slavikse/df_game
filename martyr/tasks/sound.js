import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import watch from '../utility/watch';

const
  name = 'sound',
  files = 'source/**/sound/*',
  there = 'public/sound',
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(gulp.dest(there))
});

if (!production) {
  watch(name, files);
}
