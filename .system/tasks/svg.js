import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import svgSprite from 'gulp-svg-sprite';
import notify from '../utility/notify';
import watch from '../utility/watch';

const
  NAME = 'svg',
  FILES = [
    'source/**/svg/*',
    '!source/**/{_*/**,_*,server/**}'
  ],
  THERE = 'public/svg',
  CONFIG = {
    mode: {
      symbol: {
        sprite: 'sprite.svg',
        dest: ''
      }
    },
    svg: {
      xmlDeclaration: false,
      doctypeDeclaration: false
    }
  };

/**
 * Создаем спрайт из svg
 */
export default () => {
  watch(NAME, FILES);

  gulp.task(NAME, () => {
    return gulp.src(FILES)
      .pipe(plumber({errorHandler: notify}))
      .pipe(rename({dirname: ''}))
      .pipe(svgSprite(CONFIG))
      .pipe(gulp.dest(THERE))
  })
}
