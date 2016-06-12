import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  NAME = 'sprite',
  FILES = [
    'source/**/sprite/*',
    '!source/**/{_*/**,_*}'
  ],
  THERE = {
    STYLE: 'temp',
    IMAGE: 'temp/image'
  };

/**
 * Создает из изображений спрайт и стили для использования
 */
export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, (end) => {
    let spriteDate =
      gulp.src(FILES)
        .pipe(plumber({errorHandler: notify}))
        .pipe(spritesmith({
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
