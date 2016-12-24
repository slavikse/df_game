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

gulp.task(name, cb => {
  return gulp.src(files)
  .pipe(audioSprite(config))
  .pipe(gulp.dest(there))
  .on('end', shortenPrepare.bind(null, cb))
  .pipe(notify(`restart: ${name}`))
});

// укорачивает длительность звуков до 2х знаков после запятой
function shortenPrepare(cb) {
  if (fs.existsSync(spriteJsonPath)) {
    const spriteFile = fs.readFileSync(spriteJsonPath);
    const json = shortenValues(spriteFile);
    fs.writeFileSync(spriteJsonPath, JSON.stringify(json));
  }

  cb();
}

function shortenValues(spriteFile) {
  const json = JSON.parse(spriteFile); // со всем информацией
  const sprite = json.sprite; // только информация о звуках

  Object.keys(sprite).forEach(key => {
    // [ 2000, 235.10204081632668 ] = [ 2000, 235.10 ]
    //         ^^^^^^^^^^^^^^^^^^             ^^^^^^
    sprite[key][1] = +sprite[key][1].toFixed(2);
  });

  json.sprite = sprite;
  return json;
}

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}

/**TODO Обновление звукового спрайта. Все звуки сдвигаются.
 * возможно проблема в обновлении json файла в скриптах */
