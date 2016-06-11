import gulp from 'gulp'
import notify from '../utility/notify'
import watch from '../utility/watch'
import $ from 'gulp-load-plugins'

const
  NAME = 'sprite',
  FILES = [
    'source/**/sprite/*',
    '!source/**/{_*,_*/**,server/**}'
  ],
  THERE = {
    STYLE: 'temp',
    IMAGE: 'temp/image'
  };

export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, (end) => {
    let spriteDate =
      gulp.src(FILES)
        .pipe($.plumber({errorHandler: notify}))
        .pipe($.spritesmith({
          imgName: 'sprite.png',
          imgPath: 'image/sprite.png',
          cssName: 'sprite.css'
        }));

    spriteDate.css
      .pipe(gulp.dest(THERE.STYLE));

    spriteDate.img
      .pipe(gulp.dest(THERE.IMAGE));

    end()
  })
}
