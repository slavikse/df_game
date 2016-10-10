import gulp from 'gulp';
import rename from 'gulp-rename';
import changed from 'gulp-changed';
import ffmpeg from 'gulp-fluent-ffmpeg';
import util from 'gulp-util';

const
  name = 'audio',
  files = 'source/**/audio/*',
  there = 'public/audio',
  config = audio => {
    return audio
    .audioCodec('libmp3lame')
    .audioChannels(2)
    .audioBitrate(80)
    .audioFrequency(32000)
  },
  production = process.env.NODE_ENV === 'production';

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
