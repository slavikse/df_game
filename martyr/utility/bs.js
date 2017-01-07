'use strict';

const gulp = require('gulp');
const bs = require('browser-sync');

const name = 'bs';
const folder = 'public';
const tunnel = process.env.NODE_ENV === 'tunnel';

bs.create();

gulp.task(name, function(cb) {
  bs.init({
    server: folder,
    tunnel: tunnel,
    ui: false
  });

  if (!tunnel) {
    bs.watch(folder)
    .on('change', bs.reload);
  }

  cb();
});
