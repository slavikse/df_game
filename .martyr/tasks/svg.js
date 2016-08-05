import gulp from 'gulp';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';
import watch from '../utility/watch';

const
  name = 'svg',
  files = 'source/**/svg/*',
  there = 'public',
  production = process.env.NODE_ENV === 'production',
  config = {
    mode: {
      symbol: {
        sprite: 'svg/sprite.svg',
        example: true,
        dest: '',
        render: {css: true}
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  };

/**
 * Создает из svg спрайт и стили для использвоания
 * Выдает уже пожатый, а svgo удаляет контент...
 */
gulp.task(name, () => {
  return gulp.src(files)
  .pipe(rename({dirname: ''}))
  .pipe(svgSprite(config))
  .pipe(gulp.dest(there));
});

if (!production) {
  watch(name, files);
}
