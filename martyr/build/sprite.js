import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import util from 'gulp-util';

const name = 'sprite';
const files = 'source/**/sprite/*';
const thereImage = 'public';
const thereStyle = 'temp';
const production = process.env.NODE_ENV === 'production';

let spriteData;

gulp.task(name,
  gulp.series(
    spriteCreate,
    imageStream,
    styleStream
  )
);

function spriteCreate(cb) {
  spriteData = gulp.src(files)
  .pipe(spritesmith({
    imgName: 'image/sprite.png',
    cssName: 'sprite.png.css'
  }));

  cb();
}

/**
 * Спрайт отлично жмет кракен.
 * Используемые средства сжатия не жмут вообще
 */
function imageStream() {
  return spriteData.img
  .pipe(gulp.dest(thereImage))
  .on('data', () => util.log('                      Обнови вкладку: ' + name))
}

function styleStream() {
  return spriteData.css
  .pipe(gulp.dest(thereStyle))
}

if (!production) {
  gulp.watch(files, gulp.parallel(name));
}
