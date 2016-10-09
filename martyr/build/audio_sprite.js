import gulp from 'gulp';
import audiosprite from 'gulp-audiosprite';
import ffmpeg from 'gulp-fluent-ffmpeg';
import util from 'gulp-util';

const
  name = 'audio_sprite',
  files = 'source/**/audio_sprite/*',
  there = 'public/audio',
  configSprite = {
    path: 'audio',
    output: 'audio_sprite',
    'export': 'mp3',
    channels: 2,
    log: 'notice'
  },
  configFluent = cmd => {
    return cmd
    .audioBitrate('96')
    .audioFrequency('32000')
    .audioCodec('libmp3lame')
  },
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(audiosprite(configSprite))
  .pipe(production ? ffmpeg('mp3', configFluent) : util.noop())
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
