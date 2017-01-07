'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';

const name = 'service';
const files = [
  'source/{robots.txt,sitemap.xml}',
  'CNAME' // github deploy
];
const there = 'public';
const production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(changed(there))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
