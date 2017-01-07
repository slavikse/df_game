'use strict';

import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import ffmpeg from 'gulp-fluent-ffmpeg';
import util from 'gulp-util';

const name = 'audio';
const files = 'source/**/audio/*';
const there = 'public/audio';
const production = process.env.NODE_ENV === 'production';

function config(audio) {
  return audio.audioBitrate(80);
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(production ? ffmpeg('mp3', config) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
