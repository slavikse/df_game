import gulp from 'gulp';
import audioSprite from 'gulp-audiosprite';
import fs from 'fs';
import notify from 'gulp-notify';

const name = 'audio_sprite';
const files = 'source/**/audio_sprite/*';
const there = 'public/audio';
const spriteJsonPath = 'public/audio/audio_sprite.json';
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

// укорачивает длительность звуков до 2х знаков после запятой
function shortenValues() {
  const spriteFile = fs.readFileSync(spriteJsonPath);
  const json = JSON.parse(spriteFile); // со всем информацией
  const sprite = json.sprite; // только информация о звуках
  const spriteKeys = Object.keys(sprite);

  spriteKeys.forEach(key => {
    // [ 2000, 235.10 ] = [ 2000, 235.10204081632668 ]
    //         ^^^^^^             ^^^^^^^^^^^^^^^^^^
    sprite[key][1] = +sprite[key][1].toFixed(2);
  });

  json.sprite = sprite;
  fs.writeFileSync(spriteJsonPath, JSON.stringify(json));
}

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(audioSprite(config))
  .pipe(gulp.dest(there))
  .on('end', shortenValues)
  .pipe(notify(`restart: ${name}`))
});

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}

/**TODO
 * 1. Обновление звукового спрайта. Все звуки сдвигаются.
 * возможно проблема в обновлении json файла в скриптах */
