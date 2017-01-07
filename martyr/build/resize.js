'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import responsive from 'gulp-responsive';

const name = 'resize';
const files = 'source/**/resize/*';
const there = 'public/image';
const production = process.env.NODE_ENV === 'production';
const config = {
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
const param = {
  stats: false,
  silent: true,
  errorOnEnlargement: false,
  errorOnUnusedConfig: false,
  withoutEnlargement: false
};

if (production) {
  param.progressive = true;
} else { // dev
  param.quality = 100;
  param.compressionLevel = 0;
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(responsive(config, param))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
