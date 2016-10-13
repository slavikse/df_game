import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import responsive from 'gulp-responsive';
import util from 'gulp-util';

const
  name = 'image',
  files = 'source/**/image/*',
  there = 'public/image',
  production = process.env.NODE_ENV === 'production',
  config = {'*': {width: '100%'}},
  param = {
    quality: 80,
    progressive: true,
    compressionLevel: 6,
    stats: false,
    silent: true,
    errorOnEnlargement: false,
    errorOnUnusedConfig: false,
    withoutEnlargement: false
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