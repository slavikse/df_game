'use strict';

const gulp = require('gulp');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const ffmpeg = require('gulp-fluent-ffmpeg');
const util = require('gulp-util');

const name = 'audio';
const files = 'source/**/audio/*';
const there = 'public/audio';
const production = process.env.NODE_ENV === 'production';

function config(audio) {
  return audio.audioBitrate(80);
}

gulp.task(name, function() {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(changed(there))
  .pipe(production ? ffmpeg('mp3', config) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
