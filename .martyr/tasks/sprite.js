import gulp from 'gulp';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import spritesmith from 'gulp.spritesmith';
import watch from '../utility/watch';

const
  name = 'sprite',
  files = ['source/**/sprite/*'],
  there = 'temp',
  production = process.env.NODE_ENV === 'production';

gulp.task(name, () => {
  return gulp.src(files)
  .pipe(plumber({errorHandler: notify}))
  .pipe(spritesmith({
    cssName: 'sprite.png.css',
    imgName: 'image/sprite.png'
  }))
  .pipe(gulp.dest(there));
});

if (!production) {
  watch(name, files);
}
