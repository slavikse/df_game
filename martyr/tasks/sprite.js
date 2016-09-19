import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';

const
  name = 'sprite',
  files = 'source/**/sprite/*',
  there = 'temp',
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(spritesmith({
    cssName: 'sprite.png.css',
    imgName: 'image/sprite.png'
  }))
  .pipe(gulp.dest(there));
});

if (!production) {
  gulp.watch(files, gulp.series(name));
}
