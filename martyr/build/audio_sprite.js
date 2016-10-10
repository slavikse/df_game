import gulp from 'gulp';
import audioSprite from 'gulp-audiosprite';

const
  name = 'audio_sprite',
  files = 'source/**/audio_sprite/*',
  there = 'public/audio',
  production = process.env.NODE_ENV === 'production';

let config = {
  output: 'audio_sprite',
  path: 'audio',
  export: 'mp3',
  format: 'howler',
  log: 'notice',
  gap: 0,
  channels: 2
};

if (production) {
  config.bitrate = 80;
  config.samplerate = 32000;
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(audioSprite(config))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
