import gulp from 'gulp';
import watch from '../utility/watch';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import imagemin from 'gulp-imagemin';
import util from 'gulp-util';
import merge from 'merge-stream';

const
  name = 'sprite',
  files = 'source/**/sprite/*',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

/**
 * Создает из изображений спрайт и стили для использования
 * Сжимает на продакшн
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    let data = gulp.src(files)
      .pipe(spritesmith({
        cssName: 'sprite.png.css',
        imgName: 'image/sprite.png'
      }));

    let css = data.css
      .pipe(gulp.dest(there));

    let img = data.img
      .pipe(buffer())
      .pipe(production ? imagemin({progressive: true}) : util.noop())
      .pipe(gulp.dest(there));

    return merge(css, img)
  })
}
