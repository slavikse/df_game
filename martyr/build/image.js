import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import responsive from 'gulp-responsive';
import util from 'gulp-util';

const name = 'image';
const files = 'source/**/image/*';
const there = 'public/image';
const production = process.env.NODE_ENV === 'production';
const config = {'*': {width: '100%'}};
const param = {
  stats: false,
  silent: true,
  errorOnEnlargement: false,
  errorOnUnusedConfig: false,
  withoutEnlargement: false,
  progressive: true
};

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(production ? responsive(config, param) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}

// configWebp = {
//   '*': [{
//     width: '100%'
//   }, {
//     width: '200%'
//   }, {
//     width: '100%',
//     rename: {
//       extname: '.webp'
//     }
//   }]
// };
