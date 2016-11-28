import gulp from 'gulp';
import audioSprite from 'gulp-audiosprite';

const name = 'audio_sprite';
const files = 'source/**/audio_sprite/*';
const there = 'public/audio';
const production = process.env.NODE_ENV === 'production';
const config = {
  output: 'audio_sprite',
  path: 'audio',
  export: 'mp3',
  format: 'howler',
  log: 'notice',
  channels: 2
};

if (production) {
  config.bitrate = 80;
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(audioSprite(config))
  .pipe(gulp.dest(there))
});

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}

/**TODO проблема с обновлением звукового спрайта. все звуки сдвигаются.
 * возможно проблема в обновлении json файла в скриптах */
