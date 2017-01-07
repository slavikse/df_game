'use strict';

import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import notify from 'gulp-notify';

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

/** спрайт отлично жмет кракен, другие средства сжатия не жмут вообще */
function imageStream() {
  return spriteData.img
  .pipe(gulp.dest(thereImage))
  .pipe(notify(`refresh: ${name}`))
}

function styleStream() {
  return spriteData.css
  .pipe(gulp.dest(thereStyle))
}

if (!production) {
  gulp.watch(files, gulp.series(name));
}
