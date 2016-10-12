import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';

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

function imageStream() {
  return spriteData.img
  .pipe(gulp.dest(thereImage))
}

function styleStream() {
  return spriteData.css
  .pipe(gulp.dest(thereStyle))
}

if (!production) {
  gulp.watch(files, gulp.series(name));
}
