import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import util from 'gulp-util';

const
  name = 'sprite',
  files = 'source/**/sprite/*',
  thereImage = 'public',
  thereStyle = 'temp',
  production = process.env.NODE_ENV === 'production';

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

/** отлично жмет кракен. используемые средства сжатия не жмут вообще */
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
