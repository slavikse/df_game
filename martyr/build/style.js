import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import postcss from 'gulp-postcss';
import cached from 'postcss-cached';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import media from 'postcss-media-minmax';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import flexFixed from 'postcss-flexbugs-fixes';

const
  name = 'style',
  files = [
    'source/*.css',
    '!source/_*.css'
  ],
  wFiles = '{source,temp}/**/*.css', // temp -> стили для png sprite
  there = 'public',
  production = process.env.NODE_ENV === 'production';

let options = [
  cached,
  atImport,
  nested,
  media
];

if (production) {
  options.push(
    autoprefixer,
    csso,
    flexFixed // fixed IE10 bugs
  )
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(postcss(options))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.parallel(name));
}
