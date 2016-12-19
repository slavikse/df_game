import gulp from 'gulp';
import plumber from 'gulp-plumber';
import error from './../utility/error';
import postcss from 'gulp-postcss';
import cached from 'postcss-cached';
import atImport from 'postcss-import';
import nested from 'postcss-nested';
import media from 'postcss-media-minmax';
import willChange from 'postcss-will-change'; // fallback
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import flexbugs from 'postcss-flexbugs-fixes';

const name = 'style';
const files = 'source/*.css';
const wFiles = '{source,temp}/**/*.css';
const there = 'public';
const production = process.env.NODE_ENV === 'production';
const options = [
  cached,
  atImport,
  nested,
  media
];
const browsers = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

if (production) {
  options.push(
    willChange,
    autoprefixer({browsers: browsers}),
    csso,
    flexbugs
  )
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: error}))
  .pipe(postcss(options))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(wFiles, gulp.parallel(name));
}
