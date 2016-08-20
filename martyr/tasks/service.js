import gulp from 'gulp';
import changed from 'gulp-changed';
import watch from '../utility/watch';

const
  name = 'service',
  files = 'source/{robots.txt,sitemap.xml}',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(changed(there))
  .pipe(gulp.dest(there))
});

if (!production) {
  watch(name, files);
}
