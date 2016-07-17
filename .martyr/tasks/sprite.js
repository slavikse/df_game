import gulp from 'gulp';
import spritesmith from 'gulp.spritesmith';
import buffer from 'vinyl-buffer';
import imagemin from 'gulp-imagemin';
import util from 'gulp-util';
import merge from 'merge-stream';
import watch from '../utility/watch';

const
  name = 'sprite',
  files = 'source/**/sprite/*',
  there = 'public',
  production = process.env.NODE_ENV === 'production';

/**
 * Создает из маленьких изображений спрайт и стили для использования
 * Сжимает спрайт на продакшн
 */
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

  return merge(css, img);
});

watch(name, files);
