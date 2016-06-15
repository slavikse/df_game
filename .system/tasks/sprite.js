import gulp from 'gulp';
import plumber from 'gulp-plumber';
import spritesmith from 'gulp.spritesmith';
import watch from '../utility/watch';
import notify from '../utility/notify';

const
  name = 'sprite',
  files = [
    'source/**/sprite/*',
    '!source/**/{_*/**,_*}'
  ],
  there = {
    style: 'temp',
    image: 'public/image'
  };

/**
 * Создает из изображений спрайт и стили для использования
 */
export default () => {
  watch(name, files);

  gulp.task(name, end => {
    let spriteDate =
      gulp.src(files)
        .pipe(plumber({errorHandler: notify}))
        .pipe(spritesmith({
          imgName: 'sprite.png',
          imgPath: 'image/sprite.png',
          cssName: 'sprite.css'
        }));

    spriteDate.css
      .pipe(gulp.dest(there.style));

    spriteDate.img
      .pipe(gulp.dest(there.image));

    end()
  })
}
