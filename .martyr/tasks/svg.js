import gulp from 'gulp';
import watch from '../utility/watch';
import plumber from 'gulp-plumber';
import notify from '../utility/notify';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';

const
  name = 'svg',
  files = 'source/**/svg/*',
  there = 'public',

  config = {
    mode: {
      symbol: {
        sprite: 'svg/sprite.svg',
        example: true,
        dest: '',
        render: {
          css: true
        }
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  };

/**
 * Создаем спрайт из svg и стили для использвоания
 * Выдает уже пожатый, а svgo удаляет контент...
 */
export default () => {
  watch(name, files);

  gulp.task(name, () => {
    return gulp.src(files)
      .pipe(plumber({errorHandler: notify}))
      .pipe(rename({dirname: ''}))
      .pipe(svgSprite(config))
      .pipe(gulp.dest(there))
  })
}
