import gulp from 'gulp';
import audiosprite from 'gulp-audiosprite';

const
  name = 'audio_sprite',
  files = 'source/**/audio_sprite/*',
  there = 'temp/audio',
  config = {
    path: 'audio',
    output: 'audio_sprite',
    'export': 'mp3',
    channels: 2,
    log: 'notice'
  },
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(audiosprite(config))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
