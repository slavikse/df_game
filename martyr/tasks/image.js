import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import util from 'gulp-util';
import responsive from 'gulp-responsive';
import watch from '../utility/watch';

const
  name = 'image',
  files = 'source/**/image/*',
  there = 'public/image',
  production = process.env.NODE_ENV === 'production',
  config = {
    '*': [{
      width: '100%'
    }]
  },
  params = {
    quality: 80,
    progressive: true,
    compressionLevel: 6,
    stats: false,
    silent: true,
    errorOnEnlargement: false,
    errorOnUnusedConfig: false
  };

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(production ? responsive(config, params) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  watch(name, files);
}
