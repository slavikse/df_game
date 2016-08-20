import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import responsive from 'gulp-responsive';
import watch from '../utility/watch';

const
  name = 'resize',
  files = ['source/**/resize/*'],
  there = 'public/image',
  production = process.env.NODE_ENV === 'production',
  config = {
    '*': [{
      width: '100%'
    }, {
      width: '70%',
      rename: {
        suffix: '_tablet'
      }
    }, {
      width: '40%',
      rename: {
        suffix: '_mobile'
      }
    }]
  };

let params = {
  quality: 100,
  progressive: false,
  compressionLevel: 0,
  stats: false,
  silent: true,
  errorOnEnlargement: false,
  errorOnUnusedConfig: false
};

if (production) {
  params.quality = 80;
  params.progressive = true;
  params.compressionLevel = 6;
}

/**
 * Создает из оригинала 2 изображения меньших размеров
 */
gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(responsive(config, params))
  .pipe(gulp.dest(there))
});

if (!production) {
  watch(name, files);
}
